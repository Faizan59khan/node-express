import mongoose, { Document, Schema } from "mongoose";
import { ProductDocument } from "./product";
import { UserDocument } from "./user";
import Stripe from "stripe";
import { Product } from "../helpers/types";

export interface OrderDocument extends Document {
	products: Product[];
	buyerId: UserDocument;
	sellerId: UserDocument;
	totalAmount: number;
	status: string;
	shippingAddress: string;
	paymentMethod: Stripe.PaymentMethod | null; // Use the Stripe.PaymentMethod type
	paymentStatus: string;
	createdAt: Date;
	updatedAt: Date;
}

const orderSchema = new Schema<OrderDocument>({
	products: [
		{
			productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
			quantity: { type: Number, required: true },
		},
	],
	buyerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
	sellerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
	totalAmount: { type: Number, required: true },
	status: { type: String, required: true },
	shippingAddress: { type: String, required: true },
	paymentMethod: { type: Object }, // Store Stripe.PaymentMethod as an object
	paymentStatus: { type: String, required: true },
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now, index: true },
});

const Order = mongoose.model<OrderDocument>("Order", orderSchema);

export default Order;
