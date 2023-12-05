import React, { useEffect, useState, useCallback, useRef } from "react";
import { Fragment } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import axios from "axios";
import Cookies from "js-cookie";

import Header from "../../Components/Global/Navigation/Header";
import OneLinerFooter from "../../Components/Global/Footers/OneLinerFooter";
import LeaveQuizModal from "../../Components/Mcq/Modal/LeaveQuizModal";
import ConfirmSubmissionModal from "../../Components/Mcq/Modal/ConfirmSubmissionModal";
import FooterButtons from "../../Components/Mcq/FooterButtons";
import ParaQuestions from "../../Components/Mcq/ParaQuestions";
import McqQuestions from "../../Components/Mcq/McqQuestions";
import { refer, QuizLoad, nextPrev } from "../../Components/quizWorking";
import "../../Pages/StudentMCQ/StudentMCQ.css";
import "./mcq.css";
import { testSubmit } from "../../RouteConstants";
import { useDispatch, useSelector } from "react-redux";
import Tooltip from "../../Components/Mcq/Modal/ToolTip";
import { utilitySliceActions } from "../../Redux/Slice/UtilitySlice";
import usePreferredCourseId from "../../Utils/usePreferredCourseId";
import baseUrl from "../../Components/baseUrl"
const MCQ = () => {
	const location = useLocation();
	const {
		quizId,
		courseId,
		name,
		quizCode,
		level,
		negativeMarks,
		topicId,
		prevRoute,
	} = location.state;
	const [loading, setLoading] = useState(false);
	const [mcqDatas, setMcqDatas] = useState([]);
	const [time, setTime] = useState(0);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [isTimerOn, setIsTimerOn] = useState(true);
	const [list, setlist] = useState([]);
	const [allQuestion, setAllQuestion] = useState([]);
	const { dashboradConfiguration } = useSelector((state) => state.response);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const examTimeLimit = mcqDatas[0]?.basicDetailsBean?.totalTime;
	const totalQuestions = mcqDatas[0]?.quesmasters?.length;

	const { isAutoScrollEnabled } = useSelector((state) => state.utils);

	const [arrayObject, setArrayObject] = useState([]);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [buttonClicked, setButtonClicked] = useState(0);
	const [showModal, setShowModal] = useState(false);
	const [intervalTimer, setIntervalTimer] = useState(10);

	// Is auto scrollable
	useEffect(() => {
		if (isAutoScrollEnabled && allQuestion.length > 0) {
			setArrayObject(allQuestion[0]?.quesmasters);
			const interval = setInterval(() => {
				setCurrentIndex(
					(prevIndex) =>
						(prevIndex + 1) % allQuestion[0]["quesmasters"].length
				);
			}, intervalTimer * 60000);
			return () => clearInterval(interval);
		}
		console.log(intervalTimer, "intervacl");
	}, [isAutoScrollEnabled, intervalTimer, allQuestion]);

	// auto scroll interval
	useEffect(() => {
		const questionStart = document.querySelectorAll(".m" + currentIndex)[0];
		const headerOffset = 180;
		const elementPosition = questionStart?.getBoundingClientRect().top;
		const offsetPosition =
			elementPosition + window.pageYOffset - headerOffset;
		window.scrollTo({
			top: offsetPosition,
			behavior: "smooth",
		});
		console.log(
			"questionStart",
			document.querySelectorAll(".m" + currentIndex)[0]
		);
	}, [currentIndex]);

	// getMcqPragByQuizId
	useEffect(() => {
		axios
			.post(
				`${baseUrl()}/df/getMcqPragByQuizId`,
				{
					quizId: quizId,
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
					setMcqDatas(response.data.Data);
					setlist(response.data.Data);

					QuizLoad();
				}
			});
	}, [quizId]);

	// unknown
	useEffect(() => {
		let questionNumber = 0;
		const mcqDataUpate = mcqDatas.map((questionSet, i) => {
			const updateQuestion = questionSet.quesmasters.map(
				(mcqQuestion, i) => {
					questionNumber++;
					return { ...mcqQuestion, questionNumber: questionNumber };
				}
			);

			const updateParagraphQuestion = questionSet.paragraphQuestions.map(
				(paragraphQuestion, i) => {
					const updateParagraph = paragraphQuestion.pgQuesmasters.map(
						(paragraph, i) => {
							questionNumber++;
							return {
								...paragraph,
								questionNumber: questionNumber,
							};
						}
					);
					return {
						...paragraphQuestion,
						pgQuesmasters: updateParagraph,
					};
				}
			);

			return {
				...questionSet,
				quesmasters: updateQuestion,
				paragraphQuestions: updateParagraphQuestion,
			};
		});

		setAllQuestion(mcqDataUpate);
	}, [mcqDatas]);

	useEffect(() => {
		setIntervalTimer(examTimeLimit / totalQuestions);
	}, [mcqDatas]);

	const AnswerSet = useCallback(
		(event, type, indexx) => {
			setCurrentIndex(indexx);
			setIntervalTimer(examTimeLimit / totalQuestions);

			let res;
			if (type === "mcq") {
				res = mcqDatas.map((e1) => {
					e1?.quesmasters.map((e2) => {
						if (
							e2.optionBeans.find(
								(key) => key.optionId == event.target.value
							)
						) {
							e2?.optionBeans.map((el) => {
								if (event.target.value == el.optionId) {
									el.selected = 1;
									return el;
								} else {
									el.selected = 0;
									return el;
								}
							});
						}
						return e2;
					});
					return e1;
				});
			} else {
				res = mcqDatas.map((e1) => {
					e1?.paragraphQuestions.map((e2) => {
						e2?.pgQuesmasters.map((e3) => {
							if (
								e3.optionBeans.find(
									(key) => key.optionId == event.target.value
								)
							) {
								e3?.optionBeans.map((el) => {
									if (event.target.value == el.optionId) {
										el.selected = 1;
										return el;
									} else {
										el.selected = 0;
										return el;
									}
								});
							}
							return e3;
						});
						return e2;
					});
					return e1;
				});
			}
			setlist((prev) => ({ ...prev, Data: res }));
		},
		[mcqDatas]
	);

	const clearAnswerSet = useCallback(
		(id, type, paraIndex = -1) => {
			const navigation = document.querySelectorAll(
				".selection-btn-stand-" + type
			);

			navigation.forEach((e) => {
				if (e.getAttribute("aria-label") == id) {
					e.classList.remove("attempted");
				}
			});

			let res;
			if (type === "mcq") {
				res = mcqDatas.map((e1) => {
					e1?.quesmasters.map((e2) => {
						if (e2.quesId == id) {
							e2?.optionBeans.map((el) => {
								el.selected = 0;
								return el;
							});
						}
						return e2;
					});
					return e1;
				});
			} else {
				res = mcqDatas.map((e1) => {
					e1?.paragraphQuestions.map((e2) => {
						e2?.pgQuesmasters.map((e3) => {
							if (e3.quesId == id) {
								e3?.optionBeans.map((el) => {
									el.selected = 0;
									return el;
								});
							}
							return e3;
						});
						return e2;
					});
					return e1;
				});
			}
			setlist(res);
		},
		[mcqDatas]
	);

	const bookMark = useCallback(
		(event, id, type) => {
			const navigation = document.querySelectorAll(".flaged-" + type);
			// const text1 = "Clear Mark";
			// const text2 = "Mark for Later";
			navigation.forEach((e) => {
				if (
					e.getAttribute("aria-label") == id &&
					!e.classList.contains("marked")
				) {
					e.classList.add("marked");
					event.target.classList.add("unmarked");
					let res = mcqDatas.map((e1) => {
						e1?.quesmasters.map((e2) => {
							if (e2.quesId == id) {
								e2.markForReviewFlag = true;
							}
							return e2;
						});
						return e1;
					});
					setlist(res);
				} else if (
					e.getAttribute("aria-label") == id &&
					e.classList.contains("marked")
				) {
					e.classList.remove("marked");
					event.target.classList.remove("unmarked");
					let res = mcqDatas.map((e1) => {
						e1?.quesmasters.map((e2) => {
							if (e2.quesId == id) {
								e2.markForReviewFlag = false;
							}
							return e2;
						});
						return e1;
					});
					setlist(res);
				}
			});
		},
		[mcqDatas]
	);

	const answerAttempt = useCallback(
		(id, type) => {
			const navigation = document.querySelectorAll(
				".selection-btn-stand-" + type
			);

			if (type === "mcq") {
				navigation.forEach((e) => {
					if (e.getAttribute("aria-label") == id) {
						e.classList.add("attempted");
					}
				});
			}

			let res;
			if (type === "para") {
				res = mcqDatas.forEach((e1) => {
					e1.paragraphQuestions.forEach((e2, ei) => {
						e2.pgQuesmasters.forEach((e3, i) => {
							e3.optionBeans.forEach((el) => {
								navigation.forEach((e) => {
									if (e.getAttribute("aria-label") == id) {
										e.classList.add("attempted");
									}
								});
								return el;
							});

							return e3;
						});
						return e2;
					});
					return e1;
				});
			}
		},
		[mcqDatas]
	);

	const submitQuiz = (e) => {
		// getting HH:MM:SS formate out of time which is in secs
		const hours = Math.floor(time / 3600);
		const minutes = Math.floor((time % 3600) / 60);
		const secs = time % 60;
		let result = `${hours.toString().padStart(2, "0")}:${minutes
			.toString()
			.padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
		setIsTimerOn(false);

		let res = mcqDatas.map((e1) => {
			e1?.quesmasters.map((e2) => {
				e2?.optionBeans.map((el) => {
					if (el.selected === null) {
						el.selected = 0;
						return el;
					} else return el;
				});
				return e2;
			});
			return e1;
		});

		res = mcqDatas.map((e1) => {
			e1?.paragraphQuestions.map((e2) => {
				e2?.pgQuesmasters.map((e3) => {
					e3?.optionBeans.map((el) => {
						if (el.selected === null) {
							el.selected = 0;
							return el;
						} else return el;
					});
					// }
					return e3;
				});
				return e2;
			});
			return e1;
		});
		setlist((prev) => ({ ...prev, Data: res }));

		axios
			.post(
				`${baseUrl()}/df/saveMcqPragraphQuizData`,
				{
					quizId: quizId,
					courseId: courseId,
					userId: Cookies.get("userId"),
					quizSectionWises: mcqDatas,
					timeTaken: result,
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
					navigate(testSubmit, {
						state: { data: response.data.Data },
					});

					setLoading(false);
				}
			});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
	};

	//setting timer
	useEffect(() => {
		const interval = setInterval(() => {
			if (isTimerOn) {
				setTime((prevTime) => prevTime + 1);
			}
		}, 1000);
		return () => clearInterval(interval);
	}, [isTimerOn]);

	//handle the closing and reload of tab
	const handleBeforeUnload = (e) => {
		e.preventDefault();
		e.returnValue = "";
	};

	useEffect(() => {
		// window.addEventListener("beforeunload", handleBeforeUnload);
		// return () => {
		//   window.removeEventListener("beforeunload", handleBeforeUnload);
		// };

		const handleBeforeUnload = (event) => {
			event.preventDefault();
			// event.returnValue = ""; // Required for Chrome
			return setShowModal(true);
		};

		window.onbeforeunload = handleBeforeUnload;

		return () => {
			window.onbeforeunload = null; // Cleanup the event handler on component unmount
		};
	}, []);

	const handleButtonClickAutoScroll = (response) => {
		setButtonClicked(1);
	};
	const handleConfirm = () => {
		// Handle confirmation action here
		alert("Page will be reloaded!");
		setShowModal(false);
	};

	const handleCancel = () => {
		setShowModal(false);
	};
	return (
		<>
			<Header />
			<main className='main-container'>
				{mcqDatas?.map((item) => (
					<span
						className='step'
						style={{ display: "none" }}
						id={`data/${item.topicId}`}
					></span>
				))}

				<article className='test-container'>
					<form
						id='regForm'
						className='regForm'
						onSubmit={handleSubmit}
					>
						{allQuestion.map((item, idx) => (
							<div
								id={`data/${item.topicId}`}
								className='px-3 tab'
								key={idx}
							>
								<div className='mcq-alternate-color'>
									<h2 className='exam-title'>{name}</h2>
									<article
										style={{
											fontSize: "20px",
											color: "black",
											backgroundColor: "white !important",
											padding: "10px 0",
										}}
									>
										{item.specialInstruction}
									</article>
									{/* MCQ QUESTION */}
									{item.quesmasters.map((items, i) => (
										<McqQuestions
											key={i + "" + idx}
											{...{
												items,
												i,
												setCurrentIndex,
												clearAnswerSet,
												answerAttempt,
												bookMark,
												AnswerSet,
											}}
										/>
									))}
									{/* PARA QUESTION */}
									{item.paragraphQuestions.map(
										(paragraph, index) => (
											<ParaQuestions
												item={paragraph}
												key={idx + "" + index + index}
												{...{
													clearAnswerSet,
													AnswerSet,
													answerAttempt,
													bookMark,
													index,
												}}
											/>
										)
									)}
								</div>
							</div>
						))}
						<FooterButtons
							nextPrev={nextPrev}
							button1Text={"Leave Quiz"}
							button2Text={"Submit"}
						/>
					</form>
				</article>

				<article className='test-status-container'>
					<section className='status-details-container'>
						<div className='status-line'>
							<p className='m-0'>Subject</p>
							{mcqDatas.map((item, index) => (
								<span
									key={index}
									className='status-value'
									title={
										item.basicDetailsBean.subject.length >
											10 && item.basicDetailsBean.subject
									}
								>
									:{" "}
									{item.basicDetailsBean.subject.length > 10
										? `${item.basicDetailsBean.subject.slice(
												0,
												10
										  )}...`
										: item.basicDetailsBean.subject}
								</span>
							))}
						</div>
						<div className='status-line'>
							<p className='m-0'>Quiz Code</p>
							{mcqDatas.map((item, index) => (
								<span key={index} className='status-value'>
									: {item.basicDetailsBean.quizCode}
								</span>
							))}
						</div>
						<div className='status-line'>
							<p className='m-0'>Time Format</p>
							<span className='status-value'>: hh:mm:ss</span>
						</div>
						<div className='status-line'>
							<p className='m-0'>Given Time</p>
							{mcqDatas.map((item, index) => (
								<span key={index} className='status-value'>
									: {/* Hours */}
									<span>
										{(
											"0" +
											Math.floor(
												item.basicDetailsBean
													.totalTime / 60
											)
										).slice(-2)}
										:
									</span>
									{/* Minute */}
									<span>
										{(
											"0" +
											Math.floor(
												item.basicDetailsBean
													.totalTime % 60
											)
										).slice(-2)}
										:
									</span>
									{/* Seconds */}
									<span>
										{(
											"0" +
											Math.floor(
												(item.basicDetailsBean
													.totalTime %
													60) *
													60 -
													Math.floor(
														item.basicDetailsBean
															.totalTime % 60
													) *
														60
											)
										).slice(-2)}
									</span>
								</span>
							))}
						</div>
						<div className='status-line'>
							<p className='m-0'>Taken Time</p>
							<div className='status-value'>
								:{" "}
								<span>
									{Math.floor(time / 3600)
										.toString()
										.padStart(2, "0")}
									:
								</span>
								<span>
									{Math.floor((time % 3600) / 60)
										.toString()
										.padStart(2, "0")}
									:
								</span>
								<span>
									{(time % 60).toString().padStart(2, "0")}
								</span>
							</div>
						</div>
						{dashboradConfiguration.autoScrollEnable ? (
							<>
								<div
									className='status-line'
									style={{ position: "relative" }}
								>
									<p className='m-0'>Enable Auto-scroll</p>
									<div className='status-value'>
										<div className='toggle-switch'>
											<input
												className='toggle-input'
												id='toggle'
												type='checkbox'
												checked={isAutoScrollEnabled}
												onChange={(e) =>
													dispatch(
														utilitySliceActions.setAutoScroll(
															e.target.checked
														)
													)
												}
											/>
											<label
												className='toggle-label'
												for='toggle'
											></label>
										</div>
									</div>
									{!buttonClicked ? (
										<Tooltip
											handleButtonClickAutoScroll={
												handleButtonClickAutoScroll
											}
										/>
									) : (
										""
									)}
								</div>
							</>
						) : (
							""
						)}
					</section>
					<section>
						{allQuestion.map((items, index) => (
							<Fragment key={index}>
								<div
									className='question-btn-container'
									id='progress'
								>
									{items.quesmasters.map((answer, key) => (
										<div
											key={answer.quesId}
											style={{
												position: "relative",
											}}
											id='track1'
										>
											<div
												className='flaged flaged-mcq'
												aria-label={answer.quesId}
											></div>
											<button
												className='btn btn-que selection-btn-stand-mcq'
												aria-label={answer.quesId}
												onClick={() => {
													setCurrentIndex(key);
													refer(index);
													const questionStart =
														document.querySelectorAll(
															".m" + key
														)[index];
													const headerOffset = 180;
													const elementPosition =
														questionStart.getBoundingClientRect()
															.top;
													const offsetPosition =
														elementPosition +
														window.pageYOffset -
														headerOffset;
													window.scrollTo({
														top: offsetPosition,
														behavior: "smooth",
													});
												}}
											>
												{answer.questionNumber}
											</button>
										</div>
									))}
									{items.paragraphQuestions.map(
										(item, keys) =>
											item.pgQuesmasters.map(
												(answer, key) => (
													<div
														key={answer.quesId}
														style={{
															position:
																"relative",
														}}
														id='track1'
													>
														<div
															className='flaged flaged-para'
															aria-label={
																answer.quesId
															}
														></div>

														<button
															className='btn btn-que selection-btn-stand-para'
															aria-label={
																answer.quesId
															}
															onClick={() => {
																refer(index);
																const questionStart =
																	document.querySelectorAll(
																		".para" +
																			key +
																			keys
																	)[index];
																const headerOffset = 125;
																const elementPosition =
																	questionStart.getBoundingClientRect()
																		.top;
																const offsetPosition =
																	elementPosition +
																	window.pageYOffset -
																	headerOffset;
																window.scrollTo(
																	{
																		top: offsetPosition,
																		behavior:
																			"smooth",
																	}
																);
															}}
														>
															{
																answer.questionNumber
															}
														</button>
													</div>
												)
											)
									)}
								</div>
								{/* will be visible in mobile screen */}
								<div
									className='dropdown-btn'
									onClick={() =>
										setIsDropdownOpen(!isDropdownOpen)
									}
								>
									{isDropdownOpen ? (
										<FaChevronUp />
									) : (
										<FaChevronDown />
									)}
								</div>
								{isDropdownOpen && (
									<section className='status-details-container-dropdown'>
										<div className='status-line'>
											<p className='m-0'>Subject</p>
											{mcqDatas.map((item, index) => (
												<span
													key={index}
													className='status-value'
													title={
														item.basicDetailsBean
															.subject.length >
															10 &&
														item.basicDetailsBean
															.subject
													}
												>
													:{" "}
													{item.basicDetailsBean
														.subject.length > 10
														? `${item.basicDetailsBean.subject.slice(
																0,
																10
														  )}...`
														: item.basicDetailsBean
																.subject}
												</span>
											))}
										</div>
										<div className='status-line'>
											<p className='m-0'>Quiz Code</p>
											{mcqDatas.map((item, index) => (
												<span
													key={index}
													className='status-value'
												>
													:{" "}
													{
														item.basicDetailsBean
															.quizCode
													}
												</span>
											))}
										</div>
										<div className='status-line'>
											<p className='m-0'>Time Format</p>
											<span className='status-value'>
												: hh:mm:ss
											</span>
										</div>
										<div className='status-line'>
											<p className='m-0'>Given Time</p>
											{mcqDatas.map((item, index) => (
												<span
													key={index}
													className='status-value'
												>
													:{" "}
													<span>
														{(
															"0" +
															Math.floor(
																item
																	.basicDetailsBean
																	.totalTime /
																	60
															)
														).slice(-2)}
														:
													</span>
													<span>
														{(
															"0" +
															Math.floor(
																item
																	.basicDetailsBean
																	.totalTime %
																	60
															)
														).slice(-2)}
														:
													</span>
													<span>
														{(
															"0" +
															Math.floor(
																(item
																	.basicDetailsBean
																	.totalTime %
																	60) *
																	60 -
																	Math.floor(
																		item
																			.basicDetailsBean
																			.totalTime %
																			60
																	) *
																		60
															)
														).slice(-2)}
													</span>
												</span>
											))}
										</div>
										<div className='status-line'>
											<p className='m-0'>Taken Time</p>
											<div className='status-value'>
												:{" "}
												<span>
													{Math.floor(time / 3600)
														.toString()
														.padStart(2, "0")}
													:
												</span>
												<span>
													{Math.floor(
														(time % 3600) / 60
													)
														.toString()
														.padStart(2, "0")}
													:
												</span>
												<span>
													{(time % 60)
														.toString()
														.padStart(2, "0")}
												</span>
											</div>
										</div>
										{dashboradConfiguration.autoScrollEnable ? (
											<>
												<div
													className='status-line'
													style={{
														position: "relative",
													}}
												>
													<p className='m-0'>
														Enable Auto-scroll
													</p>
													<div className='status-value'>
														<div className='toggle-switch'>
															<input
																className='toggle-input'
																id='toggle'
																type='checkbox'
																checked={
																	isAutoScrollEnabled
																}
																onChange={(e) =>
																	dispatch(
																		utilitySliceActions.setAutoScroll(
																			e
																				.target
																				.checked
																		)
																	)
																}
															/>
															<label
																className='toggle-label'
																for='toggle'
															></label>
														</div>
													</div>
													{!buttonClicked ? (
														<Tooltip
															handleButtonClickAutoScroll={
																handleButtonClickAutoScroll
															}
														/>
													) : (
														""
													)}
												</div>
											</>
										) : (
											""
										)}
									</section>
								)}
							</Fragment>
						))}
					</section>
				</article>
			</main>
			<ConfirmSubmissionModal submitQuiz={submitQuiz} />
			<LeaveQuizModal />
			<OneLinerFooter />
			{showModal && (
				<div className='modal' style={{ display: "block" }}>
					<div className='modal-dialog'>
						<div className='modal-content'>
							<div className='modal-header'>
								<h5 className='modal-title'>Confirmation</h5>
							</div>
							<div className='modal-body'>
								Are you sure you want to leave this page? If You
								Choose to Leave Your Test Will Be Submtted.
							</div>
							<div className='modal-footer'>
								<button
									className='btn btn-primary'
									onClick={handleConfirm}
								>
									Submit Test
								</button>
								<button
									className='btn btn-secondary'
									onClick={handleCancel}
								>
									Cross Check
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default MCQ;
