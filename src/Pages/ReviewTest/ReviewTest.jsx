import React, { useState, useEffect } from "react";
// eslint-disable-next-line
import { nextPrev, refer, QuizLoad } from "../../Components/quizWorking";
import Cookies from "js-cookie";
import axios from "axios";
import "../../Pages/StudentMCQ/StudentMCQ.css";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

import { useLocation, useNavigate } from "react-router-dom";
import parse from "html-react-parser";
import useRemoveModal from "../../Components/useRemoveModal";
import baseUrl from "../../Components/baseUrl";
import Header from "../../Components/Global/Navigation/Header";
import { studDashboard } from "../../RouteConstants";
import OneLinerFooter from "../../Components/Global/Footers/OneLinerFooter";
import FooterButtons from "../../Components/Mcq/FooterButtons";
import QuestionExplanation from "./QuestionExplanation";
function ReviewTest() {
	const location = useLocation();
	const navigate = useNavigate();
	const { quizId } = location.state;
	const [profileData, setProfileData] = useState([]);
	const [quizResult, setQuizResult] = useState([]);
	const [allQuestion, setAllQuestion] = useState([]);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	useRemoveModal();

	const profileDataApi = () => {
		document.body.style.overflow = "visible";
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
	};
	const previewApi = () => {
		axios
			.post(
				baseUrl() + "/df/PreviewPrgQuiz",
				{
					userId: Cookies.get("userId"),
					quizResultId: quizId,
				},
				{
					headers: {
						"Access-Control-Allow-Origin": "*",
						Client_ID: "MVOZ7rblFHsvdzk25vsQpQ==",
						Authorization: `${Cookies.get("token")}`,
					},
				}
			)
			.then((response) => {
				if (response.status === 200) {
					setQuizResult(response.data.Data);
					QuizLoad();
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};

	useEffect(() => {
		profileDataApi();
		previewApi();
	}, []);

	useEffect(() => {
		let questionNumber = 0;
		const mcqDataUpate = quizResult.map((questionSet, i) => {
			const updateQuestion = questionSet.questionsBeans.map(
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
			// return [...updateQuestion, ...updateParagraphQuestion];
			return {
				...questionSet,
				questionsBeans: updateQuestion,
				paragraphQuestions: updateParagraphQuestion,
			};
		});
		setAllQuestion(mcqDataUpate);
		// setMcqDatas(mcqDataUpate);
	}, [quizResult]);

	const handleClose = () => {
		navigate(studDashboard);
	};

	return (
		<>
			<Header profileData={profileData} />
			<main className='main-container'>
				<article className='test-container'>
					<form id='regForm' className='regForm'>
						{quizResult.length > 0 &&
							allQuestion.map((item, index) => (
								<div key={index} className='px-3 tab'>
									<div>
										<h2>
											{item.basicDetailsBean.quizTitle}
										</h2>
										{item.questionsBeans.map(
											(items, keys) => (
												<>
													<div
														style={{
															position:
																"relative",
														}}
														className='my-4'
														key={keys}
													>
														<div className='light-bg-img'>
															<label
																className={
																	"b" +
																	keys +
																	" " +
																	"d-flex justify-content-bwtween align-items-start"
																}
															>
																Q{keys + 1}
																<span className='mr-2 ms-2'>
																	{parse(
																		String(
																			items.question
																		)
																	)}
																</span>
																{items.correctFlag ===
																1 ? (
																	<span
																		style={{
																			border: "1px solid green",
																			padding:
																				"3px",
																			color: "green",
																			borderRadius:
																				"5px",
																		}}
																	>
																		CORRECT
																	</span>
																) : (
																	<span
																		style={{
																			border: "1px solid red",
																			padding:
																				"3px",
																			color: "red",
																			borderRadius:
																				"5px",
																		}}
																	>
																		WRONG
																	</span>
																)}
															</label>
															{items.optionBeans.map(
																(
																	answer,
																	key
																) => (
																	<div
																		className='p-2 mt-2'
																		key={
																			key
																		}
																		style={{
																			borderRadius:
																				"4px",
																			border:
																				answer.isCorrect ===
																				1
																					? // 	1 &&
																					  // answer.selected ===
																					  // 	1
																					  "1px solid #008B21"
																					: answer.selected ===
																							1 &&
																					  answer.isCorrect ===
																							0
																					? "1px solid #E40000"
																					: answer.isCorrect ===
																					  1
																					? ""
																					: "",
																			backgroundColor:
																				answer.isCorrect ===
																					1 &&
																				answer.selected ===
																					1
																					? "#F1FFF4"
																					: answer.selected ===
																							1 &&
																					  answer.isCorrect ===
																							0
																					? "#FFF6F5"
																					: answer.isCorrect ===
																					  1
																					? "#F5F5F5"
																					: "",
																		}}
																	>
																		<div
																			className='form-check '
																			style={{
																				paddingLeft:
																					"40px",
																				paddingRight:
																					"10px",
																			}}
																		>
																			<input
																				type='radio'
																				className='form-check-input'
																				id='check1'
																				name={
																					answer.quesId
																				}
																				value={
																					answer.optionValue
																				}
																				defaultChecked={
																					answer.selected ===
																					0
																						? false
																						: true
																				}
																				disabled={
																					true
																				}
																			/>
																			<div className='d-flex justify-content-between align-items-center'>
																				<span className='review-option'>
																					{parse(
																						String(
																							answer.optionValue
																						)
																					)}
																				</span>
																				<label className='form-check-label'>
																					{answer.isCorrect ===
																						1 && (
																						<i
																							className='fa fa-check-circle fa-lg'
																							style={{
																								color: "green",
																							}}
																						></i>
																					)}
																					{answer.selected ===
																						1 &&
																						answer.isCorrect ===
																							0 && (
																							<i
																								className='fa fa-times-circle fa-lg'
																								style={{
																									color: "red",
																								}}
																							></i>
																						)}
																				</label>
																			</div>
																		</div>
																	</div>
																)
															)}
														</div>
														{/* explanation component */}
														<QuestionExplanation
															items={items}
														/>
													</div>
												</>
											)
										)}

										{item.paragraphQuestions.map(
											(paragraphSet, key) => (
												<div key={key}>
													<h2>
														{paragraphSet.topicName
															? paragraphSet.topicName
															: ""}
													</h2>
													<div
														style={{
															fontSize: "x-large",
															color: "black",
														}}
													>
														{
															paragraphSet.specialInstruction
														}
													</div>

													<span
														className={`questions-mcq-mobile`}
													>
														{parse(
															String(
																paragraphSet.paragraph_desc
															)
														)}
													</span>
													{paragraphSet.pgQuesmasters.map(
														(
															paraQuestionItem,
															keys
														) => (
															<>
																<label
																	className={
																		"para" +
																		keys +
																		key
																	}
																>
																	Q
																	{
																		paraQuestionItem.questionNumber
																	}
																	&nbsp;&nbsp;.
																	<span>
																		{parse(
																			String(
																				paraQuestionItem.question
																			)
																		)}
																	</span>
																	&nbsp;
																	{paraQuestionItem.correctFlag ===
																	1 ? (
																		<i
																			className='fa fa-check-circle'
																			style={{
																				color: "green",
																				fontSize:
																					"3rem",
																			}}
																		></i>
																	) : (
																		<i
																			className='fa fa-times-circle'
																			style={{
																				color: "red",
																			}}
																		></i>
																	)}
																</label>
																<div>
																	{paraQuestionItem.optionBeans.map(
																		(
																			answer,
																			key
																		) => (
																			<div
																				key={
																					key
																				}
																			>
																				<div className='form-check'>
																					<input
																						type='radio'
																						className='form-check-input'
																						id='check1'
																						name={
																							answer.quesId
																						}
																						value={
																							answer.optionValue
																						}
																						defaultChecked={
																							answer.selected ===
																							0
																								? false
																								: true
																						}
																						disabled={
																							true
																						}
																					/>

																					<div>
																						<span
																							dangerouslySetInnerHTML={{
																								__html: answer.optionValue,
																							}}
																						></span>
																						&nbsp;
																						<label className='form-check-label'>
																							{answer.isCorrect ===
																								1 && (
																								<i
																									className='fa fa-check-circle'
																									style={{
																										color: "green",
																									}}
																								></i>
																							)}
																						</label>
																					</div>
																				</div>
																			</div>
																		)
																	)}
																	<br />
																	<p>
																		<a
																			className='p-2'
																			data-toggle='collapse'
																			href={`#collapseExample/${paraQuestionItem.quesId}`}
																			role='button'
																			aria-expanded='false'
																			aria-controls={`collapseExample/${paraQuestionItem.quesId}`}
																		>
																			Explanation
																		</a>
																	</p>
																	<div
																		className='collapse'
																		id={`#collapseAnswer/${paraQuestionItem.quesId}`}
																	>
																		<div className='card card-body'></div>
																	</div>
																	<div
																		className='collapse'
																		id={`collapseExample/${paraQuestionItem.quesId}`}
																	>
																		<div className='card card-body explaination-card'>
																			{paraQuestionItem.explanation !==
																			null
																				? paraQuestionItem.explanation
																				: "No Explanation"}
																		</div>
																	</div>

																	<br />
																</div>
															</>
														)
													)}
												</div>
											)
										)}
									</div>
								</div>
							))}
						<FooterButtons
							handleClickBtn1={handleClose}
							handleClickBtn2={handleClose}
							button1Text={"Back"}
							button2Text={"close"}
						/>
					</form>
				</article>
				<article className='test-status-container'>
					<section className='status-details-container'>
						<div className='status-line'>
							<p className='m-0'>Subject</p>
							<div className='status-value'>
								{quizResult.length > 0 ? (
									<span
										className='status-value'
										title={
											quizResult[0].basicDetailsBean
												.subject.length > 10 &&
											quizResult[0].basicDetailsBean
												.subject
										}
									>
										:{" "}
										{quizResult[0].basicDetailsBean.subject
											.length > 10
											? `${quizResult[0].basicDetailsBean.subject.slice(
													0,
													10
											  )}...`
											: quizResult[0].basicDetailsBean
													.subject}
									</span>
								) : (
									""
								)}
							</div>
						</div>
						<div className='status-line'>
							<p className='m-0'>Quiz</p>
							<div className='status-value'>
								:{" "}
								{quizResult.length > 0
									? quizResult[0].basicDetailsBean.quizCode
									: ""}
							</div>
						</div>
						<div className='status-line'>
							<p className='m-0'>Time Format</p>
							<div className='status-value'>:&#160;hh:mm:ss</div>
						</div>
						<div className='status-line'>
							<p className='m-0'>Given Time </p>
							<div className='status-value'>
								{" "}
								:&#160;
								<span>
									{quizResult.length > 0
										? (
												"0" +
												Math.floor(
													quizResult[0]
														.basicDetailsBean
														.totalTime / 60
												)
										  ).slice(-2)
										: ""}
									:
								</span>
								<span>
									{quizResult.length > 0
										? (
												"0" +
												Math.floor(
													quizResult[0]
														.basicDetailsBean
														.totalTime % 60
												)
										  ).slice(-2)
										: ""}
									:
								</span>
								<span>
									{quizResult.length > 0
										? (
												"0" +
												Math.floor(
													(quizResult[0]
														.basicDetailsBean
														.totalTime %
														60) *
														60 -
														Math.floor(
															quizResult[0]
																.basicDetailsBean
																.totalTime % 60
														) *
															60
												)
										  ).slice(-2)
										: ""}
								</span>
							</div>
						</div>
						<div className='status-line'>
							<p className='m-0'>Taken Time</p>
							<div className='status-value'>
								{" "}
								:&#160;
								{quizResult.length > 0
									? quizResult[0].timeTaken
									: ""}
							</div>
						</div>
						<div className='status-line'>
							<p className='m-0'>Marks Obtd</p>
							<div className='status-value'>
								{" "}
								:&#160;
								{quizResult.length > 0
									? quizResult[0].marksObtained
									: ""}
							</div>
						</div>
					</section>
					<section>
						{quizResult.length > 0
							? allQuestion.map((items, index) => (
									<>
										<div
											className='question-btn-container'
											id='progress'
											key={index}
										>
											{items.questionsBeans.map(
												(answer, key) => (
													<div id='track1' key={key}>
														{answer.markForReviewFlag ==
															true && (
															<div
																className='flaged marked'
																aria-label={
																	answer.quesId
																}
															></div>
														)}
														<button
															className={
																answer.correctFlag ==
																null
																	? "btn btn-que btn-null"
																	: "btn btn-que"
															}
															style={
																answer.correctFlag ==
																1
																	? {
																			background:
																				"green",
																			color: "black",
																			fontWeight:
																				"500",
																	  }
																	: {
																			background:
																				"red",
																			color: "black",
																			fontWeight:
																				"500",
																	  }
															}
															onClick={() => {
																// refer(index);
																const questionStart =
																	document.querySelectorAll(
																		".b" +
																			key
																	)[index];
																const headerOffset = 180;
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
											)}

											{items.paragraphQuestions.map(
												(question, i) => (
													<>
														{question.pgQuesmasters.map(
															(answer, key) => (
																<div
																	id='track1'
																	key={key}
																>
																	{answer.markForReviewFlag ==
																		true && (
																		<div
																			className='flaged marked'
																			aria-label={
																				answer.quesId
																			}
																		></div>
																	)}
																	<button
																		className={
																			answer.correctFlag ==
																			null
																				? "btn btn-que btn-null"
																				: "btn btn-que"
																		}
																		style={
																			answer.correctFlag ==
																			1
																				? {
																						background:
																							"green",
																				  }
																				: {
																						background:
																							"red",
																				  }
																		}
																		aria-label={
																			answer.quesId
																		}
																		onClick={() => {
																			// refer(index);
																			const questionStart =
																				document.querySelectorAll(
																					".para" +
																						key +
																						i
																				)[
																					index
																				];
																			const headerOffset = 180;
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
														)}
													</>
												)
											)}
										</div>
										{/* will be visible in mobile screen */}
										<div
											className='dropdown-btn'
											onClick={() =>
												setIsDropdownOpen(
													!isDropdownOpen
												)
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
													<p className='m-0'>
														Subject
													</p>
													<div className='status-value'>
														:{" "}
														{quizResult.length > 0
															? quizResult[0]
																	.basicDetailsBean
																	.subject
															: ""}
													</div>
												</div>
												<div className='status-line'>
													<p className='m-0'>Quiz</p>
													<div className='status-value'>
														:{" "}
														{quizResult.length > 0
															? quizResult[0]
																	.basicDetailsBean
																	.quizCode
															: ""}
													</div>
												</div>
												<div className='status-line'>
													<p className='m-0'>
														Time Format
													</p>
													<div className='status-value'>
														:&#160;hh:mm:ss
													</div>
												</div>
												<div className='status-line'>
													<p className='m-0'>
														Given Time{" "}
													</p>
													<div className='status-value'>
														{" "}
														:&#160;
														<span>
															{quizResult.length >
															0
																? (
																		"0" +
																		Math.floor(
																			quizResult[0]
																				.basicDetailsBean
																				.totalTime /
																				60
																		)
																  ).slice(-2)
																: ""}
															:
														</span>
														<span>
															{quizResult.length >
															0
																? (
																		"0" +
																		Math.floor(
																			quizResult[0]
																				.basicDetailsBean
																				.totalTime %
																				60
																		)
																  ).slice(-2)
																: ""}
															:
														</span>
														<span>
															{quizResult.length >
															0
																? (
																		"0" +
																		Math.floor(
																			(quizResult[0]
																				.basicDetailsBean
																				.totalTime %
																				60) *
																				60 -
																				Math.floor(
																					quizResult[0]
																						.basicDetailsBean
																						.totalTime %
																						60
																				) *
																					60
																		)
																  ).slice(-2)
																: ""}
														</span>
													</div>
												</div>
												<div className='status-line'>
													<p className='m-0'>
														Taken Time
													</p>
													<div className='status-value'>
														{" "}
														:&#160;
														{quizResult.length > 0
															? quizResult[0]
																	.timeTaken
															: ""}
													</div>
												</div>
												<div className='status-line'>
													<p className='m-0'>
														Marks Obtd
													</p>
													<div className='status-value'>
														{" "}
														:&#160;
														{quizResult.length > 0
															? quizResult[0]
																	.marksObtained
															: ""}
													</div>
												</div>
											</section>
										)}
									</>
							  ))
							: ""}
					</section>
				</article>
			</main>
			<OneLinerFooter />
		</>
	);
}

export default ReviewTest;

// commented because don't know why there is a element with style of display none which may not be made visible in application
// 					<div
// 						href='#'
// 						className='float3'
// 						style={{ display: "none" }}
// 					>
// 						<label>Quiz Code : &nbsp;</label>{" "}
// 						<label className='fw-bold'>
// 							{quizResult.length > 0 ? quizResult[0].quizId : ""}
// 						</label>
// 						<br />
// 						<label>Complexity : &nbsp;</label>{" "}
// 						<label className='fw-bold'>Medium</label>
// 						<br />
// 						<label>Nagetive Marks : &nbsp;</label>{" "}
// 						<label className='fw-bold'>
// 							{quizResult.length > 0
// 								? quizResult[0].negativeMarks
// 								: ""}
// 						</label>
// 					</div>
