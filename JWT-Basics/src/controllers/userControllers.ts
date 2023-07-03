import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/user";

export const getAllUsers = (req: Request, res: Response) => {};

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
