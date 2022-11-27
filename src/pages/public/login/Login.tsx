import { Link } from "react-router-dom";
import useTitle from "../../../hooks/useTitle";
import "./login.scss";

const Login = () => {
	useTitle("Login");
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log("submitted");
	};

	return (
		<div className="Login">
			<div className="wrapper">
				<form onSubmit={handleSubmit}>
					<h1 className="title">Login</h1>
					<input type="text" placeholder="Email" className="input" />
					<input type="password" placeholder="Password" className="input" />
					<button type="submit" className="submit-btn">
						Log In
					</button>
					<p
						className="forgot"
						onClick={() => {
							alert("This feature is not yet implemented.");
						}}
					>
						Forgot Password?
					</p>
					<p className="register">
						Don't have an account? <Link to="/register">Register</Link>
					</p>
				</form>
			</div>
		</div>
	);
};
export default Login;
