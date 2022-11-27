import { Link } from "react-router-dom";
import useTitle from "../../../hooks/useTitle";
import "./register.scss";

const Register = () => {
	useTitle("Register");

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log("submitted");
	};

	return (
		<div className="Register">
			<div className="wrapper">
				<form onSubmit={handleSubmit}>
					<h1 className="title">Register</h1>
					<input type="text" placeholder="First Name" className="input" />
					<input type="text" placeholder="Last Name" className="input" />
					<input type="text" placeholder="Email" className="input" />
					<input type="password" placeholder="Password" className="input" />
					<button type="submit" className="submit-btn">
						Register
					</button>
					<p className="register">
						Have an account? <Link to="/login">Login</Link>
					</p>
				</form>
			</div>
		</div>
	);
};
export default Register;
