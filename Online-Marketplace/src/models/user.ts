import mongoose, { Document, Schema } from "mongoose";
import { USER_ROLE } from "./role";

export interface UserDocument extends Document {
	username: string;
	password: string;
	email: string;
	verificationToken: string | null;
	isEmailVerified: boolean;
	role: USER_ROLE; // Use the USER_ROLE enum as the type
}

const userSchema = new Schema<UserDocument>({
	username: { type: String, required: true },
	password: { type: String, required: true },
	email: {
		type: String,
		required: true,
		lowercase: true,
		match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
	},
	isEmailVerified: { type: Boolean, required: true },
	verificationToken: { type: String, default: null },
	role: { type: String, enum: Object.values(USER_ROLE) }, // Use enum with values from USER_ROLE
});

const User = mongoose.model<UserDocument>("User", userSchema);

export default User;
