import express, { Request, Response } from "express";
import ProductCategory from "../models/productCategory";
import { isUserAuthenticatedAndAuthorize } from "../helpers/helper";

export const createProductCategory = async (req: Request, res: Response) => {
	try {
		const responseDetails = await isUserAuthenticatedAndAuthorize(req, res, "createCategory");
		if (typeof responseDetails === "boolean" && responseDetails) {
			const { name, description } = req.body;

			// Validate
			if (!name || !description) {
				return res.status(400).send("Incomplete category details");
			}

			const isCategoryAlreadyExisted = await ProductCategory.findOne({ name: name.toUpperCase() });
			if (isCategoryAlreadyExisted) {
				return res.status(409).send("Product category already exists");
			}

			const category = new ProductCategory({
				name: name.toUpperCase(),
				description,
			});
			await category.save();

			res.status(201).send("Product category created successfully");
		} else {
			if (typeof responseDetails === "object") {
				res.status(responseDetails?.status).send(responseDetails?.message);
			}
		}
	} catch (err) {
		console.error(err);
		res.status(500).send("Internal Server Error");
	}
};

export const getAllProductCategories = async (req: Request, res: Response) => {
	try {
		const categories = await ProductCategory.find({});
		res.status(200).json(categories);
	} catch (err) {
		console.error(err);
		res.status(500).send("Internal Server Error");
	}
};

export const getProductCategoryById = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const category = await ProductCategory.findById(id);

		if (!category) {
			return res.status(404).send("Product category not found");
		}

		res.status(200).json(category);
	} catch (err) {
		console.error(err);
		res.status(500).send("Internal Server Error");
	}
};

export const updateProductCategory = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const { name, description } = req.body;

		const updatedCategory = await ProductCategory.findByIdAndUpdate(
			id,
			{ name, description },
			{ new: true }
		);

		if (!updatedCategory) {
			return res.status(404).send("Product category not found");
		}

		res.status(200).json(updatedCategory);
	} catch (err) {
		console.error(err);
		res.status(500).send("Internal Server Error");
	}
};

export const deleteProductCategory = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;

		const deletedCategory = await ProductCategory.findByIdAndDelete(id);

		if (!deletedCategory) {
			return res.status(404).send("Product category not found");
		}

		res.status(200).json({ message: "Product category deleted successfully" });
	} catch (err) {
		console.error(err);
		res.status(500).send("Internal Server Error");
	}
};
