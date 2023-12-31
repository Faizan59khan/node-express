import mongoose, { Document, Schema } from "mongoose";
import { FileDocument } from "./file";

interface ProductDocument extends Document {
	name: string;
	description: string;
	category: string;
	quantity: number;
	price: number;
	image: FileDocument;
}

const productSchema = new Schema<ProductDocument>({
	name: { type: String, required: true },
	description: { type: String, required: true },
	category: { type: String, required: true },
	quantity: { type: Number, required: true },
	price: { type: Number, required: true },
	image: { type: Schema.Types.ObjectId, ref: "File", required: true }, // Reference to File model
});

const Product = mongoose.model<ProductDocument>("Product", productSchema);

export default Product;
