import mongoose, { Document, Schema } from "mongoose";

export enum USER_ROLE {
	ADMIN = "ADMIN",
	SELLER = "SELLER",
	BUYER = "BUYER",
}

export interface RoleDocument extends Document {
	name: USER_ROLE;
	description?: string;
	permissions: string[];
}

const roleSchema = new Schema<RoleDocument>({
	name: { type: String, enum: Object.values(USER_ROLE), unique: true },
	description: {
		type: String,
		required: true,
	},
	permissions: [
		{
			type: String,
			required: true,
		},
	],
});

const Role = mongoose.model<RoleDocument>("Role", roleSchema);

export default Role;
