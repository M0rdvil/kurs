import { useAuthContext } from "../../context/authContext";
import { getMessageTime } from "../../utils/getMessageTime";
import { MessageType } from "../../zustand/useConversation";

const Message = ({ message }: { message: MessageType }) => {
	const { authUser } = useAuthContext();
	const fromUser = message.senderId;
	const messageClass = fromUser === authUser?.id ? "chat-end" : "chat-start";

	return (
		<div className={`chat ${messageClass}`}>
			<div
				className={`chat-bubble rounded-xl text-[--secondary] ${
					fromUser === authUser?.id
						? "bg-blue-500"
						: "bg-[--accent-a]"
				}`}
			>
				{message.body}
			</div>
			<div className="flex chat-footer opacity-50 text-xs gap-1 items-center">
				{getMessageTime(message.createdAt)}
			</div>
		</div>
	);
};

export default Message;
