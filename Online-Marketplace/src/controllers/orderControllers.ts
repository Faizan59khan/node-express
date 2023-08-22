import express, { Request, Response } from "express";
import { handleAuthorization, isUserAuthenticatedAndAuthorize } from "../helpers/helper";
import Order from "../models/order";

export const getOrders = async (req: Request, res: Response) => {
	const responseDetails = await isUserAuthenticatedAndAuthorize(req, res, "createOrder");
	if (typeof responseDetails === "boolean" && responseDetails) {
		const orders = await Order.find({});
		res.status(200).send(orders);
	} else {
		if (typeof responseDetails === "object") {
			res.status(responseDetails?.status).send(responseDetails?.message);
		}
	}
};

export const createOrder = async (req: Request, res: Response) => {
	const responseDetails = await isUserAuthenticatedAndAuthorize(req, res, "createOrder");
	if (typeof responseDetails === "boolean" && responseDetails) {
		const {
			products,
			buyerId,
			sellerId,
			totalAmount,
			status,
			shippingAddress,
			paymentMethod,
			paymentStatus,
			createdAt,
			updatedAt,
		} = req?.body;
		//validation
		if (
			!products ||
			!Array.isArray(products) ||
			products.length === 0 ||
			!buyerId ||
			!sellerId ||
			!totalAmount ||
			typeof totalAmount !== "number" ||
			!status ||
			!shippingAddress ||
			!paymentStatus
		) {
			return res.status(400).json({ message: "Invalid request parameters." });
		}
		const order = new Order({
			products,
			buyerId,
			sellerId,
			totalAmount,
			status,
			shippingAddress,
			paymentMethod,
			paymentStatus,
			createdAt,
			updatedAt,
		});
		await order.save();
		res.status(201).json({ message: "Order created successfully." });
	} else {
		if (typeof responseDetails === "object") {
			res.status(responseDetails?.status).send(responseDetails?.message);
		}
	}
};

export const deleteOrder = async (req: Request, res: Response) => {
	try {
		const responseDetails = await isUserAuthenticatedAndAuthorize(req, res, "deleteOrder");
		if (typeof responseDetails === "boolean" && responseDetails) {
			const orderId = req.params.orderId; // Assuming the order ID is part of the route parameter

			// Find and delete the order
			const deletedOrder = await Order.findByIdAndDelete(orderId);

			if (!deletedOrder) {
				return res.status(404).json({ message: "Order not found." });
			}

			res.status(200).json({ message: "Order deleted successfully." });
		} else {
			if (typeof responseDetails === "object") {
				res.status(responseDetails?.status).send(responseDetails?.message);
			}
		}
	} catch (error) {
		console.error("Error deleting order:", error);
		res.status(500).json({ message: "Internal server error." });
	}
};

export const updateOrder = async (req: Request, res: Response) => {
	try {
		const responseDetails = await isUserAuthenticatedAndAuthorize(req, res, "updateOrder");
		if (typeof responseDetails === "boolean" && responseDetails) {
			const orderId = req.params.orderId; // Assuming the order ID is part of the route parameter
			const updateData = req.body;

			// Update the order
			const updatedOrder = await Order.findByIdAndUpdate(orderId, updateData, { new: true });

			if (!updatedOrder) {
				return res.status(404).json({ message: "Order not found." });
			}

			res.status(200).json({ message: "Order updated successfully.", order: updatedOrder });
		} else {
			if (typeof responseDetails === "object") {
				res.status(responseDetails?.status).send(responseDetails?.message);
			}
		}
	} catch (error) {
		console.error("Error updating order:", error);
		res.status(500).json({ message: "Internal server error." });
	}
};
