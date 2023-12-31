import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import baseUrl from "../../Components/baseUrl";
import useRemoveModal from "../../Components/useRemoveModal";
import Logo from "../../Assets/images/logo.png";

import { Link } from "react-router-dom";

function Teachers() {
	const [profileData, setProfileData] = useState([]);
	const [pack, setPack] = useState([]);
	const [allTeachers, setAllTeachers] = useState(null);
	useRemoveModal();

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
		fetch(`${baseUrl()}/df/findSubscriptionPlan/2`, {
			method: "GET",
			headers: {
				"Acces-Control-Allow-Origin": "*",
				Client_ID: "MVOZ7rblFHsvdzk25vsQpQ==",
			},
		})
			.then((response) => response.json())
			.then((data) => {
				setPack(data.result);
				console.log(data);
			});
	}, []);
	useEffect(() => {
		fetch(`${baseUrl()}/df/findUserRole/2`, {
			method: "GET",
			headers: {
				"Acces-Control-Allow-Origin": "*",
				Client_ID: "MVOZ7rblFHsvdzk25vsQpQ==",
			},
		})
			.then((response) => response.json())
			.then((data) => {
				setAllTeachers(data.result);
			});
	}, []);

	return (
		<>
			<nav className='navbar navbar-expand-lg navbar-light px-5 py-1 fixed-top white-bg'>
				<Link className='navbar-brand' to='/'>
					<img
						src={Logo}
						alt=''
						width='70'
						height='auto'
						className='d-inline-block align-text-top'
					/>
				</Link>
				<button
					className='navbar-toggler'
					type='button'
					data-bs-toggle='collapse'
					data-bs-target='#navbarNav'
					aria-controls='navbarNav'
					aria-expanded='false'
					aria-label='Toggle navigation'
				>
					<span className='navbar-toggler-icon'></span>
				</button>
				<div className='collapse navbar-collapse' id='navbarNav'>
					<ul className='navbar-nav ms-auto mr-2'>
						<li className='nav-item px-3'>
							<Link
								className='nav-link '
								aria-current='page'
								to='/'
							>
								Home
							</Link>
						</li>
					</ul>
				</div>
			</nav>
			<div className='invoice-page'>
				<div
					className='custom-slider'
					style={{ flexWrap: "wrap", justifyContent: "center" }}
				>
					{allTeachers?.map((teacher) => {
						return (
							<div
								className='card  '
								style={{
									maxWidth: "18rem",
									border: "2px solid #ebebeb",
								}}
							>
								<img
									className='card-img-top'
									style={{
										borderRadius: "50%",
										objectFit: "cover",
									}}
									src={`${baseUrl()}/df/showProfilePic/${
										teacher.image
									}`}
									alt='Card image cap'
								/>
								<div className='card-body'>
									<h5 className='card-title'>
										{teacher.userName}
									</h5>
									<p className='card-text'>
										Skills : {teacher.skills}
									</p>
									<p>Experience : {teacher.experience}yrs</p>
									<Link
										style={{ marginLeft: "63px" }}
										to={`/individualteacher/${teacher.mobile}`}
										className='btn main-btn '
									>
										Details
									</Link>
								</div>
							</div>
						);
					})}
				</div>
			</div>

			<footer className='footer mt-auto py-3 main-color-bg border-top '>
				<div className='container text-center'>
					<span className='white'>
						Copyright &#169; 2023 BESST(Brahmaputra Exam Success
						Support Team Private Limited ){" "}
					</span>
				</div>
			</footer>
		</>
	);
}

export default Teachers;
