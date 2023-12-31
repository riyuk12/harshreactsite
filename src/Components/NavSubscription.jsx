import React, { useEffect } from "react";
import "./NavSubscription.css";
import baseUrl from "./baseUrl";
import Cookies from "js-cookie";
import axios from "axios";
import { TiTick } from "react-icons/ti";
// import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";

function CardSelection({
	courseName = "Common University Entrance Test (CUET)",
	id,
	setOnSelectId,
	onSelectId,
}) {
	return (
		<>
			<div
				className='card-course'
				style={
					onSelectId === id
						? {
								transform: "scale(1.1)",
								backgroundColor: "#a44cc9",
						  }
						: {}
				}
				onClick={() =>
					onSelectId === id ? setOnSelectId(null) : setOnSelectId(id)
				}
			>
				<div
					className='card_title_course title-white'
					style={onSelectId === id ? { color: "white" } : {}}
				>
					<p>{courseName}</p>
					<div className='card_icon'>
						{onSelectId === id ? (
							<TiTick size={20} color={"lightgreen"} />
						) : (
							""
						)}
					</div>
				</div>
			</div>
		</>
	);
}

export default function NavSubscription() {
	// Fetch the user Subscription API
	const navigate = useNavigate();
	const [onSelectId, setOnSelectId] = React.useState(null);

	useEffect(() => {
		axios
			.get(`${baseUrl()}/df/getUserSubscriptionDetails`, {
				// method: "GET",
				headers: {
					"Acces-Control-Allow-Origin": "*",
					Client_ID: "MVOZ7rblFHsvdzk25vsQpQ==",
					Authorization: `${Cookies.get("token")}`,
				},
			})
			.then((response) => console.log(response))
			.catch((e) => {
				console.log(e);
			});
	}, []);

	return (
		<div
			className='modal fade'
			id='subscriptionModal'
			tabIndex='-1'
			role='dialog'
			aria-labelledby='subscriptionModal'
			aria-hidden='true'
		>
			<div className='modal-dialog modal-lg' role='document'>
				<div className='modal-content'>
					<div className='modal-header'>
						<h5 className='modal-title' id='subscriptionModalLabel'>
							Enroll Subscription
						</h5>
						<button
							type='button'
							className='close'
							data-dismiss='modal'
							aria-label='Close'
						>
							<span aria-hidden='true'>&times;</span>
						</button>
					</div>
					<div className='modal-body'>
						<div className='cards-option'>
							{[{}, {}].map((data, index) => (
								<CardSelection
									key={index}
									courseName={data.courseName}
									id={data.userSubsId || index}
									setOnSelectId={setOnSelectId}
									onSelectId={onSelectId}
								/>
							))}
						</div>
					</div>
					<div className='modal-footer'>
						<button
							type='button'
							className='btn btn-secondary'
							data-dismiss='modal'
						>
							Close
						</button>
						<button
							onClick={() => {
								if (onSelectId)
									navigate("/mySubscriptions", {
										state: { onSelectId: onSelectId },
									});
								const modal =
									document.querySelector(".modal-backdrop");
								modal.remove();
							}}
							type='button'
							className='btn main-btn'
							disabled={onSelectId === null ? true : false}
						>
							Proceed
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
