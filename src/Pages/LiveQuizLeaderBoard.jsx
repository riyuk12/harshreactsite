import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PostLiveQuizResultThunk } from "../Redux/Thunks/Post/PostLiveQuizResultThunk";
import Cookies from "js-cookie";
import { useLocation, useNavigate } from "react-router";
import baseUrl from "../Components/baseUrl";

import ProfilePic from "../Assets/images/profilePic.jpg";
import { GiLaurels } from "react-icons/gi";
import { studDashboard } from "../RouteConstants";
import { Link } from "react-router-dom";
import profileHook from "./StudentMCQ/useProfile";

import Logo from "../Assets/images/logo.png";
import { FaUser } from "react-icons/fa";
import OneLinerFooter from "../Components/Global/Footers/OneLinerFooter";

const LiveQuizLeaderBoard = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const [showAll, setShowAll] = useState(false);
	const [isListViewOpen, setIsListViewOpen] = useState(false);
	const {
		data,
		name,
		notVisited,
		user_Name,
		studentresult,
		seo,
		feedbackresult,
		path,
		courseId,
		quizId,
	} = location.state;
	const { liveQuizResult } = useSelector((state) => state.postResp);
	const profileData = profileHook();
	const [seconds, setSeconds] = useState(0);
	const [minutes, setMinutes] = useState(0);
	const [hours, setHours] = useState(0);

	const { firstName, lastName, image } = profileData;

	useEffect(() => {
		const data = {
			courseId: courseId,
			quizId: quizId,
			token: Cookies.get("token"),
		};
		dispatch(PostLiveQuizResultThunk(data));
	}, [dispatch]);

	useEffect(() => {
		if (liveQuizResult?.length < 5) {
			setIsListViewOpen(true);
		} else {
			setIsListViewOpen(false);
		}
	}, [liveQuizResult]);

	return (
		<>
			<nav className='d-md-flex  navbar-expand-lg shadow-none navbar-light px-3 py-1 fixed-top white-bg'>
				<div className='d-flex align-items-center'>
					{" "}
					<Link className='navbar-brand' to='/'>
						<img
							src={Logo}
							alt=''
							width='70'
							height='auto'
							className='d-inline-block align-text-top'
						/>
					</Link>
					<div style={{ width: "100%" }}>
						<div
							style={{
								fontSize: "12px",
								fontWeight: "600",
								lineHeight: "11px",
							}}
						>
							Brahmaputra Exam Success Support Team (BESST)
						</div>
						<div
							style={{
								fontSize: "13px",
								fontWeight: "400",
								lineHeight: "22px",
							}}
						>
							Besst Exam Simulator
						</div>
					</div>{" "}
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
				</div>

				<div className='collapse navbar-collapse' id='navbarNav'>
					<div className='w-100 d-flex justify-content-md-end mt-2'>
						<div
							style={{
								alignItems: "center",
								border: "1px solid black",
								display: "flex",
								justifyContent: "center",
								height: "70px",
								width: "80px",
							}}
						>
							{image ? (
								<img
									style={{
										height: "70px",
										width: "80px",
									}}
									src={
										baseUrl() + "/df/showProfilePic/" +
										image
									}
								></img>
							) : (
								<FaUser size={40} />
							)}
						</div>

						<div
							className=' ms-2 '
							style={{
								lineHeight: "18px",
							}}
						>
							<h6
								className='ms-2'
								style={{
									fontSize: "12px",
									fontWeight: "400",
									lineHeight: "18px",
									fontFamily: "poppins",
								}}
							>
								Candidate name:
								<span
									className='p-2'
									style={{
										color: "#FB8900",
										fontSize: "12px",
										fontWeight: "600",
										lineHeight: "18px",
										fontFamily: "poppins",
									}}
								>
									{user_Name ? user_Name : firstName}
								</span>
							</h6>
							<h6
								className='ms-2'
								style={{
									fontSize: "12px",
									fontWeight: "400",
									lineHeight: "18px",
									fontFamily: "poppins",
								}}
							>
								Subject name:{" "}
								<span
									className='p-2'
									style={{
										color: "#FB8900",
										fontSize: "12px",
										fontWeight: "600",
										lineHeight: "18px",
										fontFamily: "poppins",
									}}
								>
									{name}
								</span>
							</h6>
							<h6
								className='ms-2'
								style={{
									fontSize: "12px",
									fontWeight: "400",
									lineHeight: "18px",
									fontFamily: "poppins",
								}}
							>
								Time Elapsed :{" "}
								<span
									style={{
										border: "1px solid #078FC5",
										backgroundColor: "#078FC5",
										borderRadius: "15px",
										padding: "4px",
										color: "white",
									}}
								>
									{hours < 10 ? "0" + hours : hours}:
									{minutes < 10 ? "0" + minutes : minutes}:
									{seconds < 10 ? "0" + seconds : seconds}
								</span>
							</h6>
						</div>
					</div>
				</div>
			</nav>{" "}
			<section
				className='p-3 main-wrapper-leader-board'
				style={{ background: "#FFFFFF", marginTop: "6rem" }}
			>
				<section className='live-section-heading-container leader-board-header'>
					<h4
						className='m-0'
						style={{
							fontSize: "24px",
							fontWeight: "600",
							color: "#7b1fa2",
						}}
					>
						Leaderboard - {name}
					</h4>
					<button
						className='btn main-btn'
						onClick={() => setIsListViewOpen(!isListViewOpen)}
					>
						{isListViewOpen ? "Hide List-view" : "Show List-view"}
					</button>
				</section>
				<section className='d-flex flex-column gap-2 align-items-center py-3'>
					{!isListViewOpen ? (
						<>
							<div className='first-rank-holder'>
								<section className='d-flex gap-5'>
									<div className='d-flex justify-content-center align-item-center flex-column gap-1 mt-5'>
										<div className='leader-details'>
											{liveQuizResult[1]
												?.candidateImage ? (
												<img
													src={`${baseUrl()}/df/showProfilePic/${liveQuizResult[1]?.candidateImage}`}
													alt='profile'
													className='leader-profile'
												/>
											) : (
												<img
													src={ProfilePic}
													alt='profile'
													className='leader-profile'
												/>
											)}
											<span
												className='leader-badge'
												style={{
													background: "#D7D7D7",
												}}
											>
												<GiLaurels />
											</span>
										</div>
										<span className='m-0 text-center'>
											{liveQuizResult[1]?.userName
												? liveQuizResult[1]?.userName
												: "user"}
										</span>
										<span className='m-0 text-center points'>
											{liveQuizResult[1]?.percentage}
										</span>
									</div>
									<div className='d-flex justify-content-center align-item-center flex-column gap-1'>
										<div className='leader-details'>
											{liveQuizResult[0]
												?.candidateImage ? (
												<img
													src={`${baseUrl()}/df/showProfilePic/${liveQuizResult[0]?.candidateImage}`}
													alt='profile'
													className='leader-profile'
												/>
											) : (
												<img
													src={ProfilePic}
													alt='profile'
													className='leader-profile'
												/>
											)}
											<span
												className='leader-badge'
												style={{
													background: "#C9B037",
												}}
											>
												<GiLaurels />
											</span>
										</div>
										<span className='m-0 text-center'>
											{liveQuizResult[0]?.userName
												? liveQuizResult[0]?.userName
												: "user"}
										</span>
										<span className='m-0 text-center points'>
											{liveQuizResult[0]?.percentage}
										</span>
									</div>
									<div className='d-flex justify-content-center align-item-center flex-column gap-1 mt-5'>
										<div className='leader-details'>
											{liveQuizResult[2]
												?.candidateImage ? (
												<img
													src={`${baseUrl()}/df/showProfilePic/${liveQuizResult[2]?.candidateImage}`}
													alt='profile'
													className='leader-profile'
												/>
											) : (
												<img
													src={ProfilePic}
													alt='profile'
													className='leader-profile'
												/>
											)}
											<span
												className='leader-badge'
												style={{
													background: "#AD8A56",
												}}
											>
												<GiLaurels />
											</span>
										</div>
										<span className='m-0 text-center'>
											{liveQuizResult[2]?.userName
												? liveQuizResult[2]?.userName
												: "user"}
										</span>
										<span className='m-0 text-center points'>
											{liveQuizResult[2]?.percentage}
										</span>
									</div>
								</section>
								<h4 className='most-pts-heading'>
									Most points
								</h4>
							</div>
							<div
								className='rank-holders-container'
								style={{ maxHeight: "48vh", maxWidth: "500px" }}
							>
								<div className='rank-holder'>
									<div
										className='d-flex align-items-center justify-content-around'
										style={{
											flex: 0.4,
											maxWidth: "150px",
											gap: "15px",
										}}
									>
										<span className='rank'>Rank</span>
										<p className='m-0 rank'>Name</p>
									</div>
									<div
										className='d-flex align-items-center justify-content-around'
										style={{
											flex: 0.4,
											maxWidth: "150px",
											gap: "15px",
										}}
									>
										<p className='m-0 rank'>Marks</p>
										<p className='m-0 rank'>percentage</p>
									</div>
								</div>
								{liveQuizResult.slice(0,5).map((ranker, index) => (
									<Fragment key={index}>
										{index > 3 ? (
											<div className='rank-holder'>
												<div
													className='d-flex justify-content-around align-items-center'
													style={{
														flex: 0.4,
														maxWidth: "150px",
														gap: "15px",
													}}
												>
													<span
														className='rank'
														style={{
															flex: 1,
															maxWidth:
																"max-content",
														}}
													>
														{ranker.ranks}
														{ranker.ranks === 1
															? "st"
															: ranker.ranks === 2
															? "nd"
															: ranker.ranks === 3
															? "rd"
															: "th"}
													</span>
													<div
														className='d-flex justify-content-between align-items-center'
														style={{
															flex: 1,
															maxWidth: "60px",
															gap: "1rem",
														}}
													>
														{ranker.candidateImage ? (
															<img
																src={`${baseUrl()}/df/showProfilePic/${ranker.candidateImage}`}
																alt='profile'
																className='runner-up-profile'
															/>
														) : (
															<img
																src={ProfilePic}
																alt='profile'
																className='runner-up-profile'
															/>
														)}
														<p className='m-0'>
															{ranker.userName
																? ranker.userName
																: `user ${
																		index +
																		1
																  }`}
														</p>
													</div>
												</div>
												<div
													className='d-flex justify-content-around align-items-center'
													style={{
														flex: 0.4,
														maxWidth: "150px",
														gap: "15px",
													}}
												>
													<p className='m-0 points'>
														{ranker.marksObtained}
													</p>
													<p className='m-0 points'>
														{ranker.percentage}
													</p>
												</div>
											</div>
										) : (
											<div>
												
											</div>
										)}
									</Fragment>
								))}
							</div>
						</>
					) : (
						<div
							className='rank-holders-container'
							style={{ maxHeight: "48vh", maxWidth: "500px" }}
						>
							<div className='rank-holder'>
								<div
									className='d-flex align-items-center justify-content-around'
									style={{
										flex: 0.4,
										maxWidth: "150px",
										gap: "15px",
									}}
								>
									<span className='rank'>Rank</span>
									<p className='m-0 rank'>Name</p>
								</div>
								<div
									className='d-flex align-items-center justify-content-around'
									style={{
										flex: 0.4,
										maxWidth: "150px",
										gap: "15px",
									}}
								>
									<p className='m-0 rank'>Marks</p>
									<p className='m-0 rank'>Percentage</p>
								</div>
							</div>
							{liveQuizResult.map((ranker, index) => (
								<Fragment key={index}>
									<div className='rank-holder'>
										<div
											className='d-flex justify-content-around align-items-center'
											style={{
												flex: 0.4,
												maxWidth: "150px",
												gap: "15px",
											}}
										>
											<span className='rank'>
												{ranker.ranks}
												{ranker.ranks === 1
													? "st"
													: ranker.ranks === 2
													? "nd"
													: ranker.ranks === 3
													? "rd"
													: "th"}
											</span>
											<div
												className='d-flex justify-content-between align-items-center'
												style={{
													flex: 1,
													maxWidth: "60px",
													gap: "1rem",
												}}
											>
												{ranker.candidateImage ? (
													<img
														src={`${baseUrl()}/df/showProfilePic/${ranker.candidateImage}`}
														alt='profile'
														className='runner-up-profile'
													/>
												) : (
													<img
														src={ProfilePic}
														alt='profile'
														className='runner-up-profile'
													/>
												)}
												<p className='m-0'>
													{ranker.userName
														? ranker.userName
														: `user ${index + 1}`}
												</p>
											</div>
										</div>
										<div
											className='d-flex justify-content-around align-items-center'
											style={{
												flex: 0.4,
												maxWidth: "150px",
												gap: "15px",
											}}
										>
											<p className='m-0 points'>
												{ranker.marksObtained}
											</p>
											<p className='m-0 points'>
												{ranker.percentage}
											</p>
										</div>
									</div>
								</Fragment>
							))}
						</div>
					)}
					{liveQuizResult && liveQuizResult.length > 5 && (
						<div>
							{showAll ? (
								<button
									className='view-more-leaders main-color'
									onClick={() => setShowAll(false)}
								>
									View less
								</button>
							) : (
								<button
									className='view-more-leaders main-color'
									onClick={() => setShowAll(true)}
								>
									View more
								</button>
							)}
						</div>
					)}
				</section>
				<div
					className='m-auto d-flex gap-2'
					style={{ maxWidth: "max-content" }}
				>
					<button
						className='btn m-auto'
						onClick={() => navigate(studDashboard)}
						style={{
							backgroundColor: "#5BC0DE",
							color: "white",
							zIndex: 999,
						}}
					>
						Go To Dashboard
					</button>
					<button
						className='btn m-auto'
						onClick={() => navigate(-1)}
						style={{
							backgroundColor: "rgb(220, 53, 69)",
							color: "white",
							zIndex: 999,
						}}
					>
						back
					</button>
				</div>
			</section>
			<OneLinerFooter />
		</>
	);
};

export default LiveQuizLeaderBoard;
