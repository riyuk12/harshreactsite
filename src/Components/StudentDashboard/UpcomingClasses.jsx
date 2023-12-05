import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import axios from "axios";
import parse from "html-react-parser";
import Cookies from "js-cookie";
import { FaCrown, FaUnlock, FaUsers } from "react-icons/fa";
import baseUrl from "../../Components/baseUrl";

import { GetVideoClassesThunk } from "../../Redux/Thunks/Get/GetVideoClassesThunk";
import { subscriptions } from "../../RouteConstants";
import { utilitySliceActions } from "../../Redux/Slice/UtilitySlice";
import usePreferredCourseId from "../../Utils/usePreferredCourseId";
import UpcommingClassesSkeleton from "./Skeletons/UpcommingClassesSkeleton";

const fallbackMessage = "No upcomming classes!";
const UpcomingClasses = () => {
	const { videoData, isLoading } = useSelector((state) => state.response);
	const [counter, setCounter] = useState(60);
	const [filteredVideoData, setFilteredVideoData] = useState([]);
	const [selectedDropdown, setSelectedDropdown] = useState("All");
	const preferredCourseId = usePreferredCourseId();

	const preferredCourse = localStorage.getItem("preferredCourse");
	const dispatch = useDispatch();
	const navigate = useNavigate();

	// getting all video classes
	useEffect(() => {
		if (preferredCourseId) {
			dispatch(
				GetVideoClassesThunk({
					courseId: preferredCourseId,
					token: Cookies.get("token"),
				})
			);
		}
	}, [preferredCourseId]);

	useEffect(() => {
		if (counter > 0) {
			setTimeout(() => setCounter(counter - 1), 1000);
		} else if (counter === 0) {
			setCounter(60);
		}
	}, [counter]);

	const formatDate = (dateObj) => {
		let date = dateObj;
		const day = date.toLocaleString("default", { day: "2-digit" });
		const month = date.toLocaleString("default", { month: "2-digit" });
		const year = date.toLocaleString("default", { year: "numeric" });
		return month + "/" + day + "/" + year;
	};

	const convertDateMMToMMM = (dateObj) => {
		let date = dateObj;
		const day = date.toLocaleString("default", { day: "2-digit" });
		const month = date.toLocaleString("default", { month: "short" });
		const year = date.toLocaleString("default", { year: "numeric" });
		return day + "-" + month + "-" + year;
	};

	const timeConversion = (timestamp) => {
		const timeString12hr = new Date(
			"1970-01-01T" + timestamp + "Z"
		).toLocaleTimeString("en-US", {
			timeZone: "UTC",
			hour12: true,
			hour: "numeric",
			minute: "numeric",
		});
		return timeString12hr;
	};

	const onMeet = (meetingId) => {
		axios
			.post(
				`${baseUrl()}/fetchVideoClassUrl`,
				{ meetingid: meetingId },
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
					const meetingLink = response.data.Data[0].meetingUrl;
					window.open(meetingLink);
				}
			})
			.catch((e) => console.log(e));
	};

	// handles the unlock premium classes
	const handleUnlockPremium = () => {
		navigate(subscriptions);
		dispatch(
			utilitySliceActions.setActiveSubscriptionTab(preferredCourseId)
		);
	};

	useEffect(() => {
		setFilteredVideoData(videoData);
	}, [videoData]);

	//filters the classes based on time of course
	const handleCourseFilter = (validity, name) => {
		setSelectedDropdown(name);
		let currentDate = new Date().setHours(0, 0, 0, 0);
		let filteredData = [];

		//filter for all
		if (validity === 0) {
			filteredData = videoData;
		}

		//filter for past classes
		if (validity === -1) {
			filteredData = videoData.filter((item) => {
				return new Date(item.meetingDate).getTime() < currentDate;
			});
		}

		//filter for upcomming classes
		if (validity === 1) {
			filteredData = videoData.filter((item) => {
				return new Date(item.meetingDate).getTime() >= currentDate;
			});
		}

		setFilteredVideoData(filteredData);
	};

	// for showing the skeleton before the data arrives
	if (isLoading.liveRecClassesLoading) {
		return <UpcommingClassesSkeleton />;
	}

	return (
		<section
			style={{
				backgroundColor: "white",
				borderRadius: "5px",
				height: "350px",
			}}
			className='details p-3 flex-grow-1'
		>
			<section className='live-section-heading-container'>
				<div className='live-section-heading'>
					<h4
						className='m-0'
						style={{
							fontSize: "20px",
							fontWeight: "600",
							color: "#7b1fa2",
						}}
					>
						Live Online Classes
					</h4>
					<p className='live-classes-course-name'>
						{preferredCourse}
					</p>
				</div>
				<div className='dropdown'>
					<button
						className='dropdown-toggle classes-dropdown-btn'
						role='button'
						type='button'
						id='dropdownMenu2'
						style={{ border: "none" }}
						data-bs-toggle='dropdown'
						aria-expanded='false'
					>
						{selectedDropdown}
					</button>

					<ul className='dropdown-menu'>
						<li
							className='dropdown-item py-2'
							onClick={() => handleCourseFilter(0, "All")}
						>
							All
						</li>
						<li
							className='dropdown-item py-2'
							onClick={() => handleCourseFilter(1, "Upcomming")}
						>
							Upcomming
						</li>
						<li
							className='dropdown-item py-2'
							onClick={() => handleCourseFilter(-1, "Past")}
						>
							Past
						</li>
					</ul>
				</div>
			</section>
			<section className='d-flex flex-column gap-2 video-series'>
				{videoData?.length !== 0 ? (
					<>
						{filteredVideoData?.length !== 0 &&
							filteredVideoData?.map((item) => (
								<div
									className='main-video-class-item-container'
									key={item.id}
								>
									<article
										className={`p-2 d-flex align-items-center justify-content-between`}
										style={{
											backgroundColor: "#F2F2F2",
											borderRadius: "6px",
										}}
									>
										<section className='d-flex align-items-center gap-1'>
											<span
												style={
													item.lockFlag === 1
														? {
																color: "#FFBB48",
														  }
														: {
																visibility:
																	"hidden",
														  }
												}
											>
												<FaCrown />
											</span>
											<section>
												<div className='d-flex gap-sm-2 align-items-sm-end flex-sm-row flex-column align-items-start mb-1'>
													<h4
														className='fw-bold m-0'
														style={{
															fontSize: "18px",
														}}
													>
														{convertDateMMToMMM(
															new Date(
																item.meetingDate
															)
														)}
													</h4>
													<span
														style={{
															fontSize: "12px",
														}}
													>
														at{" "}
														{timeConversion(
															item.meetingTime
														)}
													</span>
												</div>
												<p
													className='m-0'
													style={{
														fontSize: "15px",
														fontWeight: 500,
													}}
												>
													{parse(
														String(item.meetingDesc)
													)}
												</p>
											</section>
										</section>
										<section className='text-end p-2 '>
											{new Date(
												item.meetingDate + " 00:00:00"
											).getTime() <
												new Date(
													formatDate(new Date()) +
														" 00:00:00"
												).getTime() && (
												<button
													style={{
														pointerEvents: "none",
													}}
													className='btn main-btn upcomming-classes-btn upcomming-classes-status-btn-faded'
													title='Expired'
													tabIndex={-1}
												>
													<span>
														<FaUsers />
													</span>
													Expired
												</button>
											)}
											{new Date(
												item.meetingDate + " 00:00:00"
											).getTime() >
												new Date(
													formatDate(new Date()) +
														" 00:00:00"
												).getTime() && (
												<button
													style={{
														pointerEvents: "none",
													}}
													className='btn main-btn upcomming-classes-status-btn-semi-faded upcomming-classes-btn'
													title='The class has not yet started.'
												>
													<span>
														<FaUsers />
													</span>
													Scheduled
												</button>
											)}
											{new Date(
												item.meetingDate + " 00:00:00"
											).getTime() ==
												new Date(
													formatDate(new Date()) +
														" 00:00:00"
												).getTime() &&
												Math.round(
													(new Date(
														item.meetingDate +
															" " +
															item.meetingTime
													).getTime() -
														new Date().getTime()) /
														60000
												) > 0 &&
												Math.abs(
													Math.round(
														(new Date(
															item.meetingDate +
																" " +
																item.meetingTime
														).getTime() -
															new Date().getTime()) /
															60000
													)
												) >
													item.preMeetingBtnLblChangeMins && (
													<button
														className='btn main-btn upcomming-classes-btn upcomming-classes-status-btn-semi-faded'
														style={{
															pointerEvents:
																"none",
														}}
														onClick={() =>
															onMeet(
																item.meetingid
															)
														}
														title='The Meeting has not yet started.'
													>
														<span>
															<FaUsers />
														</span>
														Scheduled
													</button>
												)}
											{new Date(
												item.meetingDate + " 00:00:00"
											).getTime() ==
												new Date(
													formatDate(new Date()) +
														" 00:00:00"
												).getTime() &&
												Math.round(
													(new Date(
														item.meetingDate +
															" " +
															item.meetingTime
													).getTime() -
														new Date().getTime()) /
														60000
												) > 0 &&
												Math.abs(
													Math.round(
														(new Date(
															item.meetingDate +
																" " +
																item.meetingTime
														).getTime() -
															new Date().getTime()) /
															60000
													)
												) <=
													item.preMeetingBtnLblChangeMins &&
												Math.abs(
													Math.round(
														(new Date(
															item.meetingDate +
																" " +
																item.meetingTime
														).getTime() -
															new Date().getTime()) /
															60000
													)
												) >= 5 && (
													<button
														className='btn main-btn upcomming-classes-btn upcomming-classes-status-btn'
														onClick={() =>
															onMeet(
																item?.meetingid
															)
														}
														title='The class is yet to start.'
													>
														<span>
															<FaUsers />
														</span>
														<span id='clsTimeLeft'></span>{" "}
														Starting In{" "}
														{Math.abs(
															Math.round(
																(new Date(
																	item.meetingDate +
																		" " +
																		item.meetingTime
																).getTime() -
																	new Date().getTime()) /
																	60000
															)
														) < 10
															? "0" +
															  Math.abs(
																	Math.round(
																		(new Date(
																			item.meetingDate +
																				" " +
																				item.meetingTime
																		).getTime() -
																			new Date().getTime()) /
																			60000
																	)
															  )
															: Math.abs(
																	Math.round(
																		(new Date(
																			item.meetingDate +
																				" " +
																				item.meetingTime
																		).getTime() -
																			new Date().getTime()) /
																			60000
																	)
															  )}
														{":"}
														{counter < 10
															? "0" + counter
															: counter}
													</button>
												)}
											{/* Join */}
											{new Date(
												item.meetingDate + " 00:00:00"
											).getTime() ==
												new Date(
													formatDate(new Date()) +
														" 00:00:00"
												).getTime() &&
												Math.round(
													(new Date(
														item.meetingDate +
															" " +
															item.meetingTime
													).getTime() -
														new Date().getTime()) /
														60000
												) > 0 &&
												Math.abs(
													Math.round(
														(new Date(
															item.meetingDate +
																" " +
																item.meetingTime
														).getTime() -
															new Date().getTime()) /
															60000
													)
												) < 5 && (
													<button
														className='btn main-btn upcomming-classes-join-btn upcomming-classes-btn'
														onClick={() =>
															onMeet(
																item.meetingid
															)
														}
														title='The className is starting soon.'
													>
														<span>
															<FaUsers />
														</span>
														Join Now
													</button>
												)}
											{/* Join */}
											{new Date(
												item.meetingDate + " 00:00:00"
											).getTime() ==
												new Date(
													formatDate(new Date()) +
														" 00:00:00"
												).getTime() &&
												Math.abs(
													Math.round(
														(new Date(
															item.meetingDate +
																" " +
																item.meetingTime
														).getTime() -
															new Date().getTime()) /
															60000
													)
												) == 0 && (
													<button
														className='btn main-btn upcomming-classes-join-btn upcomming-classes-btn'
														onClick={() =>
															onMeet(
																item.meetingid
															)
														}
														title='The className has started now.'
													>
														<span>
															<FaUsers />
														</span>
														Join Now
													</button>
												)}
											{/* Join */}
											{new Date(
												item.meetingDate + " 00:00:00"
											).getTime() ==
												new Date(
													formatDate(new Date()) +
														" 00:00:00"
												).getTime() &&
												Math.round(
													(new Date(
														item.meetingDate +
															" " +
															item.meetingTime
													).getTime() -
														new Date().getTime()) /
														60000
												) < 0 &&
												Math.abs(
													Math.round(
														(new Date(
															item.meetingDate +
																" " +
																item.meetingTime
														).getTime() -
															new Date().getTime()) /
															60000
													)
												) <= 5 && (
													<button
														className='btn main-btn upcomming-classes-join-btn upcomming-classes-btn'
														onClick={() =>
															onMeet(
																item.meetingid
															)
														}
														title='The className has started now.'
													>
														<span>
															<FaUsers />
														</span>
														Join Now
													</button>
												)}
											{/* postMeetingBtnLbl */}
											{new Date(
												item.meetingDate + " 00:00:00"
											).getTime() ==
												new Date(
													formatDate(new Date()) +
														" 00:00:00"
												).getTime() &&
												Math.round(
													(new Date(
														item.meetingDate +
															" " +
															item.meetingTime
													).getTime() -
														new Date().getTime()) /
														60000
												) < 0 &&
												Math.abs(
													Math.round(
														(new Date(
															item.meetingDate +
																" " +
																item.meetingTime
														).getTime() -
															new Date().getTime()) /
															60000
													)
												) > 5 &&
												Math.abs(
													Math.round(
														(new Date(
															item.meetingDate +
																" " +
																item.meetingTime
														).getTime() -
															new Date().getTime()) /
															60000
													)
												) <=
													item.meetingDurationMins && (
													<button
														className='btn main-btn upcomming-classes-join-btn upcomming-classes-btn'
														onClick={() =>
															onMeet(
																item.meetingid
															)
														}
														title='The class is in progress.'
													>
														<span>
															<FaUsers />
														</span>
														{item.postMeetingBtnLbl}
													</button>
												)}
											{/* Concluded */}
											{new Date(
												item.meetingDate + " 00:00:00"
											).getTime() ==
												new Date(
													formatDate(new Date()) +
														" 00:00:00"
												).getTime() &&
												Math.round(
													(new Date(
														item.meetingDate +
															" " +
															item.meetingTime
													).getTime() -
														new Date().getTime()) /
														60000
												) < 0 &&
												Math.abs(
													Math.round(
														(new Date(
															item.meetingDate +
																" " +
																item.meetingTime
														).getTime() -
															new Date().getTime()) /
															60000
													)
												) >
													item.meetingDurationMins && (
													<button
														style={{
															pointerEvents:
																"none",
														}}
														className='btn main-btn upcomming-classes-status-btn-faded upcomming-classes-btn'
														title='The class has been concluded.'
													>
														<span>
															<FaUsers />
														</span>
														Concluded
													</button>
												)}
										</section>
									</article>
									{item.lockFlag === 0 &&
										!(
											new Date(
												item.meetingDate + " 00:00:00"
											).getTime() <
											new Date(
												formatDate(new Date()) +
													" 00:00:00"
											).getTime()
										) && (
											<div className='overlay-on-video-card'>
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
													Unlock Classes Now
												</button>
											</div>
										)}
								</div>
							))}
						<article
							className={`py-3 px-2`}
							style={{
								backgroundColor: "#F2F2F2",
								borderRadius: "6px",
							}}
						>
							<p className='m-0 text-center main-color fw-bold'>
								Could not find what you are looking for? Try
								switching the course from{" "}
								<span
									style={{
										textDecoration: "underline",
										cursor: "pointer",
									}}
									data-bs-toggle='modal'
									data-bs-target='#coursesModal'
								>
									switch course
								</span>
								!
							</p>
						</article>
					</>
				) : (
					<div className='fallback-message-classes-container'>
						<p>{fallbackMessage}</p>
					</div>
				)}
			</section>
		</section>
	);
};

export default UpcomingClasses;
