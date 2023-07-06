import express, { Request, Response } from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";
import connectDB from "./db/db";

dotenv.config(); // Load environment variables from .env file
const app = express();
app.use(express.json());

connectDB();

app.use("/user", userRoutes);

app.use((req: Request, res: Response) => {
	res.status(404).send("404 - Page Not Found");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server listening at port: ${PORT}`);
});
