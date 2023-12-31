import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { token } from "./types/general";
import connectDB from "./db/db";
import userRoutes from "./routes/userRoutes";

dotenv.config(); // Load environment variables from .env file
const app = express();
app.use(express.json());

//Connect To DataBase
connectDB();

app.use("/users", userRoutes);

app.get("/protected", (req: Request, res: Response) => {
	try {
		// Extract the token from the Authorization header
		const token = req.headers.authorization;

		// Verify and decode the token
		if (token) {
			const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY || "faizan");
		}

		// Access the authenticated user's data (e.g., fetch from the database)
		// Replace this code with your own logic

		res.status(200).json({ message: "Protected route accessed successfully" });
	} catch (error) {
		res.status(401).json({ error: "Unauthorized" });
	}
});

// Handling a 404 page not found
app.use((req: Request, res: Response) => {
	res.status(404).send("404 - Page Not Found");
});

app.listen(3000, () => {
	console.log("server connected at port 3000");
});
