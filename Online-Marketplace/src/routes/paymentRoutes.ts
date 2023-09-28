import express from "express";
import {
	createPayment,
	getPaymentById,
	updatePaymentStatus,
} from "../controllers/paymentController";

const router = express.Router();

router.post("/", createPayment);
router.get("/:id", getPaymentById);
router.put("/:id", updatePaymentStatus);

export default router;
