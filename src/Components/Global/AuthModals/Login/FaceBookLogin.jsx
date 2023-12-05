import { useEffect } from "react";
import FacebookLogin from "react-facebook-login";
import { utilitySliceActions } from "../../../../Redux/Slice/UtilitySlice";
import { EncryptText } from "../../../Encrypt/CryptoEncryption";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import axios from "axios";
import Cookies from "js-cookie";
import baseUrl from "../../../baseUrl";

const FacebookButton = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { clinetLocation } = useSelector((state) => state.utils);

	useEffect(() => {
		// gapi.load("client:auth2", () => {
		// 	gapi.client.init({
		// 		clientId: clientId,
		// 		scope: "",
		// 	});
		// });
	});

	const responseFacebook = (res) => {
		const body = {};

		const paramsString = window.location.search;
		const searchParams = new URLSearchParams(paramsString);

		// const code = searchParams.get("code");
		const prompt = searchParams.get("prompt");

		navigator.geolocation.getCurrentPosition((position) => {
			dispatch(
				utilitySliceActions.setClientLocation({
					lat: position.coords.latitude.toFixed(2),
					lon: position.coords.longitude.toFixed(2),
				})
			);
		});

		// for Facebook login
		if (prompt === null) {
			axios
				.post(`${baseUrl()}/wl/extLogin`, {
					email: EncryptText(res.email),
					name: res.name.split(" ")[0],
					source: "Facebook",
					uid: res.userID,
					latitude: clinetLocation.lat,
					longitude: clinetLocation.lon,
				})
				.then((response) => {
					if (response.data.result.hasPerDtlsUpdated === false) {
						navigate("/register", {
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
						navigate("/studentDashboard");
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

	const failureFacebook = (e) => {
		console.log("facebook", e, "facebook");
	};

	return (
		<FacebookLogin
			appId={process.env.REACT_APP_FACEBOOK_CLIENT_ID}
			fields='name,email,picture'
			callback={responseFacebook}
			cssClass='facebook-button'
			icon='fa-facebook'
			onFailure={failureFacebook}
		/>
	);
};

export default FacebookButton;
