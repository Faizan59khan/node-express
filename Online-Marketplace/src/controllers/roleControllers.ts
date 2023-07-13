import express, { Request, Response } from "express";
import Role from "../models/role";

export const createRole = async (req: Request, res: Response) => {
	try {
		const { name, description, permissions } = req.body;

		const isRoleAlreadyExisted = await Role.findOne({ name });
		if (isRoleAlreadyExisted) {
			return res.status(409).send("Role already exists");
		}

		const role = new Role({
			name,
			description,
			permissions,
		});
		await role.save();

		res.status(201).send("Role created successfully");
	} catch (err) {
		console.error(err);
		res.status(500).send("Internal Server Error");
	}
};

// Get all roles
export const getAllRoles = async (req: Request, res: Response) => {
	try {
		const roles = await Role.find({});
		res.status(200).json(roles);
	} catch (err) {
		console.error(err);
		res.status(500).send("Internal Server Error");
	}
};

// Get a role by ID
export const getRoleById = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const role = await Role.findById(id);

		if (!role) {
			return res.status(404).send("Role not found");
		}

		res.status(200).json(role);
	} catch (err) {
		console.error(err);
		res.status(500).send("Internal Server Error");
	}
};

// Update a role
export const updateRole = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const { name, description, permissions } = req.body;

		const updatedRole = await Role.findByIdAndUpdate(
			id,
			{ name, description, permissions }, //updated fields rest of the fields remain unchanged
			{ new: true } //option ensures the updated role is returned as the result instead of the original role.
		);

		if (!updatedRole) {
			return res.status(404).send("Role not found");
		}

		res.status(200).json(updatedRole);
	} catch (err) {
		console.error(err);
		res.status(500).send("Internal Server Error");
	}
};

// Delete a role
export const deleteRole = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;

		const deletedRole = await Role.findByIdAndDelete(id);

		if (!deletedRole) {
			return res.status(404).send("Role not found");
		}

		res.status(200).json({ message: "Role deleted successfully" });
	} catch (err) {
		console.error(err);
		res.status(500).send("Internal Server Error");
	}
};
