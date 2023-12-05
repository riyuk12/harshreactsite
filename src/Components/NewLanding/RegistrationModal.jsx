import axios from "axios";
import Cookies from "js-cookie";
import React, { memo, useEffect, useState, useCallback } from "react";
import baseUrl from "../baseUrl";
import { AiFillQuestionCircle } from "react-icons/ai";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import "./courseUpdate.css";
import Swal from "sweetalert2";
import { BiErrorCircle } from "react-icons/bi";
import { useNavigate } from "react-router";
import { gapi } from "gapi-script";
import OtpInput from "react-otp-input";
import OTP from "../OTP";
import { EncryptText } from "../Encrypt/CryptoEncryption";
import useRemoveModal from "../useRemoveModal";
import { register, studDashboard } from "../../RouteConstants";

const RegistrationModal = (props) => {
	const [courseUpdate, setCourseUpdate] = useState([]);
	const [pack, setPack] = useState([]);

	const [slideIndex, setSlideIndex] = useState(0);
	const clientId =
		"687458829496-83t97ka8jja2dvulr4ik8un4t262a2ac.apps.googleusercontent.com";
	const history = useNavigate();
	const [email, setEmail] = useState("");
	const [verifyEmail, setVerifyEmail] = useState(false);

	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [mobile, setMobile] = useState("");
	const [whatsappNumber, setWhatsappNumber] = useState("");
	const [course, setCourse] = useState("");
	const [courseDetails, setCourseDetails] = useState([]);
	const [profileData, setProfileData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [registerSuccess, setRegisterSuccess] = useState("");
	const [otp, setOtp] = useState("");
	const [registerActive, setRegisterActive] = useState(false);
	const [verifyEmailOtp, setVerifyEmailOtp] = useState(false);
	const [check, setChecked] = useState(false);
	const [sendOtp, setSendOtp] = useState(false);
	const [otpBox, setOtpBox] = useState(false);
	const [verifyOtp, setVerifyOtp] = useState(false);
	const [isPass, setIsPass] = useState(false);
	const [isPassed, setIsPassed] = useState(false);
	const [message, setMessage] = useState("");
	const [passChange, setPassChange] = useState(false);
	const [otpSent, setOtpSent] = useState(false);
	const [emailVerify, setEmailVerify] = useState(false);
	const [emailSendStatusMsg, setEmailSendStatusMsg] =
		useState("Please wait..");
	const [registerError, setRegisterError] = useState("");
	const [clinetLocation, setClinetLocation] = useState({ lat: "", lon: "" });
	const [packInc, setPackInc] = useState([]);
	const [boolaen, setBoolaen] = useState({
		alertTxt: false,
		modalValid: false,
		disDomain: false,
		showDomain: false,
		showLang: false,
		packAlrt: false,
	});

	const closeModal = () => {
		setPackInc([]);
		setBoolaen((prev) => ({
			...prev,
			showDomain: false,
			showLang: false,
			modalValid: false,
		}));
	};
	useEffect(() => {
		axios
			.get(
				// `${baseUrl()}/df/findSubscriptionPlan/${profileData?.courseBeans[0].courseId}`,
				`${baseUrl()}/df/getAllSubscriptionPacks/${1}`,
				{
					method: "GET",
					headers: {
						"Acces-Control-Allow-Origin": "*",
						Client_ID: "MVOZ7rblFHsvdzk25vsQpQ==",
						// Authorization: `${Cookies.get("token")}`,
					},
				}
			)

			.then((data) => {
				// console.log(data.Data, "dataaaaaaaaaaaa");
				setPack(data.data.Data);
			})
			.catch((e) => console.log(e));
	}, []);

	// FIXME:
	const failureFacebook = (response) => {};
	const handleOnlyLetters = (event, name) => {
		const result = event.target.value.replace(/[^a-z]/gi, "");
		if (name === "first") {
			if (!event.target.value.length) {
				setfirstNameErr("Enter first name");
				setFirstName(result);
			} else {
				setfirstNameErr("");

				setFirstName(result);
			}
		} else if (name === "last") {
			if (!event.target.value.length) {
				setlastNameErr("Enter last name");
				setLastName(result);
			} else {
				setlastNameErr("");
				setLastName(result);
			}
		}
	};
	const responseFacebook = (res) => {
		const paramsString = window.location.search;
		const searchParams = new URLSearchParams(paramsString);
		// const code = searchParams.get("code");
		const prompt = searchParams.get("prompt");

		navigator.geolocation.getCurrentPosition((position) => {
			setClinetLocation({
				lat: position.coords.latitude.toFixed(2),
				lon: position.coords.longitude.toFixed(2),
			});
		});
		// for Facebook login
		if (prompt === null) {
			axios
				.post(baseUrl() + `/wl/extLogin`, {
					email: EncryptText(res.email),
					name: res.name.split(" ")[0],
					source: "Facebook",
					uid: res.userID,
					latitude: clinetLocation.lat,
					longitude: clinetLocation.lon,
				})
				.then((response) => {
					if (response.data.result.hasPerDtlsUpdated === false) {
						history(register, {
							state: {
								profileObj: {
									email: res.email,
									name: res.name.split(" ")[0],
									lastname: res.name.split(" ")[1],
									latitude: clinetLocation.lat,
									longitude: clinetLocation.lon,
									uid: res.userID,
									source: "Facebook",
								},
							},
						});
						const modal = document.querySelector(".modal-backdrop");
						modal.remove();
					} else {
						history(studDashboard);
						Cookies.set(
							"token",
							`Bearer ${response.data.result.token}`
						);
						Cookies.set("email", res.email);
						Cookies.set(
							"userId",
							response.data.result.userLoginResBean.userId
						);
					}
				})
				.catch((err) => {
					console.error("Not Login in Facebook");
				});
		}
	};
	useRemoveModal();

	// const [currentAffairsFlag, setCurrentAffairsFlag] = useState(false);

	useEffect(() => {
		gapi.load("client:auth2", () => {
			gapi.client.init({
				clientId: clientId,
				scope: "",
			});
		});
	});

	useEffect(() => {
		setTimeout(() => {
			const carousel = document.querySelectorAll(".carousel-item")[0];

			carousel?.classList.add("active");
		}, 1000);
	}, []);

	useEffect(() => {
		document.body.style.overflow = "visible";
	}, []);

	useEffect(() => {
		onRegisterClick();
	}, []);

	useEffect(() => {
		if (
			Cookies.get("token") !== null &&
			Cookies.get("token") !== undefined
		) {
			axios
				.post(
					baseUrl() + "/profileData",
					{
						email: Cookies.get("email"),
					},
					{
						headers: {
							"Acces-Control-Allow-Origin": "*",
							Client_ID: "MVOZ7rblFHsvdzk25vsQpQ==",
							Authorization: `${Cookies.get("token")}`,
						},
					}
				)
				.then((response) => {
					if (response.status === 200) {
						setProfileData(response.data.Data);
					}
				});
		}
	}, []);

	useEffect(() => {
		const paramsString = window.location.search;
		const searchParams = new URLSearchParams(paramsString);
		const res = searchParams.get("code");
		const prompt = searchParams.get("prompt");
		const code = decodeURIComponent(res);

		if (prompt) {
			async function tokenCall() {
				try {
					const response = await axios.post(
						`https://accounts.google.com/o/oauth2/token`,
						{
							client_id: process.env.REACT_APP_CLIENT_ID,
							code: code,
							scope: "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email",
							client_secret: process.env.REACT_APP_CLIENT_SECRET,
							redirect_uri: process.env.REACT_APP_CLIENT_URL,
							grant_type: "authorization_code",
						}
					);
					Cookies.set(
						"google_access_token",
						response.data.access_token
					);
					window.history.pushState({}, null, "/registration");

					token();
				} catch (err) {
					console.log(err);
				}
			}
			tokenCall();
		}
	}, []);

	const [emailErr, setEmailErr] = useState(false);
	const [firstNameErr, setfirstNameErr] = useState(false);
	const [lastNameErr, setlastNameErr] = useState(false);
	const [passwordErr, setpasswordErr] = useState(false);
	const [confirmPasswordErr, setconfirmPasswordErr] = useState(false);
	const [mobileErr, setmobileErr] = useState(false);
	const [whatsappErr, setwhatsappErr] = useState(false);
	const [courseErr, setcourseErr] = useState(false);
	const [agree, setAgree] = useState(false);
	const [agreeErr, setAgreeErr] = useState("");

	function formValidation() {
		if (
			email.length > 0 &&
			firstName.length > 0 &&
			lastName.length > 0 &&
			password.length > 0 &&
			// verifyEmailOtp &&
			confirmPassword.length > 0 &&
			mobile.length > 0 &&
			whatsappNumber.length > 0 &&
			course &&
			agree &&
			// passChecker &&
			password === confirmPassword
		) {
			setRegisterActive((prev) => !prev);

			document.getElementById("staticBackdropModal").click();
		} else {
			if (!firstName.length) {
				setfirstNameErr("Enter first name");
			}
			if (!lastName.length) {
				setlastNameErr("Enter last name");
			}
			if (!email.length) {
				setEmailErr("Enter your email");
			}
			if (!password.length) {
				setpasswordErr("Enter your password");
			}
			if (!confirmPassword.length) {
				setconfirmPasswordErr("Enter your password");
			}
			if (!mobile.length) {
				setmobileErr("Enter your number");
			}
			if (!whatsappNumber.length) {
				setwhatsappErr("Enter your whatsaap number");
			}
			if (!agree) {
				setAgreeErr("please accept term & condition");
			}
		}
	}

	const onClose = () => {
		setVerifyOtp(false);
		setSendOtp(false);
	};

	const onRegister = () => {
		setRegisterActive(true);
		setLoading(true);
		axios
			.post(
				`${baseUrl()}/df/userRegDetails/`,
				{
					title: "Registration",
					firstName: firstName,
					lastName: lastName,
					email: EncryptText(email),
					password: EncryptText(password),
					number: EncryptText(mobile),
					whatsappNumber: EncryptText(whatsappNumber),
					course: JSON.parse(course),
				},
				{
					headers: {
						"Access-Control-Allow-Origin": "*",
						Client_ID: "MVOZ7rblFHsvdzk25vsQpQ==",
					},
				}
			)
			.then((response) => {
				setFirstName("");
				setLastName("");
				setEmail("");
				setMobile("");
				setWhatsappNumber("");
				setCourse("");
				setLoading(false);
				setRegisterSuccess("green");
				setRegisterError(response.data.ResultMessage);
				if (response.data.ResultCode != 200) {
					setRegisterSuccess("red");
				} else {
					setRegisterSuccess("green");
				}
				if (response.status === 200) {
					document.querySelector("#openSuccessRegister").click();
				}
				if (response.data.ResultCode === 200) {
					document.querySelector("#openSuccessRegister").click();

					document
						.getElementById("registerModal")
						.classList.remove("show");
					// window.location.reload()
				} else {
					// alert(response.data.ResultMessage);
				}
			})
			.catch((e) => {
				Swal.fire({
					icon: "error",
					title: "Oops...",
					text: e,
					// footer: '<a href="">Why do I have this issue?</a>',
				});
				// alert(e);
				setLoading(false);
			});
	};

	const onRegisterClick = useCallback(() => {
		setLoading(true);
		axios
			.post(
				baseUrl() + "/df/coursesAndTopics/",
				{
					courseId: "1",
				},
				{
					headers: {
						"Acces-Control-Allow-Origin": "*",
						Client_ID: "MVOZ7rblFHsvdzk25vsQpQ==",
					},
				}
			)
			.then((response) => {
				setLoading(false);
				if (response.status === 200) {
					setCourseDetails(response.data.Data);
					// window.location.reload()
				} else {
					setCourseDetails([]);
				}
			})
			.catch((e) => {
				console.log(e);
				Swal.fire({
					icon: "error",
					title: "Oops...",
					text: "Please Check Details",
					// footer: '<a href="">Why do I have this issue?</a>',
				});
				// alert("Please Check Details");
				setCourseDetails([]);
				setLoading(false);
			});
	}, []);

	const onLogin = (e) => {
		e.preventDefault();
		setLoading(true);
		axios
			.post(baseUrl() + "/wl/loginDtls", {
				username: EncryptText(email),
				password: EncryptText(password),
			})
			.then((response) => {
				if (response.status == 200) {
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
					// alert(response.data.message);
					setLoading(false);
					// document.getElementById("loginModal").style.display = "none";
					history(studDashboard);
					// const modal = document.querySelector(".modal-open");

					// document.querySelector("body").classList.remove("modal-open");
					// document.querySelector("body").style.overflow = "visible";
					// modal.style.display = "none";
					// modal.remove();
					window.location.reload();
				}
			})
			.catch((e) => {
				console.log(e, "Invalid  Details!");

				setLoading(false);
				setPassword("");
				Swal.fire({
					icon: "error",
					title: "Oops...",
					text: "Invalid login Details!",
					// footer: '<a href="">Why do I have this issue?</a>',
				});
			});
	};

	const onSendOtp = (id) => {
		setVerifyEmail(false);
		setLoading(true);
		axios
			.post(baseUrl() + `/wl/sendOTP`, {
				EmailId: EncryptText(email),
				OtpType: `${id}`,
			})
			.then((response) => {
				setLoading(true);

				if (
					response.status == "200" &&
					response.data.ResultCode == "200"
				) {
					setSendOtp(true);
					setLoading(false);
					setOtpBox(true);
				} else {
					setSendOtp(false);
					document
						.getElementById("staticBackdrop")
						.classList.remove("show");
					setLoading(false);

					// alert(response.data.ResultMessage);
					document.querySelector("#openexistRegisterModel").click();
					// window.location.reload();

					setEmailSendStatusMsg(response.data.ResultMessage);
				}
			});
	};

	const onVerify = () => {
		setLoading(true);
		axios
			.post(baseUrl() + `/wl/verifyOTP`, {
				EmailId: EncryptText(email),
				Otp: EncryptText(otp),
			})
			.then((response) => {
				if (response.data.ResultCode === "200") {
					setLoading(false);
					setEmailVerify(true);
					setVerifyOtp(true);
					setSendOtp(false);
				} else {
					setLoading(false);
					Swal.fire({
						icon: "error",
						title: "Oops...",
						text: response.data.ResultMessage,
						// footer: '<a href="">Why do I have this issue?</a>',
					});
					// alert(response.data.ResultMessage);
				}
			})
			.catch((e) => {
				setLoading(false);
				Swal.fire({
					icon: "error",
					title: "Oops...",
					text: e,
					// footer: '<a href="">Why do I have this issue?</a>',
				});
				// alert(e);
			});
	};

	const onPasswordChange = () => {
		axios
			.post(baseUrl() + `/wl/forgetPassword`, {
				EmailId: EncryptText(email),
				Password: EncryptText(password),
			})
			.then((response) => {
				if (response.data.ResultCode === "200") {
					setMessage("Your Password has changed SuccessFully!!");
					setPassChange(true);

					document.querySelector("#particular-login").click();
					setVerifyOtp(false);
					setSendOtp(false);
					setTimeout(() => {
						setMessage("");
					}, 3000);
				} else {
					Swal.fire({
						icon: "error",
						title: "Oops...",
						text: "response.data.ResultMessage",
						// footer: '<a href="">Why do I have this issue?</a>',
					});
				}
			});
	};

	async function token() {
		if (Cookies.get("google_access_token") != null) {
			// Cookies.set("google_access_token", response.data.access_token);
			if (Cookies.get("google_access_token")) {
				const res = await axios.get(
					"https://people.googleapis.com/v1/people/me?personFields=emailAddresses,names",
					{
						headers: {
							Authorization: `Bearer ${Cookies.get(
								"google_access_token"
							)}`,
						},
					}
				);
				if (res.data) Cookies.set("google_access_token", null);

				onLoginSuccess(res.data);
			}
		}
	}

	// FIXME:
	const onLoginSuccess = (res) => {
		const body = {
			email: res.emailAddresses[0].value,
			name: res.names[0].givenName,
			lastname: res.names[0].familyName,
			source: "Google",
			uid: res.resourceName,
			latitude: clinetLocation.lat,
			longitude: clinetLocation.lon,
		};

		navigator.geolocation.getCurrentPosition((position) => {
			setClinetLocation({
				lat: position.coords.latitude.toFixed(2),
				lon: position.coords.longitude.toFixed(2),
			});
		});

		axios
			.post(baseUrl() + `/wl/extLogin`, {
				email: EncryptText(res.emailAddresses[0].value),
				name: res.names[0].givenName,
				source: "Google",
				uid: res.resourceName.split("/")[1],
				latitude: clinetLocation.lat,
				longitude: clinetLocation.lon,
			})
			.then((response) => {
				if (response.data.result.hasPerDtlsUpdated === false) {
					history(register, {
						state: {
							profileObj: {
								email: res.emailAddresses[0].value,
								name: res.names[0].givenName,
								lastname: res.names[0].familyName,
								latitude: clinetLocation.lat,
								longitude: clinetLocation.lon,
								uid: res.resourceName.split("/")[1],
								source: "Google",
							},
							res: res,
						},
					});
					const modal = document.querySelector(".modal-backdrop");
					modal.remove();
				} else {
					history(studDashboard);
					Cookies.set(
						"token",
						`Bearer ${response.data.result.token}`
					);
					Cookies.set("email", res.emailAddresses[0].value);
					Cookies.set(
						"userId",
						response.data.result.userLoginResBean.userId
					);
					// window.location.reload();
				}
			})
			.catch((err) => {
				console.error("Not Login in Google");
			});
	};

	useEffect(() => {
		if (slideIndex > courseUpdate?.length - 1) {
			setSlideIndex(0);
		}
	}, [slideIndex]);

	useEffect(() => {
		const fetchStudentSpeak = async () => {
			try {
				const config = {
					"Access-Control-Allow-Origin": "*",
					Client_ID: "MVOZ7rblFHsvdzk25vsQpQ==",
					Authorization: Cookies.get("token"),
				};

				const { data } = await axios.get(
					`${baseUrl()}/df/coursesExplore`,
					{},
					{ headers: config }
				);
				// if (status === 200) setCourseUpdate(data.Data);
				// const temp = [{ courseHead: "", courseSubHead: "", impDateArr: [], impUpdateArr: [], currentAffair: [], reviews: [], courseDetails: "" }];
				setCourseUpdate(data.Data);
			} catch (error) {
				console.log(error);
			}
		};
		fetchStudentSpeak();
	}, []);
	const handleOtp = () => {
		setOtpSent(true);
		onSendOtp("1");
	};
	const handleClose = () => {
		setFirstName("");
		setLastName("");
		setEmail("");
		setMobile("");
		setWhatsappNumber("");
		setCourse("");
		setPassword("");
		setEmailErr("");
		setfirstNameErr("");
		setlastNameErr("");
		setmobileErr("");
		setwhatsappErr("");
		setcourseErr("");
		setpasswordErr("");
		setconfirmPasswordErr("");
	};

	return (
		<>
			{/*  */}

			{/*  */}

			<div
				className='modal fade'
				id='loginModal'
				tabIndex='-1'
				aria-labelledby='loginModalLabel'
				aria-hidden='true'
			>
				<div className='modal-dialog'>
					<div className='modal-content'>
						<div className='modal-header'>
							<h5 className='modal-title' id='loginModalLabel'>
								Login
							</h5>
							<button
								type='button'
								className='btn-close'
								data-bs-dismiss='modal'
								aria-label='Close'
								onClick={() => handleClose()}
							></button>
						</div>
						<div className='modal-body mx-auto'>
							<form>
								<div className='input-group mb-3'>
									<div className='input-group-prepend'>
										<span
											className='input-group-text'
											id='basic-addon1'
										>
											<i className='fa-solid fa-at main-color'></i>
										</span>
									</div>
									<input
										id='email'
										type='text'
										className='form-control'
										placeholder='Email'
										onChange={(e) =>
											setEmail(e.target.value)
										}
									/>
								</div>
								<div className='input-group mb-3'>
									<div className='input-group-prepend'>
										<span
											className='input-group-text'
											id='basic-addon1'
										>
											<i className='fa-solid fa-key main-color'></i>
										</span>
									</div>
									<input
										id='lastName'
										type={isPassed ? "text" : "password"}
										className='form-control'
										placeholder='Password'
										onChange={(e) =>
											setPassword(e.target.value)
										}
									/>{" "}
									{isPassed ? (
										<AiFillEyeInvisible
											style={{
												fontSize: "22px",
												marginLeft: "5px",
												marginTop: "5px",
											}}
											onClick={(e) => {
												setIsPassed(false);
											}}
										/>
									) : (
										<AiFillEye
											style={{
												fontSize: "22px",
												marginLeft: "5px",
												marginTop: "5px",
											}}
											onClick={(e) => {
												setIsPassed(true);
											}}
										/>
									)}
								</div>

								<div
									className='text-center'
									style={{
										marginTop: "-1rem",
									}}
								>
									<a
										style={{
											fontSize: "10px",
										}}
										data-bs-toggle='modal'
										data-bs-target='#forgotpassword'
										href='#'
									>
										{/* <i className="fa-brands fa-google main-color"></i>{" "} */}
										Forgot Password?
									</a>
								</div>
								<div
									className='text-center'
									style={{
										marginTop: "3px",
									}}
								>
									<a
										style={{
											fontSize: "10px",
										}}
										data-bs-toggle='modal'
										data-bs-target='#registerModal'
										href='#'
										onClick={() => onRegisterClick()}
									>
										{/* <i className="fa-brands fa-google main-color"></i>{" "} */}
										Not registered? Register Here...
									</a>
								</div>
								{/* <div className="m-3 text-start d-flex justify-content-around">
                  <>
                    <FacebookLogin
                      appId={process.env.REACT_APP_FACEBOOK_CLIENT_ID}
                      autoLoad={false}
                      fields="name,email,picture"
                      onClick={componentClicked}
                      callback={responseFacebook}
                      onFailure={failureFacebook}
                      icon="fa-facebook"
                      cssClass="btnFacebook"
                    />
                  </>
                  <button
                    type="button"
                    id="google-btn"
                    style={{
                      backgroundColor: "rgba(255,255,255)",
                      border: "0px solid ",
                    }}
                    onClick={() => authHandler()}
                  >
                    <div className="google-btn">
                      <div className="google-icon-wrapper">
                        <div style={{ position: "relative", height: "100%" }}>
                          <img className="google-icon" src={google_icon} />
                        </div>
                      </div>
                    </div>
                  </button>
                </div> */}
								<button
									type='submit'
									className='btn main-btn '
									data-mdb-dismiss='modal'
									onClick={onLogin}
								>
									{loading ? "Please Wait.." : "Login"}
								</button>
								{passChange && (
									<p
										style={{
											fontSize: "12px",
											color: "green",
											margin: "10px 0 0 0",
										}}
									>
										{message}
									</p>
								)}
							</form>
						</div>
					</div>
				</div>
			</div>
			<div
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
				<div className='modal-dialog'>
					<div className='modal-content'>
						<div className='modal-header'>
							<h1
								className='modal-title fs-5 ms-auto'
								id='staticBackdropLabel'
							>
								{otpSent
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
						</div>
						<div className='modal-body'>
							<div className='register-form-only'>
								{otpSent ? (
									<>
										{" "}
										<OTP
											currentEmail={email}
											email={email}
											onRegister={onRegister}
											otpBox={otpBox}
											verifyEmailOtp={setVerifyEmailOtp}
										/>
									</>
								) : (
									<>
										<p
											className='text-center b-3'
											style={{
												fontSize: "16px",
												lineHeight: "24px",
												fontWeight: "500",
											}}
										>
											To register, please verify your
											email address:
										</p>
										<p
											className='text-center'
											style={{
												width: "100%",
												fontSize: "16px",
												lineHeight: "24px",
												fontWeight: "600",
											}}
										>
											{email}
										</p>
									</>
								)}
								<p
									onClick={() => {}}
									style={{
										cursor: "pointer",
										marginRight: "auto",
									}}
								></p>
								{otpSent ? (
									<></>
								) : (
									<div>
										<div className='d-flex justify-content-center'>
											<p
												className='btn main-btn text-center'
												onClick={() => handleOtp()}
												style={{
													fontSize: "16px",
													lineHeight: "24px",
													fontWeight: "600",
												}}
											>
												Send OTP to verify{" "}
											</p>
										</div>
										<p
											className='text-center'
											style={{
												width: "100%",
												fontSize: "16px",
												lineHeight: "21px",
												fontWeight: "500",
											}}
										>
											<a
												data-bs-toggle='modal'
												style={{ cursor: "pointer" }}
												data-bs-target='#registerModal'
												className=''
											>
												{" "}
												Back to Registration{" "}
											</a>
										</p>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
			<div
				className='modal fade'
				id='existRegister'
				tabIndex='-1'
				aria-labelledby='loginModalLabel'
				aria-hidden='true'
			>
				<button
					id='openexistRegisterModel'
					style={{ display: "none" }}
					data-bs-toggle='modal'
					data-bs-target='#existRegister'
				></button>
				<div className='modal-dialog'>
					<div className='modal-content'>
						<div className='d-flex justify-content-end p-1'>
							<button
								type='button'
								className='btn-close'
								data-bs-dismiss='modal'
								aria-label='Close'
							></button>
						</div>
						<div className='modal-body mx-auto'>
							<div
								style={{
									paddingLeft: "28px",
									paddingRight: "28px",
									width: "386px",
								}}
							>
								<h1
									style={{
										fontSize: "16px",
										fontWeight: 400,
										lineHeight: "24px",
										color: "#000000",
									}}
									className='text-center'
								>
									{" "}
									You are already a registered user. Please
									login.
								</h1>{" "}
							</div>
							<div
								className='mb-3 d-flex justify-content-center'
								style={{ marginTop: "40px" }}
							>
								<button
									className='btn main-btn '
									data-bs-dismiss='modal'
									data-bs-toggle='modal'
									data-bs-target='#loginModal'
								>
									Go to Login{" "}
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div
				className='modal fade'
				id='registerModal'
				tabIndex='-1'
				aria-labelledby='registerModalLabel'
				aria-hidden='true'
			>
				<div className='modal-dialog'>
					<div className='modal-content'>
						<div className='modal-header'>
							<h4 className='modal-title' id='registerModalLabel'>
								Dear student, &nbsp;
							</h4>{" "}
							<h4
								className='modal-title main-color'
								id='registerModalLabel'
							>
								Register Here
							</h4>
							<button
								type='button'
								className='btn-close'
								data-bs-dismiss='modal'
								aria-label='Close'
								onClick={() => handleClose()}
							></button>
						</div>
						<div className='modal-body mx-auto'>
							<form className='register-form-only'>
								<div className='input-group mt-3'>
									<div className='input-group-prepend'>
										<span
											className='input-group-text'
											id='basic-addon1'
										>
											<i className='fa-solid fa-user main-color'></i>
										</span>
									</div>
									<input
										id='firstName'
										required
										value={props.name || firstName}
										style={{
											border: firstNameErr
												? "1px solid red"
												: "",
										}}
										type='text'
										className='form-control'
										placeholder='First Name*'
										onChange={(e) =>
											handleOnlyLetters(e, "first")
										}
									/>
								</div>
								<span
									style={{ color: "red", fontSize: "14px" }}
								>
									{firstNameErr && <BiErrorCircle />}{" "}
									{firstNameErr}
								</span>

								<div className='input-group mt-3'>
									<div className='input-group-prepend'>
										<span
											className='input-group-text'
											id='basic-addon1'
										>
											<i className='fa-solid fa-user main-color'></i>
										</span>
									</div>
									<input
										id='lastName'
										value={lastName}
										style={{
											border: lastNameErr
												? "1px solid red"
												: "",
										}}
										required
										type='text'
										className='form-control'
										placeholder='Last Name*'
										onChange={(e) =>
											handleOnlyLetters(e, "last")
										}
									/>
								</div>
								<span
									style={{ color: "red", fontSize: "14px" }}
								>
									{lastNameErr && <BiErrorCircle />}{" "}
									{lastNameErr}
								</span>

								<div className='input-group mt-3'>
									<div className='input-group-prepend'>
										<span
											className='input-group-text'
											id='basic-addon1'
										>
											<i className='fa-solid fa-at main-color'></i>
										</span>
									</div>
									<input
										id='email'
										required
										value={props.email || email}
										type='email'
										style={{
											border: emailErr
												? "1px solid red"
												: "",
										}}
										className='form-control'
										placeholder='Email*'
										onChange={(e) => {
											if (!e.target.value.length) {
												setEmailErr(
													"Please enter your email address"
												);
												setEmail(e.target.value);
											} else {
												if (
													!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
														e.target.value
													)
												) {
													setEmailErr(
														"Enter valid email address"
													);
													setEmail(e.target.value);
												} else {
													setEmailErr("");
													setEmail(e.target.value);
												}
											}
										}}
									/>
								</div>
								<span
									style={{ color: "red", fontSize: "14px" }}
								>
									{emailErr && <BiErrorCircle />} {emailErr}
								</span>

								<div
									className='input-group mt-3'
									style={{ position: "relative" }}
								>
									<div className='input-group-prepend'>
										<span
											className='input-group-text'
											id='basic-addon1'
										>
											<i className='fa fa-key main-color'></i>
										</span>
									</div>
									<input
										id='Password'
										required
										value={props.password || password}
										type={isPassed ? "text" : "password"}
										style={{
											border: passwordErr
												? "1px solid red"
												: "",
										}}
										className='form-control'
										placeholder='Password'
										onChange={(e) => {
											if (!e.target.value.length) {
												setpasswordErr(
													"Please enter your password"
												);
												setPassword(e.target.value);
											} else {
												setpasswordErr("");
												setPassword(e.target.value);
											}
										}}
										// onKeyUp={PasswordChecker}
										onPaste={(e) => e.preventDefault()}
									/>

									<div className='password-policy-tooltip'>
										<AiFillQuestionCircle className='password-policy-tooltip-icon' />
										<div className='password-policy-tooltip-container'>
											<p>
												Suggestion for Strong Password:
											</p>

											<ul>
												<li>
													Minimum of 10 characters in
													length.
												</li>
												<li>
													Must contain at least a
													number(0-9), a UPPERCASE
													(A-Z), a lowercase character
													(a-z) and Special Charater
													(such as !@#$%^&).
												</li>
												<li>
													Must not contain personal
													information or common words.
												</li>
											</ul>
										</div>
									</div>

									{isPassed ? (
										<AiFillEyeInvisible
											style={{
												fontSize: "22px",
												marginLeft: "5px",
												marginTop: "5px",
											}}
											onClick={(e) => {
												setIsPassed(false);
											}}
										/>
									) : (
										<AiFillEye
											style={{
												fontSize: "22px",
												marginLeft: "5px",
												marginTop: "5px",
											}}
											onClick={(e) => {
												setIsPassed(true);
											}}
										/>
									)}
								</div>
								<span
									style={{ color: "red", fontSize: "14px" }}
								>
									{passwordErr && <BiErrorCircle />}{" "}
									{passwordErr}
								</span>

								{/* {passChecker ? (
                  ""
                ) : (
                  <p
                    className={password.length === 0 ? "d-none" : "error-text"}
                  >
                    Password Doesn't satify password policy
                  </p>
                )} */}
								<div className='input-group mt-3'>
									<div className='input-group-prepend'>
										<span
											className='input-group-text'
											id='basic-addon1'
										>
											<i className='fa fa-key main-color'></i>
										</span>
									</div>
									<input
										id='confirmPassword'
										value={
											props.confirmPassword ||
											confirmPassword
										}
										required
										type={isPass ? "text" : "password"}
										className='form-control'
										style={{
											border: confirmPasswordErr
												? "1px solid red"
												: "",
										}}
										placeholder='Confirm Password*'
										onPaste={(e) => e.preventDefault()}
										onChange={(e) => {
											if (!e.target.value.length) {
												setconfirmPasswordErr(
													"Please enter your confirm password"
												);
												setConfirmPassword(
													e.target.value
												);
											} else {
												if (
													password == e.target.value
												) {
													setconfirmPasswordErr("");
													setConfirmPassword(
														e.target.value
													);
												} else {
													setconfirmPasswordErr(
														"Confirm password not matched"
													);
													setConfirmPassword(
														e.target.value
													);
												}
											}
										}}
									/>
									{isPass ? (
										<AiFillEyeInvisible
											style={{
												fontSize: "22px",
												marginLeft: "5px",
												marginTop: "5px",
											}}
											onClick={(e) => {
												setIsPass(false);
											}}
										/>
									) : (
										<AiFillEye
											style={{
												fontSize: "22px",
												marginLeft: "5px",
												marginTop: "5px",
											}}
											onClick={(e) => {
												setIsPass(true);
											}}
										/>
									)}
								</div>
								{/* {password !== confirmPassword && (
                  <p className="error-text">Password do not match</p>
                )} */}
								<span
									style={{ color: "red", fontSize: "14px" }}
								>
									{confirmPasswordErr && <BiErrorCircle />}{" "}
									{confirmPasswordErr}
								</span>

								<div className='input-group mt-3'>
									<div className='input-group-prepend'>
										<span
											className='input-group-text'
											id='basic-addon1'
										>
											<i className='fa-solid fa-phone main-color'></i>{" "}
											*
										</span>
									</div>{" "}
									<br />
									<input
										id='whatsappNumber'
										required
										type='number'
										value={props.mobile || mobile}
										style={{
											border: mobileErr
												? "1px solid red"
												: "",
										}}
										className='form-control'
										placeholder='Mobile Number'
										onChange={(e) => {
											if (e.target.value) {
												if (
													e.target.value.length ==
														11 ||
													e.target.value.split(
														""
													)[0] <= 5 ||
													e.target.value.includes("+")
												) {
													return false;
												}
												setmobileErr("");

												setMobile(e.target.value);
											} else {
												setmobileErr(
													"Please enter your number"
												);
												setMobile(e.target.value);
											}
										}}
									/>
								</div>
								<span
									style={{ color: "red", fontSize: "14px" }}
								>
									{mobileErr && <BiErrorCircle />} {mobileErr}
								</span>

								<div className='mt-3 '>
									<input
										className='form-check-input'
										type='checkbox'
										value=''
										id='flexCheckDefault'
										onChange={() => {
											setWhatsappNumber(mobile);
										}}
									/>
									<label className='check-text'>
										Same as Mobile Number
									</label>
								</div>
								<div className='input-group mb-2'>
									<div className='input-group-prepend'>
										<span
											className='input-group-text'
											id='basic-addon1'
										>
											<i className='fa-brands fa-whatsapp main-color'></i>{" "}
										</span>
									</div>{" "}
									<br />
									<input
										id='whatsappNumber'
										type='number'
										className='form-control'
										placeholder='Whatsapp Number'
										style={{
											border:
												whatsappErr && !whatsappNumber
													? "1px solid red"
													: "",
										}}
										value={whatsappNumber}
										onChange={(e) => {
											if (e.target.value) {
												if (
													e.target.value.length ==
														11 ||
													e.target.value.split(
														""
													)[0] <= 5
												)
													return false;
												setWhatsappNumber(
													e.target.value
												);
												setwhatsappErr("");
											} else {
												setwhatsappErr(
													"Please enter your whatsapp number"
												);
												setWhatsappNumber(
													e.target.value
												);
											}
										}}
									/>
								</div>
								<span
									style={{ color: "red", fontSize: "14px" }}
								>
									{whatsappErr && !whatsappNumber && (
										<span>
											<BiErrorCircle />
											{whatsappErr}
										</span>
									)}
								</span>

								<div className='mb-3'>
									<label className='form-label'>Course</label>
									<select
										id='streamSelect'
										className='form-select'
										aria-label='Default select example'
										onChange={(e) =>
											setCourse(e.target.value)
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
								</div>

								<div
									className='terms'
									style={{
										display: "flex",
										alignItems: "center",
										marginBottom: "10px",
									}}
								>
									<input
										type='checkbox'
										onClick={() => {
											setAgree(!agree);
											if (agree) {
												setAgreeErr("ssssss");
											} else {
												setAgreeErr("");
											}
										}}
										style={{
											width: "32px",
											border: agreeErr
												? "1px solid red"
												: "",
										}}

										// checked={registerActive ? true : false}
									/>
									<p
										style={{
											fontSize: "10px",
											whiteSpace: "nowrap",
											marginBottom: "0",
										}}
									>
										{" "}
										I agree to the{" "}
										<a
											href='https://besst.in/registration/documents/Terms and Conditiion BESST.pdf'
											target='_blank'
										>
											Terms and Conditions
										</a>{" "}
										&{" "}
										<a
											href='https://besst.in/registration/documents/PRIVACY POLICY BESST.pdf'
											target='_blank'
										>
											Privacy Policy
										</a>
									</p>
									<span
										style={{
											color: "red",
											fontSize: "14px",
										}}
									>
										{!agree && agreeErr && (
											<span>
												<BiErrorCircle />
											</span>
										)}
									</span>
								</div>
								{/* <span style={{ color: "red", fontSize: "14px", }}>{agreeErr && <span><BiErrorCircle />{agreeErr}</span>}</span> */}

								{registerSuccess == "green" ? (
									<div className='mb-3'>
										<label
											id='success'
											className='form-label noti-success'
										>
											<span
												style={{ fontWeight: "bold" }}
											>
												Congratulations!{" "}
											</span>{" "}
											<span> {registerError}</span>{" "}
											<span
												style={{ fontWeight: "bold" }}
											>
												experts.
											</span>
										</label>
									</div>
								) : null}
								{registerSuccess == "red" ? (
									<div className='mb-3'>
										<label
											id='error'
											className='form-label noti-error'
										>
											<i className='fa-solid fa-face-dizzy'></i>{" "}
											{registerError}
										</label>
									</div>
								) : null}
								<button
									type='button'
									// disabled={registerActive ? false : true}
									// onClick={() => onRegister()}

									// data-bs-dismiss="modal"
									aria-label='Close'
									className='btn main-btn '
									onClick={(e) => {
										formValidation();
									}}
								>
									{loading ? "Please wait..." : "Proceed"}
								</button>
							</form>
							{/* email confirm modal */}
						</div>
					</div>
				</div>
			</div>

			<div
				className='modal fade'
				id='successRegister'
				tabIndex='-1'
				aria-labelledby='loginModalLabel'
				aria-hidden='true'
			>
				<div className='modal-dialog'>
					<div className='modal-content'>
						<div className='modal-header'>
							<span
								className='text-center ms-auto'
								style={{ fontWeight: "bold" }}
							>
								Congratulations!{" "}
							</span>{" "}
							<h5
								className='modal-title'
								id='loginModalLabel'
							></h5>
							<button
								type='button'
								className='btn-close'
								data-bs-dismiss='modal'
								aria-label='Close'
							></button>
						</div>
						<div className='modal-body mx-auto'>
							<div
								style={{
									paddingLeft: "28px",
									paddingRight: "28px",
									width: "386px",
								}}
							>
								<h1
									style={{
										fontSize: "16px",
										fontWeight: 400,
										lineHeight: "24px",
										color: "#000000",
									}}
									className='text-center'
								>
									{" "}
									You are successfully registered. Please
									login and start practicing the tests created
									by our panel
								</h1>{" "}
							</div>
							<div
								className='mb-3 d-flex justify-content-center'
								style={{ marginTop: "40px" }}
							>
								<button
									className='btn main-btn '
									data-mdb-dismiss='modal'
									data-bs-toggle='modal'
									data-bs-target='#loginModal'
								>
									Click here to Login
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div
				className='modal fade'
				id='forgotpassword'
				tabIndex='-1'
				aria-labelledby='forgotpasswordLabel'
				aria-hidden='true'
			>
				<div className='modal-dialog'>
					<div className='modal-content'>
						<div className='modal-header'>
							<h5 className='modal-title' id='forgotpassword'>
								Reset Your Password
							</h5>

							<button
								type='button'
								className='btn-close'
								data-bs-dismiss='modal'
								aria-label='Close'
								onClick={() => onClose()}
							></button>
						</div>
						<div className='modal-body mx-auto'>
							<form>
								{verifyOtp ? (
									" "
								) : (
									<div className='input-group mb-3'>
										<div className='input-group-prepend'>
											<span
												className='input-group-text'
												id='basic-addon1'
											>
												<i className='fa-solid fa-at main-color'></i>
											</span>
										</div>
										<input
											// style={{ width: "90%" }}
											id='email'
											type='text'
											className='form-control'
											placeholder='Email'
											onChange={(e) =>
												setEmail(e.target.value)
											}
										/>
									</div>
								)}

								{/* <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">
                      <i className="fa-solid fa-key main-color"></i>
                    </span>
                  </div>
                  <input
                    id="lastName"
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div> */}
								{/* <div
                  className="text-center"
                  style={{
                    marginTop: "-1rem",
                  }}
                >
                  <a
                    style={{
                      fontSize: "10px",
                    }}
                    data-bs-toggle="modal"
                    data-bs-target="#forgotpassword"
                    href="#"
                  >
                    {/* <i className="fa-brands fa-google main-color"></i>{" "} */}
								{/* forgotPassword? */}
								{/* </a> */}
								{/* </div> */}
								{/* <div className=" mb-3 text-center">
                  <p>or </p>
                  <a className="btn border">
                    <i className="fa-brands fa-google main-color"></i>{" "}
                    &nbsp;Gmail
                  </a>
                </div> */}

								{/* <div className="mb-3">
                  <label id="success" className="form-label noti-success">
                    <i className="fa-solid fa-face-grin-stars"></i> Request Sent
                    Successfully
                  </label>
                </div>

                <div className="mb-3">
                  <label id="error" className="form-label noti-error">
                    <i className="fa-solid fa-face-dizzy"></i> Error occured
                  </label>
                </div> */}

								{!verifyOtp ? (
									sendOtp ? (
										""
									) : (
										<div
											// type="submit"
											className='btn main-btn '
											// data-mdb-dismiss={!sendOtp ?"modal" : ""}
											onClick={() => onSendOtp("2")}
										>
											{loading
												? "Please Wait.."
												: "Send OTP"}
										</div>
									)
								) : (
									<></>
								)}
								{sendOtp ? (
									<div
										className='form-group'
										style={{
											justifyContent: "center",
											display: "flex",
											flexDirection: "column",
											alignItems: "center",
											gap: "25px",
										}}
									>
										<h1>Verify Your OTP</h1>
										<p>
											* The OTP has been sent to your mail
											successfully *
										</p>
										<OtpInput
											className='otp-input'
											value={otp}
											onChange={(otp) => setOtp(otp)}
											numInputs={4}
											separator={<span>-</span>}
										/>
										{loading ? (
											"Please Wait...."
										) : (
											<button
												className='btn main-btn'
												onClick={() => onVerify()}
											>
												Verify
											</button>
										)}
									</div>
								) : (
									""
								)}

								{verifyOtp ? (
									<div>
										<div className='input-group mb-3'>
											<div className='input-group-prepend'>
												<span
													className='input-group-text'
													id='basic-addon1'
												>
													<i className='fa-solid fa-key main-color'></i>
												</span>
											</div>

											{/* DONE: validation error */}
											<input
												id='lastName'
												type={
													isPassed
														? "password"
														: "text"
												}
												className='form-control'
												placeholder='Password'
												onChange={(e) =>
													setPassword(e.target.value)
												}
												// onKeyUp={PasswordChecker}
											/>
											<div className='password-policy-tooltip'>
												<AiFillQuestionCircle className='password-policy-tooltip-icon' />
												<div className='password-policy-tooltip-container'>
													<p>
														Suggestion for Strong
														Password:
													</p>

													<ul>
														<li>
															Minimum of 10
															characters in
															length.
														</li>
														<li>
															Must contain at
															least a number(0-9),
															a UPPERCASE (A-Z), a
															lowercase character
															(a-z) and Special
															Charater (such as
															!@#$%^&).
														</li>
														<li>
															Must not contain
															personal information
															or common words.
														</li>
													</ul>
												</div>
											</div>
											{/*  */}
											{isPassed ? (
												<AiFillEyeInvisible
													style={{
														fontSize: "22px",
														marginLeft: "5px",
														marginTop: "5px",
													}}
													onClick={(e) => {
														setIsPassed(false);
													}}
												/>
											) : (
												<AiFillEye
													style={{
														fontSize: "22px",
														marginLeft: "5px",
														marginTop: "5px",
													}}
													onClick={(e) => {
														setIsPassed(true);
													}}
												/>
											)}
											{/*  */}
										</div>
										{/* { passChecker ? (
                      ""
                    ) : (
                      <p
                        className={
                          password.length === 0 ? "d-none" : "error-text"
                        }
                      >
                        Password Doesn't satify password policy
                      </p>
                    )} */}
										<div className='input-group mb-3'>
											<div className='input-group-prepend'>
												<span
													className='input-group-text'
													id='basic-addon1'
												>
													<i className='fa-solid fa-key main-color'></i>
												</span>
											</div>
											<input
												id='lastName'
												type='password'
												className='form-control'
												placeholder='Confirm Password'
												onChange={(e) => {
													setConfirmPassword(
														e.target.value
													);
												}}
											/>
										</div>
									</div>
								) : (
									""
								)}
								{verifyOtp ? (
									<div
										className='btn main-btn '
										onClick={() => {
											if (password === confirmPassword)
												onPasswordChange();
											else {
												Swal.fire({
													icon: "error",
													title: "Oops...",
													text: "confirmPassword Does't match",
												});
											}
										}}
									>
										{loading
											? "Please Wait.."
											: "Change Password"}
									</div>
								) : (
									""
								)}
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default memo(RegistrationModal);
