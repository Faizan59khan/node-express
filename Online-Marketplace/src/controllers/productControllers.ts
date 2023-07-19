import express, { Request, Response } from "express";
import File from "../models/file";
import Product from "../models/product";
import { isUserAuthenticatedAndAuthorize } from "../helpers/helper";
import { cloudinaryV2 } from "../app";

export const createProduct = async (req: Request, res: Response) => {
	try {
		const responseDetails = await isUserAuthenticatedAndAuthorize(req, res, "createProduct");
		if (typeof responseDetails === "boolean" && responseDetails) {
			const { name, description, price, quantity, category } = req.body;

			// Validate
			if (!name || !description || !price || !quantity || !category) {
				return res.status(400).send("Incomplete product details");
			}

			// Upload the file to Cloudinary
			if (!req.file || !req.file.path) {
				return res.status(400).send("No file found");
			}

			let result: any;
			let file: any;
			try {
				result = await cloudinaryV2.uploader.upload(req.file.path);
				// Save file details to the database
				file = new File({
					name: req.file.originalname,
					cloudinary_id: result.public_id,
					url: result.secure_url,
				});

				await file.save();
			} catch (err) {
				throw new Error("File Upload Failed");
			}

			if (file) {
				// Create the product and associate it with the uploaded file
				const product = new Product({
					name,
					description,
					price,
					quantity,
					category,
					image: file?._id, // Assign the image reference to the product
				});

				await product.save();
				res.send("Product Created Successfully");
			} else {
				throw new Error("Product Creation Failed");
			}
		} else {
			if (typeof responseDetails === "object") {
				res.status(responseDetails?.status).send(responseDetails?.message);
			}
		}
	} catch (err) {
		console.log(err);
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
