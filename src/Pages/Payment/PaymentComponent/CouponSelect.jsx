/* eslint-disable */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { GrFormClose } from "react-icons/gr";
import { BiRupee } from "react-icons/bi";
import { RiCoupon3Fill } from "react-icons/ri";
import { IoIosPricetags } from "react-icons/io";
import Cookies from "js-cookie";

// Payment Component
import CouponBlock from "./CouponBlock";
import baseUrl from "../../../Components/baseUrl";

import axios from "axios";
import {
	DecryptJSON,
	DecryptText,
} from "../../../Components/Encrypt/CryptoEncryption";

const useCouponSelect = (couponDetails, profileData, setShow, checkout) => {
	//  couponDiscount, setCouponDiscount, amount, setAmount,
	// const { couponDetails, setShow, profileData, checkout } = props;

	const defaultCouponValue = {
		couponValue: 0,
		couponCode: "",
		couponLabel: "",
	};

	// FIXME:
	// const price = Number(checkout[1].totalPrice.split(" ")[1]);
	// const gst = Number(checkout[1].afterDiscountGst.split(" ")[1]);
	// const valDiscount = Number(checkout[1].afterDiscountTotalPrice.split(" ")[1]);

	const [selectCoupon, setSelectedCoupon] = useState(defaultCouponValue);
	const [amount, setAmount] = useState(3001);
	const [couponDiscount, setCouponDiscount] = useState(0);
	const [discount, setDiscount] = useState(1500);
	const [afterDiscount, setAfterDiscount] = useState(amount);
	const [totalPrice, setTotalPrice] = useState(1500);

	const [validCoupon, setValidCoupon] = useState(false);
	const [inputCoupon, setInputCoupon] = useState(true);
	// Condition Need To add
	const [tax, setTax] = useState(0);
	const [taxes, setTaxes] = useState(0);
	const [sgst, setSgst] = useState(0);
	const [cgst, setCgst] = useState(0);

	const [apply, setApply] = useState(false);

	let navigate = useNavigate();

	// console.log(couponDetails);
	// if (!couponDetails.length) {
	//   couponDetails = [
	//     { couponValue: 300, couponCode: "BESST10", couponLabel: "GET 10% OFF" },
	//     { couponValue: 450, couponCode: "BESST15", couponLabel: "GET 15% OFF" },
	//     { couponValue: 600, couponCode: "BESST20", couponLabel: "GET 20% OFF" },
	//   ];
	// }

	useEffect(() => {
		try {
			if (checkout) {
				const gst = Number(checkout.taxes);
				const price = Number(checkout.actualBasePrice);
				const Discount = Number(checkout.discountAmt);
				const total = Number(checkout.totalPayableAmt);
				// setAfterDiscount(valDiscount, price);
				setAmount(price);
				setTax(gst);
				setDiscount(Discount);
				setTotalPrice(total);
				// if (gst) {
				//   setTax(gst);
				//   setSgst(0);
				// } else {
				//   setSgst(Number(checkout[1].sgst.split(" ")[1]));
				//   setCgst(Number(checkout[1].cgst.split(" ")[1]));
				// }
			}
		} catch (e) {
			console.warn(e);
			setTax(0);
			setSgst(0);
			setCgst(0);
		}
	}, [checkout]);

	// useEffect(() => {
	//   const timer = setTimeout(() => {
	//     document.querySelector("#payment-block").scrollIntoView({
	//       behavior: "smooth",
	//     });
	//   }, 500);
	//   return () => clearTimeout(timer);
	// }, []);

	// DONE: CouponCode Validation
	const isActiveCoupon = async (couponCode) => {
		let obj;
		if (
			checkout.chosenDomainSubjects?.length &&
			checkout.chosenLangSubjects?.length
		) {
			obj = {
				subscriptionId: checkout.subscriptionId,
				appliedCoupon: couponCode,
				chosenDomainSubjects: checkout.chosenDomainSubjects,
				chosenLangSubjects: checkout.chosenLangSubjects,
			};
		} else if (checkout.chosenDomainSubjects?.length) {
			obj = {
				subscriptionId: checkout.subscriptionId,
				appliedCoupon: couponCode,
				chosenDomainSubjects: checkout.chosenDomainSubjects,
			};
		} else {
			obj = {
				subscriptionId: checkout.subscriptionId,
				appliedCoupon: couponCode,
			};
		}

		if (couponCode !== "") {
			// console.log(selectCoupon, "\n", profileData);
			const res = await axios.post(
				`${baseUrl()}/pg/validateCoupon`,
				obj,
				{
					headers: {
						"Acces-Control-Allow-Origin": "*",
						Client_ID: "MVOZ7rblFHsvdzk25vsQpQ==",
						Authorization: `${Cookies.get("token")}`,
					},
				}
			);

			setAmount(res.data.Data.actualBasePrice);
			setAfterDiscount(res.data.Data.totalPayableAmt);
			setCouponDiscount(res.data.Data.couponDiscountAmt);
			setTax(res.data.Data.taxes);
			// setTaxes(res.data.Data.totalGstAmt);
			setTotalPrice(res.data.Data.totalPayableAmt);
			setDiscount(res.data.Data.discountAmt);
			// setSgst(res.data.Data.sgst);
			// setCgst(res.data.Data.cgst);

			// setAfterDiscount(discount - res.data.Data.couponDiscount);

			// setApply(res.data.ResultDescription == "FAILURE");
			if (res.data.ResultDescription != "FAILURE") {
				// setApply(true);
				setValidCoupon(true);
				setInputCoupon(true);
			} else {
				// setApply(false);
				// setTotalPrice(res.data.Data.actualPrice * 0.5);
				// setTax(0);
				// setSgst(0);
				// setCgst(0);
				// setSelectedCoupon((prev) => ({ ...prev, couponCode: "" }));
				setValidCoupon(false);
				setInputCoupon(false);
				setAfterDiscount(amount);
			}
		}
	};

	// useMemo(() => , []);

	// useEffect(() => {
	//   setTotalPrice(discount + tax);
	// }, [afterDiscount, amount, validCoupon, tax]);
	// const paymentCall = () => {};

	return {
		amount: amount,
		discount: discount,
		tax: tax,
		totalPrice: totalPrice,
		couponCode: selectCoupon.couponCode,
		couponDiscount: couponDiscount,
		sgst: sgst,
		cgst: cgst,
		taxes: taxes,
		validCoupon: validCoupon,
		afterDiscount: afterDiscount,
		render: (
			<>
				<section className='payment-block-container' id='payment-block'>
					<article className='coupon-container'>
						<h5 style={{ color: "#7b1fa2" }}>
							<RiCoupon3Fill /> Coupon Code
						</h5>
						{/* couponCode */}
						<div
							style={{
								width: "100%",
								padding: "0px 15px",
								position: "relative",
							}}
							className='btn-group-vertical'
							role='group'
							aria-label='Basic radio toggle button group'
						></div>

						{couponDetails?.map((item, index) => (
							<CouponBlock
								item={item}
								key={index}
								setCouponDiscount={setCouponDiscount}
								setAfterDiscount={setAfterDiscount}
								setSelectedCoupon={setSelectedCoupon}
								amount={discount}
								setValidCoupon={setValidCoupon}
								selectedCoupon={selectCoupon}
								isActiveCoupon={isActiveCoupon}
							/>
						))}

						<div className='coupon-fields-container'>
							<div style={{ position: "relative" }}>
								<input
									type='text'
									value={selectCoupon.couponCode}
									onChange={(e) => {
										if (!validCoupon)
											setSelectedCoupon({
												...selectCoupon,
												couponCode: e.target.value,
											});
									}}
									className='modal-profile-fields'
									id='formGroupExampleInput'
									placeholder='Enter coupon code'
								/>
								<div
									style={{
										position: "absolute",
										right: "10px",
										top: "8px",
									}}
								>
									<GrFormClose
										onClick={() => {
											setValidCoupon(false);
											setSelectedCoupon(
												defaultCouponValue
											);
											setAfterDiscount(amount);
											// Set to default value
											setCouponDiscount(0);
											setTax(checkout.taxes);
											setTotalPrice(
												checkout.totalPayableAmt
											);
										}}
										size={20}
										style={
											validCoupon
												? { display: "inline" }
												: { display: "none" }
										}
									/>
								</div>
							</div>

							<button
								type='button'
								onClick={() => {
									isActiveCoupon(selectCoupon.couponCode);
								}}
								className='btn main-btn'
								style={{
									display: validCoupon ? "none" : "block",
								}}
								disabled={
									couponDetails.length && validCoupon
										? false
										: true
								}
							>
								APPLY
							</button>
						</div>
						{!couponDetails.length && (
							<p
								style={{
									fontSize: "13px",
									fontWeight: "500",
									color: "red",
								}}
							>
								Currently, No coupons available.
							</p>
						)}

						{/* TODO: Success message or Fail message */}

						<div>
							{validCoupon ? (
								<div className='text-success'>
									Coupon Activated Sucessfully
								</div>
							) : (
								""
							)}
						</div>
						<div>
							{inputCoupon || validCoupon ? (
								""
							) : (
								<div className='text-danger'>
									Fail to Activated Coupon
								</div>
							)}
						</div>
					</article>
					<article
						className='payment-summary-container'
						style={{ position: "relative" }}
					>
						<div className='payment-summary'>
							<h4 className='summary-heading'>
								<IoIosPricetags /> Payment Summary
							</h4>
							<hr />
							<section className='address-container'>
								<div className='address-line '>
									<p>Amount</p>
									<strong>
										<BiRupee /> {amount}
									</strong>
								</div>
								<div className='address-line '>
									<p>Discount</p>
									<strong>
										<BiRupee /> {discount}
									</strong>
								</div>
								<div
									style={
										validCoupon
											? { display: "block" }
											: { display: "none" }
									}
								>
									<div className='address-line '>
										<p>Coupon Applied</p>
										<strong>
											{selectCoupon.couponCode}
										</strong>
									</div>
								</div>
								<div className='address-line '>
									<p>Coupon Discount</p>
									{couponDiscount === 0 ? (
										<strong>
											<BiRupee /> 0
										</strong>
									) : (
										<strong>
											- <BiRupee /> {couponDiscount}
										</strong>
									)}
								</div>
								{/* TODO: Place the condition wheater it igst or cgst/sgst */}
								{taxes !== "" &&
								taxes !== 0 &&
								taxes !== null ? (
									<>
										<div className='address-line'>
											<p>Taxes</p>
											<strong>
												<BiRupee /> {taxes}
												{/* FIXME: SGST tax Change*/}
											</strong>
										</div>
									</>
								) : (
									<>
										<div className='address-line '>
											<p>Taxes</p>
											<strong>
												<BiRupee /> {tax}
											</strong>
										</div>
									</>
								)}
								<div
									style={
										validCoupon
											? { display: "block" }
											: { display: "none" }
									}
								>
									<hr />
									<div className='address-line text-success'>
										<p>After Discount Price</p>
										<strong>
											<BiRupee /> {totalPrice}
										</strong>
									</div>
								</div>
							</section>

							<hr />
							<div
								className='address-line'
								style={{ borderRadius: "8px" }}
							>
								<p>Total Amount</p>
								<strong>
									<BiRupee /> {totalPrice}
								</strong>
							</div>
						</div>
					</article>
				</section>
			</>
		),
	};
};

export default useCouponSelect;

//

{
	/* <div
  className="border border-2 text-center d-flex "
  style={{
    width: "100%",
    marginTop: "36px",
    justifyContent: "center",
  }}
>
  <button
    className="btn main-btn m-2"
    // to="/payment-gateway"
    style={{ width: "fit-content" }}
    onClick={() => paymentHandler()}
  >
   
    Proceed To Pay
   
  </button>

  <button onClick={() => setShow(false)} className="btn btn-outline-secondary m-2" style={{ width: "fit-content" }}>
    cancel
  </button>
</div>; */
}

// const paymentHandler = () => {
//   // TODO: payment data handle POST // appliedCoupon, userId, email, orderAmt;

//   if (Cookies.get("token") !== null) {
//     axios
//       .post(
//         baseUrl() + "/pg/initiatePayment",
//         {
//           appliedCoupon: selectCoupon.couponCode,
//           userId: profileData.userId,
//           orderAmt: totalPrice,
//           email: Cookies.get("email"),
//           subscriptionName: "Premium checkout",
//           courseId: profileData.courseBeans[0].courseId,
//         },
//         {
//           headers: {
//             "Acces-Control-Allow-Origin": "*",
//             Client_ID: "MVOZ7rblFHsvdzk25vsQpQ==",
//             Authorization: `${Cookies.get("token")}`,
//           },
//         }
//       )
//       .then(async (response) => {
//         if (response.status === 200) {
//           console.log(response.data.Data);
//           const { mid, orderId, txnToken } = response.data.Data;

//           if (mid === null) {
//             // return;
//           }
//           // MID ENCRYPTED
//           const decryptMid = DecryptText(mid);
//           // console.log(mid, orderId, txnToken);

//           window.open(`https://securegw.paytm.in/theia/api/v1/showPaymentPage?mid=${decryptMid}&orderId=${orderId}&txnToken=${txnToken}&flow=checkout&mode=webview`, "_self");
//         }
//       })
//       .catch((e) => {
//         // FIXME: remove the comment after done
//         // navigate("/");
//         console.log(e);
//       });
//   }
// };
