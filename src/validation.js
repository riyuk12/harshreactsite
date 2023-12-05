//handles validation of form before posting the data
const validation = (userCredentials, otpType, isOtpVerified) => {
	let tempError = {};
	const isEmailVaild = userCredentials.email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/) || userCredentials.email.match(/^\d{10}$/);

	if (!isEmailVaild) {
		tempError.email = "please enter a valid email";
	}

	// for login with OTP
	if (otpType === "LOGIN") {
		if (!userCredentials.password) {
			tempError.password = "password is required";
		}
	}

	if (otpType === "FORGOT_PASSWORD" && isOtpVerified) {
		if (!userCredentials.password) {
			tempError.password = "password is required";
		}

		if (!userCredentials.confirmPassword) {
			tempError.confirmPassword = "confirm password is required";
		} else if (
			userCredentials.password !== userCredentials.confirmPassword
		) {
			tempError.confirmPassword = "passwords doesn't match";
		}
	}

	return {
		errorCheckPass: Object.keys(tempError).length <= 0,
		error: tempError,
	};
};

export default validation;
