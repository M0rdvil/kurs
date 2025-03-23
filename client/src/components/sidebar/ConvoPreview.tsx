import { useSocketContext } from "../../context/socketContext";
import useConversation from "../../zustand/useConversation";

const ConvoPreview = ({ conversation }: { conversation: ConversationType }) => {
	const { setSelectedConversation, selectedConversation } = useConversation();
	const isSelected = selectedConversation?.id === conversation.id;

	const { onlineUsers } = useSocketContext();
	const isOnline = onlineUsers.includes(conversation.id);

	return (
		<div
			className={`flex flex-row p-2 border-[1px] border-[--accent-a] rounded gap-2 hover:bg-[--accent-a] ${
				isSelected ? "border-[--accent-b] border-[2px]" : ""
			}`}
			onClick={() => setSelectedConversation(conversation)}
		>
			<div className="flex rounded-full border-[1px] border-[--accent-b] bg-[--accent-a] size-12 items-center justify-center">
				<span>F</span>
			</div>

			<div className="flex flex-1 justify-between items-center">
				<div className="">
					<div className="text-[--secondary] font-semibold">
						{conversation.fullName}
					</div>
					{/* <div className="text-[--secondary] font-normal">message</div> */}
				</div>
				<div
					className={`font-light ${
						isOnline ? "text-green-500" : "text-[--secondary]"
					}`}
				>
					{isOnline ? <span>online</span> : <span>offline</span>}
				</div>
			</div>
		</div>
	);
};

export default ConvoPreview;
