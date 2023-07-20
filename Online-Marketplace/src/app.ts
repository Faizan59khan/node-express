import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import connectDB from "./db/db";
import multer from "multer";
import cloudinary from "cloudinary";
import { routes } from "./routes";

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
app.use("/product-categories", routes.productCategoryRoutes);
app.use("/products", upload.single("file"), routes.productRoutes);
app.use("/roles", routes.roleRoutes);
app.use("/user", routes.userRoutes);

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
	console.error(err);
	res.status(500).send("Internal Server Error");
});

//Page Not Found
app.use((req: Request, res: Response) => {
	res.status(404).send("404 - Page Not Found");
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`Server listening at port: ${PORT}`);
});
