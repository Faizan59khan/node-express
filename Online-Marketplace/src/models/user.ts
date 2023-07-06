import mongoose, { Document, Schema } from "mongoose";

export interface UserDocument extends Document {
	username: string;
	password: string;
	email: string;
	verificationToken: string | null;
	isEmailVerified: boolean;
}

const userSchema = new Schema<UserDocument>({
	username: { type: String, required: true },
	password: { type: String, required: true },
	email: {
		type: String,
		required: true,
		lowercase: true,
		match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
	}, // Regular expression for email validation
	isEmailVerified: { type: Boolean, required: true },
	verificationToken: { type: String, default: null },
});

const User = mongoose.model<UserDocument>("User", userSchema);

export default User;
