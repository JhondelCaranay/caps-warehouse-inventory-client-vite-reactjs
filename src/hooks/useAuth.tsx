import { useSelector } from "react-redux";
import { selectAccessToken } from "../app/features/auth/authSlice";
import jwtDecode from "jwt-decode";

import Cookie from "js-cookie";

export type UserAuth = {
	sub: string;
	email: string;
	role: string;
	iat: number;
	exp: number;
};

const useAuth = () => {
	const access_token = Cookie.get("access_token");

	if (access_token) {
		const decoded = jwtDecode<UserAuth>(access_token);

		return {
			id: decoded.sub,
			email: decoded.email,
			role: decoded.role,
			iat: decoded.iat,
			exp: decoded.exp,
		};
	}

	return {
		id: "",
		email: "",
		role: "",
		iat: 0,
		exp: 0,
	};
};
export default useAuth;
