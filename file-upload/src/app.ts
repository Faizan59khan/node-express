import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cloudinary from "cloudinary";
import multer from "multer";
import connectDB from "./db/db";
import productRoutes from "./routes/productRoutes";

dotenv.config(); // Load environment variables from .env file
const app = express();
app.use(express.json());

connectDB();

export const cloudinaryV2 = cloudinary.v2;
cloudinaryV2.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.diskStorage({});
const upload = multer({ storage });

//Middlewear
app.use("/", upload.single("file"), productRoutes);

// Handling a 404 page not found
app.use((req: Request, res: Response) => {
	res.status(404).send("404 - Page Not Found");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server Listening at Port No: ${PORT}`);
});
