import mongoose, { Document, Schema } from "mongoose";

export interface PaymentDocument extends Document {
	orderId: mongoose.Schema.Types.ObjectId;
	paymentMethodId: string; // Stripe PaymentMethod ID
	amount: number;
	currency: string;
	status: string;
	createdAt: Date;
}

const paymentSchema = new Schema<PaymentDocument>({
	orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true },
	paymentMethodId: { type: String, required: true }, // Stripe PaymentMethod ID
	amount: { type: Number, required: true },
	currency: { type: String, required: true },
	status: { type: String, required: true },
	createdAt: { type: Date, default: Date.now },
});

const Payment = mongoose.model<PaymentDocument>("Payment", paymentSchema);

export default Payment;
