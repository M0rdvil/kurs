import { Link, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import { House, LogIn, LogOut, Mail, Sun, User } from "lucide-react";
import { useAuthContext } from "./context/authContext";
import Messages from "./pages/Messages";
import useLogout from "./hooks/useLogout";
import { Toaster } from "react-hot-toast";
import MyProfile from "./pages/MyProfile";

function setTheme(theme: string) {
	localStorage.setItem("theme", theme);
	document.documentElement.className = theme;
}

function toggleTheme() {
	if (localStorage.getItem("theme") === "theme-light") {
		setTheme("theme-dark");
	} else {
		setTheme("theme-light");
	}
}

function App() {
	const { authUser, isLoading } = useAuthContext();
	const { logout } = useLogout();

	if (isLoading) {
		// Construct and paste loading skeleton here
		return null;
	}

	(function () {
		if (localStorage.getItem("theme") === "theme-light") {
			setTheme("theme-light");
		} else {
			setTheme("theme-dark");
		}
	})();

	return (
		<div className="px-8 h-screen flex flex-col items-center justify-center bg-[--primary] text-[--secondary]">
			<header className="navbar relative bg-[--accent-a] rounded-b-xl h-4 shadow-lg justify-between bg-opacity-25 backdrop-blur">
				<div>
					<Link to="/">
						<button className="btn btn-outline bg-[--primary] border-[--accent-b] aspect-square p-0 md:aspect-auto md:px-4 mr-1">
							<House className="stroke-[--accent-b]"></House>
							<span className="hidden md:block text-[--accent-b]">
								ChatApp
							</span>
						</button>
					</Link>
					<button
						className="btn btn-outline bg-[--primary] border-[--accent-b] aspect-square p-0"
						onClick={() => {
							toggleTheme();
						}}
					>
						<Sun className="stroke-[--accent-b]"></Sun>
					</button>
				</div>
				<div>
					{!authUser ? (
						<Link to={"/login"}>
							<button className="btn btn-outline bg-[--primary] border-[--accent-b] text-[--accent-b] aspect-square p-0">
								<LogIn className="stroke-[--accent-b]"></LogIn>
							</button>
						</Link>
					) : (
						<div className="flex gap-3 items-center">
							<div className="flex gap-1 items-center">
								<label className="text-base opacity-50 px-2 invisible md:visible">
									{authUser.username}
								</label>
								<Link to="/my-profile">
									<button className="btn btn-outline bg-[--primary] border-[--accent-b] text-[--accent-b] aspect-square p-0">
										<User />
									</button>
								</Link>
								<Link to="/messages">
									<button className="btn btn-outline bg-[--primary] border-[--accent-b] text-[--accent-b] aspect-square p-0">
										<Mail />
									</button>
								</Link>
							</div>

							<button
								className="btn btn-outline bg-[--primary] border-[--accent-b] text-[--accent-b] aspect-square p-0"
								onClick={logout}
							>
								<LogOut className="stroke-[--accent-b]"></LogOut>
							</button>
						</div>
					)}
				</div>
			</header>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route
					path="/messages"
					element={
						authUser ? <Messages /> : <Navigate to={"/login"} />
					}
				/>
				<Route
					path="/my-profile"
					element={
						authUser ? <MyProfile /> : <Navigate to={"/login"} />
					}
				/>
				<Route
					path="/signup"
					element={
						!authUser ? <Signup /> : <Navigate to={"/messages"} />
					}
				/>
				<Route
					path="/login"
					element={
						!authUser ? <Login /> : <Navigate to={"/messages"} />
					}
				/>

				<Route path="/*" element={<PageNotFound />} />
			</Routes>
			<Toaster />
		</div>
	);
}

export default App;

