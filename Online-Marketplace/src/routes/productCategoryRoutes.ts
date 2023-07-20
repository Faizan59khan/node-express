import express, { Router } from "express";
import {
	createProductCategory,
	getAllProductCategories,
	getProductCategoryById,
	updateProductCategory,
	deleteProductCategory,
} from "../controllers/productCategoryControllers";

const router = Router();

router.post("/", createProductCategory);
router.get("/", getAllProductCategories);
router.get("/:id", getProductCategoryById);
router.patch("/:id", updateProductCategory);
router.delete("/:id", deleteProductCategory);

export default router;
