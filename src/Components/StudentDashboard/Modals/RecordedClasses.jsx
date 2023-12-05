import { useEffect } from "react";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { FaCrown, FaUnlock } from "react-icons/fa";

import { GetLiveRecClassesThunk } from "../../../Redux/Thunks/Get/GetLiveRecClassesThunk";
import { subscriptions } from "../../../RouteConstants";
import { utilitySliceActions } from "../../../Redux/Slice/UtilitySlice";
import usePreferredCourseId from "../../../Utils/usePreferredCourseId";

const RecordedClasses = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const preferredCourseId = usePreferredCourseId();
	const { recClasses } = useSelector((state) => state.response);

	useEffect(() => {
		dispatch(
			GetLiveRecClassesThunk({
				id: "1",
				token: `${Cookies.get("token")}`,
			})
		);
	}, []);

	const handleUnlockPremium = () => {
		navigate(subscriptions);
		dispatch(
			utilitySliceActions.setActiveSubscriptionTab(preferredCourseId)
		);
	};

	return (
		<article
			className='modal fade'
			id='classNameModal'
			tabIndex='-1'
			aria-labelledby='classNameModalLabel'
			aria-hidden='true'
		>
			<section className='modal-dialog modal-dialog-scrollable downloadModal'>
				<section className='modal-content bg-logo'>
					<header className='modal-header modal-header-container'>
						<h5
							className='modal-title main-color'
							id='classNameModalLabel'
						>
							Recorded Live Classes
						</h5>
						<button
							type='button'
							className='btn-close'
							data-bs-dismiss='modal'
							aria-label='Close'
						></button>
					</header>
					<main className='modal-body'>
						<div className='recorded-classes-container'>
							{recClasses.map(
								({
									videoUrl,
									videoTitle,
									id,
									lock,
									premium,
									tutorName,
									classDateTime,
								}) => (
									<div
										key={id}
										className='video-and-lock-container'
									>
										<div className='recorded-classes'>
											<iframe
												className='rounded-2'
												src={videoUrl}
												allowFullScreen='allowfullscreen'
												title='YouTube video player'
												allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
											></iframe>
											<div className='live-rec-video-details'>
												<div className='live-rec-video-expert-title'>
													<div>
														<span
															style={
																premium === 1
																	? {
																			color: "#FFBB48",
																	  }
																	: {
																			display:
																				"none",
																	  }
															}
														>
															<FaCrown />
														</span>
														<h5>{videoTitle}</h5>
													</div>
													<p>
														Name of tutor:{" "}
														<strong>
															{tutorName}
														</strong>
													</p>
													<p
														style={{
															display: "flex",
															gap: "1rem",
														}}
													>
														<span>
															Date:{" "}
															<strong>
																{
																	classDateTime?.split(
																		" "
																	)[0]
																}
															</strong>
														</span>
														<span>
															time:{" "}
															<strong>
																{classDateTime?.split(
																	" "
																)[1] +
																	classDateTime?.split(
																		" "
																	)[2]}
															</strong>
														</span>
													</p>
												</div>
											</div>
										</div>
										{lock === 1 && (
											<div
												key={id}
												className='overlay-on-live-video-card'
											>
												<span
													style={{
														color: "#FFBB48",
														fontSize: "25px",
													}}
												>
													<FaCrown />
												</span>
												<button
													className='btn main-btn d-flex align-items-center gap-2'
													onClick={
														handleUnlockPremium
													}
												>
													<FaUnlock />
													Unlock Video Now
												</button>
											</div>
										)}
									</div>
								)
							)}
						</div>
					</main>
				</section>
			</section>
		</article>
	);
};

export default RecordedClasses;
