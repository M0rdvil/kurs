import { Request, Response } from "express";
import prisma from "../db/prisma.js";
import { getRecieverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req: Request, res: Response) => {
	try {
		const { message } = req.body;
		const { id: recieverId } = req.params;
		const senderId = req.user.id;

		let conversation = await prisma.conversation.findFirst({
			where: {
				participantIds: {
					hasEvery: [senderId, recieverId],
				},
			},
		});

		if (!conversation) {
			// If no conversation exists -> create conversation
			conversation = await prisma.conversation.create({
				data: {
					participantIds: {
						set: [senderId, recieverId],
					},
				},
			});
		}

		const newMessage = await prisma.message.create({
			// Create new message
			data: {
				senderId,
				body: message,
				conversationId: conversation.id,
			},
		});

		if (newMessage) {
			// If newMessage sent, add it to the conversation
			conversation = await prisma.conversation.update({
				where: {
					id: conversation.id,
				},
				data: {
					messages: {
						connect: {
							id: newMessage.id,
						},
					},
				},
			});
		}

		// socket.io
		const recieverSocketId = getRecieverSocketId(recieverId);
		if (recieverSocketId) {
			io.to(recieverSocketId).emit("newMessage", newMessage);
		}

		res.status(201).json(newMessage);
	} catch (error: any) {
		console.error("Error in sendMessage controller", error.message);
		res.status(500).json({ error: "[500] Internal server error" });
	}
};

export const getMessages = async (req: Request, res: Response) => {
	try {
		const { id: userToChatId } = req.params;
		const senderId = req.user.id;

		const conversation = await prisma.conversation.findFirst({
			where: {
				participantIds: {
					hasEvery: [senderId, userToChatId],
				},
			},
			include: {
				messages: {
					orderBy: {
						createdAt: "asc",
					},
				},
			},
		});

		if (!conversation) {
			return res.status(200).json([]);
		}

		res.status(200).json(conversation.messages);
	} catch (error: any) {
		console.error("Error in getMessages controller", error.message);
		res.status(500).json({ error: "[500] Internal server error" });
	}
};

export const getConversations = async (req: Request, res: Response) => {
	try {
		const authUserId = req.user.id;

		const conversations = await prisma.user.findMany({
			where: {
				id: {
					not: authUserId,
				},
			},
			select: {
				id: true,
				fullName: true,
			},
		});

		res.status(200).json(conversations);
	} catch (error: any) {
		console.error("Error in getConversations controller", error.message);
		res.status(500).json({ error: "[500] Internal Server Error" });
	}
};
