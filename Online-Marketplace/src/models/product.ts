import mongoose, { Document, Schema } from "mongoose";
import { ProductCategoryDocument } from "./productCategory";
import { FileDocument } from "./file";

export interface ProductDocument extends Document {
	name: string;
	description: string;
	category: ProductCategoryDocument;
	quantity: number;
	price: number;
	currency: string;
	image: FileDocument;
}

const productSchema = new Schema<ProductDocument>({
	name: { type: String, required: true },
	description: { type: String },
	//category: { type: mongoose.Schema.Types.ObjectId, ref: "ProductCategory" },
	category: { type: String, required: true },
	quantity: { type: Number, required: true },
	price: { type: Number, required: true },
	currency: { type: String },
	image: { type: mongoose.Schema.Types.ObjectId, ref: "File" },
});

const Product = mongoose.model<ProductDocument>("Product", productSchema);

export default Product;
