import useGetMessages from "../../hooks/useGetMessages";
import useListenMessages from "../../hooks/useListenMessages";
import useScrollDown from "../../hooks/useScrollDown";
import Message from "./Message";

const Convo = () => {
	const { loading, messages } = useGetMessages();
	useListenMessages();

	const ref = useScrollDown(
		messages
	) as React.MutableRefObject<HTMLDivElement>;
	return (
		<div className="p-4 flex-1 overflow-auto" ref={ref}>
			{!loading &&
				messages.map((message) => (
					<Message key={message.id} message={message} />
				))}

			{!loading && messages.length === 0 && (
				<p className="w-full text-center text-[--accent-b]">
					===&nbsp;Send a message to start the conversation&nbsp;===
				</p>
			)}
		</div>
	);
};

export default Convo;
