import express from "express";
import {
	login,
	logout,
	signup,
	getMe,
} from "../controllers/auth.controller.js";
import protectRoute from "../middleware/routeProtection.js";

const router = express.Router();

// <url>/api/auth/me
router.get("/me", protectRoute, getMe);

// <url>/api/auth/signup
router.post("/signup", signup);

// <url>/api/auth/login
router.post("/login", login);

// <url>/api/auth/logout
router.post("/logout", logout);

export default router;
