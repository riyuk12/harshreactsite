import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

// isAuthenticated is a boolean variable indicating whether the user is authenticated
const PrivateRouter = ({ Component }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(
		Cookies.get("token") ? true : false
	);

	useEffect(() => {
		setIsAuthenticated(Cookies.get("token") ? true : false);
	});

	return isAuthenticated ? <Component /> : <Navigate replace to={"/"} />;
};

export default PrivateRouter;
