import express, { Request, Response } from "express";
import File from "../models/file";
import Product from "../models/product";
import { cloudinaryV2 } from "../app";

export const createProduct = async (req: Request, res: Response) => {
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
};

export const getProducts = async (req: Request, res: Response) => {
	try {
		const products = await Product.find({});
		const productWithImages: any = await Promise.all(
			products.map(async (product) => {
				const image = await File.findById(product.image);
				return {
					...product.toObject(), //convert the Mongoose document to a plain JavaScript object
					image,
				};
			})
		);
		res.status(200).send(productWithImages);
	} catch (err) {
		res.status(500).send("Internal Server Error");
	}
};
