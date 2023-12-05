import { useState } from "react";
import { GoMention } from "react-icons/go";
import { ImKey } from "react-icons/im";
import axios from "axios";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import baseUrl from "../../../Components/baseUrl";

import { EncryptText } from "../../Encrypt/CryptoEncryption";
import { useLocation, useNavigate } from "react-router";
import PasswordVisibility from "../PasswordVisibility";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { studDashboard, subscriptions } from "../../../RouteConstants";
import { utilitySliceActions } from "../../../Redux/Slice/UtilitySlice";
import { PostProfileDataThunk } from "../../../Redux/Thunks/Post/PostProfileDataThunk";
import validation from "../../../validation";
import OTP from "../../OTP";
import { login } from "./AuthComponent";
import GoogleButton from "./Login/GoogleLogin";
import FacebookButton from "./Login/FaceBookLogin";

const errorMessageStyle = {
  color: "red",
  fontSize: "11px",
  position: "relative",
  left: "50px",
  top: "-7px",
};
const errorInputfieldStyle = { border: "1px solid red" };

const Login = ({
  userLoginCredentials,
  setUserLoginCredentials,
  otpType,
  setOtpType,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [inputValue, setInputValue] = useState("");
  const [inputType, setInputType] = useState("");
  const [isLoading, setIsLoading] = useState({ password: false, otp: false });
  const [otp, setOtp] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [error, setError] = useState({});
  const [isOtpInputVisible, setIsOtpInputVisible] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const { message, isPasswordChanged } = useSelector((state) => state.utils);
  const dispatch = useDispatch();

  //falling back to initail state when password is changed
  useEffect(() => {
    isPasswordChanged && handleLoginModalClose();
  }, [isPasswordChanged]);

  //to clear the fields when modal is closed
  const handleLoginModalClose = () => {
    setUserLoginCredentials({
      email: "",
      password: "",
    });
    setError({});
    setIsPasswordVisible(false);
    setIsLoading({ password: false, otp: false });
    setInputValue("");
    setIsOtpInputVisible(false);
  };

  //to handle changes in input fields of normal login
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserLoginCredentials({ ...userLoginCredentials, [name]: value });
    if (name == "email") {
      setInputValue(value);
    }
  };

  //to handle changes in input fields of OTP login
  const handleInputValueChange = (event) => {
    const inputValue = event.target.value;
    setInputValue(inputValue);
  };

  //check validation for email or mobile in login with otp
  const otpFieldValidation = () => {
    let tempErr = {};
    // Email validation regex
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    // Mobile number validation regex
    const mobileRegex = /^\d{10}$/;

    // Check if the input value matches either email or mobile number format
    if (emailRegex.test(inputValue)) {
      setInputType("email");
    } else if (mobileRegex.test(inputValue)) {
      setInputType("mobile");
    } else {
      tempErr.inputVal = "Please enter a valid email/mobile number";
      setInputType("");
    }
    setError(tempErr);
    return Object.keys(tempErr).length <= 0;
  };

  //handles login event
  const onLogin = (e) => {
    e.preventDefault();
    let validationCheck = validation(userLoginCredentials, "LOGIN", null);
    setError(validationCheck.error);
    if (otpFieldValidation()) {
      if (validationCheck.errorCheckPass) {
        setIsLoading({ ...isLoading, password: true });
        const data = {
          username: EncryptText(userLoginCredentials.email),
          password: EncryptText(userLoginCredentials.password),
        };
        axios
          .post(baseUrl() + "/wl/loginDtls", data)
          .then((response) => {
            if (response.status === 200) {
              Cookies.set("token", `Bearer ${response.data.result.token}`);
              Cookies.set("email", response.data.result.userLoginResBean.email);
              Cookies.set("cuetPromoFlag", response.data.result.userLoginResBean.cuetPromoFlag)
              Cookies.set(
                "userId",
                response.data.result.userLoginResBean.userId
              );
              Cookies.set(
                "subscription_redirection",
                `yes`
              );
              Cookies.set('preferredCourseId', response.data.result.userLoginResBean.preferredCourseId)
              localStorage.setItem("preferredCourseId", response.data.result.userLoginResBean.preferredCourseId);
              setIsLoading({ ...isLoading, password: false });
              dispatch(utilitySliceActions.setIsAuthenticated(true));
              if (location.pathname !== "/subscription") {
                if (
                  Number(
                    response.data.result.userLoginResBean.preferredCourseId
                  ) === 8
                ) {
                  axios
                    .get(
                      `${baseUrl()}/df/getAllSubscriptionPacks/8`,
                      {
                        headers: {
                          "Acces-Control-Allow-Origin": "*",
                          Client_ID: "MVOZ7rblFHsvdzk25vsQpQ==",
                          Authorization: `${Cookies.get("token")}`,
                        },
                      }
                    )
                    .then((response) => {
                      if (response.data.Data[0].subscribedFlag) {
                        navigate(studDashboard);
                      } else {
                        navigate(subscriptions);
                        dispatch(
                          utilitySliceActions.setActiveSubscriptionTab(8)
                        );
                      }
                    })
                    .catch((e) => {
                      throw e;
                    });
                } else {
                  navigate(studDashboard);
                }
              } else {
                let data = {
                  email: Cookies.get("email"),
                  token: Cookies.get("token"),
                };
                dispatch(PostProfileDataThunk(data));
                document.getElementById("close-login").click();
              }
            }
          })
          .catch((e) => {
            //inline toast message
            Swal.fire({
              icon: "error",
              title: "Unauthorised or Incorrect Login Details.",
              toast: true,
              position: "bottom-right",
              customClass: {
                popup: "colored-toast",
              },
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
            });
            setIsLoading(false);
          });
      }
    }
  };

  // login with OTP
  
  const loginWithOTP = () => {
    axios({
    	url: `http://68.178.172.171:8282/besstMainApi/wl/otpLogin?emailId=${inputValue}`,
    	method: "GET",
    })
    	.then((response) => {
    		if (response.status === 200) {
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
    			setIsLoading({ ...isLoading, otp: false });
    			dispatch(utilitySliceActions.setIsAuthenticated(true));
    			console.log(response, "loginWithOtp 200");
    			if (location.pathname !== "/subscription") {
    				if (
    					Number(
    						response.data.result.userLoginResBean
    							.preferredCourseId
    					) === 8
    				) {
    					axios
    						.get(
    							`${baseUrl()}/df/getAllSubscriptionPacks/8`,
    							{
    								headers: {
    									"Acces-Control-Allow-Origin": "*",
    									Client_ID:
    										"MVOZ7rblFHsvdzk25vsQpQ==",
    									Authorization: `${Cookies.get(
    										"token"
    									)}`,
    								},
    							}
    						)
    						.then((response) => {
    							if (response.data.Data[0].subscribedFlag) {
    								navigate(studDashboard);
    							} else {
    								navigate(subscriptions);
    								dispatch(
    									utilitySliceActions.setActiveSubscriptionTab(
    										8
    									)
    								);
    							}
    						})
    						.catch((e) => {
    							throw e;
    						});
    				} else {
    					navigate(studDashboard);
    				}
    			} else {
    				let data = {
    					email: Cookies.get("email"),
    					token: Cookies.get("token"),
    				};
    				dispatch(PostProfileDataThunk(data));
    				document.getElementById("close-login").click();
    			}
    		}
    		console.log(response, "loginWithOtp not 200");
    	})
    	.catch((error) => {
    		console.log(error, "error in login with otp");
    	});
    console.log("hehehe");
  };

  const handleLoginWithOtp = (e) => {
    e.preventDefault();
    if (otpFieldValidation()) {
      setIsOtpInputVisible(true);
      setOtpType(login);
    }
  };

  return (
    <>
      <article
        className="modal fade"
        id="login"
        tabIndex="-1"
        aria-labelledby="loginModalLabel"
        aria-hidden="true"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
      >
        <section className="modal-dialog">
          <section className="modal-content">
            <header className="modal-header modal-header-container">
              <h5 className="modal-title" id="loginModalLabel">
                Sign In
              </h5>
              <button
                type="button"
                className="btn-close"
                id="close-login"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleLoginModalClose}
              ></button>
            </header>
            <main className="modal-body px-sm-5">
              <form className="auth-form">
                <section className="from-section">
                  <div className="input-group input-wrapper">
                    <span
                      className="input-group-text main-color"
                      id="basic-addon1"
                    >
                      <GoMention />
                    </span>
                    {/* login input email/ mobile */}
                    <input
                      id="email"
                      type="text"
                      className="form-control rounded-end"
                      name="email"
                      value={userLoginCredentials.email}
                      style={error.email && errorInputfieldStyle}
                      placeholder="Email / Mobile"
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  {(error.email || error.inputVal) && (
                    <span style={errorMessageStyle}>
                      {error.email || error.inputVal}
                    </span>
                  )}
                </section>
                <section className="from-section">
                  <div className="input-group input-wrapper">
                    <span
                      className="input-group-text main-color"
                      id="basic-addon1"
                    >
                      <ImKey />
                    </span>
                    {/* password */}
                    <input
                      id="password"
                      type={isPasswordVisible ? "text" : "password"}
                      className="form-control rounded-end pr-5"
                      placeholder="Password"
                      name="password"
                      value={userLoginCredentials.password}
                      style={error.password && errorInputfieldStyle}
                      onChange={(e) => handleChange(e)}
                    />
                    <PasswordVisibility
                      setIsPasswordVisible={setIsPasswordVisible}
                      isPasswordVisible={isPasswordVisible}
                    />
                  </div>
                  {error.password && (
                    <span style={errorMessageStyle}>{error.password}</span>
                  )}
                </section>
                <p className="text-right link-style">
                  <span
                    data-bs-toggle="modal"
                    data-bs-target="#forgotpassword"
                    className="pointer"
                  >
                    Forgotten your password?
                  </span>
                </p>
                <div className="d-flex justify-content-between gap-3">
                  <button
                    type="submit"
                    className="btn main-btn"
                    style={{
                      flex: 1,
                    }}
                    data-mdb-dismiss="modal"
                    onClick={(e) => {
                      onLogin(e);
                    }}
                  >
                    {/* {isLoading.password ? "Please Wait..." : "Sign In"} */}
                  </button>
                  <button
                    type="button"
                    className="btn main-btn-outline"
                    style={{
                      flex: 0.9,
                    }}
                    data-bs-toggle="modal"
                    data-bs-target="#loginWithOtp"
                    onClick={() => {
                      setUserLoginCredentials({
                        email: "",
                        password: "",
                      });
                      setInputValue("");
                    }}
                  >
                    {isLoading.otp ? "Please Wait..." : "Login With OTP"}
                  </button>
                </div>
                <p className="text-center link-style m-0">
                  Not registered yet?&nbsp;
                  <span
                    data-bs-toggle="modal"
                    data-bs-target="#registerationModal"
                    className="pointer"
                  >
                    Register here...
                  </span>
                </p>

                {isPasswordChanged && (
                  <p
                    className="text-center m-0"
                    style={{
                      fontSize: "12px",
                      color: "green",
                    }}
                  >
                    {message}
                  </p>
                )}
              </form>
              <div className="or-line-container">
                <hr className="login-hr" />
                or
                <hr className="login-hr" />
              </div>
              <div className="third-party-login-btn-container">
                <GoogleButton />
                <FacebookButton />
              </div>
            </main>
          </section>
        </section>
      </article>
      <article>
        <article
          className="modal fade"
          id="loginWithOtp"
          tabIndex="-1"
          aria-labelledby="loginWithOtpLabel"
          aria-hidden="true"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
        >
          <section className="modal-dialog">
            <section className="modal-content">
              <header className="modal-header modal-header-container">
                <h5 className="modal-title" id="loginWithOtpLabel">
                  Login with OTP
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  id="close-login"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={handleLoginModalClose}
                ></button>
              </header>
              <main className="modal-body px-sm-5">
                <form className="auth-form">
                  {isOtpInputVisible ? (
                    otpType === login && (
                      <OTP
                        userDetails={
                          inputType === "mobile"
                            ? { mobile: inputValue }
                            : { email: inputValue }
                        }
                        setUserDetails={setInputValue}
                        inputType={inputType}
                        otpType={login}
                        loginWithOTP={loginWithOTP}
                        setOtpVisibility={setIsOtpInputVisible}
                      />
                    )
                  ) : (
                    <>
                      <section className="from-section">
                        <div className="input-group input-wrapper">
                          <span
                            className="input-group-text main-color"
                            id="basic-addon1"
                          >
                            <GoMention />
                          </span>
                          <input
                            id="email"
                            type="text"
                            className="form-control rounded-end"
                            name="email"
                            value={inputValue}
                            style={error.inputVal ? errorInputfieldStyle : {}}
                            placeholder="Email/Mobile Number"
                            onChange={(e) => handleInputValueChange(e)}
                          />
                        </div>
                        {error.inputVal && (
                          <span style={errorMessageStyle}>
                            {error.inputVal}
                          </span>
                        )}
                      </section>
                      <button
                        type="submit"
                        className="btn main-btn"
                        style={{
                          flex: 1,
                        }}
                        data-mdb-dismiss="modal"
                        onClick={(e) => handleLoginWithOtp(e)}
                      >
                        {isLoading.password ? "Please Wait..." : "Get OTP"}
                      </button>

                      <p className="text-center link-style m-0">
                        Not registered yet?&nbsp;
                        <span
                          data-bs-toggle="modal"
                          data-bs-target="#registerationModal"
                          className="pointer"
                        >
                          Register here...
                        </span>
                      </p>
                    </>
                  )}
                </form>
              </main>
            </section>
          </section>
        </article>
      </article>
    </>
  );
};

export default Login;

//to handle verification of otp
// const handleOtpVerification = () => {
// 	if (otp.length === 4) {
// 		setIsLoading({ ...isLoading, otp: true });
// 		axios
// 			.post(`${baseUrl()}/wl/verifyOTP`, {
// 				EmailId: EncryptText(userLoginCredentials.email),
// 				Otp: EncryptText(otp),
// 			})
// 			.then((response) => {
// 				if (response.data.ResultCode === "200") {
// 					setOtp("");
// 					setIsLoading({ ...isLoading, password: false });
// 					setIsEmailVerified(true);
// 					setIsOtpInputVisible(false);
// 				} else {
// 					setIsLoading({ ...isLoading, password: false });
// 					//inline toast message
// 					Swal.fire({
// 						icon: "error",
// 						title: response.data.ResultMessage,
// 						toast: true,
// 						position: "bottom-right",
// 						customClass: {
// 							popup: "colored-toast",
// 						},
// 						showConfirmButton: false,
// 						timer: 3000,
// 						timerProgressBar: true,
// 					});
// 				}
// 			})
// 			.catch((e) => {
// 				setIsLoading({ ...isLoading, password: false });
// 				console.log(e, "handle otp verfication");
// 			});
// 	}
// };
