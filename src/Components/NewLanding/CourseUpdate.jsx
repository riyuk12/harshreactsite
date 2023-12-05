import React, { useEffect, useState, Fragment } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";

import PackInclusions from "../../Pages/Payment/PackInclusions";
import { EncryptText } from "../Encrypt/CryptoEncryption";
import useRemoveModal from "../useRemoveModal";
import CourseActive from "./Course/CourseActive";
import { register, studDashboard } from "../../RouteConstants";
import CourseDetailsModal from "./Modals/CourseDetailsModal";
import baseUrl from "../baseUrl";
import "./courseUpdate.css";

const CourseUpdate = () => {
	const [slideIndex, setSlideIndex] = useState(0);
	const navigate = useNavigate();
	const [clinetLocation, setClinetLocation] = useState({ lat: "", lon: "" });
	const [packInc, setPackInc] = useState([]);
	const [title, setTitle] = useState("");
	const { courseDetailsData } = useSelector((state) => state.response);
	const [packTemp, setPackTemp] = useState([]);
	const [boolaen, setBoolaen] = useState({
		alertTxt: false,
		modalValid: false,
		disDomain: false,
		showDomain: false,
		showLang: false,
		packAlrt: false,
	});

	const closeModal = () => {
		setPackInc([]);
		setBoolaen((prev) => ({
			...prev,
			showDomain: false,
			showLang: false,
			modalValid: false,
		}));
	};

	useRemoveModal();

	useEffect(() => {
		setTimeout(() => {
			const carousel = document.querySelectorAll(".carousel-item")[0];
			carousel?.classList.add("active");
		}, 1000);
	}, []);

	useEffect(() => {
		const paramsString = window.location.search;
		const searchParams = new URLSearchParams(paramsString);
		const res = searchParams.get("code");
		const prompt = searchParams.get("prompt");
		const code = decodeURIComponent(res);

		if (prompt) {
			async function tokenCall() {
				try {
					const response = await axios.post(
						`https://accounts.google.com/o/oauth2/token`,
						{
							client_id: process.env.REACT_APP_CLIENT_ID,
							code: code,
							scope: "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email",
							client_secret: process.env.REACT_APP_CLIENT_SECRET,
							redirect_uri: process.env.REACT_APP_CLIENT_URL,
							grant_type: "authorization_code",
						}
					);
					Cookies.set(
						"google_access_token",
						response.data.access_token
					);
					window.history.pushState({}, null, "/registration");

					token();
				} catch (err) {
					console.log(err);
				}
			}
			tokenCall();
		}
	}, []);

	async function token() {
		if (Cookies.get("google_access_token") != null) {
			if (Cookies.get("google_access_token")) {
				const res = await axios.get(
					"https://people.googleapis.com/v1/people/me?personFields=emailAddresses,names",
					{
						headers: {
							Authorization: `Bearer ${Cookies.get(
								"google_access_token"
							)}`,
						},
					}
				);
				if (res.data) Cookies.set("google_access_token", null);

				onLoginSuccess(res.data);
			}
		}
	}

	// FIXME:
	const onLoginSuccess = (res) => {
		const body = {
			email: res.emailAddresses[0].value,
			name: res.names[0].givenName,
			lastname: res.names[0].familyName,
			source: "Google",
			uid: res.resourceName,
			latitude: clinetLocation.lat,
			longitude: clinetLocation.lon,
		};

		navigator.geolocation.getCurrentPosition((position) => {
			setClinetLocation({
				lat: position.coords.latitude.toFixed(2),
				lon: position.coords.longitude.toFixed(2),
			});
		});

		axios
			.post(baseUrl() + `/wl/extLogin`, {
				email: EncryptText(res.emailAddresses[0].value),
				name: res.names[0].givenName,
				source: "Google",
				uid: res.resourceName.split("/")[1],
				latitude: clinetLocation.lat,
				longitude: clinetLocation.lon,
			})
			.then((response) => {
				if (response.data.result.hasPerDtlsUpdated === false) {
					navigate(register, {
						state: {
							profileObj: {
								email: res.emailAddresses[0].value,
								name: res.names[0].givenName,
								lastname: res.names[0].familyName,
								latitude: clinetLocation.lat,
								longitude: clinetLocation.lon,
								uid: res.resourceName.split("/")[1],
								source: "Google",
							},
							res: res,
						},
					});
					const modal = document.querySelector(".modal-backdrop");
					modal.remove();
				} else {
					navigate(studDashboard);
					Cookies.set(
						"token",
						`Bearer ${response.data.result.token}`
					);
					Cookies.set("email", res.emailAddresses[0].value);
					Cookies.set(
						"userId",
						response.data.result.userLoginResBean.userId
					);
				}
			})
			.catch((err) => {
				console.error("Not Login in Google");
			});
	};

	const handleDomainsub = (key) => {
		let currentSel = packTemp[0].avlDomainSubjects.map((sub, index) => {
			if (index === key) {
				disableCount(sub);
			}
			return sub;
		});
		updatePack(currentSel, "avlDomainSubjects");
		submitModal("avlDomainSubjects", "defaultDomainSubjCount");
	};

	const handleLang = (key) => {
		let currentSel = packTemp[0].avlLangSubjects.map((sub, index) => {
			if (index === key) {
				sub.specialInstruction
					? (sub.specialInstruction = false)
					: (sub.specialInstruction = true);
			} else {
				sub.specialInstruction = false;
				sub.selection = false;
			}
			return sub;
		});
		updatePack(currentSel, "avlLangSubjects");
		disableCount(packTemp);
		submitModal("avlLangSubjects", "defaultLangSubjCount");
	};

	let langsel = packTemp.length
		? packTemp[0].avlLangSubjects?.filter((x) => x.selection).length ===
		  packTemp[0].langSubjMaxSelectCount
			? true
			: false
		: false;

	const clearDomain = () => {
		let currentSel = packTemp[0].avlDomainSubjects.map((sub) => {
			sub.specialInstruction = false;
			return sub;
		});
		updatePack(currentSel, "avlDomainSubjects");
		setBoolaen((prev) => ({ ...prev, disDomain: false }));
	};

	const submitModal = (obj, checkVal, tempArr) => {
		tempArr = tempArr ? tempArr : packTemp;
		let countspecialInstruction = tempArr[0][obj].filter(
			(sub) => sub.specialInstruction === true
		).length;
		if (countspecialInstruction >= tempArr[0][checkVal]) {
			setBoolaen((prev) => ({
				...prev,
				alertTxt: false,
				modalValid: true,
			}));
		} else {
			setBoolaen((prev) => ({
				...prev,
				alertTxt: true,
				modalValid: false,
			}));
		}
	};
	const disableCount = (subject) => {
		let countspecialInstruction = packTemp[0].avlDomainSubjects.filter(
			(sub) => sub.specialInstruction === true
		).length;
		let countselection = packTemp[0].avlDomainSubjects.filter(
			(sub) => sub.selection === true
		).length;
		if (subject.specialInstruction) {
			subject.specialInstruction = false;
			setBoolaen((prev) => ({ ...prev, disDomain: false }));
		} else {
			if (
				countspecialInstruction + countselection <
				packTemp[0].domainSubjMaxSelectCount
			) {
				subject.specialInstruction = true;
				setBoolaen((prev) => ({ ...prev, disDomain: false }));
			} else {
				subject.specialInstruction = false;
				setBoolaen((prev) => ({ ...prev, disDomain: true }));
			}
		}
	};
	const updatePack = (updateSub, obj) => {
		let updateArr = packTemp.map((pack) => {
			pack[obj] = updateSub;
			return pack;
		});
		setPackTemp(updateArr);
	};

	return (
		<>
			<div id='courseUpdate' className='container-fluid bg-light py-3'>
				<div
					className='modal fade'
					id='subModal'
					data-bs-backdrop='static'
					tabIndex='-1'
					role='dialog'
				>
					<div
						className='modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable'
						role='document'
					>
						<div className='modal-content'>
							<div className='modal-header'>
								<h5 className='modal-title'>{title}</h5>
								<button
									type='button'
									className='close'
									onClick={closeModal}
									data-bs-dismiss='modal'
									aria-label='Close'
								>
									<span aria-hidden='true'>&times;</span>
								</button>
							</div>
							<div className='modal-body'>
								{packInc.length ? (
									<PackInclusions packInc={packInc} />
								) : (
									""
								)}
								{boolaen.showDomain ? (
									<>
										<div
											className={
												boolaen.disDomain
													? "d-flex flex-wrap flex_gap disable"
													: "d-flex flex-wrap flex_gap"
											}
										>
											{packTemp[0].avlDomainSubjects
												.sort(function (a, b) {
													if (
														a.topicName <
														b.topicName
													) {
														return -1;
													}
													if (
														a.topicName >
														b.topicName
													) {
														return 1;
													}
													return 0;
												})
												.map((sub, index) => (
													<button
														onClick={() =>
															handleDomainsub(
																index
															)
														}
														key={
															sub.topicId + index
														}
														className={
															sub.specialInstruction
																? "domain_sub active"
																: "domain_sub"
														}
														disabled={sub.selection}
													>
														{sub.topicName}
													</button>
												))}
										</div>
										<p className='warning_txt alertTxt mt-3 mb-0'>
											You can select at most 4 subject.
											please unselect and reselect the
											subject of your choice.
										</p>
										{boolaen.alertTxt && (
											<p className='alertTxt mt-3 mb-0'>
												You can select atleast{" "}
												{
													packTemp[0]
														.defaultDomainSubjCount
												}{" "}
												subject.
											</p>
										)}
									</>
								) : (
									""
								)}
								{boolaen.showLang ? (
									<div className='d-flex flex-wrap flex_gap'>
										{packTemp[0].avlLangSubjects.map(
											(lang, index) => (
												<div
													className='form-check'
													key={index}
												>
													<input
														className='form-check-input'
														type='checkbox'
														name={lang.topicName}
														id={lang.topicId}
														value={lang.topicName}
														checked={
															lang.specialInstruction ||
															lang.selection
																? true
																: false
														}
														onClick={() =>
															handleLang(index)
														}
														disabled={
															langsel
																? true
																: false
														}
													/>
													<label
														className='form-check-label'
														htmlFor={lang.topicId}
													>
														{lang.topicName}
													</label>
												</div>
											)
										)}
									</div>
								) : (
									""
								)}
							</div>
							<div className='modal-footer'>
								{packInc.length ? (
									<button
										type='button'
										onClick={closeModal}
										data-bs-dismiss='modal'
										className='btn main-btn'
									>
										OKAY, GOT IT!
									</button>
								) : (
									<>
										{boolaen.showDomain && (
											<button
												type='button'
												className='btn btn-secondary'
												onClick={clearDomain}
											>
												CLEAR ALL
											</button>
										)}
										<button
											type='button'
											className='btn main-btn'
											data-bs-dismiss={
												boolaen.modalValid
													? "modal"
													: ""
											}
											onClick={
												boolaen.showDomain
													? () =>
															submitModal(
																"avlDomainSubjects",
																"defaultDomainSubjCount"
															)
													: () =>
															submitModal(
																"avlLangSubjects",
																"defaultLangSubjCount"
															)
											}
										>
											SUBMIT
										</button>
									</>
								)}
							</div>
						</div>
					</div>
				</div>

				<div className=''>
					<h1 className='d-flex justify-content-center m-0'>
						Courses
					</h1>
					<div className='my-sm-3 course-slider'>
						<Swiper
							allowTouchMove={false}
							spaceBetween={10}
							loopFillGroupWithBlank={true}
							longSwipes={false}
							slidesPerView={1}
							navigation={true}
							modules={[Pagination, Navigation]}
							onSlideChange={() => {
								setSlideIndex(slideIndex + 1);
							}}
							className='custom-slider'
						>
							{courseDetailsData.map((course, index) => (
								<Fragment key={index}>
									<SwiperSlide>
										<CourseActive
											item={course}
											index={index}
											slideIndex={slideIndex}
										/>
									</SwiperSlide>
								</Fragment>
							))}
						</Swiper>
					</div>
				</div>
			</div>
			<CourseDetailsModal />
		</>
	);
};

export default CourseUpdate;
