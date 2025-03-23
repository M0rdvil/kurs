import { Search } from "lucide-react";
import { useState } from "react";
import useConversation from "../../zustand/useConversation";
import useGetConversations from "../../hooks/useGetConversations";
import toast from "react-hot-toast";

const ConversationSearch = () => {
	const [search, setSearch] = useState("");
	const { setSelectedConversation } = useConversation();
	const { conversations } = useGetConversations();

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!search) return;
		if (search.length < 3) {
			return toast.error(
				"Search term must be at least 3 characters long"
			);
		}

		const conversation = conversations.find((c: ConversationType) =>
			c.fullName.toLowerCase().includes(search.toLowerCase())
		);

		if (conversation) {
			setSelectedConversation(conversation);
			setSearch("");
		} else {
			toast.error("User you're searching for does not exist");
		}
	};

	return (
		<form className="flex items-center gap-1" onSubmit={handleSubmit}>
			<input
				type="text"
				placeholder="Search..."
				className="border-[1px] border-[--accent-a] w-full h-12"
				value={search}
				onChange={(e) => setSearch(e.target.value)}
			/>
			<button
				type="submit"
				className="btn btn-xs btn-outline aspect-square w-12 h-12 rounded border-[--accent-a]"
			>
				<Search size="20px" className="stroke-[--accent-b]" />
			</button>
		</form>
	);
};

export default ConversationSearch;
