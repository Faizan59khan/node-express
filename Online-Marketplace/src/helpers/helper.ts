import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user";
import Role, { USER_ROLE } from "../models/role";

// Define interfaces for decodedToken and user objects
interface DecodedToken {
	email: string;
	iat: number;
	exp: number;
}

interface ResponseDetails {
	status: number;
	message: string;
}

export const isUserAuthenticatedAndAuthorize = async (
	req: Request,
	res: Response,
	operation: string
): Promise<ResponseDetails | boolean> => {
	const response = {};
	if (!process.env.JWT_SECRET_KEY) {
		throw new Error("JWT Secret Key is not provided in the environment variables.");
	}

	const token: string | undefined = req?.headers?.authorization;
	if (!token) {
		return {
			status: 401,
			message: "Token not found",
		};
	}

	let decodedToken: DecodedToken | null = null;
	try {
		decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY) as DecodedToken;
		const hasPermission = await getUsersPermissions(decodedToken, operation);
		if (!hasPermission) {
			return {
				status: 403,
				message: "User does not have permission to perform this operation.",
			};
		}
	} catch (error: any) {
		if (error.name === "TokenExpiredError") {
			return {
				status: 401,
				message: "Token has expired",
			};
		} else {
			throw error;
		}
	}

	if (!decodedToken) {
		return {
			status: 401,
			message: "Invalid token",
		};
	}
	return true;
};

export const getUsersPermissions = async (
	token: DecodedToken,
	operation: string
): Promise<boolean> => {
	try {
		const user = await User.findOne({ email: token.email });
		if (!user) {
			return false;
		}

		const role = await Role.findOne({ name: user.role });
		if (!role) {
			return false;
		}

		const hasPermission = role.permissions.includes(operation);
		return hasPermission;
	} catch (error) {
		console.error("Error while fetching user/role:", error);
		return false;
	}
};
