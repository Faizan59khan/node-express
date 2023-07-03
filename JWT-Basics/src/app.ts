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

app.use("/", userRoutes);

app.post("/login", (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    // Validate user credentials (e.g., compare with data in the database)

    const token = jwt.sign(
      { username },
      process.env.JWT_SECRET_KEY || "faizan"
    );
    res.status(200).json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/protected", (req: Request, res: Response) => {
  try {
    // Extract the token from the Authorization header
    const token = req.headers.authorization;

    // Verify and decode the token
    if (token) {
      const decodedToken = jwt.verify(
        token,
        process.env.JWT_SECRET_KEY || "faizan"
      );
    }

    // Access the authenticated user's data (e.g., fetch from the database)
    // Replace this code with your own logic

    res.status(200).json({ message: "Protected route accessed successfully" });
  } catch (error) {
    res.status(401).json({ error: "Unauthorized" });
  }
});

app.listen(3000, () => {
  console.log("server connected at port 3000");
});
