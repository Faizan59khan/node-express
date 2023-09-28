import express, { NextFunction, Request, Response } from "express";
import * as dotenv from "dotenv";
import connectDB from "./db/db";
import cors from "cors";
import multer from "multer";
import cloudinary from "cloudinary";
import { routes } from "./routes";
import { createServer } from "http";
import { Server } from "socket.io";
import path from "path";
import Message from "./models/message";

dotenv.config(); // Load environment variables from .env file
const app = express();

const httpServer = createServer(app);
const io = new Server(httpServer, {
	cors: {
		origin: "http://localhost:3001",
	},
});

const corsOptions = {
	origin: "http://localhost:3001",
};
app.use(cors(corsOptions));
app.use(express.json());

connectDB();

// Socket.IO setup
io.on("connection", (socket) => {
	console.log("New user connected");

	// Handle new messages
	socket.on("sendMessage", async (messageData) => {
		try {
			// Save the message to the database using the Message model
			const newMessage = await Message.create(messageData);

			// Emit the new message to the corresponding chat room
			io.to(messageData.productId).emit("newMessage", messageData);
		} catch (err) {
			console.error("Error sending the message:", err);
		}
	});

	socket.on("joinRoom", (roomId) => {
		socket.join(roomId);
		console.log(`User joined room: ${roomId}`);
	});

	socket.on("leaveRoom", (roomId) => {
		socket.join(roomId);
		console.log(`User Left room: ${roomId}`);
	});

	// Handle disconnection if needed
	socket.on("disconnect", () => {
		console.log("User disconnected");
	});
});

export const cloudinaryV2 = cloudinary.v2;
cloudinaryV2.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.diskStorage({});
const upload = multer({ storage });

// Middleware to serve static files from the "public" directory
const publicDirPath = path.join(__dirname, "../../Client-Socket");
app.use(express.static(publicDirPath));

// Middlewear
app.use("/payments", routes.paymentRoutes);
app.use("/orders", routes.orderRoutes);
app.use("/product-categories", routes.productCategoryRoutes);
app.use("/products", upload.single("file"), routes.productRoutes);
app.use("/roles", routes.roleRoutes);
app.use("/user", routes.userRoutes);

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
	console.error(err);
	res.status(500).send("Internal Server Error");
});

// Page Not Found
app.use((req: Request, res: Response) => {
	res.status(404).send("404 - Page Not Found");
});

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
	console.log(`Server listening at port: ${PORT}`);
});
