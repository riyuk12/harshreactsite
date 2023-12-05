import React, { useState } from "react";
import axios from "axios";
import { GoMention } from "react-icons/go";
import { ImKey } from "react-icons/im";
import Swal from "sweetalert2";
import OtpInput from "react-otp-input";
import OTP from "../../OTP";
import validation from "../../../validation";
import baseUrl from "../../../Components/baseUrl";

import { EncryptText } from "../../Encrypt/CryptoEncryption";
import PasswordPolicy from "../PasswordPolicy";
import { utilitySliceActions } from "../../../Redux/Slice/UtilitySlice";
import { useDispatch, useSelector } from "react-redux";
import PasswordVisibility from "../PasswordVisibility";
import { forgotPassword } from "./AuthComponent";

const errorMessageStyle = {
	color: "red",
	fontSize: "11px",
	position: "relative",
	left: "50px",
};
const errorInputfieldStyle = { border: "1px solid red" };

const ForgotPassword = ({
	clearLogin,
	userDetails,
	setUserDetails,
	otpType,
	setOtpType,
}) => {
	const dispatch = useDispatch();
	const { isOtpSent } = useSelector((state) => state.utils);

	const [error, setError] = useState({});
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const [isOtpVerified, setIsOtpVerified] = useState(false);
	const [otp, setOtp] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	//handles closing of modal
	const handleClose = () => {
		dispatch(utilitySliceActions.optIsNotSent());
		setUserDetails({
			email: "",
			password: "",
			confirmPassword: "",
		});
		clearLogin();
		setIsLoading(false);
		setIsOtpVerified(false);
		setIsPasswordVisible(false);
		setOtp("");
		setError({});
	};

	//to handle changes in input field
	const handleChange = (e) => {
		const { name, value } = e.target;
		setUserDetails({ ...userDetails, [name]: value });
	};

	const handleSendOtp = (e) => {
		e.preventDefault();
		setOtpType(forgotPassword);
		let validationCheck = validation(userDetails, "FORGOT_PASSWORD", null);
		setError(validationCheck.error);
		if (validationCheck.errorCheckPass) {
			dispatch(utilitySliceActions.optIsSent());
		}
	};

	// to handle update password
	const handlePasswordChange = (e) => {
		e.preventDefault();
		let validationCheck = validation(
			userDetails,
			"FORGOT_PASSWORD",
			isOtpVerified
		);
		setError(validationCheck.error);
		if (validationCheck.errorCheckPass) {
			axios
				.post(`${baseUrl()}/wl/forgetPassword`, {
					EmailId: EncryptText(userDetails.email),
					Password: EncryptText(userDetails.password),
				})
				.then((response) => {
					if (response.data.ResultCode === "200") {
						setIsOtpVerified(false);
						dispatch(utilitySliceActions.optIsNotSent());
						dispatch(
							utilitySliceActions.setMessage(
								"Your Password has changed SuccessFully!!"
							)
						);
						dispatch(utilitySliceActions.passwordIsChanged());
						document.querySelector("#particular-login").click();
						setTimeout(() => {
							dispatch(utilitySliceActions.setMessage(""));
						}, 25000);
						handleClose();
					} else {
						//inline toast message
						Swal.fire({
							icon: "error",
							title: response.data.ResultMessage,
							toast: true,
							position: "bottom-right",
							customClass: {
								popup: "colored-toast",
							},
							showConfirmButton: false,
							timer: 3000,
							timerProgressBar: true,
						});
					}
				});
		}
	};

	return (
		<article
			className='modal fade'
			id='forgotpassword'
			tabIndex='-1'
			aria-labelledby='forgotpasswordLabel'
			aria-hidden='true'
			data-bs-backdrop='static'
			data-bs-keyboard='false'
		>
			<section className='modal-dialog'>
				<section className='modal-content'>
					<header className='modal-header modal-header-container'>
						<h5 className='modal-title'>Reset your password</h5>
						<button
							type='button'
							className='btn-close'
							data-bs-dismiss='modal'
							aria-label='Close'
							onClick={handleClose}
						></button>
					</header>
					<main className='modal-body px-5'>
						<form className='auth-form'>
							{isOtpVerified ? (
								<>
									<section className='d-flex flex-column gap-2'>
										<section className='form-section'>
											<div className='input-group input-wrapper'>
												<span
													className='input-group-text main-color'
													id='basic-addon1'
												>
													<ImKey />
												</span>
												<input
													id='Password'
													type={
														isPasswordVisible
															? "text"
															: "password"
													}
													name='password'
													className='form-control rounded-end'
													placeholder='Password'
													style={
														error.password &&
														errorInputfieldStyle
													}
													onChange={(e) =>
														handleChange(e)
													}
													onPaste={(e) =>
														e.preventDefault()
													}
													value={userDetails.password}
												/>
												<PasswordVisibility
													setIsPasswordVisible={
														setIsPasswordVisible
													}
													isPasswordVisible={
														isPasswordVisible
													}
												/>
												<span className='password-policy-wrapper'>
													<PasswordPolicy />
												</span>
											</div>
											{error.password && (
												<span style={errorMessageStyle}>
													{error.password}
												</span>
											)}
										</section>

										<section className='form-section'>
											<div className='input-group input-wrapper'>
												<span
													className='input-group-text main-color'
													id='basic-addon1'
												>
													<ImKey />
												</span>
												<input
													id='confirmPassword'
													type={
														isPasswordVisible
															? "text"
															: "password"
													}
													name='confirmPassword'
													className='form-control'
													placeholder='Confirm Password*'
													style={
														error.confirmPassword &&
														errorInputfieldStyle
													}
													onChange={(e) =>
														handleChange(e)
													}
													onPaste={(e) =>
														e.preventDefault()
													}
													value={
														userDetails.confirmPassword
													}
												/>
											</div>
											{error.confirmPassword && (
												<span style={errorMessageStyle}>
													{error.confirmPassword}
												</span>
											)}
										</section>
									</section>
									<button
										type='submit'
										className='btn main-btn'
										onClick={(e) => handlePasswordChange(e)}
									>
										{isLoading
											? "Please Wait.."
											: "Change Password"}
									</button>
								</>
							) : (
								<>
									<section className='form-section'></section>
									{isOtpSent ? (
										<>
											{otpType === forgotPassword && (
												<OTP
													userDetails={userDetails}
													setUserDetails={
														setUserDetails
													}
													otpType={forgotPassword}
													setIsOtpVerified={
														setIsOtpVerified
													}
												/>
											)}
										</>
									) : (
										<>
											<div className='input-group input-wrapper'>
												<span
													className='input-group-text main-color'
													id='basic-addon1'
												>
													<GoMention />
												</span>
												<input
													id='email'
													type='email'
													name='email'
													value={userDetails.email}
													style={
														error.email &&
														errorInputfieldStyle
													}
													className='form-control'
													placeholder='Email'
													onChange={(e) =>
														handleChange(e)
													}
												/>
											</div>
											{error.email && (
												<span style={errorMessageStyle}>
													{error.email}
												</span>
											)}
											<button
												type='submit'
												className='btn main-btn '
												onClick={(e) =>
													handleSendOtp(e)
												}
												disabled={
													userDetails.email.length ===
													0
												}
											>
												{isLoading
													? "Please Wait.."
													: "Get OTP"}
											</button>
										</>
									)}
								</>
							)}
						</form>
					</main>
				</section>
			</section>
		</article>
	);
};

export default ForgotPassword;
