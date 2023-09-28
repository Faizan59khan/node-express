import { Request, Response } from "express";
import Payment from "../models/payment";
import Stripe from "stripe";

// Create a new payment
export const createPayment = async (req: Request, res: Response) => {
	try {
		let stripe;
		if (process.env.STRIPE_API_KEY) {
			stripe = new Stripe(process.env.STRIPE_API_KEY, { apiVersion: "2022-11-15" });
		}
		const { orderId, paymentMethodId, amount, currency, status } = req.body;

		if (stripe) {
			const paymentIntent = await stripe.paymentIntents.create({
				amount: amount,
				currency: currency,
				payment_method: paymentMethodId,
				confirmation_method: "manual",
				confirm: true,
			});
			console.log(paymentIntent);
			const payment = new Payment({
				orderId,
				paymentMethodId,
				amount,
				currency,
				status,
			});

			await payment.save();

			res.status(201).json({ success: true, payment });
		} else {
			res.status(500).json({ success: false, error: "Stripe is not initialized" });
		}
	} catch (error: any) {
		res.status(500).json({ success: false, error: error.message });
	}
};

// Get payment details by ID
export const getPaymentById = async (req: Request, res: Response) => {
	try {
		const payment = await Payment.findById(req.params.id);

		if (!payment) {
			return res.status(404).json({ success: false, message: "Payment not found" });
		}

		res.json({ success: true, payment });
	} catch (error: any) {
		res.status(500).json({ success: false, error: error.message });
	}
};

// Update payment status by ID
export const updatePaymentStatus = async (req: Request, res: Response) => {
	try {
		const { status } = req.body;

		const payment = await Payment.findByIdAndUpdate(req.params.id, { status }, { new: true });

		if (!payment) {
			return res.status(404).json({ success: false, message: "Payment not found" });
		}

		res.json({ success: true, payment });
	} catch (error: any) {
		res.status(500).json({ success: false, error: error.message });
	}
};
