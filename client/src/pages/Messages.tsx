import { useEffect, useState } from "react";
import ConversationContainer from "../components/conversationContainer/ConversationContainer";
import Sidebar from "../components/sidebar/Sidebar";

function Messages() {
	const [showCC, setShowCC] = useState(false);

	useEffect(() => {
		const handleResize = () => {
			const isCompatibleScreen = window.innerWidth >= 768;
			setShowCC(isCompatibleScreen);
		};

		window.addEventListener("resize", handleResize);

		handleResize();

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return (
		<main className="flex flex-1 relative w-full h-1 items-center justify-center px-8">
			<div className="flex flex-1 flex-row border-[--accent-a] border-[1px] min-w-[240px] h-5/6 max-w-7xl rounded-lg bg-opacity-25 backdrop-blur shadow-lg my-4 p-4 gap-4">
				<Sidebar />

				{showCC ? <ConversationContainer /> : null}
			</div>
		</main>
	);
}

export default Messages;
