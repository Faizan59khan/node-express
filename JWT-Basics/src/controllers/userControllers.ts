import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user";

export const getAllUsers = async (req: Request, res: Response) => {
	try {
		const users = await User.find({});
		return res.status(200).send(users);
	} catch (err) {
		return res.status(500).send(err);
	}
};

export const deleteUserById = async (req: Request, res: Response) => {
	try {
		const userId = req.params.id;
		const isDeletedUser = await User.findByIdAndDelete(userId);
		if (!isDeletedUser) {
			return res.status(404).send("User not found");
		}

		return res.status(200).json({ message: "User deleted successfully" });
	} catch (err) {
		return res.status(500).send("Internal server error");
	}
};

export const createNewUser = async (req: Request, res: Response) => {
	try {
		const { username, password } = req.body;

		const existingUser = await User.findOne({ username });
		if (existingUser) {
			return res.status(400).send("User already exists");
		}
		const hashedPassword = await bcrypt.hash(password, 10);

		// Store the user data in the database or any other storage mechanism
		const user = new User({
			username,
			password: hashedPassword,
		});
		await user.save();

		res.status(201).send("User Registered Successfully");
	} catch (err) {
		res.status(501).send("Internal Server Error");
	}
};

export const userLogin = async (req: Request, res: Response) => {
	try {
		if (!process.env.JWT_SECRET_KEY) {
			throw new Error("JWT Secret Key is not provided in the environment variables.");
		}
		const { username, password } = req.body;

		// Validate user credentials (e.g., compare with data in the database)
		const user = await User.findOne({ username });
		if (!user) {
			return res.status(404).send("User not found");
		}
		const isPasswordValid = await bcrypt.compare(password, user?.password);
		if (!isPasswordValid) {
			return res.status(401).send("Invalid Password");
		}

		const token = jwt.sign({ username }, process.env.JWT_SECRET_KEY, { expiresIn: "3h" });
		res.status(200).json({ token });
	} catch (err: any) {
		if (err.name === "TokenExpiredError") {
			return res.status(401).send("Token has expired");
		}
		console.error(err);
		res.status(500).send("Internal Server Error");
	}
};
