import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/authContext";

function MyProfile() {
	const { authUser } = useAuthContext();

	return (
		<main className="flex-1 size-full text-center content-center">
			{!authUser ? (
				<Navigate to="/" />
			) : (
				<div>
					<h1 className="text-3xl p-4">Profile</h1>
					<h1 className="text-sm pb-1">
						Welcome, {authUser.fullName}!
					</h1>
				</div>
			)}
		</main>
	);
}

export default MyProfile;
