import { Link } from "react-router-dom";

function PageNotFound() {
	return (
		<>
			<main className="flex flex-col size-full items-center justify-center">
				<div className="text-5xl">[404] Page not found</div>
				<div className="text-xl">But here are some useful links:</div>
				<div className="flex flex-row m-4">
					<Link
						to="/"
						className="btn btn-outline bg-[--primary] border-[--accent-b]"
					>
						Home
					</Link>
					<Link
						to="/login"
						className="btn btn-outline bg-[--primary] border-[--accent-b] mx-2"
					>
						Login
					</Link>
					<Link
						to="/signup"
						className="btn btn-outline bg-[--primary] border-[--accent-b]"
					>
						Signup
					</Link>
				</div>
			</main>
		</>
	);
}

export default PageNotFound;
