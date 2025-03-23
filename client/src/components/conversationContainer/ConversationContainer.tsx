import Convo from "./Convo";
import { useAuthContext } from "../../context/authContext";
import useConversation from "../../zustand/useConversation";
import MessageInput from "./MessageInput";

const NoChatSelected = () => {
	const { authUser } = useAuthContext();

	return (
		<div className="flex flex-1 flex-col items-center justify-center">
			<div className="text-lg font-semibold">
				Welcome, {authUser?.fullName}!
			</div>
			<div>Select a chat to start messaging</div>
		</div>
	);
};

const ConversationContainer = () => {
	const { selectedConversation } = useConversation();

	return (
		<>
			{!selectedConversation ? (
				<NoChatSelected />
			) : (
				<div className="flex flex-1 flex-col border-[1px] border-[--accent-a] rounded">
					{/* Chat Header */}
					<div className="flex bg-[--accent-a] p-4">
						<span className="text-[--accent-b]">
							Message to:&nbsp;
						</span>{" "}
						<span className="text-[--secondary] font-semibold">
							{selectedConversation.fullName}
						</span>
					</div>
					{/*  */}

					<Convo />
					<MessageInput />
				</div>
			)}
		</>
	);
};

export default ConversationContainer;
