import mongoose, { Document, Schema } from "mongoose";

export interface FileDocument extends Document {
	name: string;
	cloudinary_id: string;
	url: string;
}

const fileSchema = new Schema<FileDocument>({
	name: String,
	cloudinary_id: String,
	url: String,
});
const File = mongoose.model<FileDocument>("File", fileSchema);
export default File;
