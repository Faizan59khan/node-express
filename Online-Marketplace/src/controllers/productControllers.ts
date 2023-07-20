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
				result = await cloudinaryV2.uploader.upload(req.file.path, {
					folder: "OnlineMarketPlace", // Specify the folder to store the asset
				});
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
					image: result.secure_url,
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

//Simple Concept skip takes starting document and limit takes last document.
// GET /products?offset=0&limit=10
// GET /products?offset=10&limit=10
// GET /products?offset=20&limit=10
export const getProducts = async (req: Request, res: Response) => {
	try {
		const responseDetails = await isUserAuthenticatedAndAuthorize(req, res);
		if (typeof responseDetails === "boolean" && responseDetails) {
			//This type of pagination helps in infinite scroll on the frontend

			const offset = parseInt(req?.query?.offset as string) || 0;
			const limit = parseInt(req?.query?.limit as string) || 10;

			const products = await Product.find({}).skip(offset).limit(limit);
			res.status(200).send(products);
		} else {
			if (typeof responseDetails === "object") {
				res.status(responseDetails?.status).send(responseDetails?.message);
			}
		}
	} catch (err) {
		res.status(500).send("Internal Server Error");
	}
};

// GET /products?page=1&perPage=10
// GET /products?page=2&perPage=10
// GET /products?page=3&perPage=10
export const getProductsPageBased = async (req: Request, res: Response) => {
	try {
		const responseDetails = await isUserAuthenticatedAndAuthorize(req, res);
		if (typeof responseDetails === "boolean" && responseDetails) {
			//This type of pagination helps in page navigation system,
			//displaying search results or when users have explicit control over moving between pages

			const page = parseInt(req?.query?.offset as string) || 1;
			const perPage = parseInt(req?.query?.limit as string) || 10;

			const skip = (page - 1) * perPage;

			const products = await Product.find({}).skip(skip).limit(perPage);
			res.status(200).send(products);
		} else {
			if (typeof responseDetails === "object") {
				res.status(responseDetails?.status).send(responseDetails?.message);
			}
		}
	} catch (err) {
		res.status(500).send("Internal Server Error");
	}
};
