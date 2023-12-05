import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GoMention } from "react-icons/go";
import { FaUserAlt, FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import { ImKey } from "react-icons/im";
import axios from "axios";
import baseUrl from "../../../Components/baseUrl";

import PasswordVisibility from "../PasswordVisibility";
import PasswordPolicy from "../PasswordPolicy";
import OTP from "../../OTP";
import { EncryptText } from "../../Encrypt/CryptoEncryption";
import { utilitySliceActions } from "../../../Redux/Slice/UtilitySlice";
import { Link } from "react-router-dom";
import { privacyPolicy, termsAndConditions } from "../../../RouteConstants";
import Cookies from "js-cookie";
import { registration } from "./AuthComponent";

const errorMessageStyle = {
	color: "red",
	fontSize: "11px",
	position: "relative",
	left: "50px",
};
const errorMessageCourseStyle = {
	color: "red",
	fontSize: "11px",
};
const errorInputfieldStyle = { border: "1px solid red" };

const Registration = ({
	userSignupDetails,
	setUserSignupDetails,
	otpType,
	setOtpType,
}) => {
	const dispatch = useDispatch();
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const [error, setError] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [courseDetails, setCourseDetails] = useState([]);
	const { isOtpSent, courseSelectedFromModal } = useSelector(
		(state) => state.utils
	);

	//to set states to initial value
	const handleClose = () => {
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
		setError({});
		setIsPasswordVisible(false);
		setIsLoading(false);
		dispatch(utilitySliceActions.optIsNotSent());
		dispatch(utilitySliceActions.setCourseSelectedFromModal(""));
	};
	

	//getting data for course list  (0 for all courses and 1 for CUET)
	const getCourses = () => {
		setIsLoading(true); 
		axios
			.post(
				baseUrl() + "/df/coursesAndTopics",
				{
					courseId: "0",
				},
				{
					headers: {
						"Acces-Control-Allow-Origin": "*",
						Client_ID: "MVOZ7rblFHsvdzk25vsQpQ==",
					},
				}
			)
			.then((response) => {
				setIsLoading(false);
				if (response.status === 200) {
					setCourseDetails(response.data.Data);
				} else {
					setCourseDetails([]);
				}
			})
			.catch((e) => {
				setCourseDetails([]);
				setIsLoading(false);
				console.log(e, "something wrong with courseAndTopic in reg");
			});
	};
	useEffect(() => {
		if (!Cookies.get("token")) {
			getCourses();
		}
	}, []);

	//handle change in value of input field
	const handleChange = (e) => {
		const { name, value } = e.target;
		setUserSignupDetails({ ...userSignupDetails, [name]: value });
	};

	//handles change in checkboxes
	const handleCheck = (e) => {
		const { name, checked } = e.target;
		setUserSignupDetails({ ...userSignupDetails, [name]: checked });
		if (e.target.name === "isNumberWhatsapp" && e.target.checked) {
			setUserSignupDetails({
				...userSignupDetails,
				isNumberWhatsapp: true,
				whatsappNumber: userSignupDetails.mobileNumber,
			});
		} else if (e.target.name === "isNumberWhatsapp" && !e.target.checked) {
			setUserSignupDetails({
				...userSignupDetails,
				isNumberWhatsapp: false,
				whatsappNumber: "",
			});
		}
	};

	//handles validation of form before posting the data
	const validation = () => {
		let tempError = {};
		const isEmailVaild = userSignupDetails.email.match(
			/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
		);

		const spaceRegex = /^\s*$/;

		if (spaceRegex.test(userSignupDetails.firstName)) {
			console.log("The first name only contains spaces.");
			tempError.firstName = "first name is required";
		}

		if (spaceRegex.test(userSignupDetails.lastName)) {
			tempError.lastName = "last name is required";
		}

		if (!isEmailVaild) {
			tempError.email = "please enter a valid email";
		}

		if (spaceRegex.test(userSignupDetails.password)) {
			tempError.password = "password is required";
		}

		if (!userSignupDetails.confirmPassword) {
			tempError.confirmPassword = "confirm password is required";
		} else if (
			userSignupDetails.password !== userSignupDetails.confirmPassword
		) {
			tempError.confirmPassword = "passwords doesn't match";
		}

		if (!userSignupDetails.mobileNumber) {
			tempError.mobileNumber = "mobile number is required";
		} else if (userSignupDetails.mobileNumber < 6000000000) {
			tempError.mobileNumber = "please enter a valid mobile number";
		} else if (userSignupDetails.mobileNumber.length !== 10) {
			tempError.mobileNumber = "please enter a valid mobile number";
		}

		if (!userSignupDetails.isNumberWhatsapp) {
			if (!userSignupDetails.whatsappNumber) {
				tempError.whatsappNumber = "whatsapp number is required";
			} else if (userSignupDetails.whatsappNumber < 6000000000) {
				tempError.whatsappNumber = "please enter a valid mobile number";
			} else if (userSignupDetails.whatsappNumber.length !== 10) {
				tempError.whatsappNumber = "please enter a valid mobile number";
			}
		}

		if (!userSignupDetails.selectedCourse) {
			tempError.selectedCourse = "select atleast one course";
		}

		if (!userSignupDetails.agreedToTerms) {
			tempError.agreedToTerms = "Please agree to Terms and conditions";
		}

		setError(tempError);
		return Object.keys(tempError).length <= 0;
	};

	//once details are filled without validation error this function will execute
	const handleProceed = (e) => {
		e.preventDefault();
		if (validation()) {
			setOtpType(registration);
			document.getElementById("staticBackdropModal").click();
		}
	};

	//for sending OTP
	const onSendOtp = (id, email) => {
		if (email !== "") {
			setIsLoading(true);
			axios
				.post(`${baseUrl()}/wl/sendOTP`, {
					EmailId: EncryptText(email),
					OtpType: `${id}`,
					Mobile: EncryptText(userSignupDetails.mobileNumber),
					WhatsappNo: EncryptText(userSignupDetails.whatsappNumber),
				})
				.then((response) => {
					setIsLoading(true);
					//for unregistered email
					if (response.data.ResultCode === "200") {
						setIsLoading(false);
						dispatch(utilitySliceActions.optIsSent());
					}
					//for registered email
					else if (response.data.ResultCode === "403") {
						setIsLoading(false);
						dispatch(
							utilitySliceActions.setAlreadyRegisteredMessage(
								response.data.ResultMessage
							)
						);
						dispatch(
							utilitySliceActions.setCourseSelectedFromModal("")
						);
						document
							.querySelector("#openexistRegisterModel")
							.click();
						document
							.getElementById("staticBackdrop")
							.classList.remove("show");
					} else {
						dispatch(utilitySliceActions.optIsNotSent());
						setIsLoading(false);
						if (id === 1) {
							document
								.querySelector("#openexistRegisterModel")
								.click();
							document
								.getElementById("staticBackdrop")
								.classList.remove("show");
						} else {
							document
								.querySelector("#opennotRegisterModel")
								.click();
							document
								.getElementById("staticBackdrop")
								.classList.remove("show");
						}
					}
				})
				.catch((e) => {
					setIsLoading(false);
					console.log(e, "something wrong with sendOTP in reg");
				});
		}
	};

	return (
		<>
			<article
				className='modal fade'
				id='registerationModal'
				tabIndex='-1'
				data-bs-backdrop='static'
				data-bs-keyboard='false'
				aria-labelledby='registerModalLabel'
				aria-hidden='true'
			>
				<section className='modal-dialog'>
					<section className='modal-content'>
						<header className='modal-header modal-header-container'>
							<h5 className='modal-title' id='registerModalLabel'>
								Dear candidate&nbsp;
								{courseSelectedFromModal ? (
									//for online classes
									// <span
									// 	className='main-color d-block'
									// 	style={{ fontSize: "15px" }}
									// >
									// 	You are registering for Live classes on
									// 	REASONING
									// </span>
									<span
										className='main-color d-block'
										style={{ fontSize: "15px" }}
									>
										You are registering for Crash Course
										CUET(UG)
									</span>
								) : (
									<span className='main-color'>
										Register here
									</span>
								)}
							</h5>
							<button
								type='button'
								className='btn-close'
								data-bs-dismiss='modal'
								aria-label='Close'
								onClick={() => handleClose()}
							></button>
						</header>
						<main className='modal-body px-sm-5 signup-from-container'>
							<form className='auth-form py-3'>
								<section className='form-section'>
									<div className='input-group input-wrapper'>
										<span
											className='input-group-text main-color'
											id='basic-addon1'
										>
											<FaUserAlt />
										</span>
										<input
											id='firstName'
											type='text'
											name='firstName'
											className='form-control'
											placeholder='First Name*'
											style={
												error.firstName &&
												errorInputfieldStyle
											}
											value={userSignupDetails.firstName}
											onChange={(e) => handleChange(e)}
										/>
									</div>
									{error.firstName && (
										<span style={errorMessageStyle}>
											{error.firstName}
										</span>
									)}
								</section>

								<section className='form-section'>
									<div className='input-group input-wrapper'>
										<span
											className='input-group-text main-color'
											id='basic-addon1'
										>
											<FaUserAlt />
										</span>
										<input
											id='lastName'
											type='text'
											name='lastName'
											className='form-control'
											placeholder='Last Name*'
											style={
												error.lastName &&
												errorInputfieldStyle
											}
											onChange={(e) => handleChange(e)}
											value={userSignupDetails.lastName}
										/>
									</div>
									{error.lastName && (
										<span style={errorMessageStyle}>
											{error.lastName}
										</span>
									)}
								</section>

								<section className='form-section'>
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
											className='form-control'
											placeholder='Email*'
											style={
												error.email &&
												errorInputfieldStyle
											}
											onChange={(e) => handleChange(e)}
											value={userSignupDetails.email}
										/>
									</div>
									{error.email && (
										<span style={errorMessageStyle}>
											{error.email}
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
											onChange={(e) => handleChange(e)}
											onPaste={(e) => e.preventDefault()}
											value={userSignupDetails.password}
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
											onChange={(e) => handleChange(e)}
											onPaste={(e) => e.preventDefault()}
											value={
												userSignupDetails.confirmPassword
											}
										/>
									</div>
									{error.confirmPassword && (
										<span style={errorMessageStyle}>
											{error.confirmPassword}
										</span>
									)}
								</section>

								<section className='form-section'>
									<div className='input-group input-wrapper'>
										<span
											className='input-group-text main-color'
											id='basic-addon1'
										>
											<FaPhoneAlt />
										</span>
										<input
											id='mobileNumber'
											type='number'
											name='mobileNumber'
											className='form-control'
											placeholder='Mobile Number'
											style={
												error.mobileNumber &&
												errorInputfieldStyle
											}
											value={
												userSignupDetails.mobileNumber
											}
											onChange={(e) => handleChange(e)}
										/>
									</div>
									{error.mobileNumber && (
										<span style={errorMessageStyle}>
											{error.mobileNumber}
										</span>
									)}
								</section>

								<section className='checkbox-wrapper'>
									<input
										type='checkbox'
										id='same-as-mobile-number'
										name='isNumberWhatsapp'
										checked={
											userSignupDetails.isNumberWhatsapp
										}
										value={
											userSignupDetails.isNumberWhatsapp
										}
										onChange={(e) => handleCheck(e)}
									/>
									<label htmlFor='same-as-mobile-number'>
										Same as Mobile Number
									</label>
								</section>

								<section className='form-section'>
									<div className='input-group input-wrapper'>
										<span
											className='input-group-text main-color'
											id='basic-addon1'
										>
											<FaWhatsapp />
										</span>
										<input
											id='whatsappNumber'
											type='number'
											name='whatsappNumber'
											className='form-control'
											placeholder='Whatsapp Number'
											style={
												error.whatsappNumber &&
												errorInputfieldStyle
											}
											checked={
												userSignupDetails.whatsappNumber
											}
											value={
												userSignupDetails.isNumberWhatsapp
													? userSignupDetails.mobileNumber
													: userSignupDetails.whatsappNumber
											}
											disabled={
												userSignupDetails.isNumberWhatsapp
											}
											onChange={(e) => handleChange(e)}
										/>
									</div>
									{error.whatsappNumber && (
										<span style={errorMessageStyle}>
											{error.whatsappNumber}
										</span>
									)}
								</section>

								{!courseSelectedFromModal && (
									<section className='form-section'>
										<label className='form-label m-0'>
											Course
										</label>
										<select
											id='streamSelect'
											className='form-select w-full course-select'
											aria-label='Default select example'
											style={
												error.selectedCourse &&
												errorInputfieldStyle
											}
											onChange={(e) =>
												setUserSignupDetails({
													...userSignupDetails,
													selectedCourse:
														e.target.value,
												})
											}
											value={
												userSignupDetails.selectedCourse
											}
										>
											<option selected>
												Select your course
											</option>
											{courseDetails.map((item) => (
												<option value={item.courseId}>
													{item.courseName}
												</option>
											))}
										</select>
										{error.selectedCourse && (
											<span
												style={
													error.selectedCourse &&
													errorMessageCourseStyle
												}
											>
												{error.selectedCourse}
											</span>
										)}
									</section>
								)}

								<section className='form-section'>
									<div className='checkbox-wrapper'>
										<input
											type='checkbox'
											id='terms-and-conditions'
											name='agreedToTerms'
											checked={
												userSignupDetails.agreedToTerms
											}
											value={
												userSignupDetails.agreedToTerms
											}
											onChange={(e) => handleCheck(e)}
										/>
										<label
											htmlFor='terms-and-conditions'
											className='my-2 d-flex flex-sm-row flex-column'
										>
											<span>
												I agree to the
												<Link
													to={termsAndConditions}
													target='_blank'
												>
													{" "}
													Terms and Conditions
												</Link>
											</span>
											<span>
												{" "}
												&
												<Link
													to={privacyPolicy}
													target='_blank'
												>
													{" "}
													Privacy Policy{" "}
												</Link>
											</span>
										</label>
									</div>
									{error.agreedToTerms && (
										<span style={errorMessageCourseStyle}>
											{error.agreedToTerms}
										</span>
									)}
								</section>
								<button
									type='submit'
									aria-label='Close'
									className='btn main-btn '
									onClick={(e) => {
										handleProceed(e);
									}}
								>
									{isLoading ? "Please wait..." : "Proceed"}
								</button>
							</form>
						</main>
					</section>
				</section>
			</article>
			<article
				className='modal fade'
				id='staticBackdrop'
				data-bs-backdrop='static'
				data-bs-keyboard='false'
				tabIndex='-1'
				aria-labelledby='staticBackdropLabel'
				aria-hidden='true'
			>
				<button
					data-bs-dismiss='modal'
					className='d-none'
					data-bs-toggle='modal'
					data-bs-target='#staticBackdrop'
					id='staticBackdropModal'
				></button>
				<section className='modal-dialog'>
					<section className='modal-content'>
						<header className='modal-header modal-header-container'>
							<h1
								className='modal-title fs-5 ms-auto'
								id='staticBackdropLabel'
							>
								{isOtpSent
									? "Email Verification"
									: "Verify Your Email"}
							</h1>
							<button
								type='button'
								className='btn-close'
								data-bs-dismiss='modal'
								aria-label='Close'
								onClick={() => handleClose()}
							></button>
						</header>
						<main className='modal-body'>
							<article className='register-form-only'>
								{isOtpSent ? (
									<>
										{otpType === registration && (
											<OTP
												userDetails={userSignupDetails}
												setUserDetails={
													setUserSignupDetails
												}
												otpType={registration}
											/>
										)}
									</>
								) : (
									<section className='d-flex justify-content-center align-items-center flex-column gap-3'>
										<p className='m-0 text-center'>
											To complete registeration
											successfully, please verify your
											email address:&nbsp;
											{"  "}
											<span className='fw-bold'>
												{userSignupDetails.email}
											</span>
										</p>
										<button
											className='btn main-btn text-center mt-2'
											onClick={() =>
												onSendOtp(
													"1",
													userSignupDetails.email
												)
											}
											style={{
												fontWeight: "400",
											}}
										>
											{isLoading
												? "please wait..."
												: "Get OTP"}
										</button>
										<p
											data-bs-toggle='modal'
											style={{
												textAlign: "center",
												fontSize: "14px",
											}}
											data-bs-target='#registerationModal'
											className='link-style pointer m-0'
										>
											Back to Registration
										</p>
									</section>
								)}
							</article>
						</main>
					</section>
				</section>
			</article>
		</>
	);
};

export default Registration;
