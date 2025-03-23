import Conversations from "./Conversations";
import ConversationSearch from "./ConversationSearch";
import ConversationSettings from "./ConversationSettings";

function Sidebar() {
	return (
		<div className="flex flex-col w-full md:w-[30%]">
			<ConversationSearch />

			<div className="divider my-1 px-2"></div>

			<Conversations />

			<div className="mt-auto">
				<div className="divider my-1 px-2"></div>

				<ConversationSettings />
			</div>
		</div>
	);
}

export default Sidebar;
