import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes";

const app = express();
const port = 3000;

// Middleware for parsing request bodies as JSON
app.use(express.json());

// Middleware for parsing URL-encoded bodies
app.use(express.urlencoded({ extended: false }));

// Middleware for parsing cookies
app.use(cookieParser());

// Mount user routes
app.use("/", userRoutes);

app.get("/about", (req, res) => {
	res.send({
		name: "Faizan",
	});
});

// Handling a 404 page not found
app.use((req: Request, res: Response) => {
	res.status(404).send("404 - Page Not Found");
});

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
