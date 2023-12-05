import { IoIosPricetags } from "react-icons/io";
import { BiRupee } from "react-icons/bi";
import useCouponSelect from "../../../Pages/Payment/PaymentComponent/CouponSelect";

const OrderSummary = ({
	billingDetails,
	profileData,
	checkout,
	setShow,
	couponDetails,
}) => {
	const {
		amount,
		totalPrice,
		couponCode,
		discount,
		tax,
		validCoupon,
		couponDiscount,
		taxes,
	} = useCouponSelect(couponDetails, profileData, setShow, checkout);
	return (
		<>
			<section className='billing-summary-container'>
				<h4 className='fs-6'>Billing Address</h4>
				<address className='address-container flex-grow-1'>
					<span className='address-line'>
						Address: <b>{profileData?.address || ""}</b>
					</span>
					<span className='address-line'>
						District: <b>{profileData?.city || ""}</b>
					</span>
					<span className='address-line'>
						State: <b>{profileData?.state || ""}</b>
					</span>
					<span className='address-line'>
						Pincode: <b>{profileData?.pincode || ""}</b>
					</span>
				</address>
			</section>

			<section className='border' style={{ borderRadius: "8px" }}>
				<div>
					<h4 className='summary-heading m-0 pt-3 pl-3'>
						<IoIosPricetags /> Payment Summary{" "}
					</h4>
					<hr className='my-3' />
				</div>
				<div className='address-container for-m-0 mx-4'>
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
					{validCoupon && (
						<div className='address-line '>
							<p>Coupon Applied</p>
							<strong>{couponCode}</strong>
						</div>
					)}
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
					{taxes !== "" && taxes !== 0 && taxes !== null ? (
						<>
							<div className='address-line '>
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
				</div>
				<hr />
				<div
					style={{ borderRadius: "8px 8px 0 0" }}
					className='address-line text-success mx-4'
				>
					<p className='m-0'>After Discount Price</p>
					<strong>
						<BiRupee /> {totalPrice}
					</strong>
				</div>

				<div
					style={{ borderRadius: "0 0 8px 8px" }}
					className='address-line mx-4 mb-4'
				>
					<p className='m-0'>Total Amount</p>
					<strong>
						<BiRupee /> {totalPrice}
					</strong>
				</div>
			</section>
		</>
	);
};

export default OrderSummary;
