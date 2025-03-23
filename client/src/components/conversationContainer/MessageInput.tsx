import { Pyramid } from "lucide-react";
import { useState } from "react";
import useSendMessage from "../../hooks/useSendMessage";

const MessageInput = () => {
	const [message, setMessage] = useState("");
	const { loading, sendMessage } = useSendMessage();
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!message.trim()) return;
		await sendMessage(message);
		setMessage("");
	};

	return (
		<form
			className="flex justify-between border-2 border-[--accent-a] min-h-12 m-4 rounded-lg"
			onSubmit={handleSubmit}
		>
			<input
				type="text"
				placeholder="Start typing your message..."
				className="flex-1"
				value={message}
				onChange={(e) => setMessage(e.target.value)}
			/>
			<button className="btn btn-outline scale-75  bg-[--primary] border-[--accent-b] text-[--accent-b] aspect-square p-0">
				{loading ? (
					<span className="loading loading-spinner" />
				) : (
					<Pyramid />
				)}
			</button>
		</form>
	);
};

export default MessageInput;
