import express, { Router } from "express";
import {
	createNewUser,
	deleteUserById,
	getAllUsers,
	userLogin,
} from "../controllers/userControllers";

const router = Router();

router.get("/users", getAllUsers);
router.post("/register", createNewUser);
router.post("/login", userLogin);
router.delete("/users/:id", deleteUserById);

export default router;
