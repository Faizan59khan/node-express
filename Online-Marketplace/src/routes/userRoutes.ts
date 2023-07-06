import express, { Router } from "express";
import {
	createNewUser,
	deleteUserById,
	getAllUsers,
	userLogin,
	verifyEmail,
} from "../controllers/userControllers";

const router = Router();

router.get("/", getAllUsers);
router.delete("/:id", deleteUserById);
router.post("/register", createNewUser);
router.post("/login", userLogin);
router.get("/verify-email", verifyEmail);

export default router;
