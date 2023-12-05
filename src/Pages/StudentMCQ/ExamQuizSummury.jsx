/* eslint-disable */
import axios from "axios";
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
import { FaUser } from "react-icons/fa";

export default function ExamQuizSummuryMCQ() {
	const [mcqDatas, setMcqDatas] = useState([]);
	const [allQuestion, setAllQuestion] = useState([]);
	const [totalQuestion, setTotalQuestion] = useState(0);
	const [currentQuestion, setCurrentQuestion] = useState(1);

	const profileData = profileHook();
	const { firstName, lastName, image } = profileData;

	const [clickBtn, setClickBtn] = useState([]);

	const location = useLocation();
	console.log(location, "location");
	const {
		hr,
		sec,
		min,
		quizId,
		courseId,
		userId,
		quizSectionWises,
		timeTaken,
		pdfRequestData,
		ispdfTest,
		name,
		topicName,
		result,
		notVisited,
		saveReview,
		notAnswered,
		answer,
		markReview,
		totalQuest,
		path,
		isQuizLive,
	} = location.state.data;
	console.log(result, "result");
	const [seconds, setSeconds] = useState(sec);
	const [minutes, setMinutes] = useState(min);
	const [hours, setHours] = useState(hr);
	// const { quizId, courseId } = { quizId: 1, courseId: 2 };
	const navigate = useNavigate();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	useEffect(() => {
		let timer;
		if (mcqDatas.length > 0) {
			timer = setInterval(() => {
				setSeconds((seconds) => 1 + seconds);
				if (seconds === 59) {
					setMinutes((minutes) => minutes + 1);
					setSeconds(0);
				}
				if (minutes === 59) {
					setHours((hours) => hours + 1);
					setMinutes(0);
				}
			}, 1000);
		}

		return () => {
			clearTimeout(timer);
		};
	});

	useEffect(() => {
		const arr = [];

		for (let i = 0; i < totalQuestion; i++) {
			arr.push({
				number: i + 1,
				markAndSave: false,
				markReview: false,
				saveAndReview: false,
			});
		}

		setClickBtn(arr);
	}, [totalQuestion]);

	// const quizId = 137;
	// useEffect(() => {
	//   axios
	//     .post(
	//       baseUrl() + '/df/getMcqPragByQuizId',
	//       {
	//         quizId: quizId,
	//       },
	//       {
	//         headers: {
	//           'Acces-Control-Allow-Origin': '*',
	//           Client_ID: 'MVOZ7rblFHsvdzk25vsQpQ==',
	//           Authorization: `${Cookies.get('token')}`,
	//         },
	//       },
	//     )
	//     .then((response) => {
	//       if (response.status === 200) {
	//         console.log('mcq Data set 🚀 DONE')
	//         setMcqDatas(response.data.Data)
	//       }
	//     })
	// }, [quizId])

	// 👇👇 this Effect will set the question number for every Question
	// useEffect(() => {
	//   let questionNumber = 0
	//   const mcqDataUpate = mcqDatas.map((questionSet, i) => {
	//     const updateQuestion = questionSet.quesmasters.map((mcqQuestion) => {
	//       questionNumber++
	//       const option = mcqQuestion.optionBeans.map((option) => {
	//         return { ...option, selected: 0 }
	//       })
	//       return {
	//         ...mcqQuestion,
	//         questionNumber: questionNumber,
	//         optionBeans: option,
	//       }
	//     })

	//     const updateParagraphQuestion = questionSet.paragraphQuestions.map(
	//       (paragraphQuestion) => {
	//         const updateParagraph = paragraphQuestion.pgQuesmasters.map(
	//           (paragraph) => {
	//             questionNumber++
	//             const option = paragraph.optionBeans.map((option) => {
	//               return { ...option, selected: 0 }
	//             })
	//             return {
	//               ...paragraph,
	//               questionNumber: questionNumber,
	//               optionBeans: option,
	//             }
	//           },
	//         )
	//         return { ...paragraphQuestion, pgQuesmasters: updateParagraph }
	//       },
	//     )
	//     return {
	//       ...questionSet,
	//       quesmasters: updateQuestion,
	//       paragraphQuestions: updateParagraphQuestion,
	//     }
	//   })

	//   // console.log("updated mcqDataUpate with Question Number 👍🏼", mcqDataUpate);
	//   setAllQuestion(mcqDataUpate)
	//   setTotalQuestion(questionNumber)
	// }, [mcqDatas])

	const handleNext = () => {
		if (currentQuestion < totalQuestion) {
			setCurrentQuestion((currentQuestion) => currentQuestion + 1);
			return;
		}
		setCurrentQuestion(totalQuestion);
	};

	const handlePrevious = () => {
		if (currentQuestion > 1) {
			setCurrentQuestion((currentQuestion) => currentQuestion - 1);
			return;
		}
		setCurrentQuestion(1);
	};

	const submitQuiz = (e) => {
		if (ispdfTest) {
			axios
				.post(baseUrl() + "/submitPdfQuiz", pdfRequestData, {
					headers: {
						"Acces-Control-Allow-Origin": "*",
						Client_ID: "MVOZ7rblFHsvdzk25vsQpQ==",
						Authorization: `${Cookies.get("token")}`,
					},
				})
				.then((response) => {
					console.log(response, "response");
					if (response.status === 200) {
						console.log("-------location-------", quizId, courseId);
						navigate("/SubmitExam", {
							state: {
								data: {
									pdfresult: response.data.Data,
									notVisited:
										Number(totalQuest) -
										Number(answer) +
										Number(saveReview),
									visited:
										Number(answer) + Number(saveReview),
									saveReview: saveReview,
									notAnswered: notAnswered,
									answer: answer,
									markReview: markReview,
									totalQuest: totalQuest,
									correctQues: response.data.Data.correctQues,
									wrongQues: response.data.Data.wrongQues,
									isQuizLive: isQuizLive,
									marksObtained:
										response.data.Data.marksObtained,
								},
								name: name,
								notVisited: notVisited,
								path: path,
								quizId: quizId,
								courseId: courseId,
							},
						});
					}
				});
			localStorage.setItem("pdffinalData", []);
			localStorage.setItem("pdfanswer", 0);
			localStorage.setItem("pdfreview", 0);
			localStorage.setItem("pdfmarkForReview", 0);
			localStorage.setItem("pdftotalQuestion", 0);
			localStorage.setItem("pdfclickbtn", []);

			localStorage.setItem("pdftimer", null);
		} else {
			axios
				.post(
					baseUrl() + "/df/saveMcqPragraphQuizData",
					{
						quizId: quizId,
						courseId: courseId,
						userId: Cookies.get("userId"),
						quizSectionWises: quizSectionWises,
						timeTaken: timeTaken,
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
					console.log(response, "response");
					if (response.status === 200) {
						+navigate("/SubmitExam", {
							state: {
								data: response.data.Data,
								name: name,
								notVisited: notVisited,
								path: path,
								quizId: quizId,
								courseId: courseId,
								isQuizLive: isQuizLive,
							},
						});
					}
				});
			localStorage.setItem("allquestions", []);
			localStorage.setItem("Answer", 0);
			localStorage.setItem("NotVisited", 0);
			localStorage.setItem("questions", []);
			localStorage.setItem("markReview", 0);
			localStorage.setItem("SaveReview", 0);
			localStorage.setItem("NotAnswered", 0);
			localStorage.setItem("finalsubmit", false);
			localStorage.setItem("currentQuestion", 1);
			localStorage.setItem("timer", null);
		}
	};

	return (
		<>
			{" "}
			<div
				className='w-100'
				style={{
					backgroundColor: "#F18C18",
					marginTop: "100px",
					height: "60px",
					fontFamily: "Poppins",
				}}
			>
				<p
					className='p-3 '
					style={{
						color: "white",
						fontSize: "20px",
						fontWeight: "600",
						lineHeight: "22px",
						fontFamily: "Poppins",
					}}
				>
					CUET(UG) - {name}
				</p>
			</div>
			<section
				className='container-fluid  position-relative'
				style={{ height: "100vh" }}
			>
				<div className='row'>
					<div className=' col-sm-12 col-lg-12 col-md-12s'>
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
										Brahmaputra Exam Success Support Team
										(besst)
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

							<div
								className='collapse navbar-collapse'
								id='navbarNav'
							>
								<div className='w-100 d-flex justify-content-md-end mt-2'>
									<div
										style={{
											border: "1px solid black",
											display: "flex",
											justifyContent: "center",
											height: "70px",
											width: "80px",
											alignItems: "center",
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
												{firstName}
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
												{hours < 10
													? "0" + hours
													: hours}
												:
												{minutes < 10
													? "0" + minutes
													: minutes}
												:
												{seconds < 10
													? "0" + seconds
													: seconds}
											</span>
										</h6>
									</div>
								</div>
							</div>
						</nav>{" "}
					</div>
					<div
						className='row no-gutters'
						style={{
							marginTop: "10px",
							height: "80%",
							position: "relative",
						}}
					>
						<img src={Logo} className='water-mark-quiz'></img>

						<h3 className='text-center text-black mt-3'>
							Quiz Summary
						</h3>
						<div style={{ overflowX: "auto  ", zIndex: 999 }}>
							<table className='summury-table mt-3'>
								<tr className='tableHeader'>
									<th>Session Name</th>
									<th>No.of Questions</th>
									<th>Answered</th>
									<th>Not Answered</th>
									<th>Marked for Review</th>

									<th>
										Answered and marked for review (will be
										considered for evaluation)
									</th>
									{ispdfTest ? <></> : <th>Not visited</th>}
								</tr>
								<tr className='tableHeader'>
									<td>{topicName}</td>
									<td>{totalQuest}</td>
									<td>{answer}</td>
									<td>{notAnswered}</td>
									<td>{markReview}</td>
									<td>{saveReview}</td>
									{ispdfTest ? <></> : <td>{notVisited}</td>}
								</tr>
							</table>
						</div>
						<div className='d-flex justify-content-center mt-4'>
							<div
								className='text-center'
								style={{ zIndex: 999 }}
							>
								<p
									style={{
										fontSize: "16px",
										fontWeight: "400",
										lineHeight: "25px",
									}}
								>
									Are you sure you want to submit for final
									marking? No changes will be allowed after
									submission.
								</p>
								<button
									className='btn btn-secondary'
									style={{
										padding: "0px 48px",

										width: "123px",
										height: "40px",
										color: "black",

										background: "#FFFFFF",
										border: "1px solid #4F4F4F",
										borderRadius: "4px",
									}}
									onClick={submitQuiz}
								>
									yes
								</button>
								<button
									onClick={() => {
										navigate(-1);
										localStorage.setItem(
											"timer",
											JSON.stringify({
												hour: hours,
												minute: minutes,
												second: seconds,
											})
										);
									}}
									className='btn btn-secondary ms-4'
									style={{
										padding: "0px 48px",

										width: "123px",
										height: "40px",
										color: "black",

										background: "#FFFFFF",
										border: "1px solid #4F4F4F",
										borderRadius: "4px",
									}}
								>
									No
								</button>
							</div>
						</div>
					</div>
				</div>
			</section>
			<div style={{ postion: "fixed" }}>
				<footer className='footer mt-5 py-5 main-color-bg border-top fw-light'>
					<div className='footer-links-container flex-sm-row flex-column mb-5 white'>
						<a
							href='https://besst.in/registration/documents/Terms%20and%20Conditiion%20BESST.pdf'
							target='_blank'
						>
							Terms And Conditions
						</a>
						<span className='white d-sm-inline d-none'>|</span>
						<a
							href='https://besst.in/registration/documents/PRIVACY%20POLICY%20BESST.pdf'
							target='_blank'
						>
							Privacy Policy
						</a>

						<span className='white d-sm-inline d-none'>|</span>
						<a href='#' target='_blank'>
							Data Sharing Policy
						</a>
					</div>
					<div className='container text-center'>
						<span className='white'>
							Copyright &#169; 2023 BESST(Brahmaputra Exam Success
							Support Team Private Limited ){" "}
						</span>
					</div>
				</footer>
			</div>
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
				console.log("filterPgQuestion 🚴🏼‍♀️", filterPg);
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
					<input
						type='radio'
						className='form-check-input'
						id={answer.optionId}
						aria-checked={answer.selected || 0}
						value={answer.optionId}
						name={question.quesId}
					/>
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

							<span>{parse(String(answer.optionValue))}</span>
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
						Support Team Private Limited ){" "}
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
