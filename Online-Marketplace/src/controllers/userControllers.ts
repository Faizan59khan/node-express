import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User, { UserDocument } from "../models/user";
import { v4 as uuidv4 } from "uuid";
import nodemailer from "nodemailer";

export const getAllUsers = async (req: Request, res: Response) => {
	try {
		const users = await User.find({});
		return res.status(200).send(users);
	} catch (err) {
		return res.status(500).send(err);
	}
};

/*This is a protected route: verify token before doing anything*/
export const deleteUserById = async (req: Request, res: Response) => {
	try {
		if (!process.env.JWT_SECRET_KEY) {
			throw new Error("JWT Secret Key is not provided in the environment variables.");
		}

		const token = req.headers.authorization;
		if (!token) {
			return res.status(404).send("Token not found");
		}

		let decodedToken;
		try {
			decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
		} catch (error: any) {
			if (error.name === "TokenExpiredError") {
				return res.status(401).send("Token has expired");
			} else {
				throw error;
			}
		}

		if (!decodedToken) {
			return res.status(401).send("Invalid token");
		}

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

const sendVerificationEmail = (email: string, verificationLink: string) => {
	const transporter = nodemailer.createTransport({
		// Configure your email service provider here
		// For example, using Gmail SMTP:
		service: "gmail",
		auth: {
			user: process.env.GMAIL_USER,
			pass: process.env.GMAIL_PASSWORD,
		},
	});

	const mailOptions = {
		from: process.env.GMAIL_USER,
		to: email,
		subject: "Email Verification",
		text: `Please click on the following link to verify your email: ${verificationLink}`,
	};

	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			console.log("Error sending verification email:", error);
		} else {
			console.log("Verification email sent:", info.response);
		}
	});
};

export const createNewUser = async (req: Request, res: Response) => {
	try {
		const { email, username, password, role } = req.body;

		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).send("Email Already Exist, Try Log In");
		}
		const hashedPassword = await bcrypt.hash(password, 10);

		const verificationToken = uuidv4();

		// Store the user data in the database or any other storage mechanism
		const user: UserDocument = new User({
			email,
			username,
			password: hashedPassword,
			verificationToken,
			isEmailVerified: false,
			role,
		});
		await user.save();

		const verifyLink = `http://localhost:3001/user/verify-email?token=${verificationToken}`;
		sendVerificationEmail(email, verifyLink);

		res.status(201).send("User Registered Successfully. Please check your email for verification.");
	} catch (err) {
		res.status(501).send("Internal Server Error");
	}
};

export const verifyEmail = async (req: Request, res: Response) => {
	try {
		const { token } = req.query;
		const user = await User.findOne({ verificationToken: token });
		if (!user) {
			return res.status(400).send("Invalid verification token");
		}

		user.isEmailVerified = true;
		user.verificationToken = null;
		await user.save();

		//redirect to success page
		res.status(200).send("Email Verified Successfully");
	} catch (err) {
		res.status(500).send("Internal Server Error");
	}
};

export const userLogin = async (req: Request, res: Response) => {
	try {
		if (!process.env.JWT_SECRET_KEY) {
			throw new Error("JWT Secret Key is not provided in the environment variables.");
		}
		const { email, password } = req.body;

		// Validate user credentials (e.g., compare with data in the database)
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(404).send("User not found");
		}
		const isPasswordValid = await bcrypt.compare(password, user?.password);
		if (!isPasswordValid) {
			return res.status(401).send("Invalid Password");
		}

		const token = jwt.sign({ email }, process.env.JWT_SECRET_KEY, { expiresIn: "3h" });
		res.status(200).json({ token });
	} catch (err: any) {
		if (err.name === "TokenExpiredError") {
			return res.status(401).send("Token has expired");
		}
		console.error(err);
		res.status(500).send("Internal Server Error");
	}
};
