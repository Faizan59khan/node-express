import express, { Router } from "express";
import { createNewUser, getAllUsers } from "../controllers/userControllers";

const router = Router();
const path = "/users";

router.get(path, getAllUsers);

router.post(path, createNewUser);

export default router;
