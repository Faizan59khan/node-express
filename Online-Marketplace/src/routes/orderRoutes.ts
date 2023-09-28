import express, { Router } from "express";
import { createOrder, getOrders } from "../controllers/orderControllers";

const router = Router();

router.post("/", createOrder);
router.get("/:ordesrId", getOrders);

export default router;
