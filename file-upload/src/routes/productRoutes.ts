import express, { Router } from "express";
import { createProduct, getProducts } from "../controllers/productControllers";

const router = Router();

router.post("/product", createProduct);
router.get("/product", getProducts);

export default router;
