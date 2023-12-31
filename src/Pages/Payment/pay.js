import Cookies from "js-cookie";
import axios from "axios";
import baseUrl from "../../Components/baseUrl";
import { DecryptText } from "../../Components/Encrypt/CryptoEncryption";
import Swal from "sweetalert2";

const paymentHandler = ({
	couponCode,
	profileData,
	totalPrice,
	setLoader,
	checkout,
	setTxnToken,
	setOrderId,
	setMid,
}) => {
	// TODO: payment data handle POST // appliedCoupon, userId, email, orderAmt;

	if (Cookies.get("token") !== null) {
		console.log(checkout);
		let obj;
		if (
			checkout.chosenDomainSubjects?.length &&
			checkout.chosenLangSubjects?.length
		) {
			obj = {
				userId: profileData.userId,
				subscriptionId: checkout.subscriptionId,
				appliedCoupon: couponCode,
				orderAmt: totalPrice,
				chosenDomainSubjects: checkout.chosenDomainSubjects,
				chosenLangSubjects: checkout.chosenLangSubjects,
			};
		} else if (checkout.chosenDomainSubjects?.length) {
			obj = {
				userId: profileData.userId,
				subscriptionId: checkout.subscriptionId,
				appliedCoupon: couponCode,
				orderAmt: totalPrice,
				chosenDomainSubjects: checkout.chosenDomainSubjects,
			};
		} else {
			obj = {
				userId: profileData.userId,
				subscriptionId: checkout.subscriptionId,
				appliedCoupon: couponCode,
				orderAmt: totalPrice,
			};
		}

		axios
			.post(baseUrl() + "/pg/initiatePayment", obj, {
				headers: {
					"Acces-Control-Allow-Origin": "*",
					Client_ID: "MVOZ7rblFHsvdzk25vsQpQ==",
					Authorization: `${Cookies.get("token")}`,
				},
			})
			.then(async (response) => {
				if (response.status === 200) {
					console.log(response.data.Data);
					const { mid, orderId, txnToken } = response.data.Data;

					if (mid === null) {
						alert(
							"Either you are already subscribed to this course or some error may have occured during the process"
						);
						setLoader(false);
						return;
					}

					//contact support
					if (txnToken === null) {
						Swal.fire({
							title: "error",
							text: "Something went worng... contact support?",
							timer: 4000,
						});
						setLoader(false);
						return;
					}
					// MID ENCRYPTED
					const decryptMid = DecryptText(mid);
					console.log(
						"setting mid, orderid and tnx token",
						txnToken,
						orderId,
						mid
					);
					setOrderId(orderId);
					setMid(decryptMid);
					setTxnToken(txnToken);
					// localStorage.setItem("mid", decryptMid);
					// localStorage.setItem("orderId", orderId);
					// localStorage.setItem("txnToken", txnToken);
					// window.location.assign(
					// 	"http://localhost:8000/registration/payment-success"
					// );

					// window.open(
					// 	`https://securegw.paytm.in/theia/api/v1/showPaymentPage?mid=${decryptMid}&orderId=${orderId}&txnToken=${txnToken}&flow=checkout&mode=webview`,
					// 	"_self"
					// );
					setLoader(false);
				}
			})
			.catch((e) => {
				// FIXME: remove the comment after done
				// navigate("/");
				console.log(e);
			});
	}
};

export default paymentHandler;
