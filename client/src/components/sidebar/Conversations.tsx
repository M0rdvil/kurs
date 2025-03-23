import useGetConversations from "../../hooks/useGetConversations";
import ConvoPreview from "./ConvoPreview";

const Conversations = () => {
	const { conversations, loading } = useGetConversations();

	return (
		<div className="flex flex-col gap-1 overflow-auto">
			{Array.isArray(conversations)
				? conversations.map((conversation) => (
						<ConvoPreview
							key={conversation.id}
							conversation={conversation}
						/>
				  ))
				: null}
			{loading ? (
				<span className="lodaing loading-spinner mx-auto" />
			) : null}
		</div>
	);
};

export default Conversations;
