import { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../hooks/useLogin";

function Login() {
	const [inputs, setInputs] = useState({
		username: "",
		password: "",
	});

	const { loading, login } = useLogin();

	const handleSubmitForm = (e: React.FormEvent) => {
		e.preventDefault();
		login(inputs);
	};

	return (
		<main className="flex flex-1 size-full items-center justify-center">
			<div className="h-fit p-4 bg-[--accent-a] rounded-lg bg-opacity-25 backdrop-blur shadow-lg xl:scale-125">
				<form onSubmit={handleSubmitForm}>
					<div className="flex flex-col text-sm">
						<label>Username</label>
						<input
							type="text"
							placeholder="johndoe"
							required
							value={inputs.username}
							onChange={(e) =>
								setInputs({
									...inputs,
									username: e.target.value,
								})
							}
						></input>

						<label>Password</label>
						<input
							type="password"
							placeholder="Your password"
							required
							value={inputs.password}
							onChange={(e) =>
								setInputs({
									...inputs,
									password: e.target.value,
								})
							}
						></input>

						<div className="flex flex-col mt-4">
							<span>error will be here</span>
							<button
								className="p-2 text-base rounded"
								disabled={loading}
							>
								{loading ? "Loading..." : "Log In"}
							</button>
						</div>

						<div className="pt-4">
							You're new here?
							<Link to="/signup" className="pl-4">
								<span className="p-1">Sign Up</span>
							</Link>
						</div>
					</div>
				</form>
			</div>
		</main>
	);
}

export default Login;
