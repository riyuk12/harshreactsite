/* eslint-disable */
import React, { useState, useEffect } from "react";
import useRemoveModal from "../../Components/useRemoveModal";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import baseUrl from "../../Components/baseUrl";
import { AiFillLock, AiFillUnlock } from "react-icons/ai";
import "../ViewTest/ViewTest.css";
import { TiTickOutline } from "react-icons/ti";
import logo from "../../Assets/images/logo.png";
import "../../Pages/StudentMCQ/StudentMCQ.css";
import { chunk } from "lodash";
import { FaCrown } from "react-icons/fa";
import { GrFormClose } from "react-icons/gr";
import Header from "../../Components/Global/Navigation/Header";
import { subscriptions } from "../../RouteConstants";

const ExamViewTest = (props) => {
	const location = useLocation();
	const { courseId, topicId, name } = location.state;
	// const [profileData, setProfileData] = useState([]);
	const [chunk, setChunk] = useState(10);

	const [filter, setfilter] = useState(false);
	const [page, setPage] = useState(0);

	const [testData, setTestData] = useState([]);
	const [tableData, setTableData] = useState([]);

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
	// useEffect(() => {
	//   document.body.style.overflow = "visible";
	//   axios
	//     .post(
	//       baseUrl() + "/profileData",
	//       {
	//         email: Cookies.get("email"),
	//       },
	//       {
	//         headers: {
	//           "Acces-Control-Allow-Origin": "*",
	//           Client_ID: "MVOZ7rblFHsvdzk25vsQpQ==",
	//           Authorization: `${Cookies.get("token")}`,
	//         },
	//       }
	//     )
	//     .then((response) => {
	//       if (response.status === 200) {
	//         setProfileData(response.data.Data);
	//       }
	//     });
	// }, []);
	useEffect(() => {
		axios
			.post(
				baseUrl() + "/df/getAllActiveQuizByCourseAndTopic",
				{
					courseId: courseId,
					topicId: topicId,
					quizType: name === "Test" ? 1 : 3,
				},
				{
					headers: {
						"Acces-Control-Allow-Origin": "*",
						Client_ID: "MVOZ7rblFHsvdzk25vsQpQ==",
						Authorization: Cookies.get("token"),
					},
				}
			)
			.then((response) => {
				if (response.status === 200) {
					setTestData(response.data.Data);
				}
			});
	}, []);
	const handleClick = (i) => {
		setPage(i);
	};
	const handlePrevious = () => {
		setPage(page - 1);
	};
	const handleNext = () => {
		setPage(page + 1);
	};
	useRemoveModal();
	const showFilter = () => {
		setfilter(!filter);
	};
	const getAttempted = () => {
		const data = testData.filter((item) => item.attemptFlag);
		console.log(data, "data");
		if (data.length) {
			return data.length;
		}
		return 0;
	};
	const getNotAttempted = () => {
		const data = testData.filter((item) => !item.attemptFlag);
		console.log(data, "data");
		if (data.length) {
			return data.length;
		}
		return 0;
	};
	const getNotPremium = () => {
		const data = testData.filter((item) => !item.premium);
		console.log(data, "data");
		if (data.length) {
			return data.length;
		}
		return 0;
	};
	const getPremium = () => {
		const data = testData.filter((item) => item.premium);
		console.log(data, "data");
		if (data.length) {
			return data.length;
		}
		return 0;
	};
	const getpage = (index) => {
		console.log(tableData[index].length, chunk, "/////////////////////");
		if (chunk !== tableData[index].length) {
			return tableData[index].length;
		}
		return chunk;
	};
	const filterData = [
		{
			id: 1,
			name: "Attempted",
			count: getAttempted(),
		},
		{
			id: 2,
			name: " Not Attempted",
			count: getNotAttempted(),
		},
		{
			id: 3,
			name: "Free",
			count: getNotPremium(),
		},
		{
			id: 4,
			name: "Premium",
			count: getPremium(),
		},
	];
	const navigate = useNavigate();

	return (
		<>
			{/* <Header /> */}

			<button
				onClick={() => navigate(-1)}
				type='button'
				className='btn btn-circle  btn-dark ms-2 '
				style={{
					marginTop: "1%",
					// backgroundColor: "red",
					color: "white",
					position: "fixed",
					top: "50%",
					left: "0%",
					zIndex: 999,
				}}
			>
				<GrFormClose color='red' style={{ color: "red" }} size={20} />
			</button>
			<img
				src={logo}
				style={{ position: "fixed", marginTop: "3%", height: "80%" }}
				className='water-mark-quiz'
			></img>
			<div
				className='container '
				style={{ maxWidth: "80%", marginTop: "5%" }}
			>
				<br />
				<br />
				<br />
				<br />

				<h2 className='text-left' style={{ color: "black" }}>
					{name === "Test" ? "Mock Test" : "Exam Test"}
				</h2>
				<div className='row'>
					{filter ? (
						<div className='col-md-4 mt-3 '>
							<ul className='list-group' style={{}}>
								{/* <li
                  className="list-group-item"
                  style={{ backgroundColor: "#FAFAFA" }}
                >
                  Filter By
                </li> */}

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
							<div className=' mt-3 col-md-4'>
								{tableData.map((data, index) => (
									<ul
										className='list-group text-center'
										style={{}}
									>
										<li
											style={{ cursor: "pointer" }}
											className={` rounded-0 list-group-item bg-red  ${
												page == index ? "active" : ""
											}`}
											onClick={() => handleClick(index)}
										>
											{data[index].title.split("#")[0]}
											{index * chunk + 1} -{" "}
											{index * chunk + getpage(index)}{" "}
											{/* of {testData[0]?.questionsBeans?.length} entries */}
										</li>
									</ul>
								))}
							</div>
						</>
					)}

					<div className='col mt-4'>
						<div className='d-flex'>
							{/* <div
                onClick={() => showFilter()}
                style={{
                  fontSize: "17px",
                  fontWeight: "400",
                  lineHeight: "25px",
                  fontStyle: "poppins",
                }}
              >
                Filter by
              </div> */}
							<div className='ms-3'>
								{/* <div className="dropdown show">
                  <a
                    className="btn dropdown-toggle drop-down "
                    style={{ color: "#4F4F4F" }}
                    href="#"
                    role="button"
                    id="dropdownMenuLink"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Attempted
                  </a>

                  <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                    <a className="dropdown-item" href="#">
                      Action
                    </a>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                    <a className="dropdown-item" href="#">
                      Something else here
                    </a>
                  </div>
                </div> */}
							</div>
						</div>
						{tableData.length !== 0 ? (
							tableData[page].map((item, i) => (
								<div
									className='mb-0'
									key={i}
									style={{ marginBottom: "-5%" }}
								>
									<div className=' col mt-2 mb-0'>
										<div
											className='mt-2 p-2 mb-5 faq-row'
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
														? // item.premium == 1 && item.enableDisableField == 0
														  { display: "flex" }
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
												<div className='col-md-8 col-sm-12'>
													<div className='d-flex '>
														{item.premium == 1 ? (
															<FaCrown
																style={{
																	color: "#D4AF37",
																}}
																className='mt-1'
																size={22}
															/>
														) : (
															<></>
														)}
														<p
															className='text-center view-test-text-align ms-2 '
															style={{
																fontSize:
																	"20px",
																lineHeight:
																	"30px",
																fontWeight:
																	"600",
															}}
														>
															{item.title}
														</p>
													</div>
													<p
														style={{
															fontSize: "18px",
															lineHeight: "27px",
															fontWeight: "500",
														}}
													>
														{item.courseName}
													</p>
													<label
														style={{
															fontSize: "16px",
															lineHeight: "24px",
															fontWeight: "500",
														}}
													>
														Time :
													</label>
													<label
														style={{
															fontSize: "16px",
															lineHeight: "24px",
															fontWeight: "500",
														}}
													>
														&nbsp; &nbsp;
													</label>
													<label
														style={{
															fontSize: "16px",
															lineHeight: "24px",
															fontWeight: "500",
														}}
														className=''
													>
														{item.maxTime}
													</label>
													<label
														style={{
															fontSize: "16px",
															lineHeight: "24px",
															fontWeight: "500",
														}}
													>
														&nbsp; &nbsp;&nbsp;
														&nbsp;
													</label>
													<label
														style={{
															fontSize: "16px",
															lineHeight: "24px",
															fontWeight: "500",
														}}
													>
														Questions :
													</label>
													<label
														style={{
															fontSize: "16px",
															lineHeight: "24px",
															fontWeight: "500",
														}}
													>
														&nbsp; &nbsp;
													</label>
													<label
														style={{
															fontSize: "16px",
															lineHeight: "24px",
															fontWeight: "500",
														}}
														className='fw-bold'
													>
														{" "}
														{item.maxNOQ}
													</label>
													<label
														style={{
															fontSize: "16px",
															lineHeight: "24px",
															fontWeight: "500",
														}}
													>
														&nbsp; &nbsp;
													</label>
													<label
														style={{
															fontSize: "16px",
															lineHeight: "24px",
															fontWeight: "500",
														}}
													>
														Marks :
													</label>
													<label
														style={{
															fontSize: "16px",
															lineHeight: "24px",
															fontWeight: "500",
														}}
													>
														&nbsp; &nbsp;
													</label>
													<label
														style={{
															fontSize: "16px",
															lineHeight: "24px",
															fontWeight: "500",
														}}
													>
														{item.passingScore}
													</label>
													<label
														style={{
															fontSize: "16px",
															lineHeight: "24px",
															fontWeight: "500",
														}}
													>
														&nbsp; &nbsp;&nbsp;
													</label>
													{item.attemptFlag === 1 && (
														<label>
															Attempted :
														</label>
													)}
													{item.attemptFlag === 1 && (
														<TiTickOutline
															size={28}
															color='green'
														/>
													)}
												</div>
												<div className='col-md-4 col-sm-12 d-flex justify-content-center justify-content-md-end text-start my-auto'>
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
															}}
														>
															<AiFillLock
																size={10}
																style={{
																	marginRight: 10,
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
															<Link
																type='button'
																to='/ExamTestInstructions'
																state={{
																	quizId: item.quizId,
																	courseId:
																		courseId,
																	topicId:
																		topicId,
																	quizCode:
																		item.quizCode,
																	negativeMarks:
																		item.negativeMarks,
																	level: item.level,
																	name: item.title,
																}}
																className='btn main-btn'
																style={{
																	width: "120px",
																}}
															>
																Start Test
															</Link>
														</>
													)}

													{/* {item.attemptFlag == "1" ? (
                            <div className="d-flex">
                              <li
                                className=""
                                style={{
                                  fontSize: "22px",
                                  fontWeight: "600",
                                  lineHeight: "24px",
                                  color: "#F48914",
                                  marginTop: "15%",
                                  marginLeft: "5%",
                                }}
                              ></li>
                              <p
                                style={{
                                  fontSize: "16px",
                                  fontWeight: "600",
                                  lineHeight: "24px",
                                  color: "#F48914",
                                  marginTop: "15%",
                                  marginLeft: "-10%",
                                }}
                              >
                                ATTEMPTED
                              </p>
                            </div>
                          ) : (
                            <></>
                          )} */}
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
						Support Team Private Limited ){" "}
					</span>
				</div>
			</footer>
		</>
	);
};

export default ExamViewTest;
