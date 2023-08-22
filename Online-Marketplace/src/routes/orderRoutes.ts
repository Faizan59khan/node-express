import express, { Router } from "express";
import { createOrder, getOrders } from "../controllers/orderControllers";

const router = Router();

router.get("/", createOrder);
router.post("/:ordesrId", getOrders);

export default router;
