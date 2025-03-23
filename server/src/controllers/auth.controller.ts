import { Request, Response } from "express";
import prisma from "../db/prisma.js";
import bcryptjs from "bcryptjs";
import generateToken from "../utils/tokenGenerator.js";

export const getMe = async (req: Request, res: Response) => {
	try {
		const user = await prisma.user.findUnique({
			where: { id: req.user.id },
		});

		if (!user) {
			res.status(404).json({
				error: "User not found",
			});
		} else {
			res.status(200).json({
				id: user.id,
				username: user.username,
				fullName: user.fullName,
				role: user.role,
			});
		}
	} catch (error: any) {
		console.log("Error in getMe controller", error.message);
		res.status(500).json({ error: "[500] Internal Server Error" });
	}
};

export const signup = async (req: Request, res: Response) => {
	try {
		const { username, fullName, password, confirmPassword } = req.body;

		if (!fullName || !username || !password || !confirmPassword) {
			return res
				.status(400)
				.json({ error: "All fields should be filled" });
		}

		if (password !== confirmPassword) {
			return res.status(400).json({ error: "Passwords don't match" });
		}

		const user = await prisma.user.findUnique({ where: { username } });
		if (user) {
			return res
				.status(400)
				.json({ error: "This username is already taken" });
		}

		const salt = await bcryptjs.genSalt(10);
		const hashedPass = await bcryptjs.hash(password, salt);

		const newUser = await prisma.user.create({
			data: {
				username: username,
				fullName: fullName,
				role: "",
				password: hashedPass,
			},
		});

		if (newUser) {
			generateToken(newUser.id, res);

			return res.status(201).json({
				id: newUser.id,
				username: newUser.username,
				fullName: newUser.fullName,
			});
		} else {
			res.status(400).json({ error: "Invalid user data" });
		}
	} catch (error: any) {
		console.log("Error in signup controller", error.message);
		res.status(500).json({ error: "[500] Internal Server Error" });
	}
};

export const login = async (req: Request, res: Response) => {
	try {
		const { username, password } = req.body;
		const user = await prisma.user.findUnique({ where: { username } });

		if (!user) {
			// Check is user is present in database
			return res.status(400).json({
				error: "User does not exist",
			});
		}

		const isCorrectPassword = await bcryptjs.compare(
			password,
			user.password
		);

		if (!isCorrectPassword) {
			// Check if user password is correct
			return res.status(400).json({
				error: "Wrong password",
			});
		}

		generateToken(user.id, res);

		res.status(200).json({
			id: user.id,
			username: user.username,
			fullName: user.fullName,
			role: user.role,
		});
	} catch (error: any) {
		console.log("Error in login controller", error.message);
		res.status(500).json({ error: "[500] Internal Server Error" });
	}
};

export const logout = async (req: Request, res: Response) => {
	try {
		res.cookie("jwt", "", { maxAge: 0 });
		res.status(200).json({ message: "Logged out successfully" });
	} catch (error: any) {
		console.log("Error in logout controller", error.message);
		res.status(500).json({ error: "[500] Internal Server Error" });
	}
};
