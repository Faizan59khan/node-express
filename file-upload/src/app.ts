import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cloudinary from "cloudinary";
import multer from "multer";
import connectDB from "./db/db";
import File from "./models/file";
import Product from "./models/product";

dotenv.config(); // Load environment variables from .env file
const app = express();
app.use(express.json());

connectDB();

const cloudinaryV2 = cloudinary.v2;
cloudinaryV2.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.diskStorage({});
const upload = multer({ storage });

//Middlewear
app.post("/upload", upload.single("file"), async (req: Request, res: Response) => {
	try {
		if (!req.file || !req.file.path) {
			throw new Error("No file found");
		}

		const result = await cloudinaryV2.uploader.upload(req.file.path);
		const file = new File({
			name: req.file.originalname,
			cloudinary_id: result.public_id,
			url: result.secure_url,
		});
		await file.save();

		const product = new Product({
			name: "Example Product",
			price: 10.99,
			image: file._id, // Assign the image reference to the product
		});
		await product.save();

		res.send("File uploaded successfully.");
	} catch (err) {
		console.error(err);
		res.status(500).send("Internal Server Error");
	}
});

// Handling a 404 page not found
app.use((req: Request, res: Response) => {
	res.status(404).send("404 - Page Not Found");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server Listening at Port No: ${PORT}`);
});
