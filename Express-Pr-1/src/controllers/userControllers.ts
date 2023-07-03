import express, { Request, Response } from "express";
import { User, findAllUsers, createUser } from "../models/userModels";

export const getAllUsers = (req: Request, res: Response) => {
	const users = findAllUsers();
	res.send(users);
};

export const createNewUser = (req: Request, res: Response) => {
	const { name, email } = req.body;
	console.log(req.body);
	const newUser: User = { name, email };
	const user = createUser(newUser);
	res.send(user);
};
