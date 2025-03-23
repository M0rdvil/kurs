import { Link } from "react-router-dom";
import { useAuthContext } from "../context/authContext";
import { Mail } from "lucide-react";

function Home() {
	const { authUser } = useAuthContext();

	return (
		<main className="flex-1 size-full text-center content-center">
			{authUser ? (
				<div>
					<h1 className="text-3xl p-4">Home page</h1>
					<h1 className="text-sm pb-1">
						Welcome, {authUser.username}!
					</h1>
					<Link to="/messages">
						<button className="btn btn-outline bg-[--primary] border-[--accent-b] text-[--accent-b]">
							<Mail size={20} />
							<span>Messages</span>
						</button>
					</Link>
				</div>
			) : (
				<div>
					<h1 className="text-3xl">ChatApp</h1>
					<h1 className="text-sm">
						IT infrastructure built for professinals
					</h1>
				</div>
			)}
		</main>
	);
}

export default Home;
