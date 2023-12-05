/* eslint-disable */
import React, { useState, useEffect } from "react";
import useRemoveModal from "../../Components/useRemoveModal";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import Logo from "../../Assets/images/logo.png";

import baseUrl from "../../Components/baseUrl";
import { AiFillLock, AiFillUnlock } from "react-icons/ai";
import "../ViewTest/ViewTest.css";
import { TiTickOutline } from "react-icons/ti";
import { FaCrown } from "react-icons/fa";
import Header from "../../Components/Global/Navigation/Header";
import { subscriptions } from "../../RouteConstants";

const ViewAllExamTest = (props) => {
	const location = useLocation();
	const { couresData, quiz_name } = location.state;
	const [profileData, setProfileData] = useState([]);
	const [chunk, setChunk] = useState(10);

	const [filter, setfilter] = useState(false);
	const [page, setPage] = useState(0);

	const [testData, setTestData] = useState(couresData);
	const [tableData, setTableData] = useState([]);
	const [quiz_id, setquizid] = useState("");
	const [course_id, setcourseid] = useState("");
	const [quizname, setName] = useState("");
	const [user_name, setUserName] = useState("");
	const [email, setEmail] = useState("");
	const [mobile, setMobile] = useState("");

	const [isSeo, setIsSeo] = useState(false);
	const handleStartTest = (item) => {
		setquizid(item.quizId);
		setcourseid(item.courseId);
		setName(item.title);
		setIsSeo(true);
		document.getElementById("openquiz").click();
	};
	const onSubmit = (e) => {
		e.preventDefault();
		navigate("/StudentExamTestMcq", {
			state: {
				quizId: quiz_id,
				courseId: course_id,
				name: quizname,
				user_Name: user_name,
				email: email,
				mobile: mobile,
				seo: isSeo,
			},
		});
		document.getElementById("close_button").click();
	};
	function sliceIntoChunks(arr, chunkSize) {
		const res = [];
		for (let i = 0; i < arr.length; i += chunkSize) {
			const chunk = arr.slice(i, i + chunkSize);
			res.push(chunk);
		}
		setTableData(res);
		return res;
	}
	useEffect(() => {
		if (testData.length) {
			sliceIntoChunks(testData, chunk);
		}
	}, [testData]);
	const handleClick = (i) => {
		setPage(i);
	};
	useEffect(() => {
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
	}, []);

	const getpage = (index) => {
		console.log(tableData[index].length, chunk, "/////////////////////");
		if (chunk !== tableData[index].length) {
			return tableData[index].length;
		}
		return chunk;
	};
	useRemoveModal();
	const navigate = useNavigate();

	return (
		<>
			{/* <Header profileData={profileData} /> */}
			<button
				id='openquiz'
				data-bs-toggle='modal'
				data-bs-target='#quizModal'
				style={{ display: "none" }}
			></button>
			<div
				className='modal fade'
				id='quizModal'
				tabIndex='-1'
				aria-labelledby='loginModalLabel'
				aria-hidden='true'
			>
				<div className='modal-dialog'>
					<div className='modal-content'>
						<div
							className='modal-header text-center'
							style={{ borderBottom: "none" }}
						>
							<button
								id='close_button'
								type='button'
								className='btn-close'
								data-bs-dismiss='modal'
								aria-label='Close'
							></button>
						</div>
						<h5
							className='modal-title text-center'
							id='QuizModalLabel'
						>
							CUET Free Mock Test - <br />{" "}
							<p style={{ color: "purple" }}>{quiz_name}</p>
						</h5>
						<div className=''>
							<form
								style={{ border: "none" }}
								onSubmit={(e) => onSubmit(e)}
							>
								<div className='input-group mb-3'>
									<input
										style={{
											padding: "14px",
											backgroundColor: "#FCFCFC",
											fontWaight: 400,
											fontSize: "16px",
											lineHeight: "22px",
										}}
										id='name'
										type='text'
										className='form-control'
										placeholder='Name'
										onChange={(e) =>
											setUserName(e.target.value)
										}
										required
									/>
								</div>

								<div className='input-group mb-3'>
									<input
										style={{
											padding: "14px",
											backgroundColor: "#FCFCFC",
											fontWaight: 400,
											fontSize: "16px",
											lineHeight: "22px",
										}}
										id='email'
										type='email'
										className='form-control'
										placeholder='Email'
										onChange={(e) =>
											setEmail(e.target.value)
										}
									/>
								</div>
								<div className='input-group mb-3'>
									<input
										style={{
											padding: "14px",
											backgroundColor: "#FCFCFC",
											fontWaight: 400,
											fontSize: "16px",
											lineHeight: "22px",
										}}
										id='mobile'
										type='number'
										className='form-control'
										placeholder='Mobile No'
										onChange={(e) =>
											setMobile(e.target.value)
										}
									/>
								</div>

								<button
									type='submit'
									className='btn main-btn '
									style={{ width: "100%" }}
									// data-mdb-dismiss="modal"
									//  data-bs-dismiss="modal"
								>
									{/* {loading ? 'Please Wait..' : 'CONFIRM'} */}
									CONFIRM
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
			<img
				style={{
					marginTop: "5%",
					height: "80%",
					position: "fixed",
					zIndex: -1,
				}}
				src={Logo}
				className='water-mark-quiz'
			></img>
			<button
				onClick={() => navigate(-1)}
				type='button'
				className='btn btn-circle  btn-dark ms-5 '
				style={{
					marginTop: "1%",
					// backgroundColor: "red",
					position: "fixed",
					top: "50%",
					left: "0%",
					zIndex: 999,
				}}
			>
				{"<"}
			</button>
			<div className='container' style={{ maxWidth: "80%" }}>
				<br />
				<br />
				<br />
				<br />

				<h2 className='text-left'>
					{name === "Test" ? "Mock Test" : "Practice Test"}
				</h2>
				<div className='row d-flex'>
					{filter ? (
						<div className='col-md-4 mt-3 '>
							<ul className='list-group' style={{}}>
								<li
									className='list-group-item'
									style={{ backgroundColor: "#FAFAFA" }}
								>
									Filter By
								</li>

								{filterData.map((item, index) => (
									<li
										className={` rounded-0 list-group-item bg-red d-flex justify-content-between align-items-center ${
											page == index ? "" : ""
										}`}
										onClick={() => handleClick(index)}
									>
										<div> {item.name}</div>
										<div
											className='d-flex justify-content-center align-items-center '
											style={{
												width: "24px",
												height: "24px",
												background: " #E0E0E0",
												borderRadius: "4px",
											}}
										>
											{" "}
											{item.count}
										</div>
									</li>
								))}
							</ul>
						</div>
					) : (
						<>
							{" "}
							{/* <div className="col-md-4 mt-3 ">
                {tableData.map((data, index) => (
                  <ul className="list-group text-center" style={{}}>
                    <li
                      style={{ cursor: "pointer" }}
                      className={` rounded-0 list-group-item bg-red  ${
                        page == index ? "active" : ""
                      }`}
                      onClick={() => handleClick(index)}
                    >
                      {data[index]?.title.split("#")[0]}
                      {index * chunk + 1} - {index * chunk + getpage(index)}{" "}
                    </li>
                  </ul>
                ))}
              </div> */}
						</>
					)}
					<div className='col-md-8 '>
						{tableData.length !== 0 ? (
							tableData[page].map((item, i) => (
								<div key={i}>
									<div>
										<div
											className='mt-5 p-2 faq-row col-md-14'
											style={{
												position: "relative",
												overflow: "hidden",
												// width: "60rem",
												backgroundColor: "#F9F9F9",
												// height: "10rem",
											}}
										>
											{/* DONE: PRIMIUM MEMBER ALLOW */}
											<div
												className='overlay'
												style={
													item.premium == 1 &&
													item.enableDisableField == 0
														? { display: "flex" }
														: { display: "none" }
												}
											>
												<h3>
													<AiFillLock
														style={{
															marginRight: 10,
														}}
													/>
													Subscribe Now
												</h3>
												<p>
													Get instant access to
													premium questions
												</p>
												<Link
													type='button'
													to={subscriptions}
													className='btn main-btn'
													style={{
														backgroundColor:
															"#7b1fa2",
														display: "flex",
														alignItems: "center",
													}}
												>
													<AiFillUnlock
														size={26}
														style={{
															marginRight: 10,
														}}
													/>{" "}
													Unlock the premium
												</Link>
											</div>

											<div className='row pt-3 d-flex'>
												<div className='col-md-8'>
													<div className='col'>
														<div className='d-flex'>
															{item.premium ==
															1 ? (
																<FaCrown
																	style={{
																		color: "#D4AF37",
																	}}
																	className='mt-1 mr-2'
																	size={22}
																/>
															) : (
																<></>
															)}
															<h4
																style={{
																	color: "#7B1FA2",
																}}
																className='text-center view-test-text-align'
															>
																{item.title}
															</h4>
														</div>
														<h6>
															{item.courseName}
														</h6>
														<label>Time :</label>
														<label>
															&nbsp; &nbsp;
														</label>
														<label className='fw-bold'>
															{item.maxTime}
														</label>
														<label>
															&nbsp; &nbsp;
														</label>
														<label>
															Questions :
														</label>
														<label>
															&nbsp; &nbsp;
														</label>
														<label className='fw-bold'>
															{" "}
															{item.maxNOQ}
														</label>
														<label>
															&nbsp; &nbsp;
														</label>
														<label>Marks :</label>
														<label>
															&nbsp; &nbsp;
														</label>
														<label className='fw-bold'>
															{item.passingScore}
														</label>
														<label>&nbsp;</label>
														{item.attemptFlag ===
															1 && (
															<label>
																Attempted :
															</label>
														)}
														{item.attemptFlag ===
															1 && (
															<TiTickOutline
																size={28}
																color='green'
															/>
														)}
													</div>
												</div>
												<div className='col-md-3 justify-content-end my-4  text-end   '>
													{/* FIXME: PRIMIUM MEMBER ALLOW */}
													{item.premium == 1 &&
													item.enableDisableField ==
														0 ? (
														<Link
															type='button'
															to={subscriptions}
															className='btn main-btn'
															style={{
																// backgroundColor: "#6c5f71",
																width: "120px",
																color: "white",
															}}
														>
															<AiFillLock
																size={20}
																style={{
																	marginRight: 0,
																}}
															/>{" "}
															Start Test
														</Link>
													) : (
														<>
															{console.log(
																item,
																"item"
															)}
															<a
																type='button'
																state={
																	{
																		//   quizId: item.quizId,
																		//   courseId: courseId,
																		//   topicId: topicId,
																		//   quizCode: item.quizCode,
																		//   negativeMarks: item.negativeMarks,
																		//   level: item.level,
																		//   name: item.title,
																	}
																}
																className='btn main-btn'
																style={{
																	width: "120px",
																	color: "white",
																}}
																onClick={() =>
																	handleStartTest(
																		item
																	)
																}
															>
																Start Test
															</a>
														</>
													)}
												</div>
											</div>
										</div>
									</div>
								</div>
							))
						) : (
							<p
								style={{
									fontSize: "30px",
									textAlign: "center",
									color: "#7b1fa2",
									margin: "154px",
								}}
							>
								No test available <br /> Please visit later{" "}
							</p>
						)}
					</div>
				</div>
			</div>
			<br />
			<footer
				className='footer mt-auto py-3 main-color-bg border-top fixed-footer'
				style={{ zIndex: 10 }}
			>
				<div className='container text-center'>
					<span className='white'>
						Copyright &#169; 2023 BESST(Brahmaputra Exam Success
						Support Team Private Limited){" "}
					</span>
				</div>
			</footer>
		</>
	);
};

export default ViewAllExamTest;
