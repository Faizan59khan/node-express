import express, { Router } from "express";
import { createNewUser, getAllUsers } from "../controllers/userControllers";

const router = Router();

router.post("/register", createNewUser);

export default router;
