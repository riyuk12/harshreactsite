import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BiRupee } from "react-icons/bi";
import { Tick } from "react-crude-animated-tick";
import baseUrl from "../../Components/baseUrl";
import Cookies from "js-cookie";
import axios from "axios";
import { studDashboard } from "../../RouteConstants";

export default function PaymentSuccess({
	profileData,
	orderId,
	transactionId,
	orderDate,
	orderAmt,
}) {
	const navigate = useNavigate();

	return (
		<>
			<div id='content' className='align-self-center fs-4 fs-md-3'>
				<p className='m-0'>
					<strong>Payment Successful</strong>
					{/* Dear <span className="fw-bolder">{profileData?.firstName}</span> */}
				</p>
				<button
					className='view_details mb-5'
					data-bs-toggle='modal'
					data-bs-target='#InvoiceModal'
				>
					View Transaction details
				</button>
				<div className='payment_details'>
					{/* <div className="d-flex justify-content-between">
            <p>Payment Type</p>
            <p>PayTm</p>
          </div> */}
					<div className='d-flex justify-content-between'>
						<p>Bank Ref ID</p>
						<p>{transactionId}</p>
					</div>
					<div className='d-flex justify-content-between'>
						<p>Order date</p>
						<p>{orderDate}</p>
					</div>
					<div className='d-flex justify-content-between'>
						<p>
							<strong>Order Amount</strong>
						</p>
						<p>
							<strong>
								<BiRupee />
								{orderAmt}
							</strong>
						</p>
					</div>
					<div className='d-flex justify-content-between'>
						<p>Order ID</p>
						<p>{orderId}</p>
					</div>
				</div>
				<div className='mt-4'>
					<button
						type='button'
						className='btn btn-secondary m-2 fs-5'
						data-bs-toggle='modal'
						data-bs-target='#ViewInvoiceModal'
					>
						Download Invoice
					</button>
					<button
						className='btn main-btn m-2 fs-5'
						onClick={() => navigate(studDashboard)}
					>
						Go to DashBoard
					</button>
				</div>
			</div>
			<div className='pb-2 transaction-img'>
				{/* <img src={Success} alt="success" /> */}
				<Tick size={55} />
			</div>
			<InvoiceModal
				orderId={orderId}
				transactionId={transactionId}
				orderDate={orderDate}
				orderAmt={orderAmt}
				profileData={profileData}
			/>
			<ViewInvoiceModal orderId={orderId} />
		</>
	);
}

function InvoiceModal({
	orderId,
	transactionId,
	orderDate,
	orderAmt,
	profileData,
}) {
	const fetchPdfDown = async () => {
		try {
			const config = {
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": "*",
				Client_ID: "MVOZ7rblFHsvdzk25vsQpQ==",
				Authorization: Cookies.get("token"),
			};
			const pdf = await axios.get(
				baseUrl() + "/pg/getInvoicePdf/" + orderId,
				{ headers: config, data: {} }
			);
			const data = await pdf.data;
			const arrFile = new Uint8Array(
				JSON.parse(data.Data.invoicePdfByteArrStr)
			);
			const file = new Blob([arrFile], { type: "application/pdf" });
			const fileURL = URL.createObjectURL(file);
			const link = document.createElement("a");
			link.href = fileURL;
			link.download = data.Data.invoicePdfName;
			link.dispatchEvent(new MouseEvent("click"));
		} catch (errors) {
			console.log(errors.message);
		}
	};

	return (
		<>
			{/* eslint-disable-next-line */}
			<div
				className='modal fade'
				id='InvoiceModal'
				role='dialog'
				tabIndex='-1'
				aria-labelledby='InvoiceModalLabel'
				aria-hidden='true'
			>
				<div className='modal-dialog'>
					<div className='modal-content'>
						<div
							className='modal-header'
							style={{ background: "#20b465" }}
						>
							<h5
								className='modal-title'
								id='InvoiceModalLabel'
								style={{ color: "white" }}
							>
								Order Successful
							</h5>
							<button
								type='button'
								className='btn-close'
								data-bs-dismiss='modal'
								aria-label='Close'
							></button>
						</div>
						<div className='modal-body '>
							<div className='row'>
								<div className='col-md-6 payment-receipt-details'>
									<h6>Bank Reference: </h6>
								</div>
								<div className='col-md-6 payment-receipt-details'>
									<h6>{transactionId} </h6>
								</div>
							</div>
							<div className='row'>
								<div className='col-md-6 payment-receipt-details'>
									<h6>Order No: </h6>
								</div>
								<div className='col-md-6 payment-receipt-details'>
									<h6>{orderId} </h6>
								</div>
							</div>
							<div className='row'>
								<div className='col-md-6 payment-receipt-details'>
									<h6>Order Date: </h6>
								</div>
								<div className='col-md-6 payment-receipt-details'>
									<h6>{orderDate} </h6>
								</div>
							</div>
							<div className='row'>
								<div className='col-md-6 payment-receipt-details'>
									<h6>Order Amount: </h6>
								</div>
								<div className='col-md-6 payment-receipt-details'>
									<h6>{orderAmt} </h6>
								</div>
							</div>
						</div>
						<div className='modal-footer'>
							<button
								type='button'
								className='btn btn-secondary'
								data-bs-dismiss='modal'
							>
								Close
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

function ViewInvoiceModal({ orderId }) {
	return (
		<>
			<div
				className='modal fade'
				id='ViewInvoiceModal'
				role='dialog'
				tabIndex='-1'
				aria-labelledby='ViewInvoiceModalLabel'
				aria-hidden='true'
			>
				<div className='modal-dialog modal-lg modal-dialog-scrollable'>
					<div className='modal-content'>
						<div className='modal-header'>
							<h5
								className='modal-title'
								id='ViewInvoiceModalLabel'
							>
								View Invoice
							</h5>
							<button
								type='button'
								className='btn-close'
								data-bs-dismiss='modal'
								aria-label='Close'
							></button>
						</div>
						<div className='modal-body overflow-hidden'>
							<PDF_DOC orderId={orderId} />
						</div>
						<div className='modal-footer'></div>
					</div>
				</div>
			</div>
		</>
	);
}

function PDF_DOC({ orderId }) {
	const [pdfFile, setPdfFile] = useState("");
	const [fail, setFail] = useState(false);
	useEffect(() => {
		const fetchPdf = async () => {
			try {
				const config = {
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin": "*",
					Client_ID: "MVOZ7rblFHsvdzk25vsQpQ==",
					Authorization: Cookies.get("token"),
				};
				const pdf = await axios.get(
					baseUrl() + "/pg/getInvoicePdf/" + orderId,
					{ headers: config, data: {} }
				);
				const data = await pdf.data;
				if (data.ResultCode === "403") {
					setFail(true);
					setPdfFile("");
				} else if (data.Data === null) {
					setFail(true);
					setPdfFile("");
				} else {
					const arrFile = new Uint8Array(
						JSON.parse(data.Data.invoicePdfByteArrStr)
					);
					const file = new Blob([arrFile], {
						type: "application/pdf",
					});
					const fileURL = URL.createObjectURL(file);
					setPdfFile(fileURL);
					setFail(false);
				}
			} catch (errors) {
				console.log(errors.message);
				setPdfFile("");
				setFail(false);
			}
		};
		fetchPdf();
		return () => {
			setPdfFile("");
			setFail(false);
		};
	}, [orderId]);

	return (
		<>
			{pdfFile.length > 0 && (
				<iframe
					src={pdfFile}
					title='modal'
					frameBorder='0'
					width={"100%"}
					height={"700px"}
					allowfullscreen
				></iframe>
			)}
			{fail && <>NO DATA PRESENT</>}
		</>
	);
}

/* <div className="d-flex flex-lg-row flex-column justify-content-around text-sm-left text-center">
                <div className="p-2 flex-grow-1 border border-secondary" style={{ width: "100%" }}>
                  <h6>Invoice to:</h6>
                  <h5>
                    <strong>Name_FIELD</strong>
                  </h5>
                  <p>Address_Details_XXXXXXXX_XX</p>
                  <p>Contact_INFO_9876543210</p>
                </div>
                <div className="p-2 flex-grow-1 border border-secondary" style={{ width: "100%" }}>
                  <p>
                    Order Id:
                    <br /> <strong>{orderId}</strong>
                  </p>
                  <p>
                    Transaction Id:
                    <br /> <strong>{"OSFSGAEGQGWBDVDSVWER"}</strong>
                  </p>
                </div>
              </div> */

// const handleClick = useCallback(() => {
//   // fetchPdf();
// }, []);

// const fetchPdf = async () => {
//   try {
//     const config = {
//       "Content-Type": "application/json",
//       "Access-Control-Allow-Origin": "*",
//       Client_ID: "MVOZ7rblFHsvdzk25vsQpQ==",
//       Authorization: Cookies.get("token"),
//     };
//     const pdf = await axios.get(baseUrl() + "/pg/getInvoicePdf/" + orderId, { headers: config, data: {} });
//     const data = await pdf.data;
//     ViewPDF(data.Data.invoicePdfByteArrStr);
//   } catch (errors) {
//     console.log(errors.message);

//   }
// };

// eslint-disable-next-line
// import { data } from "./log/arrayfile";

// function ViewPDF(fileArrStr) {
//   const arrFile = new Uint8Array(JSON.parse(fileArrStr));

//   const blob = new Blob([arrFile], { type: "application/pdf" }, { filename: "invoice.pdf" });

//   const fileURL = URL.createObjectURL(blob);
//   window.open(fileURL);
// }
