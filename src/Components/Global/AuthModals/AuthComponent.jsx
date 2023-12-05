import { useState } from "react";
import ForgotPassword from "./ForgotPassword";
import Registration from "./Registration";
import Login from "./Login";
import SuccessfulRegistration from "./Regsitration/SuccessfulRegistration";
import AlreadyRegistered from "./Regsitration/AlreadyRegistered";
import UnregisteredEmail from "./Regsitration/UnregisteredEmail";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import baseUrl from "../../../Components/baseUrl";

export const login = "LOGIN";
export const registration = "REGISTRATION";
export const forgotPassword = "FORGOT_PASSWORD";

const AuthComponent = () => {
	const { courseSelectedFromModal } = useSelector((state) => state.utils);

	const [otpType, setOtpType] = useState(login);
	const [userSignupDetails, setUserSignupDetails] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		confirmPassword: "",
		mobileNumber: "",
		isNumberWhatsapp: false,
		whatsappNumber: "",
		selectedCourse: "",
		agreedToTerms: false,
	});

	useEffect(() => {
		if (courseSelectedFromModal) {
			//for online classes
			// 9 is for UET PG
			// setUserSignupDetails({ ...userSignupDetails, selectedCourse: 8 });
			setUserSignupDetails({ ...userSignupDetails, selectedCourse: 9 });
		}
	}, [courseSelectedFromModal]);

	const [userLoginCredentials, setUserLoginCredentials] = useState({
		email: "",
		password: "",
	});

	const [userDetailsForForgotPassword, setUserDetailsForForgotPassword] =
		useState({
			email: "",
			password: "",
			confirmPassword: "",
		});

	const clearLogin = () => {
		setUserLoginCredentials({ email: "", password: "" });
	};

	const clearForgotPassword = () => {
		setUserDetailsForForgotPassword({
			email: "",
			password: "",
			confirmPassword: "",
		});
	};

	const clearSignup = () => {
		setUserSignupDetails({
			firstName: "",
			lastName: "",
			email: "",
			password: "",
			confirmPassword: "",
			mobileNumber: "",
			isNumberWhatsapp: false,
			whatsappNumber: "",
			selectedCourse: "",
			agreedToTerms: false,
		});
	};

	return (
		<>
			<Registration
				userSignupDetails={userSignupDetails}
				setUserSignupDetails={setUserSignupDetails}
				otpType={otpType}
				setOtpType={setOtpType}
			/>
			<Login
				userLoginCredentials={userLoginCredentials}
				setUserLoginCredentials={setUserLoginCredentials}
				otpType={otpType}
				setOtpType={setOtpType}
			/>
			<AlreadyRegistered
				clearSignup={clearSignup}
				clearLogin={clearLogin}
			/>
			<UnregisteredEmail
				clearForgotPassword={clearForgotPassword}
				clearLogin={clearLogin}
				setUserDetailsForForgotPassword={
					setUserDetailsForForgotPassword
				}
			/>
			<SuccessfulRegistration />
			<ForgotPassword
				userDetails={userDetailsForForgotPassword}
				setUserDetails={setUserDetailsForForgotPassword}
				clearLogin={clearLogin}
				otpType={otpType}
				setOtpType={setOtpType}
			/>
		</>
	);
};

export default AuthComponent;
