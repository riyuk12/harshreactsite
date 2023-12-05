/* eslint-disable */
import React, { useEffect, useState } from "react";
import Ellipse from "../../Assets/images/Ellipse.png";
import Ellipse1 from "../../Assets/images/Ellipse1.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import slider_img from "../../Assets/images/first_slide.png";
import slider_img1 from "../../Assets/images/first1_slide.png";
import Logo from "../../Assets/images/logo.png";

// Google:Login
import { gapi } from "gapi-script";
import img_frame from "../../Assets/images/Frame1.png";

import "./BesstPage.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import baseUrl from "../../Components/baseUrl";

import { useInView } from "react-intersection-observer";
import "../Landing/landing.css";

import useRemoveModal from "../../Components/useRemoveModal";

import { EncryptText } from "../../Components/Encrypt/CryptoEncryption";

import { useCallback } from "react";
import Swal from "sweetalert2";
import { AiFillEye, AiFillEyeInvisible, AiOutlineMail } from "react-icons/ai";
import { ImWhatsapp, ImYoutube2 } from "react-icons/im";
import { GoLocation } from "react-icons/go";
import { BiRupee } from "react-icons/bi";
import Header from "../../Components/Global/Navigation/Header";
import RegistrationModal from "../../Components/NewLanding/RegistrationModal";
import FAQ from "../../Components/NewLanding/FAQ";
import { register, studDashboard } from "../../RouteConstants";
import { Helmet } from "react-helmet-async";

function VideoData(data) {
	return (
		<>
			<div className='col-md-12'>
				<iframe
					src={data.url}
					allowFullScreen='allowfullscreen'
					title='YouTube video player'
					frameBorder='2'
					allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
					width='100%'
				></iframe>
			</div>
			<div className='col-md-12' style={{ paddingTop: 20 }}>
				{data.title}
				{/* <p className="small">Lorem ipsum dolor sit amet. {"[ABOUT]"}</p> */}
			</div>
			<div className='col-md-3'></div>
		</>
	);
}

function CuetApplicationForm() {
	const clientId =
		"687458829496-83t97ka8jja2dvulr4ik8un4t262a2ac.apps.googleusercontent.com";
	// console.count("Initial-BesstNewExamPage Render");
	const history = useNavigate();
	const [email, setEmail] = useState("");
	const [courseUpdate, setCourseUpdate] = useState([]);

	const [password, setPassword] = useState("");
	const [couresData, setCourseData] = useState([]);
	const [confirmPassword, setConfirmPassword] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [mobile, setMobile] = useState("");
	const [loading, setLoading] = useState(false);
	const [otpBox, setOtpBox] = useState(false);
	const [emailValidation, setEmailValidation] = useState(false);
	const [isPassed, setIsPassed] = useState(false);
	const [passChecker, setPassChecker] = useState(false);
	const [isPass, setIsPass] = useState(false);
	const [courseDetails, setCourseDetails] = useState([]);
	const [registerSuccess, setRegisterSuccess] = useState("");

	const [whatsappNumber, setWhatsappNumber] = useState("");
	const [course, setCourse] = useState("");

	const [profileData, setProfileData] = useState([]);
	const [newsBlink, setNewsBlink] = useState(false);
	const [newsData, setNewsData] = useState([]);

	const [otp, setOtp] = useState("");
	const [passChange, setPassChange] = useState(false);

	const [registerActive, setRegisterActive] = useState(false);
	const [verifyEmailOtp, setVerifyEmailOtp] = useState(false);

	const [clinetLocation, setClinetLocation] = useState({ lat: "", lon: "" });
	// const [currentAffairs, setCurrentAffairs] = useState(fetchCurrentAffairs);
	const [blinkFocus, setBlinkFocus] = useState(false);

	// const [currentAffairsFoucus, setCurrentAffairsFoucus] = useState(false);
	// const encryption = new Encryption();
	const [section, setSection] = useState("");
	const [subject, setSubject] = useState("");
	const chunklanguage = (ar) => {
		var array = ar[0].lan;
		const perChunk =
			ar[0].title == "Section III"
				? 1
				: ar[0].title == "Section II"
				? 2
				: 4; // items per chunk

		const result = array.reduce((resultArray, item, index) => {
			const chunkIndex = Math.floor(index / perChunk);

			if (!resultArray[chunkIndex]) {
				resultArray[chunkIndex] = []; // start a new chunk
			}

			resultArray[chunkIndex].push(item);

			return resultArray;
		}, []);
		return result;
	};
	const [examPattern, setExamPattern] = useState([]);

	function onExamPattern(id) {
		fetch(`${baseUrl()}/df/examPattern/${id}`, {
			method: "GET",
			headers: {
				Authorization: `${Cookies.get("token")}`,
			},
		})
			.then((response) => response.json())
			.then((data) => {
				setExamPattern(data.Data);
			});
	}

	const handleLink = (section, subject) => {
		setSubject(subject);
		setSection(section);

		document.getElementById("languageModal").click();
	};

	const langugageData = [
		{
			id: 1,
			title: "Section IA",
			lan: [
				"Assamese",
				"Hindi",
				"Marathi",
				"Tamil",
				"Bengali ",
				"Kannada",
				"Odia",
				"Telegu",
				"English",
				"Malayalam",
				"Punjabi",
				"Urdu",
				"Gujrati",
			],
		},
		{
			id: 2,
			title: "Section IB",
			lan: [
				"Arabic ",
				"German ",
				"Maithili",
				"Bodo  ",
				"Chinese  ",
				"Dogri",
				"French",
				"Italian ",
				"Japanese",
				"Kashmiri ",
				"Konkani",
				"Manipuri ",
				"Nepali ",
				"Persian ",
				"Russian ",
				"Santhali ",
				"Sindhi ",
				"Spanish ",
				"Sanskrit ",
				"Tibetan",
			],
		},

		{
			id: 3,
			title: "Section II",
			lan: [
				"Accountancy / Bookkeeping",
				"Agriculture",
				"Anthropology",
				"Biologyc / Biological Studies / Biotechnology / Biochemistry",
				"Business Studies",
				"Chemistry",
				"Environmental Studies",
				"Computer Science / Informative Practices",
				"Economics / Business Economics",
				"Engineering Graphics",
				"Fine Arts / Visual Arts / Commercial Art",
				"Geography / Geology",
				"History",
				"Home Science",
				"Knowledge Tradition Practices India",
				"Legal Studies",
				"Mass Media / Mass Communication",
				"Mathematics",
				"Performing Arts: i) Dance(Kathak / Bharatnatyam / Kathakali / Odissi / Kuchipudi / Manipuri), ii) Drama, iii) Music(Hindustani / Carnatic / Rabindra Sangeet / Percussion / Non-Percussion)",
				"Physical Education/National Cadet Corps(NCC)/Yoga",
				"Physics",
				"Political Science",
				"Psychology",
				"Sanskrit",
				"Sociology",
				"Teaching Aptitude",
			],
		},

		{
			id: 4,
			title: "Section III",
			lan: [
				"General Knowledge",
				"Current Affairs",
				"General Mental Ability",
				"Numerical Ability",
				"Quantitative Reasoning (Simple Application of Basic Mathematical Concept/Arithmetic/Algebra/Geometry/Mensuration/Statistics taught till class 8) ",
				"Logical and Analytical reasoning",
			],
		},
	];

	const [recClasses, setRecClasses] = useState([]);
	const [pack, setPack] = useState([]);
	const [isSeo, setIsSeo] = useState(false);
	const [quiz_id, setquizid] = useState("");
	const [course_id, setcourseid] = useState("");
	const [quiz_name, setName] = useState("");
	const [user_name, setUserName] = useState("");
	const navigate = useNavigate();

	const param = window.location.pathname;
	const [slideIndex, setSlideIndex] = useState(0);

	const [path, setPath] = useState("");

	const handleStartTest = (item) => {
		setPath(param.split("/registration")[1]);

		setquizid(item.quizId);
		setcourseid(item.courseId);
		setName(item.title);
		setIsSeo(true);
		document.getElementById("openquiz").click();
	};
	const onSubmit = (e) => {
		e.preventDefault();
		navigate("/StudentExamTestMcq", {
			state: {
				path: path,
				quizId: quiz_id,
				courseId: course_id,
				name: quiz_name,
				user_Name: user_name,
				email: email,
				mobile: mobile,
				seo: isSeo,
			},
		});
		document.getElementById("close_button").click();
	};
	useEffect(() => {
		console.log("call subscription api");
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
	useEffect(() => {
		axios
			.post(
				baseUrl() + "/getLiveRecClasses",
				{
					courseId: "1",
				},
				{
					headers: {
						"Acces-Control-Allow-Origin": "*",
						Client_ID: "MVOZ7rblFHsvdzk25vsQpQ==",
						// Authorization: `${Cookies.get('token')}`,
					},
				}
			)
			.then((response) => {
				console.log(response.data.Data);
				setRecClasses(response.data.Data);
			})
			.catch((e) => console.log(e));
	}, []);
	const [currentAffairs, setCurrentAffairs] = useState([]);
	const config = {
		"Access-Control-Allow-Origin": "*",
		Client_ID: "MVOZ7rblFHsvdzk25vsQpQ==",
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(
					`${baseUrl()}/df/findCurrentAffairs`,
					{
						method: "GET",
						headers: config,
					}
				);
				const data = await response.json();
				if (data.status === 200) setCurrentAffairs(data.result);
			} catch (err) {
				console.log(err);
			}
		};
		fetchData();
	}, []);
	useEffect(() => {
		axios.get(baseUrl() + "/df/findNewsEventDtls/1").then((response) => {
			if (response.status === 200) {
				setNewsData(response.data.result);
			}
		});
	}, []);
	useEffect(() => {
		const fetchStudentSpeak = async () => {
			try {
				const config = {
					"Access-Control-Allow-Origin": "*",
					Client_ID: "MVOZ7rblFHsvdzk25vsQpQ==",
					// Authorization: Cookies.get('token'),
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
	const { ref, inView, entry } = useInView({
		threshold: 0.1,
	});

	const location = {
		address:
			"37, 2nd bye lane, B.R.Mazumdar Path, BAGHORBORI, PANJABARI, GUWAHATI-781037, ASSAM",
		lat: 26.137485,
		lng: -91.824573,
	};

	const componentClicked = () => console.log("clicked");

	// FIXME:
	const failureFacebook = (response) => {
		console.log(response);
	};
	const responseFacebook = (res) => {
		console.log(res.email);

		const body = {};

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
					console.log("sucessfully", response);
					if (response.data.result.hasPerDtlsUpdated === false) {
						history("/register", {
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
						history("/studentDashboard");
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
	//   useEffect(() => {
	//     window.addEventListener("scroll", scrollHide);

	//     function scrollHide() {
	//       if (document.documentElement.scrollTop > 30) {
	//         // plane.style.opacity = "1";
	//         // plane.style.visibility = "visible";
	//         // plane.style.display = "block";
	//         plane.style.transform = "scale(1)";
	//       } else {
	//         // plane.style.opacity = "0";
	//         // plane.style.visibility = "hidden";
	//         // plane.style.display = "block";
	//         plane.style.transform = "scale(0)";
	//       }
	//     }
	//     const plane = document.querySelector(".plane");
	//     plane.addEventListener("click", (e) => {
	//       window.scrollTo(0, 0);
	//     });
	//   }, []);

	// useEffect(() => {
	//   fetch(`${baseUrl()}/df/findUserRole/2`, {
	//     method: 'GET',
	//     headers: {
	//       'Acces-Control-Allow-Origin': '*',
	//       Client_ID: 'MVOZ7rblFHsvdzk25vsQpQ==',
	//     },
	//   })
	//     .then((response) => response.json())
	//     .then((data) => {
	//       console.log('teacher', data.result)
	//       setAllTeachers(data.result)
	//     })
	// }, [])

	useEffect(() => {
		setTimeout(() => {
			const carousel = document.querySelectorAll(".carousel-item")[0];
			console.log(carousel);

			carousel.classList.add("active");
		}, 1000);
	}, []);

	useEffect(() => {
		document.body.style.overflow = "visible";
	}, []);

	useEffect(() => {
		if (Cookies.get("token") !== null) {
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
		// window.history.pushState({}, document.title, "/");
		console.log(paramsString, res, prompt, code);
		// console.log(window.opener);
		// for google Auth
		if (prompt) {
			// window.top.location = "http://localhost:3000/registration/";
			// post request
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
					console.log("response:");
					console.log(response.data.access_token);
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

	useEffect(() => {
		navigator.geolocation.getCurrentPosition((position) => {
			setClinetLocation({
				lat: position.coords.latitude.toFixed(2),
				lon: position.coords.longitude.toFixed(2),
			});
		});
	}, []);

	function emailValidations() {
		if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
			setEmailValidation(true);
		} else {
			if (email.length !== 0) {
				alert("You have entered an invalid email address!");
			}

			setEmailValidation(false);
		}
	}

	// function PasswordChecker() {
	//   if (
	//     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
	//       password,
	//     )
	//   ) {
	//     setPassChecker(true)
	//   } else {
	//     setPassChecker(false)
	//   }
	// }

	function formValidation() {
		if (
			email.length > 0 &&
			firstName.length > 0 &&
			lastName.length > 0 &&
			password.length > 0 &&
			verifyEmailOtp &&
			confirmPassword.length > 0 &&
			mobile.length > 0 &&
			whatsappNumber.length > 0 &&
			course &&
			passChecker &&
			password === confirmPassword
		) {
			setRegisterActive((prev) => !prev);
			console.log(registerActive);
		} else {
			alert("Complete all the details first \n Some fields are missing");
		}
	}

	const onClose = () => {
		setVerifyOtp(false);
		setSendOtp(false);
	};
	const [otpSent, setOtpSent] = useState(false);

	function onExamPattern(id) {
		onExamPattern(1);
		console.log(id, "hhhhhhhhhhhhhhs");

		fetch(`${baseUrl()}/df/examPattern/${id}`, {
			method: "GET",
			headers: {
				Authorization: `${Cookies.get("token")}`,
			},
		})
			.then((response) => response.json())
			.then((data) => {
				setExamPattern(data.Data);
				console.log(setExamPattern, "hhhhhhhhhhhhhhs");
			});
	}
	useEffect(() => {
		console.log(profileData, "hhhhhhhhhhhhhhs");

		if (profileData?.courseBeans?.length) {
			onExamPattern(profileData?.courseBeans[0].courseId);
		}
	}, [profileData]);

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
				alert(e);
				setLoading(false);
			});
	};
	useEffect(() => {
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
					console.log("items", response.data);
					setCourseDetails(response.data.Data);
					// window.location.reload()
				} else {
					setCourseDetails([]);
				}
			})
			.catch((e) => {
				console.log(e);
				alert("Please Check Details");
				setCourseDetails([]);
				setLoading(false);
			});
	}, []);
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
					console.log("items", response.data);
					setCourseDetails(response.data.Data);
					// window.location.reload()
				} else {
					setCourseDetails([]);
				}
			})
			.catch((e) => {
				console.log(e);
				alert("Please Check Details");
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
				console.log(response.status);
				console.log(response.data.status);
				console.log(
					"response",
					response.data.result.userLoginResBean.email
				);
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
					history("/studentDashboard");
					const modal = document.querySelector(".modal-open");

					// document.querySelector("body").classList.remove("modal-open");
					// document.querySelector("body").style.overflow = "visible";
					// modal.style.display = "none";
					modal.remove();
					window.location.reload();
				}
			})
			.catch((e) => {
				setLoading(false);
				setPassword("");
				alert("Invalid login Details");
			});
	};

	const onSendOtp = (id) => {
		setOtpSent(true);
		axios
			.post(baseUrl() + `/wl/sendOTP`, {
				EmailId: EncryptText(email),
				OtpType: `${id}`,
			})
			.then((response) => {
				console.log("res", response.data.ResultCode);
				if (
					response.status == "200" &&
					response.data.ResultCode == "200"
				) {
					setSendOtp(true);
					setOtpBox(true);
				} else {
					alert(response.data.ResultMessage);
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
					alert(response.data.ResultMessage);
				}
			})
			.catch((e) => {
				setLoading(false);
				alert(e);
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
					alert(response.data.ResultMessage);
				}
			});
	};
	const [studentSpeak, setStudentSpeak] = useState([]);

	useEffect(() => {
		const fetchStudentSpeak = async () => {
			try {
				const config = {
					"Access-Control-Allow-Origin": "*",
					Client_ID: "MVOZ7rblFHsvdzk25vsQpQ==",
					Authorization: Cookies.get("token"),
				};

				const { data, status } = await axios.post(
					`${baseUrl()}/df/studentSpeak`,
					{},
					{ headers: config }
				);
				if (status === 200) setStudentSpeak(data.Data);
			} catch (error) {
				console.log(error);
			}
		};
		fetchStudentSpeak();
	}, []);
	const handleDisabled = () => {
		if (mobile && email) {
			return false;
		}
		return true;
	};
	const authHandler = async () => {
		// let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
		// width=500,height=600,left=500,top=500`;
		let params = "";
		let open = "_self";
		window.open(
			`https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_CLIENT_URL}&scope=https://www.googleapis.com/auth/userinfo.profile%20https://www.googleapis.com/auth/userinfo.email&response_type=code`,
			open,
			params
		);
		// console.log(popup);

		window.onmessage = async (message) => {
			console.log("message", message);
			window.location.reload();
		};
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
				console.log("Login success>>");
				console.log(res);
				console.log(res.data);
				if (res.data) Cookies.set("google_access_token", null);

				onLoginSuccess(res.data);
			}
		}
	}

	// FIXME:
	const onLoginSuccess = (res) => {
		console.log("Login Success:", res);

		const body = {
			email: res.emailAddresses[0].value,
			name: res.names[0].givenName,
			lastname: res.names[0].familyName,
			source: "Google",
			uid: res.resourceName,
			latitude: clinetLocation.lat,
			longitude: clinetLocation.lon,
		};
		// console.log(res.names[0].givenName);

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
				console.log("sucessfully  Google Response", response);
				if (response.data.result.hasPerDtlsUpdated === false) {
					history("/register", {
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
					history("/studentDashboard");
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

	const onLoginFailure = (res) => {
		console.log("Login Failed:", res);
	};

	function animateValue(obj, start, end, duration) {
		let startTimestamp = null;
		const step = (timestamp) => {
			if (!startTimestamp) startTimestamp = timestamp;
			const progress = Math.min(
				(timestamp - startTimestamp) / duration,
				1
			);
			obj.innerHTML = Math.floor(progress * (end - start) + start);
			if (progress < 1) {
				window.requestAnimationFrame(step);
			}
		};
		window.requestAnimationFrame(step);
	}

	const handleOnlyLetters = (event, name) => {
		const result = event.target.value.replace(/[^a-z]/gi, "");

		if (name === "first") {
			setFirstName(result);
		} else if (name === "last") {
			setLastName(result);
		}
	};

	//
	function showFaqAns(targetId) {
		const targetModal = document.getElementById(targetId);
		targetModal.style.display = "block";
	}

	function hideFaqAns(targetId) {
		const targetModal = document.getElementById(targetId);
		targetModal.style.display = "none";
	}

	const [currentAffairsFlag, setCurrentAffairsFlag] = useState(false);
	const [currentAffairsFoucus, setCurrentAffairsFoucus] = useState(false);

	useEffect(() => {
		axios.get(baseUrl() + "/df/findNewsEventDtls/1").then((response) => {
			if (response.status === 200) {
				setNewsData(response.data.result);

				setNewsBlink(response.data.newsToBlink);
				// setNewsBlink(true);
			}
		});
	}, []);

	useEffect(() => {
		fetch(`${baseUrl()}/df/findCurrentAffairs`, {
			method: "GET",
			headers: {
				"Access-Control-Allow-Origin": "*",
				Client_ID: "MVOZ7rblFHsvdzk25vsQpQ==",
			},
		})
			.then((response) => response.json())
			.then((data) => {
				console.log("findCurrentAffairs", data.result);
				if (data.status === 200) {
					console.log(data.newsToBlink, ">>>>>>>>>>>>");
					setCurrentAffairsFlag(data.newsToBlink);
					// setCurrentAffairsFlag(true);
				}
			});
	}, []);

	useEffect(() => {
		let timer;
		if (currentAffairsFoucus) {
			timer = setTimeout(() => {
				setCurrentAffairsFoucus(false);
				setCurrentAffairsFlag(false);
				setNewsBlink(false);
			}, 5000);
		}
		return () => {
			clearTimeout(timer);
		};
	}, [currentAffairsFoucus]);

	useEffect(() => {
		let timer;
		setCurrentAffairsFoucus(false);
		if (currentAffairsFlag) {
			timer = setTimeout(() => {
				setCurrentAffairsFoucus(true);
				console.log("Foucs BLink ACtive");
			}, 6000);
		} else setCurrentAffairsFoucus(false);

		return () => {
			clearTimeout(timer);
		};
	}, [currentAffairsFlag]);

	useEffect(() => {
		axios
			.post(baseUrl() + "/df/getAllFreeQuizByCourse", {
				courseId: 1,
			})
			.then((response) => {
				if (response.status === 200) {
					const data = response.data.Data;
					console.log(data, "res....");
					setCourseData(data);
				}
			});
	}, []);

	const data = [
		{
			id: 1,
			url: `https://cdnasb.samarth.ac.in/site/CUETUG2022IB.pdf`,
			title: "  Information Bulletin",
		},
		{
			id: 2,
			url: `https://cuet.samarth.ac.in/index.php/site/syllabus`,
			title: "   Syllabus",
		},
		{
			id: 3,
			url: `https://cuet.samarth.ac.in/index.php/app/info/universities`,
			title: " Universities",
		},
		{
			id: 4,
			url: `https://cdnasb.samarth.ac.in/site/CUET2022ApplicationGuide.pdf`,
			title: " Application Guide",
		},
		{
			id: 5,
			url: `https://cdnasb.samarth.ac.in/site/FAQCUET2022.pdf`,
			title: "  FAQ’s",
		},
		{
			id: 6,
			url: `https://cuet.samarth.ac.in/index.php/site/contact`,
			title: " Contact us",
		},
	];
	const handleClose = () => {
		setFirstName("");
		setEmail("");

		setMobile("");

		// setAgree(false)
		setPassword("");
		setConfirmPassword("");
	};
	const handleClick = (item) => {
		Swal.fire({
			title: "You are being redirected to an external website.",
			showCancelButton: true,
			confirmButtonText: "OK",
			denyButtonText: `Cancle`,
		}).then((result) => {
			/* Read more about isConfirmed, isDenied below */
			if (result.isConfirmed) {
				window.open(`${item}`, "_blank");

				// Swal.fire("Saved!", "", "success");
			} else if (result.isDenied) {
				Swal.fire("Changes are not saved", "", "info");
			}
		});
	};
	const [ContactUs, setContactUs] = useState("");

	useEffect(() => {
		fetch(`${baseUrl()}/df/getContactSupport`, {
			method: "GET",
			headers: {
				"Acces-Control-Allow-Origin": "*",
				Client_ID: "MVOZ7rblFHsvdzk25vsQpQ==",
			},
		})
			.then((response) => response.json())
			.then((result) => {
				{
					console.log("day", result);
				}
				if (result.ResultCode === "200") {
					{
						console.log("day", result.Data);
					}
					setContactUs(result.Data[0]);
					// setFaqQuestions(result.Data);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);
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
	const styles = {
		container: { paddingTop: "6.25rem", paddingBottom: "6.25rem" },
		video: { width: "100%", height: "100%" },
	};
	// useEffect(() => {
	//   document.head.innerHTML += `
	//   <meta name='og:description' content='My description value!!!'/>
	//   <meta name='keywords' content='My keywords!!!'/>
	//   `;
	// }, []);

	return (
		<>
			<Helmet>
				<meta charSet='utf-8' />
				<meta name='keyword' content='CUET 2023 Application Form' />
				<meta
					name='description'
					content='CUET Registration Started. You Can Fill CUET 2023 Application Form till 12th March 2023. Common University Entrance Test (CUET) will be conducted by the National Testing Agency (NTA). '
				/>
				<title>
					CUET 2023 Application Form: CUET Registration Started
				</title>
				<link
					rel='canonical'
					href='https://besst.in/registration/blog/2023/dynamic/cuet-application-form'
				/>
			</Helmet>

			<Header
				profileData={profileData}
				newsBlink={newsBlink}
				blinkFocus={blinkFocus}
				currentAffairsFoucus={currentAffairsFoucus}
				currentAffairsFlag={currentAffairsFlag}
				onRegisterClick={onRegisterClick}
			/>

			<section
				className='container-fluid bg-white'
				style={{ padding: 0, marginTop: "89px" }}
			>
				<RegistrationModal
					name={firstName}
					email={email}
					mobile={mobile}
					password={password}
					confirm={confirmPassword}
					close={handleClose}
				/>

				<div
					class='modal fade'
					id='ReviewsModal'
					aria-labelledby='#ReviewsModal'
					tabIndex='-1'
					aria-hidden='true'
				>
					<div class='modal-dialog modal-lg modal-dialog-scrollable'>
						<div class='modal-content'>
							<div class='modal-header'>
								{/* <h5 class="modal-title" id={`currentAffairs${i}Label`}> */}
								Reviews Feedback & Suggestion of BESST
								{/* </h5> */}
								<button
									type='button'
									data-dismiss='modal'
									class='btn-close'
									data-bs-dismiss='modal'
									aria-label='Close'
								></button>
							</div>
							<div class='modal-body'>
								<div
									className='d-flex text-center gap-2 justify-content-evenly'
									style={{ flexWrap: "wrap" }}
								>
									{studentSpeak.map((item, i) => (
										<div
											key={i}
											className='bg-white w-100 mx-3 border rounded overflow-hidden'
										>
											<div className='ratio ratio-16x9'>
												<iframe
													src={item.videoUrl}
													title={item?.name}
													style={styles.video}
													className='yb-player-icon'
													frameborder='0'
												></iframe>
											</div>
											<div className='p-4 fw-bolder'>
												<div>{item?.name}</div>
												<div>{item.textContent}</div>
											</div>
										</div>
									))}
								</div>
							</div>
							<div
								className='modal-footer justify-content-center '
								style={{
									fontWeight: "800",
									fontSize: "20px",
								}}
							>
								<a
									href='https://www.youtube.com/channel/UCOWq3a0_HYLFYj7ZqWAjSeA'
									target='_blank'
								>
									For More Videos Please Visit&#160;
									<ImYoutube2 size={55} color='red' /> Channel
								</a>
							</div>
						</div>
					</div>
				</div>
				<div
					className='modal fade'
					id='classNameModal'
					tabIndex='-1'
					aria-labelledby='classNameModalLabel'
					aria-hidden='true'
				>
					<div className='modal-dialog modal-dialog-scrollable downloadModal'>
						<div className='modal-content'>
							{/* <img src={Logo} className="water-mark-quiz"></img> */}

							<div className='modal-header'>
								<h5
									className='modal-title main-color'
									id='classNameModalLabel'
								>
									Recorded Live Classes
								</h5>
								<button
									type='button'
									className='btn-close'
									data-bs-dismiss='modal'
									aria-label='Close'
									// style={{ zIndex: 999 }}
								></button>
							</div>
							<div className='modal-body'>
								<div style={{ textAlign: "left" }}>
									<div
										className='row'
										style={{
											paddingBottom: "3%",
											paddingLeft: "5%",
										}}
									>
										{console.log(recClasses, "recClasses")}

										{recClasses.map((items, index) => (
											<VideoData
												url={items.videoUrl}
												title={items.videoTitle}
												key={index}
											/>
										))}
									</div>
								</div>
							</div>
							{/* <button
                style={{ margin: "auto", marginBottom: "30px", zIndex: 999 }}
                className="btn main-btn"
                data-bs-toggle="modal"
                data-bs-target="#classNameChoosen"
              >
                Back
              </button> */}
						</div>
					</div>
				</div>
				<button
					id='openquiz'
					data-bs-toggle='modal'
					data-bs-target='#quizModal'
					style={{ display: "none" }}
				></button>
				<div
					className='modal fade'
					id='quizModal'
					tabIndex='-1'
					aria-labelledby='loginModalLabel'
					aria-hidden='true'
				>
					<div className='modal-dialog'>
						<div className='modal-content'>
							<div
								className='modal-header text-center'
								style={{ borderBottom: "none" }}
							>
								<button
									type='button'
									className='btn-close'
									data-bs-dismiss='modal'
									aria-label='Close'
								></button>
							</div>
							<h5
								className='modal-title text-center'
								id='QuizModalLabel'
							>
								Please enter following details review your{" "}
								<br /> <p style={{ color: "purple" }}>{name}</p>{" "}
							</h5>
							<div className=''>
								<form
									style={{ border: "none" }}
									onSubmit={onSubmit}
								>
									<div className='input-group mb-3'>
										<input
											style={{
												padding: "14px",
												backgroundColor: "#FCFCFC",
												fontWaight: 400,
												fontSize: "16px",
												lineHeight: "22px",
											}}
											id='name'
											type='text'
											className='form-control'
											placeholder='Name'
											required
											onChange={(e) =>
												setUserName(e.target.value)
											}
										/>
									</div>

									<div className='input-group mb-3'>
										<input
											style={{
												padding: "14px",
												backgroundColor: "#FCFCFC",
												fontWaight: 400,
												fontSize: "16px",
												lineHeight: "22px",
											}}
											id='email'
											type='email'
											className='form-control'
											placeholder='Email'
											required
											onChange={(e) =>
												setEmail(e.target.value)
											}
										/>
									</div>
									<div className='input-group mb-3'>
										<input
											style={{
												padding: "14px",
												backgroundColor: "#FCFCFC",
												fontWaight: 400,
												fontSize: "16px",
												lineHeight: "22px",
											}}
											id='mobile'
											type='number'
											required
											className='form-control'
											placeholder='Mobile No'
											onChange={(e) =>
												setMobile(e.target.value)
											}
										/>
									</div>

									<button
										type='submit'
										className='btn main-btn '
										style={{ width: "100%" }}
										data-bs-dismiss='modal'
									>
										{loading ? "Please Wait.." : "CONFIRM"}
									</button>
								</form>
							</div>
						</div>
					</div>
				</div>
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
								<h5
									className='modal-title'
									id='loginModalLabel'
								>
									Login
								</h5>
								<button
									type='button'
									className='btn-close'
									data-bs-dismiss='modal'
									aria-label='Close'
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
											type={
												isPassed ? "text" : "password"
											}
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
                    <div class="google-btn">
                      <div class="google-icon-wrapper">
                        <div style={{ position: "relative", height: "100%" }}>
                          <img class="google-icon" src={google_icon} />
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
										// to="/studentDashboard"
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

				{/*  */}
				<div
					class='modal fade '
					id='subscriptionModal'
					tabIndex='-1'
					aria-labelledby='exampleModalLabel'
					aria-hidden='true'
				>
					<div
						class='modal-dialog modal-lg'
						style={{
							maxWidth: "100%",
							margin: "100px",
							top: 0,
							bottom: 0,
							left: 0,
							right: 0,
							height: "90vh",
							display: "flex",
						}}
					>
						<div class='modal-content '>
							<div class='modal-header'>
								<button
									type='button'
									class='btn-close'
									data-bs-dismiss='modal'
									aria-label='Close'
								></button>
							</div>
							<div
								class='modal-body'
								style={{ overflowX: "scroll" }}
							>
								<div id='generic_price_table'>
									<section className='gate'>
										<div className='container'>
											<div
												className='row no-gutters'
												style={{
													display: "flex",
													position: "relative",
													gap: "10px",
												}}
											>
												<div className='col-md-12'>
													<h3 className='text-center subscription_head'>
														Subscription Packs
													</h3>
													<p className='text-center subscription_txt'>
														View our range of Packs
														available with different
														features
													</p>
												</div>
												<Swiper
													allowTouchMove={false}
													spaceBetween={10}
													loop={true}
													loopFillGroupWithBlank={
														true
													}
													longSwipes={false}
													breakpoints={{
														// when window width is <= 499px
														560: {
															slidesPerView: 1,
															spaceBetweenSlides: 50,
														},

														880: {
															slidesPerView: 3,
															spaceBetweenSlides: 50,
														},
														// when window width is <= 999px
														999: {
															slidesPerView: 3,
															spaceBetweenSlides: 50,
														},
														1165: {
															slidesPerView: 3,
															spaceBetweenSlides: 50,
														},
													}}
													navigation={true}
													modules={[
														Pagination,
														Navigation,
													]}
													onSlideChange={() => {
														setSlideIndex(
															slideIndex + 1
														);
													}}
													onSwiper={(swiper) =>
														console.log(swiper)
													}
													className='custom-slider'
												>
													{pack?.map(
														(item, index) => {
															console.log(
																item,
																"ITEMS>>"
															);
															let domainCount1 =
																item.avlDomainSubjects?.filter(
																	(x) =>
																		x.specialInstruction ===
																		true
																).length;
															let langCount1 =
																item.avlLangSubjects?.filter(
																	(x) =>
																		x.specialInstruction ===
																		true
																).length;
															let selLang =
																item.avlLangSubjects?.filter(
																	(x) =>
																		x.selection ===
																		true
																).length;
															let selDomain =
																item.avlDomainSubjects?.filter(
																	(x) =>
																		x.selection ===
																		true
																).length;

															let domainSub1 = [];
															item.avlDomainSubjects?.filter(
																(x) => {
																	if (
																		x.specialInstruction ||
																		x.selection
																	) {
																		domainSub1.push(
																			x.topicName
																		);
																		return x.topicName;
																	}
																}
															);

															return (
																<SwiperSlide>
																	<div
																		key={
																			index
																		}
																		className=' card_pack'
																	>
																		<div className='card_body pt-5'>
																			{item.tagLine && (
																				<div class='ribbon-pop'>
																					{
																						item.tagLine
																					}
																				</div>
																			)}
																			<div className='card_title'>
																				<p>
																					{
																						item.subscriptionName
																					}
																				</p>
																			</div>
																			{/* <p>Lorem ipsum dolor sit amet,con sectetur adipiscing elit.</p> */}
																			<div className='price_chart'>
																				<p>
																					<span>
																						{
																							item.actualPriceLbl
																						}
																					</span>
																					<span>
																						<strike>
																							Rs.{" "}
																							{
																								item.actualPrice
																							}
																						</strike>
																					</span>
																					<br />
																					<span className='discount_col'>
																						{" "}
																						{
																							item.discount
																						}

																						%
																						off{" "}
																					</span>
																					<span>
																						{item.discountedPriceLbl +
																							item.discountedPrice}
																					</span>
																					<br />

																					(
																					{item.packValidityLbl +
																						" " +
																						item.packValidity}

																					)
																				</p>
																			</div>
																			<div className='pack_inclusion'>
																				<p>
																					{
																						item.packInclusionLbl
																					}
																				</p>
																				<ul>
																					{item.packInclusions.map(
																						(
																							pack,
																							index
																						) => {
																							if (
																								index <
																								2
																							) {
																								return (
																									<li>
																										<div className='pack_img'>
																											<svg
																												width='12'
																												height='13'
																												viewBox='0 0 12 13'
																												fill='none'
																												xmlns='http://www.w3.org/2000/svg'
																											>
																												<path
																													fill-rule='evenodd'
																													clip-rule='evenodd'
																													d='M5.45868 0.514199C4.29978 0.627727 3.22869 1.05491 2.28957 1.77812C1.83224 2.1303 1.23834 2.79217 0.895123 3.33209C0.746898 3.56527 0.45836 4.15615 0.354997 4.43814C0.239427 4.75346 0.116251 5.23532 0.0556371 5.60922C-0.0185457 6.06685 -0.0185457 6.93573 0.0556371 7.39336C0.160526 8.0403 0.326451 8.56329 0.610458 9.14229C0.920758 9.77484 1.24341 10.2232 1.76008 10.7399C2.27678 11.2566 2.72516 11.5792 3.35771 11.8895C3.93671 12.1735 4.4597 12.3395 5.10664 12.4444C5.56427 12.5185 6.43315 12.5185 6.89078 12.4444C7.53772 12.3395 8.06071 12.1735 8.63971 11.8895C9.27226 11.5792 9.72064 11.2566 10.2373 10.7399C10.754 10.2232 11.0767 9.77484 11.387 9.14229C11.5931 8.72213 11.6967 8.44676 11.8078 8.0245C11.9556 7.46217 11.9931 7.15391 11.9931 6.50129C11.9931 5.84867 11.9556 5.54041 11.8078 4.97808C11.6967 4.55582 11.5931 4.28045 11.387 3.86029C11.0767 3.22774 10.754 2.77936 10.2373 2.26266C9.72064 1.74599 9.27226 1.42334 8.63971 1.11304C8.06127 0.829288 7.52793 0.660006 6.90252 0.56162C6.55745 0.507345 5.78694 0.482038 5.45868 0.514199ZM9.14312 3.92428C9.26054 3.96034 9.43969 4.13793 9.48922 4.26743C9.54662 4.41746 9.54087 4.61235 9.47504 4.74832C9.40116 4.90094 5.53685 8.73663 5.36168 8.83124C5.19397 8.92181 4.9959 8.92181 4.82794 8.83124C4.72849 8.77762 2.94851 7.1834 2.64588 6.8769C2.52773 6.75724 2.46895 6.61111 2.47113 6.4426C2.47578 6.0873 2.73486 5.84766 3.08704 5.87285C3.17155 5.87891 3.27454 5.90135 3.31588 5.92271C3.37839 5.95504 4.56513 7.02188 4.94851 7.3904L5.06037 7.4979L6.81481 5.74601C7.77978 4.78248 8.60328 3.97713 8.64483 3.95635C8.80749 3.87496 8.95217 3.86564 9.14312 3.92428Z'
																													fill='#008B38'
																												/>
																											</svg>
																										</div>
																										{
																											pack
																										}
																									</li>
																								);
																							} else if (
																								index ===
																								2
																							) {
																								return (
																									<li className='features'>
																										<Link
																											to=''
																											onClick={() =>
																												setPackInc(
																													item.packInclusions
																												) +
																												setTitle(
																													item.packInclusionLbl
																												)
																											}
																											data-bs-toggle='modal'
																											data-bs-target='#subModal'
																										>
																											View
																											More
																										</Link>
																									</li>
																								);
																							}
																						}
																					)}
																				</ul>
																			</div>

																			{item.avlDomainSubjectsLbl && (
																				<button
																					className='outline-btn mt-4'
																					onClick={() =>
																						showModal(
																							item.subscriptionId,
																							item.avlDomainSubjectsLbl,
																							"showDomain"
																						)
																					}
																					data-bs-toggle='modal'
																					data-bs-target='#subModal'
																				>
																					Domain
																					Subjects
																				</button>
																			)}
																			{item
																				.avlLangSubjects
																				?.length && (
																				<button
																					className='outline-btn mt-3'
																					onClick={() =>
																						showModal(
																							item.subscriptionId,
																							item.avlLangSubjectsLbl,
																							"showLang"
																						)
																					}
																					data-bs-toggle='modal'
																					data-bs-target='#subModal'
																				>
																					Select
																					Languages
																				</button>
																			)}

																			{domainCount1 ||
																			(selDomain &&
																				item.subscribedFlag) ? (
																				<>
																					<p className='mt-3 mb-1'>
																						<strong>
																							Subjects
																							Opted:
																						</strong>
																					</p>
																					<p>
																						{domainSub1.join(
																							", "
																						)}
																					</p>
																				</>
																			) : (
																				""
																			)}

																			{langCount1 ||
																			(selLang &&
																				item.subscribedFlag) ? (
																				<>
																					<p className='mt-3 mb-1'>
																						<strong>
																							Languages
																							Opted:
																						</strong>
																					</p>
																					<p>
																						{item.avlLangSubjects.map(
																							(
																								domain,
																								key
																							) => (
																								<span>
																									{domain.specialInstruction ||
																									domain.selection
																										? domain.topicName
																										: " "}
																								</span>
																							)
																						)}
																					</p>
																				</>
																			) : (
																				""
																			)}

																			{/* <div className="pack_inclusion">
                        {item.packInclusions.map((inclusion) => (
                          <p className="m-0">{inclusion}</p>
                        ))}
                      </div> */}
																		</div>
																		{/* {setSelCount(item.avlDomainSubjects.map((sub) => (sub.specialInstruction === true)))} */}
																		{item.subscriptionName ===
																		"Free Pack" ? (
																			<div className='card_footer justify-content-center'>
																				<p className='m-0'>
																					ENJOY
																					FREE
																					CLASSES!
																				</p>
																			</div>
																		) : (
																			<div className='card_footer justify-content-between'>
																				<div className='text-start'>
																					<span>
																						<BiRupee />
																						<strike>
																							{domainCount1 &&
																							item.defaultDomainSubjCount ===
																								1
																								? parseFloat(
																										item.actualPrice
																								  ) *
																								  parseFloat(
																										domainCount1
																								  )
																								: item.actualPrice}
																							{/* {item.actualPrice} */}
																						</strike>
																						<span className='discount_col'>
																							{" "}
																							{
																								item.discount
																							}

																							%
																							off
																						</span>
																					</span>

																					{item.subscriptionId ===
																						2 &&
																					item.defaultDomainSubjCount ? (
																						domainCount1 ||
																						langCount1 ? (
																							<p className='mb-0'>
																								<span>
																									{Math.trunc(
																										item.discountedPrice
																									)}{" "}
																									x{" "}
																									{
																										domainCount1
																									}
																									{langCount1
																										? "+ " +
																										  Math.trunc(
																												item.discountedPricePerAddOnSubj
																										  ) +
																										  " x " +
																										  langCount1
																										: ""}{" "}
																									=
																									<BiRupee />
																									{Math.trunc(
																										item.discountedPrice
																									) *
																										parseFloat(
																											domainCount1
																										) +
																										Math.trunc(
																											item.discountedPricePerAddOnSubj
																										) *
																											parseFloat(
																												langCount1
																											)}
																								</span>
																							</p>
																						) : (
																							<p className='mb-0'>
																								<BiRupee />{" "}
																								{
																									item.discountedPrice
																								}
																							</p>
																						)
																					) : (
																						// : domainCount1 || langCount1
																						//   ? <p className="mb-0">
																						//     <span>
																						//       {Math.trunc(item.discountedPricePerAddOnSubj)} x {langCount1} +
																						//       {Math.trunc(item.discountedPrice)} x {domainCount1} =
																						//       <BiRupee />{Math.trunc(item.discountedPrice) * parseFloat(domainCount1)}
																						//     </span>
																						//   </p>
																						<p className='mb-0'>
																							<BiRupee />{" "}
																							{
																								item.discountedPrice
																							}
																						</p>
																					)}
																				</div>
																				<button
																					data-bs-toggle='modal'
																					data-bs-target='#loginModal'
																					className='btn main-btn'
																				>
																					{item.allowSubscription
																						? item.btnText
																						: item.subsLockMsg}
																				</button>
																			</div>
																		)}
																	</div>
																</SwiperSlide>
															);
														}
													)}
												</Swiper>
											</div>
										</div>
									</section>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div
					style={{ position: "relative" }}
					className='row banner mt-5 no-gutters d-flex justify-content-between'
				>
					<img className='ellips' style={{}} src={Ellipse} />
					<img className='ellips1' style={{}} src={Ellipse} />
					<img className='ellips2' style={{}} src={Ellipse1} />

					<div
						className='col-md-6 col-sm-12 px-lg-5  banner-content'
						style={{ display: "flex", justifyContent: "center" }}
					>
						<div className='px-5  ' style={{ marginTop: "5%" }}>
							<div>
								<p
									style={{
										fontSize: "32px",
										fontWeight: "600",
										lineHeight: "42px",
										fontFamily: "poppins",
										color: "white",
									}}
								>
									CUET 2023 APPLICATION FORM
								</p>
								<p
									style={{
										fontSize: "18px",
										fontWeight: "400",
										lineHeight: "26px",
										fontFamily: "poppins",
										color: "white",
									}}
								>
									Edited By BESST | Updated on March 30 2023 -
									9:57 a.m. IST | #CUET
								</p>
							</div>
							<div className='button_container'>
								<button
									className='subscribe_button'
									data-bs-toggle='modal'
									data-bs-target='#subscriptionModal'
								>
									SUBSCRIBE TO PREMIUM
								</button>
								<button
									className='Expert_name'
									data-bs-toggle='modal'
									data-bs-target='#registerModal'
								>
									SPEAK TO AN EXPERT
								</button>
							</div>
						</div>
					</div>
					<div
						className='col-md-5 px-lg-5 col-sm-12 banner-form '
						style={{ display: "flex", justifyContent: "start" }}
					>
						{/* carosel */}
						<div
							id='carouselExampleIndicators'
							class='carousel slide carousel-box'
							data-bs-ride='carousel'
						>
							<div class='carousel-indicators' style={{}}>
								<button
									style={{
										borderRadius: "50%",
										height: "10px",
										width: "12px",
										backgroundColor: "#7B1FA2",
									}}
									type='button'
									data-bs-target='#carouselExampleIndicators'
									data-bs-slide-to='0'
									class='active'
									aria-current='true'
									aria-label='Slide 1'
								></button>
								<button
									style={{
										borderRadius: "50%",
										height: "10px",
										width: "12px",
										backgroundColor: "#7B1FA2",
									}}
									type='button'
									data-bs-target='#carouselExampleIndicators'
									data-bs-slide-to='1'
									aria-label='Slide 2'
								></button>
								<button
									style={{
										borderRadius: "50%",
										height: "10px",
										width: "12px",
										backgroundColor: "#7B1FA2",
									}}
									type='button'
									data-bs-target='#carouselExampleIndicators'
									data-bs-slide-to='2'
									aria-label='Slide 3'
								></button>
							</div>
							<div class='carousel-inner'>
								<div class='carousel-item active'>
									<img
										style={{
											width: "422px",
											height: "299px",
										}}
										src={slider_img}
										class='d-block '
										alt='...'
									/>
								</div>
								<div class='carousel-item'>
									<img
										style={{
											width: "422px",
											height: "299px",
										}}
										src={slider_img1}
										class='d-block '
										alt='...'
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className='row no-gutters'>
					<div className='col-md-8'>
						<div className='px-5 pt-5 ' style={{ padding: "10px" }}>
							<h5 className='pb-2 heading'>
								About CUET 2023 APPLICATION FORM
							</h5>
							<p className='after-banner-text text-justify'>
								CUET 2023 APPLICATION FORM The CUET registration
								2023 Application form fill up has begun from 9th
								February 2023 and will close on 12 March 2023
								(up to 9.00 pm). NTA (National testing Agency)
								has started the CUET 2023 Application process at
								its official website cuet.samarth.ac.in . The
								CUET 2023 Application form fill up has begun for
								admission to undergraduate and integrated
								courses into Central Universities and other
								participating universities of the country.
							</p>{" "}
						</div>

						{/* <div className="px-5 pt-5 " style={{ padding: '10px' }}>
            <h5 className="pb-2 heading">CUET(UG)2023 Application Form</h5>
            <p className="after-banner-text">
              CUET REGISTRATION  2023 Application forms are to be tentatively released
              from 1st week of April. The National Testing Agency (NTA) will
              release CUET 2023 Application Form separately for UG and PG level
              courses. The CUET application form will be released through online
              mode and no other medium will be entertained.
            </p>{' '}
          </div> */}

						<div className=' mx-md-5 mt-3 px-5 pt-5 free-mock-test '>
							<div
								className=''
								style={{
									display: "flex",
									justifyContent: "space-between",
								}}
							>
								<div>
									<h1 className='heading'>
										Recorded Live classes
									</h1>
								</div>
								<div className='anchor_style'>
									<a
										data-bs-toggle='modal'
										data-bs-target='#classNameModal'
										style={{ textDecoration: "underline" }}
										href=''
									>
										VIEW ALL
									</a>
								</div>
							</div>

							<div className='d-flex'>
								<Swiper
									allowTouchMove={false}
									spaceBetween={30}
									loop={true}
									loopFillGroupWithBlank={true}
									longSwipes={false}
									breakpoints={{
										// when window width is <= 499px
										560: {
											slidesPerView: 1,
											spaceBetweenSlides: 30,
										},

										880: {
											slidesPerView:
												recClasses?.length < 3
													? recClasses?.length
													: 3,

											spaceBetweenSlides: 10,
										},
										// when window width is <= 999px
										999: {
											slidesPerView:
												recClasses?.length < 3
													? recClasses?.length
													: 3,

											spaceBetweenSlides: 10,
										},
										1165: {
											slidesPerView:
												recClasses?.length < 3
													? recClasses?.length
													: 3,

											spaceBetweenSlides: 10,
										},
									}}
									navigation={true}
									modules={[Pagination, Navigation]}
									onSlideChange={() => {
										setSlideIndex(slideIndex + 1);
									}}
									onSwiper={(swiper) => console.log(swiper)}
									className='custom-slider'
								>
									{recClasses?.map((items, index) => (
										<SwiperSlide>
											<VideoData
												url={items.videoUrl}
												title={items.videoTitle}
												key={index}
											/>
										</SwiperSlide>
									))}
								</Swiper>
							</div>
						</div>

						<div className='px-5 pt-5 ' style={{ padding: "10px" }}>
							<h5 className='pb-2 heading'>
								Important Instructions for filling in CUET 2023
								APPLICATION FORM:{" "}
							</h5>
							<p className='after-banner-text text-justify'>
								<ul>
									<li>
										The CUET REGISTRATION exam – 2023 will
										be conducted in the Computer Based Test
										(CBT) mode.
									</li>
									<li>
										Candidates can do Online Submission of
										Application Form between 09 February and
										12 March 2023 (Up to 09:00 P.M.).{" "}
									</li>
									<li>
										Candidates can make payments through
										Credit / Debit Card / Net-Banking / UPI.
										The Last date of successful transaction
										of fee is 12 March 2023 (up to 11:50
										P.M.).{" "}
									</li>
									<li>
										Correction in particulars will be made
										from 15 March to 18 March 2023 (Up to
										11:50 P.M.) only. After that no
										corrections will be made
									</li>
									<li>
										The Announcement of the City of
										Examination will be done on 30 April
										2023.{" "}
									</li>
									<li>
										The candidates can download the Admit
										Cards from the NTA website from the
										second week of the May 2023.{" "}
									</li>
									<li>
										The Date of Examination is 21 May 2023
										onwards.{" "}
									</li>
									<li>
										Display of Recorded Responses and Answer
										Keys will be announced later on the
										website.{" "}
									</li>
									<li>
										The Website(s) that can be referred for
										information and updates are
										www.nta.ac.in,
										https://cuet.samarth.ac.in/{" "}
									</li>
									<li>
										Declaration of Result on the NTA website
										will be announced later on the website.
									</li>
									<li>
										Candidates must carefully refer and
										research the eligibility requirements of
										the programmes offered by various
										Central Universities and participating
										Universities / Organizations before
										filling the application form
									</li>
								</ul>
							</p>{" "}
						</div>

						<div className=' pt-3 px-5'>
							<div className='row  no-gutters study-banner px-2 pt-4'>
								<div className='col-md-8'>
									<h1 className='study-banner-heading'>
										Study with CUET experts, Best online
										coaching for CUET
									</h1>
									<h1 className='study-banner-subheading'>
										The study material available for the
										central universities entrance test
										(CUET) and the question papers are in
										the format of the exam conducted by The
										NTA (National Testing Agency).
									</h1>
									<div>
										<button
											className='join_button'
											data-bs-toggle='modal'
											data-bs-target='#registerModal'
										>
											JOIN OUR EXPERTS
										</button>
									</div>
								</div>
								<div className=' col-md-4'>
									<div className='mt-2'>
										<img src={img_frame} />
									</div>
								</div>
							</div>
						</div>

						<div className=' mx-md-5 mt-3 px-5 pt-5 free-mock-test '>
							<div
								className=''
								style={{
									display: "flex",
									justifyContent: "space-between",
								}}
							>
								<div>
									<h1 className='heading'>Free Mock Tests</h1>
								</div>
								<div className='anchor_style'>
									<a
										onClick={() =>
											navigate("/ViewAllExamTest", {
												state: {
													quiz_name: quiz_name,
													couresData: couresData,
												},
											})
										}
										style={{
											textDecoration: "underline",
											cursor: "pointer",
										}}
										href=''
									>
										VIEW ALL
									</a>
								</div>
							</div>

							<div className='d-flex'>
								<Swiper
									allowTouchMove={false}
									spaceBetween={30}
									loop={true}
									loopFillGroupWithBlank={true}
									longSwipes={false}
									breakpoints={{
										// when window width is <= 499px
										560: {
											slidesPerView: 1,
											spaceBetweenSlides: 30,
										},

										880: {
											slidesPerView: 3,
											spaceBetweenSlides: 10,
										},
										// when window width is <= 999px
										999: {
											slidesPerView: 3,
											spaceBetweenSlides: 10,
										},
										1165: {
											slidesPerView: 3,
											spaceBetweenSlides: 10,
										},
									}}
									navigation={true}
									modules={[Pagination, Navigation]}
									onSlideChange={() => {
										setSlideIndex(slideIndex + 1);
									}}
									onSwiper={(swiper) => console.log(swiper)}
									className='custom-slider'
								>
									{couresData?.map((item) => (
										<SwiperSlide>
											<div
												class='card course-card'
												style={{ width: "15rem" }}
											>
												<div class='card-body'>
													<h1 class='card-heading card-title'>
														{item.courseName}
													</h1>
													<h1 class='card-subheading  card-subtitle mb-2 text-muted'>
														{item.title}
													</h1>
													<p class='card-description card-text'>
														Sed ut perspiciatis unde
														omnis iste natus error
														sit voluptatem
														accusantium{" "}
													</p>
													<a
														onClick={() =>
															handleStartTest(
																item
															)
														}
														href='#'
														class=' course-card-link card-link'
													>
														START TEST ➤
													</a>
												</div>
											</div>
										</SwiperSlide>
									))}
								</Swiper>
							</div>
						</div>

						<div className=' pt-5 px-5' style={{ padding: "10px" }}>
							<div className='row no-gutters  startNow-banner px-2 pt-4'>
								<div className='col-md-8 px-lg-5'>
									<h1 className='startNow-banner-heading'>
										CUET 2023 Coaching{" "}
									</h1>
									<h1 className='startNow-banner-subheading'>
										Boost your CUET Exam 2023 Preparation
										with Simulated learning
										environment Platform.
									</h1>
								</div>
								<div className=' col-md-4'>
									<div className='px-5 pt-3'>
										<button
											className='startNow_button'
											data-bs-toggle='modal'
											data-bs-target='#loginModal'
										>
											START NOW
										</button>
									</div>
								</div>
							</div>
						</div>

						<div className='px-5 pt-5 ' style={{ padding: "10px" }}>
							<h5 className='pb-2 heading'>
								What role does BESST play in the CUET 2023
								Application Form fill-up process?{" "}
							</h5>
							<p className='after-banner-text text-justify'>
								BESST plays an important role during the process
								of CUET 2023 Application Form fill-up. As per
								the guidelines provided by the NTA, candidates
								are not allowed to refill the form and can only
								submit one CUET 2023 Application form which
								leaves them with no room for mistakes. This is
								where BESST comes into play as the CUET 2023
								Application Form is available on the BESST web
								portal for practice. Candidates can fill it as a
								mock drill before proceeding with the final
								process of online CUET 2023(UG) Application Form
								fill-up of the CUET exam. BESST provides the
								students an opportunity to understand the
								process and clear any confusions regarding the
								CUET 2023 Application Form beforehand. BESST
								assists them with the entire process starting
								from the CUET 2023 Application Form until the
								final CUET exam.{" "}
							</p>{" "}
						</div>

						<div className=' mx-md-5 mt-3 px-5 pt-5 free-mock-test '>
							<div
								className=''
								style={{
									display: "flex",
									justifyContent: "space-between",
								}}
							>
								<div>
									<h1 className='heading'>
										Reviews Feedback & Suggestion of BESST
									</h1>
								</div>
								<div className='anchor_style'>
									<a
										data-bs-toggle='modal'
										data-bs-target='#ReviewsModal'
										style={{ textDecoration: "underline" }}
										href=''
									>
										VIEW ALL
									</a>
								</div>
							</div>
							<div className='review d-flex'>
								<Swiper
									allowTouchMove={false}
									spaceBetween={10}
									loop={true}
									loopFillGroupWithBlank={true}
									longSwipes={false}
									breakpoints={{
										// when window width is <= 499px
										560: {
											slidesPerView: 1,
											spaceBetweenSlides: 30,
										},

										880: {
											slidesPerView: 3,
											spaceBetweenSlides: 10,
										},
										// when window width is <= 999px
										999: {
											slidesPerView: 3,
											spaceBetweenSlides: 10,
										},
										1165: {
											slidesPerView: 3,
											spaceBetweenSlides: 10,
										},
									}}
									navigation={true}
									modules={[Pagination, Navigation]}
									onSlideChange={() => {
										setSlideIndex(slideIndex + 1);
									}}
									onSwiper={(swiper) => console.log(swiper)}
									className='custom-slider'
								>
									{studentSpeak.map((item, i) => (
										<SwiperSlide>
											{/* <div tabIndex={0} className="card" style={{ minHeight: "300px", margin: "0 2px" }}> */}
											<div
												className='my-2'
												style={{ textAlign: "center" }}
											>
												<iframe
													src={item.videoUrl}
													allowfullscreen='allowfullscreen'
													title='YouTube video player'
													frameborder='2'
													allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
													//allowfullscreen
													style={{
														width: "220px",
														height: "125px",
													}}
												></iframe>
												<h5
													className='card-title'
													style={{ fontSize: "1rem" }}
												>
													{item.title}
												</h5>
												<p
													className='card-text'
													style={{
														fontSize: "0.8rem",
													}}
												>
													{item.textContent}
												</p>
											</div>
											{/* </div> */}
										</SwiperSlide>
									))}
								</Swiper>
							</div>
							<div></div>
						</div>

						<div className=' pt-5 px-5' style={{ padding: "10px" }}>
							<div className='row no-gutters  taketest-banner px-2 pt-4'>
								<div className='col-md-8  px-lg-5'>
									<h1 className='startNow-banner-heading'>
										CUET 2023 Coaching{" "}
									</h1>
									<h1 className='startNow-banner-subheading'>
										BESST provides quality based mock tests
										and practice papers for CUET
										REGISTRATION which are designed in the
										same manner as the NTA (National Testing
										Agency) computer based test setup.
									</h1>
								</div>
								<div className=' col-md-4'>
									<div className='px-5 pt-3'>
										<button
											className='startNow_button'
											data-bs-toggle='modal'
											data-bs-target='#loginModal'
										>
											TAKE TEST
										</button>
									</div>
								</div>
							</div>
						</div>

						<div
							className='row no-gutters px-5 pt-5 '
							style={{ padding: "10px" }}
						>
							<div
								style={{
									// minWidth: "500px",
									fontWeight: "400",
									fontSize: "15px",
									lineHeight: "30px",
								}}
								class='tab-pane fade show active'
								id={"course-section"}
								role='tabpanel'
								aria-labelledby={"course-section"}
							>
								<div>
									<h5
										style={{
											fontFamily: "Poppins",
											fontSize: "18px",
											fontWeight: 600,
											lineHeight: "27px",
										}}
									>
										About CUET
									</h5>
									<p
										className='after-banner-text text-justify'
										style={{
											fontFamily: "Poppins",
											fontSize: "16px",
											fontWeight: 400,
											lineHeight: "21px",
										}}
									>
										Common University Entrance Test (CUET)
										is being introduced for admission into
										all UG/PG programmes in all Central
										Universities for academic session under
										the Ministry of Education (MoE).It was
										introduced for the first time in 2022. A
										single examination will enable the
										candidates to cover a wide outreach & be
										part of the admission process to various
										Central Universities. NTA( National
										Testing Agency), an independent,
										autonomus organisation is responsible
										for conducting the CUET exam. The role
										of NTA is confined to registration of
										candidates,conduct of the test, hosting
										of answer key, inviting challenges,
										finalising answer keys, preparing and
										declaring result and hosting score card.
										Merit list will be prepared by
										participating
										universities/organisations. Universities
										may conduct their individual counselling
										on the basis of the scorecard of CUET
										provided by NTA. The
										letters/e-mails/grievances/queries/RTI
										applications/court cases pertaining to
										admission related matters/procedures
										will not be entertained by NTA. The same
										may be addressed to the concerned
										universities.
									</p>
								</div>
								<div>
									<h5
										style={{
											fontFamily: "Poppins",
											fontSize: "18px",
											fontWeight: 600,
											lineHeight: "27px",
										}}
									>
										Eligibility
									</h5>
									<p
										style={{
											fontFamily: "Poppins",
											fontSize: "16px",
											fontWeight: 400,
											lineHeight: "21px",
										}}
									>
										For appearing in CUET REGISTRATION there
										is no age limit for the candidates. The
										candidates who have passed the class
										XII/ equivalent examination or are
										appearing, irrespective of their age can
										appear in CUET REGISTRATION examination.
										However, the candidates will be required
										to fulfil the age criteria (if any) of
										the University(ies) in which they are
										desirous of taking admission.
									</p>
								</div>
								<div>
									<h5
										style={{
											fontFamily: "Poppins",
											fontSize: "18px",
											fontWeight: 600,
											lineHeight: "27px",
										}}
									>
										Mode of Examination
									</h5>
									<p
										style={{
											fontFamily: "Poppins",
											fontSize: "16px",
											fontWeight: 400,
											lineHeight: "21px",
										}}
									>
										CUET(UG) is conducted in Computer Based
										Test (CBT) mode.
									</p>
								</div>
								<div>
									<h5
										style={{
											fontFamily: "Poppins",
											fontSize: "18px",
											fontWeight: 600,
											lineHeight: "27px",
										}}
									>
										Pattern of Question Paper{" "}
									</h5>
									<p
										style={{
											fontFamily: "Poppins",
											fontSize: "16px",
											fontWeight: 400,
											lineHeight: "21px",
										}}
									>
										Objective type Multiple Choice Questions
										(MCQs){" "}
									</p>
								</div>
								<div>
									<h5
										style={{
											fontFamily: "Poppins",
											fontSize: "18px",
											fontWeight: 600,
											lineHeight: "27px",
										}}
									>
										Exam Duration/Scheme{" "}
									</h5>
									<p
										style={{
											fontFamily: "Poppins",
											fontSize: "16px",
											fontWeight: 400,
											lineHeight: "21px",
										}}
									>
										Examination will be conducted on
										multiple days in two slots per day as
										given below: SLOT 1 & SLOT 2 Duration of
										exam : Slot 1: 195 minutes (3 hr 15
										mns), Slot 2: 225 minutes (3 hr 45 mns)
										(Assuming the candidate takes all the
										offered sections/sub sections in the
										given slot. ) NOTE: Compensatory time
										for PwBD candidates of 15 minutes for 45
										minutes examination & 20 minutes for 1
										hour examination. 1) Examination will be
										conducted in 2 or more slots on
										different days depending on the
										subjects/test taken by the candidates.
										2)In Slot 1 which will be held in
										morning shift a candidate may take upto
										4 tests only ( 1 language from Section
										IA,maximum of 2 Domain specific subjects
										from Section II & 1 General Test from
										Section III 3)In Slot 2 which will be
										held in the afternoon shift a candidate
										can take upto 5 tests as follows: One
										language from Section IA & IB & maximum
										of four domain specific subjects from
										Section II. (OR) Two languages from
										Section IA & IB & maximum of three
										domain specific subjects from section II{" "}
									</p>
								</div>
								<div>
									<h5
										style={{
											fontFamily: "Poppins",
											fontSize: "18px",
											fontWeight: 600,
											lineHeight: "27px",
										}}
									>
										Tests Design{" "}
									</h5>
									<p
										style={{
											fontFamily: "Poppins",
											fontSize: "16px",
											fontWeight: 400,
											lineHeight: "21px",
										}}
									>
										A candidate has the option to choose any
										language/Domain Specific
										Subjects/General Test or a combination
										there of as may be required for
										admission to specific course/s of the
										desired University/ies while applying.
										It is not mandatory to choose any one or
										more of the Tests/Subjects stated above.
										The choice of tests/subjects would
										depend on the course/s opted by the
										candidate & the University/ies where
										admission is sought. NOTE: (a) A
										candidate can take maximum of 9 tests in
										following manner: 1) Maximum of 02
										languages from Section IA & Section IB
										taken together, maximum of 06 Domain
										subjects. (OR) 2) Maximum of 03
										languages from Section IA & Section IB
										taken together, maximum of 05 Domain
										Subjects. (b) Considering that
										candidates from different States/Boards
										would be applying for CUET REGISTRATION
										, NTA has decided to provide choice in
										all sections of question papers,
										however, the total number of questions
										to be attempted will remain the same.
										(c) For choosing languages, Domain
										Specific Subjects & General Test the
										candidate must refer to requirements of
										his/her intended university as choices
										should match the requirements of the
										University.
									</p>
								</div>

								<div>
									<h5
										style={{
											fontFamily: "Poppins",
											fontSize: "18px",
											fontWeight: 600,
											lineHeight: "27px",
										}}
									>
										Medium of Examination{" "}
									</h5>
									<p
										style={{
											fontFamily: "Poppins",
											fontSize: "16px",
											fontWeight: 400,
											lineHeight: "21px",
										}}
									>
										The tests (other than "language" test)
										are offered in 13 languages i.e,
										Assamese, Bengali, English, Gujarati,
										Hindi, Kannada, Malayalam, Marathi,
										Odiya, Punjabi, Tamil, Telegu & Urdu. A
										candidate is required to opt for one of
										the specified languages as the medium of
										the paper, as per desired University's
										eligibility criteria while applying.
										Medium is not the same as the 'language'
										opted as the component of the test.
										'Language' test is for assessing the
										proficiency/skills of the candidate in
										the language opted by him/her & the
										question paper in respect of the same
										will be available to the candidate in
										the medium opted by him/her only. The
										question paper of the 'language' test
										will not bilingual.
									</p>
								</div>
								<div>
									<h5
										style={{
											fontFamily: "Poppins",
											fontSize: "18px",
											fontWeight: 600,
											lineHeight: "27px",
										}}
									>
										Marking System{" "}
									</h5>
									<p
										style={{
											fontFamily: "Poppins",
											fontSize: "16px",
											fontWeight: 400,
											lineHeight: "21px",
										}}
									>
										For each correct answer 5 marks will be
										rewarded and for each wrong answer -1
										will be deducted. There is no mark for
										unattempted questions.
									</p>
								</div>

								<div>
									<h5
										style={{
											fontFamily: "Poppins",
											fontSize: "18px",
											fontWeight: 600,
											lineHeight: "27px",
										}}
									>
										Number of Attempts{" "}
									</h5>
									<p
										style={{
											fontFamily: "Poppins",
											fontSize: "16px",
											fontWeight: 400,
											lineHeight: "21px",
										}}
									>
										If any University permits students of
										previous years of Class XII to take
										admission in the current year also, such
										candidates would also be eligible to
										appear in CUET (UG) .
									</p>
								</div>
								<div>
									<h5
										style={{
											fontFamily: "Poppins",
											fontSize: "18px",
											fontWeight: 600,
											lineHeight: "27px",
										}}
									>
										Participating Universities{" "}
									</h5>
									<div className='d-md-flex justify-space-between'>
										<div
											style={{
												listStyleType: "none",
												fontFamily: "Poppins",
												fontSize: "16px",
												fontWeight: 400,
												lineHeight: "23px",
											}}
										>
											1) Central Tribal University of
											Andhra Pradesh <br /> 2) Central
											University of Andhra Pradesh
											<br /> 3) Central University of
											Gujarat <br /> 4) Central University
											of Haryana
											<br /> 5) Central University of
											Himachal Pradesh <br />
											6) Central University of Jammu{" "}
											<br />
											7) Central University of Jharkhand
											<br /> 8) Central University of
											Karnataka
											<br /> 9) Central University of
											Kashmir
											<br /> 10) Central University of
											Kerala <br />
											11) Central University of Odisha
											<br /> 12) Central University of
											Rajasthan <br />
											13) Central University of South
											Bihar
											<br /> 14) Central University of
											Tamil Nadu
											<br /> 15) Chatrapati Shivaji
											Maharaj UniversitY 16) Chinmaya
											Vishwavidyapeeth <br />
											17) Dayalbagh Educational Institute
											<br /> 18) Devi Ahilya
											Vishwavidyalaya
											<br /> 19) Dr A.P.J Abdul Kalam
											Technical University <br />
											20) Dr. B.R Ambedkar School of
											Economics University <br />
											21) Dr. B.R Ambedkar University,
											Delhi
											<br />
											22) Dr. Hari Singh Gour
											Vishwavidyalaya
											<br /> 23) Galgotias University
											<br /> 24) Gujarat Vidyapith
											<br /> 25) Guru Ghasidas
											Vishwavidyalaya
											<br /> 26) Gurukula Kangri
											<br /> 27) Hemvati Nandan Bahuguna
											Garhwal University
											<br /> 28) IES University
											<br /> 29) IIMT University
											<br /> 30) Indira Gandhi National
											Tribal University
											<br /> 31) Aligarh Muslim University
											<br /> 32) Apex University
											<br /> 33) Arunachal University of
											Studies
											<br /> 34) Assam University
											<br /> 35) Avinashilingam Institute
											for Home Science & Higher Education
											for women.
											<br /> 36) Babasaheb Bhimrao
											Ambedkar University
											<br /> 37) Banaras Hindu University
											<br /> 38) Barkatullah University
											<br /> 39) Bennet University
											<br /> 40) B M L Munjal University
											<br /> 41) Career Point University
											<br /> 42) Central Sanskrit
											University
											<br /> 43) Jagan Nath University
											Bahadurgarh, Haryana <br />
											44) Jagannath University
											<br /> 45) Jamia Hamdard
											<br /> 46) Jamia Millia Islamia
											<br /> 47) Jawaharlal Nehru
											University{" "}
										</div>
										<div
											style={{
												listStyleType: "none",
												fontFamily: "Poppins",
												fontSize: "16px",
												fontWeight: 400,
												lineHeight: "23px",
											}}
										>
											{" "}
											<br /> 48) Jaypee University of
											Information Technology
											<br /> 49) Jharkhand Raksha Sakti
											University
											<br /> 50) Jiwaji University
											<br />
											51) K R Mangalam University
											<br /> 52) Lakshmibai National
											Institute of Physical Education
											<br /> 53) Madan MohanMalavia
											University of Technology <br />
											54) Mahatma Gandhi Antarrashtriya
											Hindi Vishwavidyalaya <br />
											55) Mahatma Gandhi Central
											University
											<br /> 56)Mahatma Jyotiba Phule
											Rohilkhand University <br />
											57) Manav Rachna International
											Institute of Research & Studies
											<br /> 58) Manav Rachna University
											<br /> 59) Manipur University
											<br /> 60) Maulana Azad National
											Urdu University
											<br /> 61) Mewar University
											<br /> 62)Mizoram University
											<br />
											63) Nagaland University
											<br /> 64) National Rail &
											Transportation Institute
											<br /> 65) National Sanskrit
											University
											<br /> 66) NICMAR University, Pune
											<br /> 67) NIIT University <br />
											68) Nirwan University, Jaipur
											<br /> 69) NEHU 70) Pondicherry
											University <br />
											71) Ponnaiyah Ramajayam Institute of
											Science & Technology <br />
											72) Rajiv Gandhi University
											<br /> 73) RNB Global University
											<br /> 74) Sardar Patel University
											of Police Security & Criminal
											Justice
											<br /> 75) Shobhit University
											<br /> 76) Delhi University
											<br /> 77) Tezpur University
											<br />
											78)Sri Lal Bahadur Shastri National
											Sanskrit University
											<br />
											79) Shri Mata Vaishno Devi
											University
											<br /> 80) Sikkim University
											<br /> 81) SRM University
											<br /> 82) Tata Institute of Social
											Science (TISS)
											<br /> 83)Terthanker Mahaveer
											University
											<br /> 84)The English & Foreign
											Language University
											<br /> 85) The Gandhigram Rural
											Institute <br />
											86) Tripura University <br />
											87) University of Allahabad
											<br /> 88) University of Hyderabad
											<br /> 89) Vikram University
											<br /> 90) Visva Bharati University
										</div>
									</div>
								</div>
							</div>
						</div>

						<div
							className='px-md-5  pt-5 '
							style={{ padding: "10px" }}
						>
							<h5 className='pb-2 heading'>Exam Pattern</h5>
							<div
								className='modal-body exam-pattern-table '
								style={{
									marginTop: "-1%",
									border: "1px solid #E1E1E1",
									marginLeft: "22px",
									backgroundColor: "#FAFAFA",
									borderRadius: "5px",
								}}
							>
								<table
									style={{
										width: "100%",
										border: "1px solid #9E9E9E",
									}}
								>
									{/* <tr style={{ borderRadius: "5px" }}>
                  <th
                    style={{
                      width: "40%",
                      border: "1px solid #9E9E9E",
                      textAlign: "center",
                      backgroundColor: "#E1E1E1",
                      color: "black",
                    }}
                  >
                    Sections
                  </th>
                  <th
                    style={{
                      cursor: "pointer",
                      width: "40%",
                      border: "1px solid #9E9E9E",
                      textAlign: "center",
                      backgroundColor: "#E1E1E1",
                      color: "black",
                    }}
                  >
                    Subjects
                  </th>
                  <th
                    style={{
                      width: "40%",
                      border: "1px solid #9E9E9E",
                      textAlign: "center",
                      backgroundColor: "#E1E1E1",
                      color: "black",
                    }}
                  >
                    No. Of Questions
                  </th>
                  <th
                    style={{
                      width: "40%",
                      border: "1px solid #9E9E9E",
                      textAlign: "center",
                      backgroundColor: "#E1E1E1",
                      color: "black",
                    }}
                  >
                    To be Attempted
                  </th>
                  <th
                    style={{
                      width: "60%",
                      border: "1px solid #9E9E9E",
                      textAlign: "center",
                      backgroundColor: "#E1E1E1",
                      color: "black",
                    }}
                  >
                    Duration
                  </th>
                </tr> */}
									<tr>
										<th
											style={{
												// width: "40%",
												border: "1px solid #9E9E9E",
												textAlign: "center",
												backgroundColor: "#E1E1E1",
												color: "black",
											}}
										>
											Sections
										</th>
										{examPattern &&
											examPattern.map((item) => (
												<td
													style={{
														border: "1px solid #9E9E9E",
														textAlign: "center",
														fontSize: "16px",
														fontWeight: "500",
													}}
												>
													{item.sections}
												</td>
											))}
									</tr>
									<tr>
										<th
											style={{
												cursor: "pointer",
												// width: "40%",
												border: "1px solid #9E9E9E",
												textAlign: "center",
												backgroundColor: "#E1E1E1",
												color: "black",
											}}
										>
											Subjects
										</th>
										{examPattern &&
											examPattern.map((item) => (
												<td
													onClick={() =>
														handleLink(
															item.sections,
															item.subjects
														)
													}
													style={{
														border: "1px solid #9E9E9E",
														textAlign: "center",
														color: "#7b1fa2",
														cursor: "pointer",
													}}
												>
													{item.subjects}
												</td>
											))}
									</tr>
									<tr>
										<th
											style={{
												// width: "40%",
												border: "1px solid #9E9E9E",
												textAlign: "center",
												backgroundColor: "#E1E1E1",
												color: "black",
											}}
										>
											No. Of Questions
										</th>
										{examPattern &&
											examPattern.map((item) => (
												<td
													style={{
														border: "1px solid #9E9E9E",
														textAlign: "center",
														fontSize: "16px",
														fontWeight: "500",
													}}
												>
													{item.noOfQuestions}
												</td>
											))}
									</tr>
									<tr>
										<th
											style={{
												// width: "40%",
												border: "1px solid #9E9E9E",
												textAlign: "center",
												backgroundColor: "#E1E1E1",
												color: "black",
											}}
										>
											To be Attempted
										</th>
										{examPattern &&
											examPattern.map((item) => (
												<td
													style={{
														border: "1px solid #9E9E9E",
														textAlign: "center",
														fontSize: "16px",
														fontWeight: "500",
													}}
												>
													{item.toBeAttempted}
												</td>
											))}
									</tr>
									<tr>
										<th
											style={{
												// width: "60%",
												border: "1px solid #9E9E9E",
												textAlign: "center",
												backgroundColor: "#E1E1E1",
												color: "black",
											}}
										>
											Duration
										</th>
										{examPattern &&
											examPattern.map((item) => (
												<td
													style={{
														border: "1px solid #9E9E9E",
														textAlign: "center",
														fontSize: "16px",
														fontWeight: "500",
													}}
												>
													{item.duration}
												</td>
											))}
									</tr>
									{/* <td
                        onClick={() => handleLink(item.sections, item.subjects)}
                        style={{
                          border: "1px solid #9E9E9E",
                          textAlign: "center",
                          color: "#7b1fa2",
                          cursor: "pointer"

                        }}
                      >
                        {item.subjects}
                      </td>
                      <td
                        style={{
                          border: "1px solid #9E9E9E",
                          textAlign: "center",
                          fontSize: "16px",
                          fontWeight: "500",
                        }}
                      >
                        {item.noOfQuestions}
                      </td>
                      <td
                        style={{
                          border: "1px solid #9E9E9E",
                          textAlign: "center",
                          fontSize: "16px",
                          fontWeight: "500",
                        }}
                      >
                        {item.toBeAttempted}
                      </td>
                      <td
                        style={{
                          width: "50%",
                          border: "1px solid #9E9E9E",
                          textAlign: "center",
                          fontSize: "16px",
                          fontWeight: "500",
                        }}
                      >
                        {item.duration}
                      </td> */}
								</table>
							</div>
						</div>
						<button
							data-bs-toggle='modal'
							className='d-none'
							id='languageModal'
							data-bs-target='#internalLink1'
						></button>
						<div
							className='modal fade'
							id='internalLink1'
							tabIndex='-1'
							aria-labelledby='syllabusModalLabel'
							aria-hidden='true'
						>
							<div className='modal-dialog modal-dialog-scrollable downloadModal'>
								<div className='modal-content'>
									<img
										src={Logo}
										className='water-mark-quiz'
									></img>

									<div
										className='modal-header'
										style={{ borderBottom: "none" }}
									>
										<h6
											className='modal-title '
											id='syllabusModalLabel'
										>
											Exam Pattern
										</h6>
										<button
											type='button'
											className='btn-close'
											data-bs-dismiss='modal'
											aria-label='Close'
											// onClick={() => setData([])}
											style={{ zIndex: 999 }}
										></button>
									</div>

									<div
										className='modal-body exam-pattern-table '
										style={{
											marginTop: "-1%",
											border: "1px solid #E1E1E1",
											marginLeft: "22px",
											backgroundColor: "#FAFAFA",
											borderRadius: "5px",
										}}
									>
										<h6
											style={{
												fontSize: "16px",
												marginLeft: "20px",
												fontWeight: "600",
												lineHeight: "27px",
											}}
										>
											{section}
										</h6>
										<table
											className='table table-borderless'
											style={{
												width: "100%",
												borderTopStyle: "none",
												borderBottomStyle: "none",

												// border: "1px solid #9E9E9E",
											}}
										>
											<tr
												style={{
													borderRadius: "5px",
													cursor: "pointer",
												}}
											>
												<th
													colSpan={4}
													style={{
														width: "40%",
														cursor: "pointer",
														height: "30px",
														padding: "15px",
														textAlign: "start",
														backgroundColor:
															"#E1E1E1",
														color: "black",
													}}
												>
													{subject}
												</th>
											</tr>
											{section &&
												subject &&
												chunklanguage(
													langugageData.filter(
														(item) =>
															item.title ==
															section
													)
												).map((data) => (
													<tr
														style={{
															backgroundColor:
																"#FFFFFF",
														}}
													>
														{data.map((data) => (
															<td
																style={{
																	padding:
																		"10px",
																	fontSize:
																		"16px",
																	fontWeight:
																		"500",
																}}
															>
																{data}
															</td>
														))}
													</tr>
												))}
										</table>
									</div>
									<div class='modal-footer '>
										<button
											style={{
												marginBottom: "10px",
												width: "100px",
												marginLeft: "0px",
												zIndex: 999,
											}}
											className='btn float-end main-btn'
											data-bs-toggle='modal'
											data-bs-target='#exampattern'
										>
											Back
										</button>
									</div>
								</div>
							</div>
						</div>
						<div className=' pt-5 px-md-5'>
							<FAQ />
						</div>
					</div>

					<div className='col-md-4 p-4 pt-5'>
						<div className='update-list p-3'>
							<h1 className='upadte-list-heading ps-2'>
								CUET Updates
							</h1>
							{courseUpdate.map((item) =>
								item?.impUpdateArr.map((date, idx) => (
									<div className='upadte-sublist ps-4 pt-3'>
										<h6> ➔ {date.detailsHead}</h6>
										<a
											href='https://cuet.nta.nic.in/'
											className='fs-6 ms-3'
											style={{
												cursor: "pointer",
												textDecoration: "none",
												color: "#7B1FA2",
											}}
										>
											{date.detailsHeadDescription}
										</a>
									</div>
								))
							)}

							<h1 className='upadte-list-heading ps-2 pt-3'>
								CUET Program
							</h1>
							<div
								className='upadte-sublist ps-4 pt-3'
								data-bs-toggle='modal'
								data-bs-target='#registerModal'
							>
								<p style={{ cursor: "pointer" }}>
									➔ Online Classes for General Test paper for
									CUET
								</p>
								<p style={{ cursor: "pointer" }}>
									➔ CUET MCQ Question Answers for Practice
								</p>
								<p style={{ cursor: "pointer" }}>
									➔ CUET REGISTRATION mock test 2023
								</p>
								<p style={{ cursor: "pointer" }}>
									➔ CUET Counselling for Admissions 2023
								</p>
							</div>

							<h1 className='upadte-list-heading ps-2 pt-3'>
								CUET Course Update from NTA/Samarth
							</h1>
							<div className='upadte-sublist ps-4 pt-3'>
								{data.map((item) => (
									<p>
										{" "}
										<a
											onClick={() => {
												handleClick(item.url);
											}}
											style={{
												cursor: "pointer",
											}}
											// target="_blank"
										>
											➔&#160; {item.title}
										</a>
									</p>
								))}
							</div>

							<h1 className='upadte-list-heading ps-2 pt-3'>
								Current Affairs
							</h1>
							<div className='upadte-sublist ps-4 pt-3'>
								{console.log(currentAffairs, "current")}
								{currentAffairs?.length > 0 &&
									currentAffairs?.map((item, i) => (
										// <p className=""> {item.dateRangeText}</p>

										<p key={i} className='p-1'>
											<article
												href={"/#" + i}
												className=''
												style={{ cursor: "pointer" }}
												data-bs-toggle='modal'
												data-bs-target={`#currentAffairs${i}`}
											>
												➔ {item.dateRangeText}
											</article>
											{/* modal-body */}
											<div
												class='modal fade'
												id={`currentAffairs${i}`}
												tabIndex='-1'
												aria-labelledby={`#currentAffairs${i}Label`}
												aria-hidden='true'
											>
												<div class='modal-dialog modal-lg modal-dialog-scrollable'>
													<div class='modal-content'>
														<div class='modal-header'>
															<h5
																style={{
																	color: "black",
																}}
																class='heading'
																id={`currentAffairs${i}Label`}
															>
																Current Affairs
																from{" "}
																<span
																	dangerouslySetInnerHTML={{
																		__html: item.dateRangeText,
																	}}
																/>
															</h5>
															<button
																type='button'
																class='btn-close'
																data-bs-dismiss='modal'
																aria-label='Close'
															></button>
														</div>
														<div class='modal-body'>
															<div
																className='d-flex text-center gap-2 justify-content-evenly'
																style={{
																	flexWrap:
																		"wrap",
																}}
															>
																{item.affairsBeans.map(
																	(
																		content,
																		index
																	) => (
																		<div
																			key={
																				index
																			}
																			className='card border'
																			style={{
																				width: "350px",
																				minHeight:
																					"350px",
																			}}
																		>
																			<br />
																			<small className='main-color fw-bolder'>
																				{
																					content.currentAffairsHead
																				}
																			</small>{" "}
																			<br />
																			{/* <small>{content.title}</small> <br /> */}
																			{/* <p className="text-dark">{content.currentAffairsContent}</p> */}
																			<div
																				className='after-banner-text'
																				style={{
																					color: "black",
																					textAlign:
																						"justify",
																				}}
																				dangerouslySetInnerHTML={{
																					__html: content.currentAffairsContent,
																				}}
																			/>
																		</div>
																	)
																)}
															</div>
														</div>
														<div class='modal-footer'></div>
													</div>
												</div>
											</div>
										</p>
									))}
							</div>

							{/*current affair  */}
							{/* News */}
							<h1 className='upadte-list-heading ps-2 pt-3'>
								News
							</h1>
							<div className='upadte-sublist-News ps-4 pt-3'>
								{newsData.map((item) => (
									<p
										className='p-0'
										dangerouslySetInnerHTML={{
											__html: item.description,
										}}
									></p>
								))}
							</div>
						</div>
						<div className='pt-4'>
							<div className='banner-form2 ' style={{}}>
								<div
									className='form2-header'
									style={{ padding: "3px" }}
								>
									<p className='pt-2 ps-2'>Signup/Register</p>
								</div>
								<div style={{ padding: "24px" }}>
									<input
										style={{
											padding: "10px",
											width: "100%",
										}}
										placeholder='Name'
										type='text'
										value={firstName}
										className='form-control mb-3 mt-2'
										id='exampleInputEmail1'
										aria-describedby='emailHelp'
										onChange={(e) =>
											handleOnlyLetters(e, "first")
										}
									/>

									<input
										style={{
											padding: "10px",
											width: "100%",
										}}
										placeholder='Email ID/Mobile Number'
										id='email'
										required
										value={email}
										type='email'
										className='form-control mb-3 mt-2'
										onChange={(e) => {
											setEmail(e.target.value);

											// onVerify()
										}}
										onBlur={() => {
											emailValidations();
										}}
									/>

									<input
										style={{
											padding: "10px",
											width: "100%",
										}}
										id='whatsappNumber'
										required
										type='number'
										className='form-control mb-3 mt-2'
										value={mobile}
										placeholder='Mobile Number'
										onChange={(e) => {
											console.log(e.target.value);

											if (
												e.target.value.length == 11 ||
												e.target.value.split("")[0] <=
													5 ||
												e.target.value.includes("+")
											) {
												return false;
											}

											setMobile(e.target.value);
											console.log(mobile);
										}}
									/>
									<input
										className='form-control mb-3 mt-2'
										style={{
											padding: "10px",
											width: "100%",
										}}
										id='Password'
										required
										value={password}
										type={isPassed ? "text" : "password"}
										placeholder='Password'
										onChange={(e) => {
											setPassword(e.target.value);
										}}
										// onKeyUp={PasswordChecker}
										onPaste={(e) => e.preventDefault()}
									/>
									<input
										className='form-control mb-3 mt-2'
										style={{
											padding: "10px",
											width: "100%",
										}}
										id='confirmPassword'
										required
										value={confirmPassword}
										type={isPass ? "text" : "password"}
										placeholder='Confirm Password*'
										onPaste={(e) => e.preventDefault()}
										onChange={(e) => {
											setConfirmPassword(e.target.value);
										}}
									/>
									<div className='d-flex'>
										<div>
											{" "}
											<input
												type='checkbox'
												id='vehicle1'
												name='vehicle1'
												value='Bike'
											/>
										</div>
										<div className='ms-3'>
											{" "}
											<p
												style={{
													color: "#000000",
													fontSize: "14px",
													fontWaight: "600px",
													lineHeight: "22px",
												}}
											>
												I agree to the{" "}
												<a
													href='/registration/documents/terms-and-conditions'
													style={{
														color: "#7B1FA2",
														fontSize: "14px",
														fontWaight: "600px",
														lineHeight: "22px",
													}}
												>
													Terms and Conditions{" "}
												</a>{" "}
												&{" "}
												<a
													href='/registration/documents/privacy-policy'
													style={{
														color: "#7B1FA2",
														fontSize: "14px",
														fontWaight: "600px",
														lineHeight: "22px",
													}}
												>
													Privacy Policy
												</a>
											</p>
										</div>
									</div>

									<div className='d-flex justify-content-center'>
										<button
											disabled={handleDisabled()}
											className='procced_button'
											data-bs-toggle='modal'
											data-bs-target='#registerModal'
										>
											PROCEED
										</button>
									</div>
								</div>
							</div>
						</div>

						<div className='pt-4'>
							<div className=' ps-2 text-md-start'>
								<h1 className='heading my-2'>Contact Us</h1>
								<div className=' my-4'>
									<div className=' w-100'>
										<a
											style={{ cursor: "pointer" }}
											target='_blank'
											href='https://wa.me/8822403212'
										>
											<ImWhatsapp
												style={{ corsor: "pointer" }}
												size={28}
												color='green'
											/>
										</a>
										<span
											style={{
												corsor: "pointer",
												textDecoration: "underline",
												color: "blue",
											}}
											className='fs-5 ms-3'
										>
											{ContactUs.whatsapp}
										</span>
									</div>
								</div>
								<div className='d-flex my-4'>
									<a
										href='mailto:info@besst.in'
										style={{
											textDecoration: "none",
											corsor: "pointer",
										}}
									>
										<AiOutlineMail size={28} />
									</a>
									<div className='ms-3 w-100'>
										<span>Write to us for queries</span>
										<br />
										<a
											href='mailto:info@besst.in'
											style={{
												textDecoration: "underline",
												color: "blue",
												corsor: "pointer",
											}}
										>
											{" "}
											<div className='fs-5'>
												{ContactUs.email}
											</div>
										</a>
									</div>
								</div>
								<div className='d-flex my-4'>
									<GoLocation size={28} />
									<div className='ms-3 w-100'>
										<span>Location</span>
										<br />
										<div
											className='after-banner-text'
											dangerouslySetInnerHTML={{
												__html: ContactUs.address,
											}}
										></div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* <Footer /> */}
			</section>
		</>
	);
}

export default CuetApplicationForm;
