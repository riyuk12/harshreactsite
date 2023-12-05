import { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import axios from "axios";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { utilitySliceActions } from "../Redux/Slice/UtilitySlice";
import CountdownApp from "./CountdownApp";
import { EncryptText } from "./Encrypt/CryptoEncryption";
import baseUrl from "../Components/baseUrl";

import "./otp.css";
import {
	forgotPassword,
	login,
	registration,
} from "./Global/AuthModals/AuthComponent";
import Cookies from "js-cookie";
import { studDashboard } from "../RouteConstants";
import { useNavigate } from "react-router";

const OTP = ({
	userDetails,
	setUserDetails,
	otpType,
	loginWithOTP,
	setIsOtpVerified,
	inputType,
	setOtpVisibility,
}) => {
	const [otp, setOtp] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [isOtpInputVisible, setIsOtpInputVisible] = useState(true);
	const [isResendAvailable, setIsResendAvailable] = useState(false);
	const [timer, setTimer] = useState(true);
	const [isRegistrationSuccessful, setIsRegistrationSuccessful] =
		useState(true);
	const [editable, setEditable] = useState(false);
	const [isEmailVerified, setIsEmailVerified] = useState(false);
	const { isOtpSent } = useSelector((state) => state.utils);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (timer) {
			setTimeout(() => {
				setTimer(false);
				setIsResendAvailable(true);
			}, 60000);
		}
	}, [timer]);

	useEffect(() => {
		// if (otpType === registration) {
		// 	onSendOtp("1", userDetails.email);
		// } else
		if (otpType === login) {
			onSendOtp(4, userDetails.email);
		} else if (otpType === forgotPassword) {
			onSendOtp("2", userDetails.email);
		}
	}, []);

	//handles otp sending
	const onSendOtp = (id, email) => {
		const data = {};
		setTimer(false);
		if (otpType === "REGISTERATION") {
			data.EmailId = EncryptText(email);
			data.Mobile = EncryptText(userDetails.mobileNumber);
			data.WhatsappNo = EncryptText(userDetails.whatsappNumber);
			data.OtpType = id;
		}
		if (otpType === "FORGOT_PASSWORD") {
			data.EmailId = EncryptText(userDetails.email);
			data.OtpType = id;
		}
		if (otpType === "LOGIN") {
			if (inputType === "mobile") {
				data.Mobile = EncryptText(userDetails.mobile);
				data.OtpType = id;
			} else {
				data.EmailId = EncryptText(userDetails.email);
				data.OtpType = id;
			}
		}
		axios
			.post(`${baseUrl()}/wl/sendOTP`, data)
			.then((response) => {
				if (response.data.ResultCode == 200) {
					setTimer(true);
					dispatch(utilitySliceActions.optIsSent());
				}
				if (response.data.ResultCode === "403") {
					dispatch(utilitySliceActions.optIsNotSent());
					//inline toast message
					Swal.fire({
						icon: "info",
						toast: true,
						title: response.data.ResultMessage,
						position: "bottom-right",
						showConfirmButton: false,
						timer: 5000,
						timerProgressBar: true,
					});
				}
			})
			.catch((e) => console.log(e, "error in OTP sendOtp"));
	};

	// handles resend otp
	const handleResendOtp = (e) => {
		e.preventDefault();
		if (!timer) {
			if (otpType === registration) {
				onSendOtp(1, userDetails.email);
			} else if (otpType === login) {
				if (inputType === "mobile") {
					onSendOtp(4, userDetails.mobile);
				} else {
					onSendOtp(4, userDetails.email);
				}
			} else if (otpType === forgotPassword) {
				onSendOtp(2, userDetails.email);
			}
			setEditable(false);
			setTimer(true);
			setIsResendAvailable(false);
		}
	};

	//if otp is verified successfully then this function is called
	const onRegister = () => {
		setIsLoading(true);
		console.log("in onRegister");
		let data;
		if (userDetails.isNumberWhatsapp) {
			data = {
				title: "Registration",
				firstName: userDetails.firstName,
				lastName: userDetails.lastName,
				email: EncryptText(userDetails.email),
				password: EncryptText(userDetails.password),
				number: EncryptText(userDetails.mobileNumber),
				whatsappNumber: EncryptText(userDetails.mobileNumber),
				course: JSON.parse(userDetails.selectedCourse),
			};
		} else {
			data = {
				title: "Registration",
				firstName: userDetails.firstName,
				lastName: userDetails.lastName,
				email: EncryptText(userDetails.email),
				password: EncryptText(userDetails.password),
				number: EncryptText(userDetails.mobileNumber),
				whatsappNumber: EncryptText(userDetails.whatsappNumber),
				course: JSON.parse(userDetails.selectedCourse),
			};
		}
		axios
			.post(
				`${baseUrl()}/df/userRegDetails/`,
				data,
				{
					headers: {
						"Access-Control-Allow-Origin": "*",
						Client_ID: "MVOZ7rblFHsvdzk25vsQpQ==",
					},
				}
			)
			.then((response) => {
				setUserDetails({
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
				setIsLoading(false);
				if (response.data.ResultCode === "200") {
					document.querySelector("#openSuccessRegister").click();
					document
						.getElementById("registerationModal")
						.classList.remove("show");
					setIsEmailVerified(false);
					setIsOtpInputVisible(true);
					setIsRegistrationSuccessful(true);
				} else {
					alert(response.data.ResultMessage);
				}
			})
			.catch((e) => {
				setIsLoading(false);
				setIsRegistrationSuccessful(false);
				console.log(e, "user registration");
			});
	};

	//to verify the otp
	const verifyOTP = () => {
		setIsLoading(true);
		let data = {};
		if (userDetails.email) {
			data.EmailId = EncryptText(userDetails.email);
		}
		if (userDetails.mobile) {
			data.Mobile = EncryptText(userDetails.mobile);
		}
		data.Otp = EncryptText(otp);
		axios
			.post(`${baseUrl()}/wl/verifyOTP`, data)
			.then((response) => {
				if (response.data.ResultCode === "200") {
					setOtp("");
					setIsLoading(false);
					setIsEmailVerified(true);
					setIsOtpInputVisible(false);

					// call to register a new user
					if (otpType === registration) {
						onRegister();
					}
					if (otpType === forgotPassword) {
						setIsOtpVerified(true);
					}
				} else if (response.status === 200) {
					console.log("hmmmmmm", response);
					setIsLoading(false);
					Cookies.set(
						"token",
						`Bearer ${response.data.result.token}`
					);
					Cookies.set(
						"email",
						response.data.result.userLoginResBean.email
					);
					Cookies.set(
						"userId",
						response.data.result.userLoginResBean.userId
					);
					setIsLoading({ ...isLoading, password: false });
					dispatch(utilitySliceActions.setIsAuthenticated(true));
					navigate(studDashboard);
				} else {
					setIsLoading(false);
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
			})
			.catch((e) => {
				setIsLoading(false);
				console.log(e, "issue in verify otp OTP");
			});
	};

	//to auto verify the otp when its entered
	useEffect(() => {
		if (otp.length === 4) {
			verifyOTP();
		}
	}, [otp]);

	const handleEdit = (e) => {
		e.preventDefault();
		if (otpType === login) {
			setOtpVisibility(false);
		}
		if (otpType === forgotPassword) {
			dispatch(utilitySliceActions.optIsNotSent());
		}
		if (otpType === registration) {
			document.querySelector("#backToRegistration").click();
			dispatch(utilitySliceActions.optIsNotSent());
			console.log(document.querySelector("#backToRegistration"));
		}
	};

	return (
		<section>
			{isOtpInputVisible && !isEmailVerified && (
				<section className='p-3 d-flex flex-column align-items-center gap-3'>
					<div className='input-group'>
						<input
							disabled={!editable}
							style={{
								color: "black",
								fontSize: "13px",
								fontWeight: "400",
								border: " 1px soild #E1E1E1",
								padding: "15px 15px 15px 15px",
							}}
							id='email'
							required
							type='text'
							value={
								inputType === "mobile"
									? userDetails.mobile
									: userDetails.email
							}
							className='form-control'
							placeholder={
								inputType === "mobile" ? "Mobile*" : "Email*"
							}
							onChange={(e) => {
								setUserDetails({
									...userDetails,
									email: e.target.value,
								});
							}}
							aria-label="Recipient's email id"
							aria-describedby='basic-addon2'
						/>
						{editable ? (
							<button
								className={`bg-white px-4 py-3`}
								style={{
									border: "1px solid #E1E1E1",
									color: "purple",
								}}
								id='basic-addon2'
								onClick={(e) => handleResendOtp(e)}
							>
								Get OTP
							</button>
						) : (
							<button
								className={`bg-white px-4 py-3 edit-btn`}
								style={{
									border: "1px solid #E1E1E1",
									color: "purple",
								}}
								id='basic-addon2'
								type='button'
								onClick={(e) => handleEdit(e)}
							>
								Edit
							</button>
						)}
					</div>
					{isOtpSent && (
						<>
							<p className='text-center m-0'>
								Enter the verification code sent to your email
								ID / Mobile Number
							</p>
							<OtpInput
								className='otp-input'
								value={otp}
								onChange={(otp) => setOtp(otp)}
								numInputs={4}
								separator={<span>&nbsp;&nbsp;</span>}
							/>
							{timer && (
								<p className='d-flex align-items-center m-0'>
									Resend OTP in
									<CountdownApp />
								</p>
							)}
							<div className='d-flex gap-2'>
								<p className='m-0'>Didn't receive OTP yet?</p>
								<p
									className='m-0'
									onClick={handleResendOtp}
									style={
										isResendAvailable
											? {
													color: "#7B1FA2",
													fontWeight: "600",
													cursor: "pointer",
											  }
											: { color: "#c2c2c2" }
									}
								>
									Resend OTP
								</p>
							</div>
						</>
					)}
				</section>
			)}
			{isLoading && <p style={{ textAlign: "center" }}>Please Wait...</p>}
			{otpType === registration
				? isEmailVerified && (
						<p
							style={{
								fontSize: "12px",
								color: "green",
								textAlign: "center",
							}}
						>
							Your email has been verified successfully{" "}
							{!isRegistrationSuccessful && (
								<>
									<br />
									<span
										style={{
											color: "red",
											display: "inline-block",
											marginTop: "2rem",
										}}
									>
										Registration was not completed! Try
										again later
									</span>
								</>
							)}
						</p>
				  )
				: otpType === "LOGIN"
				? ""
				: ""}
			<span
				data-bs-toggle='modal'
				id='backToRegistration'
				data-bs-target='#registerationModal'
			></span>
		</section>
	);
};

export default OTP;
