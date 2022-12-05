import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
const AuthNotAllowed = () => {
	const location = useLocation();
	console.log("🚀 ~ file: AuthNotAllowed.tsx:5 ~ AuthNotAllowed ~ location", location);
	const { id } = useAuth();

	if (id) {
		// if id is null, then the user is not logged in
		// nabigate back to previous page
		return <Navigate to={location.state?.from || "/dash/transactions"} replace />;
	} else {
		return <Outlet />;
	}
};
export default AuthNotAllowed;
