import { useState, useEffect } from "react";

import Cookies from "js-cookie";
import axios from "axios";
import baseUrl from "../../Components/baseUrl";
// import { useNavigate } from "react-router-dom";
import "./PaymentList.css";

import PaymentOrder from "./PaymentListComponent/PaymentOrder";
import Header from "../../Components/Global/Navigation/Header";
import OneLinerFooter from "../../Components/Global/Footers/OneLinerFooter";
// import PaymentRefund from "./PaymentListComponent/PaymentRefund";

const DATA = {
	allSuccessPayments: [],
	allFailedPayments: [],
	allPendingPayments: [],
};

const PaymentList = () => {
	// const navigate = useNavigate();

	// const [paymentData, setPaymentData] = useState([]);

	const [paymentHistoryDetails, setPaymentHistoryDetails] = useState(DATA);

	useEffect(() => {
		axios
			.get(baseUrl() + "/pg/getSubscriptionHistory", {
				headers: {
					"Access-Control-Allow-Origin": "*",
					Client_ID: "MVOZ7rblFHsvdzk25vsQpQ==",
					Authorization: `${Cookies.get("token")}`,
					"content-type": "application/json",
				},
				data: "",
			})
			.then((response) => response.data)
			.then((data) => {
				if (data.ResultCode === "200")
					setPaymentHistoryDetails(() => ({ ...data.Data }));
			})
			.catch((e) => console.log(e));
	}, []);

	// const allSuccessPayments = useMemo(() => paymentHistoryDetails.allSuccessPayments, [paymentHistoryDetails.allSuccessPayments.length]);
	return (
		<>
			<Header />
			<section className='px-4'>
				<h1 className='my-4'>Purchase History</h1>

				<ul className='nav nav-tabs' id='myTab' role='tablist'>
					<li className='nav-item' role='presentation'>
						<button
							className='nav-link active'
							id='home-tab'
							data-bs-toggle='tab'
							data-bs-target='#home-tab-pane'
							type='button'
							role='tab'
							aria-controls='home-tab-pane'
							aria-selected='true'
						>
							Course
						</button>
					</li>
				</ul>
				<div className='tab-content' id='myTabContent'>
					<div
						className='tab-pane fade show active'
						id='home-tab-pane'
						role='tabpanel'
						aria-labelledby='home-tab'
						tabIndex='0'
					>
						<PaymentOrder
							paydata={[
								...paymentHistoryDetails.allSuccessPayments,
								...paymentHistoryDetails.allFailedPayments,
								...paymentHistoryDetails.allPendingPayments,
							]}
						/>
					</div>
				</div>
			</section>

			<OneLinerFooter />
		</>
	);
};

export default PaymentList;

/* <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="profile-tab"
              data-bs-toggle="tab"
              data-bs-target="#profile-tab-pane"
              type="button"
              role="tab"
              aria-controls="profile-tab-pane"
              aria-selected="false"
            >
              Refund
            </button>
          </li> */

/* <div className="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabIndex="0">
            <PaymentRefund />
          </div> */
