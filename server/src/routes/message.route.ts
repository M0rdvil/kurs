import express from "express";
import protectRoute from "../middleware/routeProtection.js";
import {
	sendMessage,
	getMessages,
	getConversations,
} from "../controllers/message.controller.js";

const router = express.Router();

router.get("/conversations", protectRoute, getConversations);

router.get("/:id", protectRoute, getMessages);
router.post("/send/:id", protectRoute, sendMessage);

export default router;
