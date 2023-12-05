import { Link, useLocation } from "react-router-dom";
import Logo from "../../Assets/images/logo.png";
import mark_review from "../../Assets/images/markForReview.png";
import save_markReview from "../../Assets/images/answered_review.png";
import answered from "../../Assets/images/answered.png";
import not_answered from "../../Assets/images/not_answered.png";
import Swal from "sweetalert2";

import not_visited from "../../Assets/images/not_visited.png";

import "./StudentMCQ.css";
import "../../App.css";

import profileHook from "./useProfile";
import {
	BsFillArrowDownCircleFill,
	BsFillArrowUpCircleFill,
} from "react-icons/bs";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import LandingPageFooter from "../../Components/Global/Footers/LandingPageFooter";

export default function ExamTestInstructions() {
	const navigate = useNavigate();
	// const profileData = profileHook();
	const [checked, setchecked] = useState(false);
	const location = useLocation();
	const { courseId, topicId, quizId, name, Name } = location.state;
	console.log(location.state, "location");
	const handleClick = () => {
		if (checked) {
			navigate("/StudentExamTestMcq", {
				state: {
					quizId: quizId,
					courseId: courseId,
					name: name,
					user_Name: Name,
				},
			});
		} else {
			Swal.fire({
				title: "Warning !",
				text: "please accept terms and condition before proceeding",
				icon: "warning",
				confirmButtonColor: "rgb(65,118,187)",
				confirmButtonText: "OK",
			});
		}
	};

	return (
		<>
			<section style={{ position: "relative" }}>
				{/* <div className="light-bg-img"> */}{" "}
				<button
					onClick={() => navigate(-1)}
					type='button'
					className='btn btn-circle  btn-dark ms-2 '
					style={{
						marginTop: "1%",
						// backgroundColor: "red",
						position: "fixed",
						top: "50%",
						left: "0%",
					}}
				>
					{"<"}
				</button>
				{/* <img src={Logo} className="water-mark"></img> */}
				<nav className='d-flex align-items-center navbar-expand-lg shadow-none navbar-light  py-1 px-3 fixed-top white-bg'>
					<Link className='navbar-brand' to='/'>
						<img
							src={Logo}
							alt=''
							width='70'
							height='auto'
							className='d-inline-block align-text-top'
						/>
					</Link>
					<div>
						<div
							style={{
								fontSize: "14px",
								fontWeight: "600",
								lineHeight: "19px",
							}}
						>
							Brahmaputra Exam Success Support Team (besst)
						</div>
						<div
							style={{
								fontSize: "15px",
								fontWeight: "400",
								lineHeight: "22px",
							}}
						>
							Besst Exam Simulator
						</div>
					</div>
				</nav>
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
				<div
					className=' mt-3 '
					style={{ marginLeft: "8%", fontFamily: "poppins" }}
				>
					<h5>Please read the instructions carefully</h5>
					<h6 className='mt-4'>General instructions:</h6>
				</div>
				<div
					className='mt-3 light-bg-img'
					style={{
						width: "70%",
						marginLeft: "10%",
						fontFamily: "poppins",
					}}
				>
					<p style={{ lineHeight: "30px", fontSize: "15px" }}>
						<ul style={{ listStyleType: "decimal" }}>
							<li>Total duration of CUET is</li>
							<li>
								{" "}
								The clock will be set at the server. The
								countdown timer in the top right corner off
								screen will display the remaining time available
								for you to complete the examination. When the
								timer reaches zero, the examination will end by
								itself. You will not be required to end or
								submit your examination.
							</li>
							<li>
								The Question Palette displayed on the right side
								of screen will show the status of each question
								using one of the following symbols
								<ul style={{ listStyleType: "decimal" }}>
									<li>
										{" "}
										<div className='d-flex mt-3'>
											<div className=' '>
												<img
													src={not_visited}
													style={{
														marginLeft: "2px",
													}}
												></img>
											</div>
											You have not visited the question
											yet
										</div>
									</li>
									<li>
										{" "}
										<div className='d-flex mt-2'>
											<div className='  '>
												<img src={not_answered}></img>
											</div>
											You have not answered the question.{" "}
										</div>
									</li>
									<li>
										{" "}
										<div className='d-flex mt-2'>
											<div className=' '>
												<img src={answered}></img>
											</div>
											You have answered the question.
										</div>
									</li>
									<li>
										{" "}
										<div className='d-flex mt-2'>
											<div>
												<img src={mark_review}></img>
											</div>
											You have NOT answered the question,
											but have marked the question for
											review.
										</div>
									</li>
									<li>
										{" "}
										<div className='d-flex mt-2'>
											<div className=' '>
												<img
													src={save_markReview}
												></img>
											</div>
											The question(s) “ Answered and
											Marked for Review” will be
											considered for evaluation.
										</div>
									</li>
								</ul>
							</li>
							<li>
								You can click on the <b>{">"}</b> arrow which
								appears to the left of the question palette to
								collapse the question palette thereby maximizing
								the question window. To view the question
								palette again, you can click on <b>{"<"}</b>{" "}
								which appears on the right side of question
								window.
							</li>
							<li>
								You can click on your “Profile” image on top
								right corner of your screen to change the
								language during the exam for entire question
								paper. On clicking of Profile Image you will get
								a drop-down to change the question content to
								the desired language.
							</li>
							<li>
								{" "}
								You can click on
								<span
									style={{
										borderRadius: "60%",
										backgroundColor: "#3A77FF",
										height: "fit-content",
										width: "fit-content",
										padding: "3px",
									}}
								>
									<FaArrowDown size={18} color={"white"} />
								</span>
								to navigate to the bottom and{" "}
								<span
									style={{
										borderRadius: "60%",
										backgroundColor: "#3A77FF",
										height: "fit-content",
										width: "fit-content",
										padding: "3px",
									}}
								>
									<FaArrowUp size={18} color={"white"} />
								</span>
								to navigate to top of the question are, without
								scrolling
							</li>
						</ul>
						<h5>Navigating to a Question: </h5>
						<ol style={{}} start='7'>
							<li>To answer a question, do the following:</li>
							<ul style={{ listStyleType: "lower-alpha" }}>
								<li>
									{" "}
									Click on the question number in the Question
									Palette at the right of your screen to go to
									that numbered question directly. Note that
									using this option does NOT save your answer
									to the current question.
								</li>
								<li>
									Click on Save & Next to save your answer for
									the current question and then go to the next
									question.
								</li>
								<li>
									Click on “Mark for Review & Next” to save
									your answer for the current question, mark
									it for review . and then go to the next
									question.
								</li>
							</ul>
						</ol>
						<h5>Answering a Question: </h5>
						<ol start='8'>
							<li>
								Procedure for answering a multiple choice type
								question:
							</li>
							<ul style={{ listStyleType: "lower-alpha" }}>
								<li>
									To select your answer, click on the button
									of one of the options.
								</li>
								<li>
									To deselect your chosen answer, click on the
									button of the chosen option again or click
									on the Clear Response button.
								</li>
								<li>
									{" "}
									To change your chosen answer, click on the
									button of another option.
								</li>
								<li>
									{" "}
									To save your answer, you MUST click on the
									Save & Next button.
								</li>
								<li>
									{" "}
									To mark the question for review, click on
									the Mark for Review& Next button.
								</li>
								<li>
									{" "}
									To change your answer to a question that has
									already been answered , first select that
									question for answering and then follow the
									procedure for answering that type of
									question.
								</li>
							</ul>
						</ol>
						<h5>Navigating through selection:</h5>
						<ol start='9'>
							<li>
								Sections in this paper are displayed on the top
								bar of the screen. Questions in a section can be
								viewed by click on the section name. The section
								you are currently viewing is highlighted.
							</li>
							<li>
								{" "}
								After click the Save & Next button on the last
								question for a section, you will automatically
								be taken to the first question of the next
								section.
							</li>
							<li>
								{" "}
								You can shuffle between sections and questions
								anything during the examination as per your
								convenience only during the time stipulated.
							</li>
							<li>
								{" "}
								Candidate can view the corresponding section
								summery as part of the legend that appears in
								every section above the question palette.
							</li>
						</ol>
					</p>

					<div className='mt-5'>
						<hr style={{ height: "0px" }} />

						<p
							style={{
								lineHeight: "30px",
								fontSize: "15px",
								fontWeight: "600",
								color: "red",
							}}
						>
							Please note all questions will appear in your
							default language. This language can be changed for a
							particular question later on.
						</p>
						<hr style={{ height: "0px" }} />
						<div className='form-check '>
							<input
								style={{ color: "red" }}
								className='form-check-input'
								type='checkbox'
								value=''
								id='flexCheckDefault'
								onChange={() => setchecked(true)}
							/>
							<p
								style={{
									lineHeight: "30px",
									fontSize: "15px",
									fontWeight: "600",
								}}
							>
								I have read and understood the instructions. All
								computer hardware allotted to me are in proper
								working condition. I declare that I am not in
								possession of/ not wearing /not carrying any
								prohibited gadget like mobile phone, Bluetooth,
								devices etc./ anyprohibited material with me
								into the Examination Hall. I agree that in case
								of not adhering to the instructions, I shall be
								liable to be debarred from this Test and/or to
								disciplinary action, which may include ban from
								future Tests/Examinations
							</p>
						</div>
					</div>
					<div
						style={{ display: "flex", justifyContent: "start" }}
						className='mt-4'
					></div>
				</div>
				<div className='mt-5 d-flex justify-content-center mb-5'>
					<button
						type='button'
						className='btn btn-success align-center'
						style={{ width: "250px", color: "white", zIndex: 999 }}
						onClick={() => handleClick()}
					>
						Click here to Proceed
					</button>
				</div>
				<LandingPageFooter />
				{/* </div> */}
			</section>
		</>
	);
}
