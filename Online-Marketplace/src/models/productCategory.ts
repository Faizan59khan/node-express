import mongoose, { Document, Schema } from "mongoose";

export interface ProductCategoryDocument extends Document {
	name: string;
	description: string;
}

const productCategorySchema = new Schema<ProductCategoryDocument>({
	name: { type: String, required: true, unique: true },
	description: { type: String, required: true },
});

const ProductCategory = mongoose.model<ProductCategoryDocument>(
	"ProductCategory",
	productCategorySchema
);

export default ProductCategory;
