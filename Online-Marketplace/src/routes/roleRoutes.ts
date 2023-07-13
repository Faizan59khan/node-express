import express, { Router } from "express";
import {
	createRole,
	getAllRoles,
	getRoleById,
	updateRole,
	deleteRole,
} from "../controllers/roleControllers";

const router = Router();

router.get("/", getAllRoles);
router.post("/", createRole);
router.get("/:id", getRoleById);
router.patch("/:id", updateRole);
router.delete("/:id", deleteRole);

export default router;
