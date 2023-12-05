import Cookies from "js-cookie";
import { GoogleLogin } from "react-google-login";
import { useDispatch, useSelector } from "react-redux";
import { EncryptText } from "../../../Encrypt/CryptoEncryption";
import axios from "axios";
import { utilitySliceActions } from "../../../../Redux/Slice/UtilitySlice";
import { useNavigate } from "react-router";
import baseUrl from "../../../../Components/baseUrl"

const GoogleButton = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { clinetLocation } = useSelector((state) => state.utils);

	const onLoginSuccess = (res) => {
		// const body = {
		// 	email: res.emailAddresses[0].value,
		// 	name: res.names[0].givenName,
		// 	lastname: res.names[0].familyName,
		// 	source: "Google",
		// 	uid: res.resourceName,
		// 	latitude: clinetLocation.lat,
		// 	longitude: clinetLocation.lon,
		// };
		console.log(res);
		// console.log("hey success");

		navigator.geolocation.getCurrentPosition((position) => {
			dispatch(
				utilitySliceActions.setClientLocation({
					lat: position.coords.latitude.toFixed(2),
					lon: position.coords.longitude.toFixed(2),
				})
			);
		});

		axios
			.post(`${baseUrl()}/wl/extLogin`, {
				email: EncryptText(res.profileObj.email),
				name: res.profileObj.givenName,
				source: "Google",
				uid: res.profileObj.googleId,
				latitude: clinetLocation.lat,
				longitude: clinetLocation.lon,
			})
			.then((response) => {
				console.log("api extlogin", response);

				if (response.data.result.hasPerDtlsUpdated === false) {
					navigate("/register", {
						state: {
							profileObj: {
								email: res.profileObj.email,
								name: res.profileObj.givenName,
								lastname: res.profileObj.familyName,
								latitude: clinetLocation.lat,
								longitude: clinetLocation.lon,
								uid: res.profileObj.googleId,
								source: "Google",
							},
							res: res,
						},
					});
					const modal = document.querySelector(".modal-backdrop");
					modal.remove();
				} else {
					navigate("/studentDashboard");
					console.log("api extlogin student");

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
		console.log("google", res, "google");
	};

	return (
		<GoogleLogin
			clientId={process.env.REACT_APP_TEMP_CLIENT_ID}
			buttonText='Login with Google'
			onSuccess={onLoginSuccess}
			onFailure={onLoginFailure}
			cookiePolicy={"single_host_origin"}
			className='google-button'
		/>
	);
};

export default GoogleButton;
