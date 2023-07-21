import mongoose, { Document, Schema } from "mongoose";

export interface MessageDocument extends Document {
	sender: string;
	receiver: string;
	content: string;
	productId: string;
	timestamp: Date;
}

const messageSchema = new Schema<MessageDocument>({
	sender: {
		type: String,
		required: true,
	},
	receiver: {
		type: String,
		required: true,
	},
	content: {
		type: String,
		required: true,
	},
	productId: {
		type: String,
		required: true,
	},
	timestamp: {
		type: Date,
		default: Date.now,
	},
});

const Message = mongoose.model<MessageDocument>("Message", messageSchema);
export default Message;
