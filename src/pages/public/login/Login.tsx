import { Link } from "react-router-dom";
import "./login.scss";

const Login = () => {
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log("submitted");
	};

	return (
		<div className="login">
			<div className="loginBox">
				<form onSubmit={handleSubmit}>
					<h1 className="title">Login</h1>
					<input type="text" placeholder="Email" className="loginInput" />
					<input type="password" placeholder="Password" className="loginInput" />
					<button type="submit" className="loginButton">
						Log In
					</button>
					<p
						className="loginForgot"
						onClick={() => {
							alert("This feature is not yet implemented.");
						}}
					>
						Forgot Password?
					</p>
					<p className="loginRegister">
						Don't have an account? <Link to="/register">Register</Link>
					</p>
				</form>
			</div>
		</div>
	);
};
export default Login;
