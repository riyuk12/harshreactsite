/* eslint-disable */
import axios from "axios";
import "./StudentMCQ.css";
import Cookies from "js-cookie";
import baseUrl from "../../Components/baseUrl";
import React, { useEffect, useState } from "react";
import Logo from "../../Assets/images/logo.png";
import userLogo from "../../Assets/images/avatar.png";
import profileHook from "./useProfile";
import "./StudentMCQ.css";
// import { AiFillFlag } from "react-icons/ai";

import "./StudentMCQ.css";
import QuestionButton from "./QuestionButton";

import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import $ from "jquery";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import LandingPageFooter from "../../Components/Global/Footers/LandingPageFooter";
import { routes, studDashboard } from "../../RouteConstants";
import { useDispatch, useSelector } from "react-redux";
import { utilitySliceActions } from "../../Redux/Slice/UtilitySlice";

export default function StudentFeedback() {
	const param = window.location.pathname;

	const [mcqDatas, setMcqDatas] = useState([]);
	const [chunk, setChunk] = useState(5);
	const [seconds, setSeconds] = useState(0);
	const [minutes, setMinutes] = useState(0);
	const [hours, setHours] = useState(0);
	const profileData = profileHook();

	const { firstName, lastName, image } = profileData;
	const location = useLocation();
	console.log(location, "LOCATIONS");
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
	console.log(notVisited, "feedbackresult");

	const [tableData, setTableData] = useState([]);
	const { isLiveQuiz } = useSelector((state) => state.utils);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(utilitySliceActions.setQuizIsLive());
	}, []);

	useEffect(() => {
		if (feedbackresult && feedbackresult.length) {
			sliceIntoChunks(feedbackresult, chunk);
		}
	}, [feedbackresult]);
	// const quizId = 137;
	useEffect(() => {
		axios
			.post(
				baseUrl() + "/PreviewQuiz",
				{
					userId: data?.userId,
					quizResultId: data?.quizResultId,
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
				}
			});
	}, [data?.quizId]);

	const getSelectedOption = (options, index) => {
		const data = options.filter((option) => option.selected == 1);
		return data[0]?.optionValue;
	};
	const getCorrectOption = (options) => {
		const data = options.filter((option) => option.isCorrect == 1);
		return data[0]?.optionValue;
	};
	// 👇👇 this Effect will set the question number for every Question
	function sliceIntoChunks(arr, chunkSize) {
		const res = [];
		for (let i = 0; i < arr.length; i += chunkSize) {
			const chunk = arr.slice(i, i + chunkSize);
			res.push(chunk);
		}
		setTableData(res);

		return res;
	}
	const [pdfQuizResultId, setPdfQuizResultId] = useState("");
	if (data?.pdfresult) {
		const { pdfQuizResultId } = data?.pdfresult;
		setPdfQuizResultId(pdfQuizResultId);
	}
	const [pdfPreviewQuiz, setPdfPreviewQuiz] = useState();
	const [pdfTableData, setPdfTableData] = useState([]);

	useEffect(() => {
		axios
			.post(
				baseUrl() + "/previewPdfQuiz",
				{
					pdfQuizResultId: pdfQuizResultId,
				},
				{
					headers: {
						"Acces-Control-Allow-Origin": "*",
						Client_ID: "MVOZ7rblFHsvdzk25vsQpQ==",
						Authorization: `${Cookies.get("token")}`,
					},
				}
			)
			.then((res) => setPdfPreviewQuiz(res.data.Data));
	}, []);

	function sliceIntoChunks1(arr, chunkSize) {
		const res = [];
		for (let i = 0; i < arr.length; i += chunkSize) {
			const chunk = arr.slice(i, i + chunkSize);
			res.push(chunk);
		}
		setTableData(res);

		return res;
	}
	useEffect(() => {
		if (pdfPreviewQuiz?.pdfQuestOptionsBeans?.length) {
			sliceIntoChunks1(pdfPreviewQuiz.pdfQuestOptionsBeans, chunk);
		}
	}, [pdfPreviewQuiz?.pdfQuestOptionsBeans]);
	useEffect(() => {
		if (mcqDatas.length) {
			sliceIntoChunks(mcqDatas[0]?.questionsBeans, chunk);
		}
	}, [mcqDatas, chunk]);

	const [page, setPage] = useState(0);
	const handleClick = (i) => {
		setPage(i);
	};

	const handlePrevious = () => {
		setPage(page - 1);
	};

	const handleNext = () => {
		setPage(page + 1);
	};

	const handleChange = (e) => {
		const searchData = mcqDatas[0]?.questionsBeans?.filter((search) => {
			const data = search.optionBeans.filter((item) =>
				String(item.optionValue.toLowerCase()).startsWith(
					String(e.toLowerCase())
				)
			);
			return data.length > 0 ? true : false;
		});
		if (searchData.length > 0) {
			sliceIntoChunks(searchData, chunk);
		}
		// setTableData(searchData);
		console.log(searchData, "searchData");
	};
	const handleClickFeedback = () => {
		navigate("/FeedbackForm", {
			state: { name: name },
		});
	};
	return (
		<>
			<div
				className='w-100'
				style={{
					backgroundColor: "#F18C18",
					marginTop: "100px",
					height: "60px",
					fontFamily: 'Poppins',
				}}
			>
				<p
					className='p-3 '
					style={{
						color: "white",
						fontSize: "20px",
						fontWeight: "600",
						lineHeight: "22px",
						fontFamily: 'Poppins'
					}}
				>
					{name}
				</p>
			</div>
			<section
				className='container-fluid  position-relative '
				style={{ width: "90%", position: "relative" }}
			>
				<img
					style={{ zIndex: -1 }}
					src={Logo}
					className='water-mark-quiz'
				></img>
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
										{minutes < 10 ? "0" + minutes : minutes}
										:
										{seconds < 10 ? "0" + seconds : seconds}
									</span>
								</h6>
							</div>
						</div>
					</div>
				</nav>{" "}
				<div style={{ marginTop: "10px", height: "80%" }}>
					<div
						className='d-flex justify-content-between border p-2 '
						style={{
							display: "flex",
							alignItems: "center",
							color: "red",
						}}
					>
						<div
							className='text-red'
							style={{
								fontSize: "16px",
								fontWeight: "600",
								lineHeight: "24px",
							}}
						></div>

						{seo ? (
							<div className=''>
								<button
									className='btn btn-danger'
									style={{ zIndex: 999 }}
									onClick={() => navigate(path)}
								>
									TAKE ANOTHER TEST
								</button>
								<button
									className='btn  ms-3'
									onClick={() => navigate(path)}
									style={{
										backgroundColor: "#5BC0DE",
										color: "white",
										zIndex: 999,
									}}
								>
									CLOSE
								</button>
							</div>
						) : (
							<div className=''>
								{isLiveQuiz && (
									<button
										className='btn btn-primary'
										style={{
											zIndex: 999,
											marginRight: "15px",
										}}
										onClick={() =>
											navigate(
												routes.liveQuizLeaderBoard,
												{
													state: {
														quizId: quizId,
														courseId: courseId,
														data: data,
														name: name,
														notVisited: notVisited,
														user_Name: user_Name,
														studentresult:
															studentresult,
														seo: seo,
														feedbackresult:
															feedbackresult,
														path: path,
													},
												}
											)
										}
									>
										VIEW LEADERBORAD
									</button>
								)}
								<button
									className='btn btn-danger'
									style={{ zIndex: 999 }}
									//  onClick={()=>handleClickFeedback()}
								>
									STUDENT FEEDBACK
								</button>
								<button
									className='btn  ms-3'
									onClick={() => navigate(studDashboard)}
									style={{
										backgroundColor: "#5BC0DE",
										color: "white",
										zIndex: 999,
									}}
								>
									Dashboard
								</button>
							</div>
						)}
					</div>

					<div className='table_1'>
						{" "}
						<table className='summury-table  '>
							<tr className='tableHeader'>
								<th
									colSpan={4}
									className='text-center'
									style={{
										fontSize: "16px",
										fontWaight: "500",
									}}
								>
									Score Card
								</th>
							</tr>
							<tr className='tableHeader'>
								<td>Total Question</td>
								<td>
									{data?.totalQuest ||
										studentresult?.totalQuest}
								</td>
								<td>Total Attempted</td>
								<td>
									{data?.notVisited ||
										data?.totalQuest - notVisited ||
										studentresult?.totalQuest - notVisited}
								</td>
							</tr>
							<tr className='tableHeader'>
								<td>Correct Answers</td>
								<td>
									{data?.correctQues ||
										studentresult?.correctQues ||
										0}
								</td>
								<td>Incorrect Answers</td>
								<td>
									{data?.wrongQues ||
										studentresult?.wrongQues}
								</td>
							</tr>
							<tr className='tableHeader'>
								<td>Score</td>
								<td>
									{data?.marksObtained ||
										mcqDatas[0]?.marksObtained ||
										studentresult?.marksObtained}
								</td>
							</tr>
						</table>
					</div>
					<div
						className='mb-5 table_2'
						style={{ marginBottom: "50%" }}
					>
						<div>
							<div className='d-flex align-items-center justify-content-between mt-4'>
								<div className='d-flex align-items-center'>
									{" "}
									<div className=''>Show</div>
									<div className='dropdown show ms-3'>
										<a
											style={{
												border: "1px solid gray",
											}}
											className='btn  dropdown-toggle'
											href='#'
											role='button'
											id='dropdownMenuLink'
											data-toggle='dropdown'
											aria-haspopup='true'
											aria-expanded='false'
										>
											{chunk}
										</a>

										<div
											className='dropdown-menu'
											aria-labelledby='dropdownMenuLink'
										>
											<a
												className='dropdown-item'
												onClick={() => setChunk(5)}
											>
												{5}
											</a>

											<a
												className='dropdown-item'
												onClick={() => setChunk(10)}
											>
												{10}
											</a>
											<a
												className='dropdown-item'
												onClick={() => setChunk(15)}
											>
												{15}
											</a>
										</div>
									</div>{" "}
									<div className='ms-2'>Entries</div>
								</div>
								<div className='d-flex align-items-center'>
									<div>search</div>
									<div className='input-group ms-3'>
										<input
											onChange={(e) =>
												handleChange(e.target.value)
											}
											type='text'
											className='form-control'
											aria-label='Amount (to the nearest dollar)'
										/>
									</div>
								</div>
							</div>
						</div>
						<table className='summury-table mt-4  '>
							<tr className='tableHeader'>
								<th>Question No.</th>
								<th>Selected Option</th>
								<th>Status </th>
								<th>Correct Option</th>
							</tr>
							{tableData[page]?.map((item, index) => (
								<tr className='tableHeader1 '>
									<td>
										Question{" "}
										{page > 0
											? index + page * 5 + 1
											: index + 1}
									</td>
									<td>
										{item.optionBeans ? (
											<span
												dangerouslySetInnerHTML={{
													__html: getSelectedOption(
														item.optionBeans
													),
												}}
											></span>
										) : item.selected == 0 ? (
											"N/A"
										) : (
											String.fromCharCode(
												item.selected + 64
											)
										)}
									</td>
									<td>
										{item.correctFlag == null ? (
											"N/A "
										) : item.correctFlag ? (
											<AiOutlineCheck color='green' />
										) : (
											<AiOutlineClose color='red' />
										)}
									</td>
									<td>
										{item.optionBeans ? (
											<span
												dangerouslySetInnerHTML={{
													__html: getSelectedOption(
														item.optionBeans
													),
												}}
											></span>
										) : (
											String.fromCharCode(
												item.correctOption + 64
											)
										)}
									</td>
								</tr>
							))}
						</table>
						<div className='d-flex justify-content-between mt-3'>
							<div>
								Showing {page * 5 + 1} - {page * 5 + chunk} of{" "}
								{mcqDatas[0]?.questionsBeans?.length} entries
							</div>
							<div>
								<nav aria-label='Page navigation example'>
									<ul className='pagination'>
										<li
											className={`page-item ${
												page == 0 ? "disabled" : ""
											}`}
										>
											<button
												className='page-link '
												disabled={page == 0}
												onClick={() => handlePrevious()}
											>
												{" "}
												Previous
											</button>
										</li>
										{tableData.map((tableData, index) => (
											<li
												className={`page-item  ${
													page == index
														? "active"
														: ""
												}`}
												onClick={() =>
													handleClick(index)
												}
											>
												<a className='page-link '>
													{index + 1}
												</a>
											</li>
										))}

										<li
											className={`page-item ${
												page == tableData?.length - 1
													? "disabled"
													: ""
											}`}
										>
											<button
												className='page-link '
												disabled={
													page ==
													tableData?.length - 1
												}
												onClick={() => handleNext()}
											>
												{" "}
												Next
											</button>{" "}
										</li>
									</ul>
								</nav>
							</div>
						</div>
					</div>
				</div>
			</section>
			<LandingPageFooter />
		</>
	);
}

function McqPaper({
	questionSet,
	currentQuestion,
	totalQuestion,
	setAllQuestion,
	handleNext,
	clickBtn,
	setClickBtn,
}) {
	const [filter, setFilter] = useState([]);

	useEffect(() => {
		const quesmasterUpdate = questionSet.quesmasters.filter(
			(question) => question.questionNumber === currentQuestion
		);
		setFilter([...quesmasterUpdate]);

		const paragraphQuestionsUpdate = questionSet.paragraphQuestions.map(
			(pgQuestion) => {
				let pg = pgQuestion.pgQuesmasters.map((question) => {
					if (question.questionNumber === currentQuestion)
						return question;
					return null;
				});

				let filterPg = pg.filter((question) => question);
				if (filterPg.length) setFilter([...filterPg]);
				return filterPg;
			}
		);
	}, [
		currentQuestion,
		questionSet.paragraphQuestions,
		questionSet.quesmasters,
	]);

	useEffect(() => {
		const quesId = filter.map((question) => question.quesId);
		const ele = document.getElementsByName(`${quesId}`);
		for (let i = 0; i < ele.length; i++) {
			if (ele[i].ariaChecked === "0") {
				ele[i].checked = false;
				// console.log(ele[i].ariaChecked, typeof ele[i].ariaChecked);
			} else ele[i].checked = true;
		}
	}, [filter]);

	const handleSaveNext = (e) => {
		e.preventDefault();
		const quesId = filter.map((question) => question.quesId);
		// console.log("quesId", quesId);
		const ele = document.getElementsByName(`${quesId}`);
		let answer = "";
		for (let i = 0; i < ele.length; i++) {
			if (ele[i].checked) {
				answer = ele[i].value;
				break;
			}
		}
		// console.log("answer", answer);
		if (answer === "") {
			alert("Please select an option");
			return true;
		} else {
			console.log("save answer");
			if (currentQuestion <= questionSet.quesmasters.length) {
				const optionUpdate = questionSet.quesmasters.map(
					(mcqQuestion) => {
						const updateOption = mcqQuestion.optionBeans.map(
							(option) => {
								if (
									mcqQuestion.questionNumber ===
									currentQuestion
								) {
									// console.log("option.optionId", typeof option.optionId);

									if (option.optionId === Number(answer))
										return { ...option, selected: 1 };
									else return { ...option, selected: 0 };
								}
								return option;
							}
						);
						return { ...mcqQuestion, optionBeans: updateOption };
					}
				);
				setAllQuestion([{ ...questionSet, quesmasters: optionUpdate }]);
			} else if (
				currentQuestion - questionSet.quesmasters.length <=
				totalQuestion - questionSet.quesmasters.length
			) {
				const optionUpdate = questionSet.paragraphQuestions.map(
					(pgQuestion) => {
						const updateQuestion = pgQuestion.pgQuesmasters.map(
							(question) => {
								const updateOption = question.optionBeans.map(
									(option) => {
										if (
											question.questionNumber ===
											currentQuestion
										) {
											// console.log("option.optionId", typeof option.optionId);
											if (
												option.optionId ===
												Number(answer)
											)
												return {
													...option,
													selected: 1,
												};
											else
												return {
													...option,
													selected: 0,
												};
										}
										return option;
									}
								);
								return {
									...question,
									optionBeans: updateOption,
								};
							}
						);

						return { ...pgQuestion, pgQuesmasters: updateQuestion };
					}
				);
				// console.log("updateQuestion", optionUpdate);

				setAllQuestion([
					{ ...questionSet, paragraphQuestions: optionUpdate },
				]);
			}

			// Save Question button
			const val = clickBtn.map((btn) => {
				if (btn.number === currentQuestion)
					return { ...btn, markAndSave: true, markReview: false };
				return btn;
			});
			setClickBtn(val);
			// console.log("filter", filter);
			handleNext();
		}
	};

	const handleClearResponse = (e) => {
		const quesId = filter.map((question) => question.quesId);
		const ele = document.getElementsByName(`${quesId}`);
		for (let i = 0; i < ele.length; i++) ele[i].checked = false;
		if (currentQuestion <= questionSet.quesmasters.length) {
			const optionUpdate = questionSet.quesmasters.map((mcqQuestion) => {
				const updateOption = mcqQuestion.optionBeans.map((option) => {
					if (mcqQuestion.questionNumber === currentQuestion) {
						return { ...option, selected: 0 };
					}
					return option;
				});
				return { ...mcqQuestion, optionBeans: updateOption };
			});
			setAllQuestion([{ ...questionSet, quesmasters: optionUpdate }]);
		} else if (
			currentQuestion - questionSet.quesmasters.length <=
			totalQuestion - questionSet.quesmasters.length
		) {
			const optionUpdate = questionSet.paragraphQuestions.map(
				(pgQuestion) => {
					const updateQuestion = pgQuestion.pgQuesmasters.map(
						(question) => {
							const updateOption = question.optionBeans.map(
								(option) => {
									if (
										question.questionNumber ===
										currentQuestion
									) {
										return { ...option, selected: 0 };
									}
									return option;
								}
							);
							return { ...question, optionBeans: updateOption };
						}
					);

					return { ...pgQuestion, pgQuesmasters: updateQuestion };
				}
			);
			// console.log("updateQuestion", optionUpdate);

			setAllQuestion([
				{ ...questionSet, paragraphQuestions: optionUpdate },
			]);
		}

		// Save Question button
		const val = clickBtn.map((btn) => {
			if (btn.number === currentQuestion)
				return {
					...btn,
					markAndSave: false,
					markReview: false,
					saveAndReview: false,
				};
			return btn;
		});
		setClickBtn(val);
	};

	const handleMarkForReview = (e) => {
		handleClearResponse();
		const clickUpdate = clickBtn.map((btn) => {
			if (btn.number === currentQuestion)
				return {
					...btn,
					markReview: true,
					markAndSave: false,
					saveAndReview: false,
				};
			return btn;
		});
		setClickBtn(clickUpdate);
		handleNext();
	};

	const handleSaveAndMark = (e) => {
		const notMarkAnswer = handleSaveNext(e);
		if (notMarkAnswer) return;
		const clickUpdate = clickBtn.map((btn) => {
			if (btn.number === currentQuestion)
				return {
					...btn,
					markReview: true,
					markAndSave: false,
					saveAndReview: true,
				};
			return btn;
		});
		setClickBtn(clickUpdate);
	};

	const question = filter.map((question, idx) => (
		<div style={{ position: "relative" }} key={idx}>
			<label className={`questions-mcq-mobile`}>
				Q{question.questionNumber}.&nbsp;&nbsp; &nbsp;
				<span
					dangerouslySetInnerHTML={{ __html: question.question }}
				></span>
			</label>
			<br />
			{question.optionBeans.map((answer, key) => (
				<div
					className='form-check form-check-media'
					style={{ margin: "0 0 0 45px" }}
					key={key}
				>
					{/* <input
            type="radio"
            className="form-check-input"
            id={answer.optionId}
            aria-checked={answer.selected || 0}
            value={answer.optionId}
            name={question.quesId}
          /> */}
					{"(" + (key + 10).toString(36).toLowerCase() + ")" + " "}
					<label
						htmlFor={answer.optionId}
						className='form-check-label questions-mcq-mobile'
						style={{
							fontSize: "16px",
							fontWeight: "400",
							lineHeight: "28px",
						}}
					>
						<span
							dangerouslySetInnerHTML={{
								__html: answer.optionValue,
							}}
						></span>
					</label>
				</div>
			))}
			<div className='d-flex justify-content-between mt-3'>
				{" "}
				{question.optionBeans.map((answer, key) => (
					<div>
						<label
							htmlFor={answer.optionId}
							className='form-check-label questions-mcq-mobile'
						>
							{key + 1 + "." + "  "}

							<span
								dangerouslySetInnerHTML={{
									__html: answer.optionValue,
								}}
							></span>
							{/* <input
                type="radio"
                className="form-check-input ms-3"
                id={answer.optionId}
                aria-checked={answer.selected || 0}
                value={answer.optionId}
                name={question.quesId}
              /> */}
						</label>
						<hr />
					</div>
				))}
			</div>
			<div className='d-flex flex-wrap gap-1 mt-1'>
				<button
					className='btn-mcq'
					type='button'
					style={{
						background: "#5CB85B",
						display: "flex",
						alignItems: "center",
						height: "40px",
					}}
					onClick={handleSaveNext}
				>
					Save & Next
				</button>
				<button
					className='btn-mcq'
					type='button'
					style={{
						background: "white",
						border: "1px solid #E1E1E1",
						fontSize: "16px",
						fontWeight: "600",
						color: "black",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						height: "40px",
					}}
					onClick={handleClearResponse}
				>
					Clear
				</button>
				<button
					className='btn-mcq'
					style={{
						background: "#F0AD4E",
						fontSize: "16px",
						fontWeight: "600",
						color: "white",
						// width: "38%",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						height: "40px",
					}}
					type='button'
					onClick={handleSaveAndMark}
				>
					Save & Mark for Review
				</button>

				<button
					className='btn-mcq'
					type='button'
					style={{
						background: "#3279B7",
						fontSize: "16px",
						fontWeight: "600",
						color: "white",
						// width: "38%",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						height: "40px",
					}}
					onClick={handleMarkForReview}
				>
					Mark for Review & Next
				</button>
			</div>
			<div
				className='mt-3 d-flex justify-content-between'
				style={{
					backgroundColor: "#F5F5F5",
					borderTop: "1px solid gray",
				}}
			>
				<div className='p-1 d-flex '>
					<button
						className='btn-mcq'
						type='button'
						style={{
							background: "white",
							fontSize: "16px",
							fontWeight: "600",
							color: "black",
							// width: "3%",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							height: "40px",
						}}
						onClick={handleMarkForReview}
					>
						{"<<"} BACK
					</button>
					<button
						className='btn-mcq ms-1'
						type='button'
						style={{
							background: "white",
							fontSize: "16px",
							fontWeight: "600",
							color: "black",
							// width: "3%",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							height: "40px",
						}}
						onClick={handleMarkForReview}
					>
						NEXT {">>"}
					</button>
				</div>
				<div className='p-1'>
					<button
						className='btn-mcq'
						type='button'
						style={{
							background: "#5CB85B",
							fontSize: "16px",
							fontWeight: "600",
							color: "white",
							// width: "3%",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							height: "40px",
						}}
						onClick={handleMarkForReview}
					>
						SUBMIT
					</button>
				</div>
			</div>
			<footer className='footer mt-auto py-3 main-color-bg border-top fixed-footer'>
				<div className='container text-center'>
					<span className='white'>
						Copyright &#169; 2023 BESST(Brahmaputra Exam Success
						Support Team Private Limited){" "}
					</span>
				</div>
			</footer>
		</div>
	));

	return <>{question}</>;
}

// memo(function McqQuestions({ items, i }) {
//   return (
//     <div style={{ position: "relative" }}>
//       <label className={`${"m" + i} questions-mcq-mobile`}>
//         Q{items.questionNumber}.&nbsp;&nbsp; &nbsp;
//         <span dangerouslySetInnerHTML={{ __html: items.question }}></span>
//       </label>
//       <br />
//       {items.optionBeans.map((answer, key) => (
//         <div className="form-check form-check-media" style={{ margin: "0 0 0 45px" }} key={key}>
//           <input
//             type="radio"
//             className="form-check-input"
//             id={items.optionBeans[0].optionId}
//             name={items.quesId}
//             value={answer.optionId}
//             ariaValueText={items.optionBeans.optionId}
//             onChange={(e) => {}}
//           />
//           <label className="form-check-label questions-mcq-mobile">
//             <span
//               dangerouslySetInnerHTML={{
//                 __html: answer.optionValue,
//               }}
//             ></span>
//           </label>
//         </div>
//       ))}
//       <div className="clear-bookmark">
//         <div
//           className="clear-mcq-selection bookmark-question"
//           onClick={() => {
//             // clearAnswerSet(items.quesId, "mcq");
//             // const ele = document.getElementsByName(`${items.quesId}`);
//             // for (let i = 0; i < ele.length; i++) ele[i].checked = false;
//           }}
//         >
//           <p>Clear</p>
//         </div>
//         <div className="bookmark-question" style={{ marginLeft: "-20px" }}>
//           <p
//             style={{
//               position: "absolute",
//               top: "-18px",
//               left: "-53px",
//             }}
//             onClick={(e) => {
//               //   bookMark(e, items.quesId, "mcq");
//             }}
//           >
//             <AiFillFlag style={{ pointerEvents: "none" }} />
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// });

/* MCQ QUESTION */

/* {item.quesmasters.map((items, i) => (

                  <McqQuestions key={i + "" + idx} {...{ items, i }} />
                ))} */

/* PARA QUESTION */

/* {item.paragraphQuestions.map((paragraph, index) => ({
                  /* <ParaQuestions item={paragraph} key={idx + "" + index + index} {...{ clearAnswerSet, AnswerSet, answerAttempt, bookMark, index }} /> */
/* }))} */

//   console.log("questionSet", questionSet.quesmasters);

/* <div className="clear-bookmark">
    <div
      className="clear-mcq-selection bookmark-question"
      // clearAnswerSet(items.quesId, "mcq");
      onClick={() => {
        const ele = document.getElementsByName(`${question.quesId}`);
        for (let i = 0; i < ele.length; i++) ele[i].checked = false;
      }}
    >
      <p>Clear</p>
    </div>
    <div className="bookmark-question" style={{ marginLeft: "-20px" }}>
      <p
        style={{ position: "absolute", top: "-18px", left: "-53px" }}
        onClick={(e) => {
          //   bookMark(e, items.quesId, "mcq");
        }}
      >
        <AiFillFlag style={{ pointerEvents: "none" }} />
      </p>
    </div>
  </div> */
