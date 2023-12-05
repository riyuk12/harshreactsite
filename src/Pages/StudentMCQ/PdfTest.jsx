import { Viewer } from "@react-pdf-viewer/core";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import baseUrl from "../../Components/baseUrl";
import { Worker } from "@react-pdf-viewer/core";
import packageJson from "../../../package.json";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../../Assets/images/logo.png";
import { FaUser } from "react-icons/fa";
import profileHook from "../../Pages/StudentMCQ/useProfile";
import "./StudentMCQ.css";
import PDFViewer from "pdf-viewer-reactjs";
import { BsFillFlagFill } from "react-icons/bs";
import { AiFillFlag, AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { saveAs } from "file-saver";
import { Document } from "react-pdf";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { studDashboard } from "../../RouteConstants";

const pdfjsVersion = packageJson.dependencies["pdfjs-dist"];

function PdfTest() {
	const localData = {
		answer: localStorage.getItem("pdfanswer"),
		review: localStorage.getItem("pdfreview"),
		markForReview: localStorage.getItem("pdfmarkForReview"),
		totalQuestion: localStorage.getItem("pdftotalQuestion"),
		clickBtn: localStorage.getItem("pdfclickbtn")
			? JSON.parse(localStorage.getItem("pdfclickbtn"))
			: [],
	};

	const location = useLocation();
	const [Pdfimage, setImage] = useState();
	const [clickBtn, setClickBtn] = useState(
		localData?.clickBtn.length ? localData?.clickBtn : []
	);
	const [notAnswer, setNotAnswer] = useState([]);
	const [collapse, setCollapse] = useState(false);
	const [markReview, setMarkReview] = useState(localData.review || 0);
	const [answeredAndMarkForReview, setAnsweredAndMarkForReview] = useState(
		localData.markForReview || 0
	);
	const [answer, setAnswer] = useState(localData.answer || 0);
	const timer = localStorage.getItem("pdftimer")
		? JSON.parse(localStorage.getItem("pdftimer"))
		: null;
	const [seconds, setSeconds] = useState(timer?.second || 0);
	const [minutes, setMinutes] = useState(timer?.minute || 0);
	const [hours, setHours] = useState(timer?.hour || 0);
	const finalDta = localStorage.getItem("pdffinalData")
		? JSON.parse(localStorage.getItem("pdffinalData"))
		: [];

	const [finalData, setFinalData] = useState(finalDta);
	const profileData = profileHook();
	const { firstName, lastName, image } = profileData;
	const [quizData, setQuizData] = useState();
	const { pdfQuizId } = location.state;
	const [pdfFile, setPdfFile] = useState();
	const navigate = useNavigate();

	const [questionOptions, setQuestionOptions] = useState(finalDta);
	useEffect(() => {
		if (!localData?.clickBtn?.length) {
			const arr = [];

			for (let i = 0; i < questionOptions?.length; i++) {
				arr.push({
					number: i + 1,
					markAndSave: false,
					markReview: false,
					saveAndReview: false,
					visited: false,
				});
			}
			console.log(arr, "answer");
			localStorage.setItem("pdfclickbtn", JSON.stringify(arr));

			// setClickBtn(arr);
			setNotAnswer(arr.length);

			setClickBtn(arr);
		}
	}, [questionOptions]);
	useEffect(() => {
		let timer;
		// if ( > 0) {
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
		// }

		return () => {
			clearTimeout(timer);
		};
	});
	useEffect(() => {
		axios
			.post(
				baseUrl() + "/getPdfQuizByQuizId",
				{
					pdfQuizId: pdfQuizId,
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
				}
				const arrFile = new Uint8Array(
					JSON.parse(
						response.data.Data.pdfQuizPaper.quizPdfNameByteArrStr
					)
				);
				const file = new Blob([arrFile], { type: "application/pdf" });
				const fileURL = URL.createObjectURL(file);

				const finalData = localStorage.getItem("pdffinalData")
					? JSON.parse(localStorage.getItem("pdffinalData"))
					: [];

				if (finalData.length) {
					setQuizData(response.data.Data);

					setQuestionOptions(finalData);
					localStorage.setItem("pdftotalQuestion", finalData.length);
					// setImage(JSON.parse(response.data.Data.pdfQuizPaper.quizPdfNameByteArrStr));
					// localStorage.setItem("finalData",JSON.stringify(response.data.Data.pdfquestOptions))

					setFinalData(finalData);
				} else {
					setQuizData(response.data.Data);

					setQuestionOptions(response.data.Data.pdfquestOptions);
					localStorage.setItem(
						"pdftotalQuestion",
						response.data.Data.pdfquestOptions.length
					);
					localStorage.setItem(
						"pdffinalData",
						JSON.stringify(response.data.Data.pdfquestOptions)
					);

					setFinalData(response.data.Data.pdfquestOptions);
				}
				setImage(
					JSON.parse(
						response.data.Data.pdfQuizPaper.quizPdfNameByteArrStr
					)
				);
				// var encode = function(d,a,e,b,c,f){c="";for(a=e=b=0;a<4*d.length/3;f=b>>2*(++a&3)&63,c+=String.fromCharCode(f+71-(f<26?6:f<52?0:f<62?75:f^63?90:87))+(75==(a-1)%76?"\r\n":""))a&3^3&&(b=b<<8^d[e++]);for(;a++&3;)c+="=";return c};
				// 		console.log(encode(JSON.parse(response.data.Data.pdfQuizPaper.quizPdfNameByteArrStr)));
				// setPdfFile(encode(JSON.parse(response.data.Data.pdfQuizPaper.quizPdfNameByteArrStr)));
				const base = arrayBufferToBase64(
					JSON.parse(
						response.data.Data.pdfQuizPaper.quizPdfNameByteArrStr
					)
				);
				// setPdfFile(base)
				const base64WithoutPrefix = base.substr(
					"data:application/pdf;base64,".length
				);

				const bytes = atob(base64WithoutPrefix);
				let length = bytes.length;
				let out = new Uint8Array(length);

				while (length--) {
					out[length] = bytes.charCodeAt(length);
				}

				const data1 = new Blob([out], { type: "application/pdf" });
				const url = URL.createObjectURL(data1);
				console.log(url, "data1");
				setPdfFile(url);
			});
	}, []);
	function arrayBufferToBase64(buffer) {
		var binary = "";
		var bytes = new Uint8Array(buffer);
		var len = bytes.byteLength;
		for (var i = 0; i < len; i++) {
			binary += String.fromCharCode(bytes[i]);
		}
		return window.btoa(binary);
	}

	// console.log(arrayBufferToBase64(arr));
	const handleClear = (item) => {
		const clickUpdate = finalData.map((btn) => {
			{
				console.log(btn.ppdfQuesOptionId, item.ppdfQuesOptionId);
			}
			if (btn.ppdfQuesOptionId === item.ppdfQuesOptionId)
				return {
					...btn,
					selected: 0,
				};
			return btn;
		});
		console.log(clickUpdate, "selecteditemss");
		setQuestionOptions(clickUpdate);
		localStorage.setItem("pdffinalData", JSON.stringify(clickUpdate));

		setFinalData(clickUpdate);
		const data = clickBtn.map((btn) => {
			if (btn.number === item.ppdfQuesSrNo)
				return {
					...btn,
					markReview: false,
					markAndSave: false,
					saveAndReview: false,
				};

			return btn;
		});
		const ans = data.filter((item) => item.markAndSave);
		setAnswer(ans.length);
		localStorage.setItem("pdfanswer", ans.length);

		const markAndSaveForReview = data.filter((item) => item.saveAndReview);
		const markForReview = data.filter((item) => item.markReview);
		console.log(markAndSaveForReview, markForReview, "itemssssss");
		setClickBtn(data);
		localStorage.setItem("pdfclickbtn", JSON.stringify(data));

		setMarkReview(markForReview.length);

		setAnsweredAndMarkForReview(markAndSaveForReview.length);

		localStorage.setItem("pdfreview", markForReview.length);
		localStorage.setItem("pdfmarkForReview", markAndSaveForReview.length);
	};

	const handleChange = (item, selected) => {
		const clickUpdate = finalData.map((btn) => {
			{
				console.log(btn.ppdfQuesOptionId, item.ppdfQuesOptionId);
			}
			if (btn.ppdfQuesOptionId === item.ppdfQuesOptionId)
				return {
					...btn,
					selected: selected + 1,
				};
			return btn;
		});
		const data = clickBtn.map((btn) => {
			if (btn.number === item.ppdfQuesSrNo)
				if (btn.markReview) {
					return {
						...btn,
						markReview: false,
						markAndSave: false,
						saveAndReview: true,
					};
				} else {
					return {
						...btn,
						markReview: btn.markReview,
						markAndSave: true,
						saveAndReview: btn.saveAndReview,
					};
				}

			return btn;
		});
		console.log(data, "data>>>>>");
		localStorage.setItem("pdffinalData", JSON.stringify(clickUpdate));
		setClickBtn(data);
		localStorage.setItem("pdfclickbtn", JSON.stringify(data));
		const markAndSaveForReview = data.filter((item) => item.saveAndReview);
		const markForReview = data.filter((item) => item.markReview);

		const ans = data.filter((item) => item.markAndSave);
		setAnswer(ans.length);
		localStorage.setItem("pdfanswer", ans.length);

		setMarkReview(markForReview.length);

		setAnsweredAndMarkForReview(markAndSaveForReview.length);
		localStorage.setItem("pdfreview", markForReview.length);
		localStorage.setItem("pdfmarkForReview", markAndSaveForReview.length);

		localStorage.setItem("pdffinalData", JSON.stringify(clickUpdate));

		setFinalData(clickUpdate);
	};
	const onhandleFlag = (e) => {
		const item = finalData.filter(
			(event) => event.ppdfQuesOptionId == e.ppdfQuesOptionId
		);
		if (item[0].selected) {
			const clickUpdate = clickBtn.map((btn) => {
				if (btn.number === e.ppdfQuesSrNo)
					return {
						...btn,
						markReview: btn.markReview,
						markAndSave: false,
						saveAndReview: true,
					};
				return btn;
			});
			setClickBtn(clickUpdate);
			localStorage.setItem("pdfclickbtn", JSON.stringify(clickUpdate));

			console.log(clickUpdate, "clickd");
			const markAndSaveForReview = clickUpdate.filter(
				(item) => item.saveAndReview
			);
			const markForReview = clickUpdate.filter((item) => item.markReview);

			const ans = clickUpdate.filter((item) => item.markAndSave);
			setAnswer(ans.length);
			localStorage.setItem("pdfanswer", ans.length);

			setMarkReview(markForReview.length);

			setAnsweredAndMarkForReview(markAndSaveForReview.length);
			localStorage.setItem("pdfreview", markForReview.length);
			localStorage.setItem(
				"pdfmarkForReview",
				markAndSaveForReview.length
			);
		} else {
			const clickUpdate = clickBtn.map((btn) => {
				if (btn.number === e.ppdfQuesSrNo)
					return {
						...btn,
						markReview: true,
						markAndSave: btn.markAndSave,
						saveAndReview: btn.saveAndReview,
					};
				return btn;
			});
			setClickBtn(clickUpdate);
			localStorage.setItem("pdfclickbtn", JSON.stringify(clickUpdate));

			console.log(clickUpdate, "clickd");
			const markAndSaveForReview = clickUpdate.filter(
				(item) => item.saveAndReview
			);
			const markForReview = clickUpdate.filter((item) => item.markReview);

			const ans = clickUpdate.filter((item) => item.markAndSave);
			setAnswer(ans.length);
			localStorage.setItem("pdfanswer", ans.length);

			setMarkReview(markForReview.length);

			setAnsweredAndMarkForReview(markAndSaveForReview.length);
			localStorage.setItem("pdfreview", markForReview.length);
			localStorage.setItem(
				"pdfmarkForReview",
				markAndSaveForReview.length
			);
		}
	};
	const submitPdfQuiz = () => {
		const resultTime =
			(hours < 10 ? "0" + hours : hours) +
			":" +
			(minutes < 10 ? "0" + minutes : minutes) +
			":" +
			(seconds < 10 ? "0" + seconds : seconds);
		const requestData = {
			pdfQuizId: quizData.pdfQuizId,
			courseId: quizData.courseId,
			topicId: quizData.topicId,
			pdfName: quizData.pdfName,
			courseName: quizData.courseName,
			quizCode: quizData.quizCode,
			title: quizData.title,
			title_lang: quizData.title_lang,
			thumbImg: quizData.thumbImg,
			maxNOQ: quizData.maxNOQ,
			maxTime: quizData.maxTime,
			negativeMarks: quizData.negativeMarks,
			posativeMarks: quizData.posativeMarks,
			totalMarks: quizData.totalMarks,
			timeTaken: resultTime,
			pdfquestOptions: finalData,
		};
		navigate("/ExamQuizSummuryMCQ", {
			state: {
				data: {
					totalQuest: questionOptions.length,
					answer: answer,
					notAnswered:
						localData.totalQuestion -
							answer -
							answeredAndMarkForReview ||
						questionOptions?.length -
							answer -
							answeredAndMarkForReview,

					markReview: markReview,
					saveReview: answeredAndMarkForReview,
					pdfRequestData: requestData,
					ispdfTest: true,
					hr: hours,
					sec: seconds,
					min: minutes,
					name: quizData.title,
				},
			},
		});
	};

	return (
		<>
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
							Brahmaputra Exam Success Support Team (besst)
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
									style={{ height: "70px", width: "80px" }}
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
									{quizData?.title}
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
									{minutes < 10 ? "0" + minutes : minutes}:
									{seconds < 10 ? "0" + seconds : seconds}
								</span>
							</h6>
						</div>
					</div>
				</div>
			</nav>{" "}
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
					CUET(UG) - {quizData?.title}
				</p>
			</div>
			<div className='container-fluid  pdfviewer'>
				<div
					className='modal fade'
					id='leaveQuiz'
					tabIndex='-1'
					aria-labelledby='loginModalLabel'
					aria-hidden='true'
				>
					<div className='modal-dialog'>
						<div className='modal-content'>
							<div className='modal-header'>
								<h5
									className='modal-title'
									id='loginModalLabel'
								>
									Leave Quiz
								</h5>
								<button
									type='button'
									className='btn-close'
									data-bs-dismiss='modal'
									aria-label='Close'
								></button>
							</div>
							<div className='modal-body mx-auto'>
								<form>
									<h1 style={{ fontSize: "20px" }}>
										Are you sure you want to leave quiz ?{" "}
									</h1>
									<div className='mb-3 d-flex justify-content-center'></div>
									<Link
										className='btn main-btn '
										data-mdb-dismiss='modal'
										to={studDashboard}
									>
										Yes
									</Link>
									<button
										type='button'
										className='btn main-btn '
										data-bs-dismiss='modal'
										aria-label='Close'
										style={{
											marginLeft: "50px",
											zIndex: 999,
											position: "sticky",
										}}
									>
										No
									</button>
								</form>
							</div>
						</div>
					</div>
				</div>

				<div className='row d-flex justify-content-between'>
					{collapse ? (
						<div
							className={
								"col-lg-12 col-sm-12 order-lg-1 order-sm-1 order-1 testCard  p-1 style-4"
							}
							style={{ height: "80vh" }}
						>
							{!collapse ? (
								<div
									className='d-none d-md-block '
									onClick={() => setCollapse(!collapse)}
									style={{
										position: "absolute",
										right: "-40px",
										top: "40%",
										cursor: "pointer",
										padding: "5px",
										color: "white",
										display: "flex",
										alignItems: "center",
										border: "1px solid black",
										backgroundColor: "black",
									}}
								>
									<AiOutlineRight
										className=' mb-2'
										onClick={() => setCollapse(!collapse)}
										color='white'
										size={18}
									/>
									<div
										style={{
											writingMode: "vertical-rl",
										}}
									>
										Answer Sheet
									</div>
								</div>
							) : (
								<div
									className='d-none d-md-block'
									onClick={() => setCollapse(!collapse)}
									style={{
										position: "absolute",
										right: "-40px",
										top: "40%",
										cursor: "pointer",
										padding: "5px",
										color: "white",
										display: "flex",
										alignItems: "center",
										border: "1px solid black",
										backgroundColor: "black",
									}}
								>
									<AiOutlineLeft
										className=' mb-2'
										onClick={() => setCollapse(!collapse)}
										color='white'
										size={20}
									/>{" "}
									<div
										style={{
											writingMode: "vertical-rl",
										}}
									>
										Mark Answers
									</div>
								</div>
							)}

							<div
								className=' pdf-file  scrollbar style-4'
								style={{
									height: "100%",
									overflowY: "scroll",
									width: "100%",
								}}
							>
								<p className='d-none'>pdf</p>
								{Pdfimage && (
									<Worker
										className='style-4'
										workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjsVersion}/build/pdf.worker.min.js`}
									>
										<Viewer
											scrollMode='page'
											width='325px'
											single
											className='fullScreen style-4'
											// style={{ width: '150%' }}
											fileUrl={new Uint8Array(Pdfimage)}
										/>
									</Worker>
								)}
								{/* <div
    style={{
        border: '1px solid rgba(0, 0, 0, 0.3)',
        height: '750px',
    }}
>

</div> */}
								{/* {pdfFile&& <PDFViewer
            document={{
                // base64: pdfFile,
                  url: 'https://arxiv.org/pdf/quant-ph/0410100.pdf',

            }}
        />} */}
								{/* {pdfFile?.length > 0 && <iframe src={pdfFile+"#toolbar=0&embedded=true&navpanes=0&scrollbar=0"} title="modal" frameBorder="0" width="100%" height="700px" ></iframe>} */}
								{/* {fail && <>NO DATA PRESENT</>} */}
							</div>
						</div>
					) : (
						<div
							className={
								"col-lg-7 col-sm-12  order-sm-1  order-lg-1 order-1 testCard p-1 style-4"
							}
							style={{ height: "80vh" }}
						>
							{/* <button  className="btn btn-primary d-block d-sm-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" style={{position:'absolute',top:'50%',right:'0'}}>
{ "<"}
</button> */}
							<div
								className='btn btn-primary d-block d-sm-none'
								type='button'
								data-bs-toggle='offcanvas'
								data-bs-target='#offcanvasRight'
								aria-controls='offcanvasRight'
								style={{
									position: "absolute",
									right: "0px",
									top: "40%",
									cursor: "pointer",
									padding: "5px",
									color: "white",
									// display: "flex",
									zIndex: 999,
									zIndex: 999,
									alignItems: "center",
									border: "1px solid black",
									backgroundColor: "black",
								}}
							>
								<AiOutlineRight
									className=' mb-2'
									onClick={() => setCollapse(!collapse)}
									color='white'
									size={18}
								/>
								<div
									style={{
										writingMode: "vertical-rl",
									}}
								>
									Answer Sheet
								</div>
							</div>
							<div
								className='offcanvas offcanvas-end'
								tabIndex='-1'
								id='offcanvasRight'
								aria-labelledby='offcanvasRightLabel'
							>
								<div className='offcanvas-header'>
									<button
										type='button'
										className='btn-close text-reset'
										data-bs-dismiss='offcanvas'
										aria-label='Close'
									></button>
								</div>
								<div className='offcanvas-body'>
									<div
										className=' w-100'
										style={{
											border: "2px  dashed gray",
										}}
									>
										<div className='d-flex justify-content-around'>
											<div className=' p-2'>
												<div className='d-flex '>
													<button
														style={{
															width: "30px",
															height: "30px",
															backgroundColor:
																"#EEEEEE",
															border: "1px solid black",
															borderRadius: "5px",
														}}
													>
														{localData?.totalQuestion ||
															questionOptions?.length}
													</button>
													<p className='ms-3'>
														Total Questions
													</p>
												</div>
												<div className='d-flex  '>
													<div className='d-flex text-center align-items-center ractangle1  '>
														<span className='text-white ms-3 text-center'>
															{answer}
														</span>
													</div>

													<p className='ms-3'>
														Answered
													</p>
												</div>{" "}
											</div>
											<div className='p-2'>
												<div className='d-flex p-0 '>
													<div className='d-flex text-center align-items-center ractangle '>
														<span className='text-white ms-2 text-center'>
															{" "}
															{localData.totalQuestion -
																answer -
																answeredAndMarkForReview ||
																questionOptions?.length -
																	answer -
																	answeredAndMarkForReview}
														</span>
													</div>
													<p className='ms-3 '>
														Not Answered
													</p>
												</div>{" "}
												<div className='d-flex '>
													<button
														style={{
															width: "30px",
															height: "30px",
															backgroundColor:
																"#4E2695",
															color: "white",
															borderRadius:
																"18px",
														}}
													>
														{markReview}
													</button>
													<p className='ms-3'>
														Marked for review
													</p>
												</div>
											</div>
										</div>
										<div className='d-flex ms-4 '>
											<button
												style={{
													width: "30px",
													height: "30px",
													backgroundColor: "#4E2695",
													color: "white",
													borderRadius: "18px",
												}}
											>
												{answeredAndMarkForReview}
											</button>
											<span
												style={{
													width: "8px",
													height: "8px",
													backgroundColor:
														"rgb(92, 184, 91)",
													borderRadius: "50%",
													position: "absolute",
													marginTop: "18px",
													marginLeft: "20px",
												}}
											></span>
											<p className='ms-3'>
												<b>
													{" "}
													Answered & Marked for review{" "}
												</b>
												<br />
												(Will be considered for
												evaluation)
											</p>
										</div>{" "}
									</div>

									{/*  */}
									<div
										className='questionOption mt-5 p-2 style-4'
										style={{
											height: "350px",
											overflowY: "scroll",
										}}
									>
										{questionOptions &&
											questionOptions?.length &&
											questionOptions.map(
												(item, index) => (
													<QuestionOptionsWrapper
														clickBtn={clickBtn}
														index={index}
														item={item}
														handleChange={
															handleChange
														}
														handleClear={
															handleClear
														}
														onhandleFlag={
															onhandleFlag
														}
													/>
												)
											)}
									</div>
									<div className='d-flex'>
										<div className='mt-3 d-flex justify-content-start'>
											<button
												onClick={() => submitPdfQuiz()}
												style={{
													backgroundColor: "#5CB85B",
													color: "white",
													border: "0px",
													padding: "10px",
												}}
											>
												Submit
											</button>
										</div>
										<div className='mt-3 ms-3 d-flex justify-content-start'>
											<button
												data-bs-toggle='modal'
												data-trigger='focus'
												data-bs-target='#leaveQuiz'
												id='openleaveQuiz'
												style={{
													backgroundColor: "red",
													color: "white",
													border: "0px",
													padding: "10px",
												}}
											>
												Leave quiz
											</button>
										</div>
									</div>
								</div>
							</div>{" "}
							{!collapse ? (
								<div
									className='d-none d-md-block '
									onClick={() => setCollapse(!collapse)}
									style={{
										position: "absolute",
										right: "-40px",
										top: "40%",
										cursor: "pointer",
										padding: "5px",
										color: "white",
										display: "flex",
										alignItems: "center",
										border: "1px solid black",
										backgroundColor: "black",
									}}
								>
									<AiOutlineRight
										className=' mb-2'
										onClick={() => setCollapse(!collapse)}
										color='white'
										size={18}
									/>
									<div
										style={{
											writingMode: "vertical-rl",
										}}
									>
										Answer Sheet
									</div>
								</div>
							) : (
								<div
									className='d-none d-md-block'
									onClick={() => setCollapse(!collapse)}
									style={{
										position: "absolute",
										right: "-40px",
										top: "40%",
										cursor: "pointer",
										padding: "5px",
										color: "white",
										display: "flex",
										alignItems: "center",
										border: "1px solid black",
										backgroundColor: "black",
									}}
								>
									<AiOutlineLeft
										className=' mb-2'
										onClick={() => setCollapse(!collapse)}
										color='white'
										size={20}
									/>{" "}
									<div
										style={{
											writingMode: "vertical-rl",
										}}
									>
										Mark Answers
									</div>
								</div>
							)}
							<div
								className=' pdf-file  scrollbar style-4'
								style={{
									height: "100%",
									overflowY: "scroll",
									width: "100%",
								}}
							>
								<h1
									className=''
									style={{ visibility: "hidden" }}
								>
									{" "}
									pdf
								</h1>
								{Pdfimage && (
									<Worker
										className='style-4'
										workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjsVersion}/build/pdf.worker.min.js`}
									>
										<Viewer
											scrollMode='page'
											SINGLE
											className='fullScreen style-4'
											style={{ width: "100%" }}
											fileUrl={new Uint8Array(Pdfimage)}
										/>
									</Worker>
								)}
								{/* <div
    style={{
        border: '1px solid rgba(0, 0, 0, 0.3)',
        height: '750px',
    }}
>

</div> */}

								{/* {pdfFile &&<PDFViewer

            document={{
                // base64: pdfFile,
                  url: 'https://arxiv.org/pdf/quant-ph/0410100.pdf',

            }}
        />} */}
								{/*       
                 {pdfFile?.length > 0 && <iframe  src={pdfFile+"#toolbar=0&embedded=true&navpanes=0&scrollbar=0"} title="modal" frameBorder="0" width={"100%"} height={"700px"} ></iframe>} */}
								{/* {fail && <>NO DATA PRESENT</>} */}
							</div>
						</div>
					)}
					<div
						className={
							collapse
								? " d-none"
								: "col-lg-4 d-none  d-md-block  col-sm-12 p-2 pt-5 col-md-12 order-sm-1 order-lg-1 order-1 column-1  "
						}
						style={{ overflow: "hidden" }}
					>
						<div
							className=' w-100'
							style={{
								border: "2px  dashed gray",
							}}
						>
							<div className='d-flex justify-content-around'>
								<div className=' p-2'>
									<div className='d-flex '>
										<button
											style={{
												width: "30px",
												height: "30px",
												backgroundColor: "#EEEEEE",
												border: "1px solid black",
												borderRadius: "5px",
											}}
										>
											{localData?.totalQuestion ||
												questionOptions?.length}
										</button>
										<p className='ms-3'>Total Questions</p>
									</div>
									<div className='d-flex  '>
										<div className='d-flex text-center align-items-center ractangle1  '>
											<span className='text-white ms-3 text-center'>
												{answer}
											</span>
										</div>

										<p className='ms-3'>Answered</p>
									</div>{" "}
								</div>
								<div className='p-2'>
									<div className='d-flex p-0 '>
										<div className='d-flex text-center align-items-center ractangle '>
											<span className='text-white ms-2 text-center'>
												{" "}
												{localData.totalQuestion -
													answer -
													answeredAndMarkForReview ||
													questionOptions?.length -
														answer -
														answeredAndMarkForReview}
											</span>
										</div>
										<p className='ms-3 '>Not Answered</p>
									</div>{" "}
									<div className='d-flex '>
										<button
											style={{
												width: "30px",
												height: "30px",
												backgroundColor: "#4E2695",
												color: "white",
												borderRadius: "18px",
											}}
										>
											{markReview}
										</button>
										<p className='ms-3'>
											Marked for review
										</p>
									</div>
								</div>
							</div>
							<div className='d-flex ms-4 '>
								<button
									style={{
										width: "30px",
										height: "30px",
										backgroundColor: "#4E2695",
										color: "white",
										borderRadius: "18px",
									}}
								>
									{answeredAndMarkForReview}
								</button>
								<span
									style={{
										width: "8px",
										height: "8px",
										backgroundColor: "rgb(92, 184, 91)",
										borderRadius: "50%",
										position: "absolute",
										marginTop: "18px",
										marginLeft: "20px",
									}}
								></span>
								<p className='ms-3'>
									<b> Answered & Marked for review </b>
									<br />
									(Will be considered for evaluation)
								</p>
							</div>{" "}
						</div>

						{/*  */}
						<div
							className='questionOption mt-5 p-2 style-4'
							style={{
								height: "350px",
								overflowY: "scroll",
							}}
						>
							{questionOptions &&
								questionOptions?.length &&
								questionOptions.map((item, index) => (
									<QuestionOptionsWrapper
										clickBtn={clickBtn}
										index={index}
										item={item}
										handleChange={handleChange}
										handleClear={handleClear}
										onhandleFlag={onhandleFlag}
									/>
								))}
						</div>
						<div className='d-flex'>
							<div className='mt-3 d-flex justify-content-start'>
								<button
									onClick={() => submitPdfQuiz()}
									style={{
										backgroundColor: "#5CB85B",
										color: "white",
										border: "0px",
										padding: "10px",
									}}
								>
									Submit
								</button>
							</div>
							<div className='mt-3 ms-3 d-flex justify-content-start'>
								<button
									data-bs-toggle='modal'
									data-trigger='focus'
									data-bs-target='#leaveQuiz'
									id='openleaveQuiz'
									style={{
										backgroundColor: "red",
										color: "white",
										border: "0px",
										padding: "10px",
									}}
								>
									Leave quiz
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default PdfTest;

function QuestionOptionsWrapper({
	item,
	handleChange,
	onhandleFlag,
	clickBtn,
	index,
	handleClear,
}) {
	const array = [];
	useEffect(() => {
		if (item.selected) {
			const ele = document.getElementsByName(`${item.ppdfQuesOptionId}`);
			ele[item.selected - 1].checked = true;
		}
	}, []);
	if (item.numberOfOptions) {
		for (let index = 0; index < item.numberOfOptions; index++) {
			const element = {
				// id:index+1,
				ppdfQuesOptionId: item.ppdfQuesOptionId,
				ppdfQuesSrNo: item.ppdfQuesSrNo,
				numberOfOptions: item.numberOfOptions,
				correctOption: item.correctOption,
				explanation: item.expanation,
				explanation_lang: item.explanation_lang,
				selected: item.selected,
			};

			array.push(element);
		}
	}

	return (
		<>
			<label className='ms-3'>
				{(clickBtn.length && clickBtn[index].markReview) ||
				(clickBtn.length && clickBtn[index].saveAndReview) ? (
					<AiFillFlag
						color='white'
						style={{
							border: "1px ",
							borderRadius: "5px",
							cursor: "pointer",
							backgroundColor: "#2A00AB",
							padding: "2px",
						}}
						size={25}
						onClick={() => onhandleFlag(item)}
					/>
				) : (
					<AiFillFlag
						color='white'
						style={{
							border: "1px solid gray",
							cursor: "pointer",
							backgroundColor: "gray",
							padding: "2px",
							borderRadius: "5px",
						}}
						size={25}
						onClick={() => onhandleFlag(item)}
					/>
				)}
				<span className='ms-1'>question {item.ppdfQuesSrNo}</span>
			</label>

			<div
				className='d-flex justify-content-between'
				style={{ maxWidth: "100%" }}
			>
				{" "}
				{array.map((answer, key) => (
					<div className='d-flex align-items-center'>
						<input
							type='radio'
							className=' ms-3'
							id={answer.ppdfQuesOptionId}
							aria-checked={answer.selected || 0}
							value={answer.ppdfQuesOptionId}
							name={answer.ppdfQuesOptionId}
							onChange={() => handleChange(answer, key)}
						/>
						<label
							// htmlFor={answer.optionId}
							className='form-check-label'
						>
							<div className='ms-1'>
								{(key + 10).toString(36).toUpperCase() + " "}
							</div>
						</label>
					</div>
				))}
				<div className=''>
					<button
						onClick={() => {
							handleClear(item);
							const ele = document.getElementsByName(
								`${item.ppdfQuesOptionId}`
							);
							for (let i = 0; i < ele.length; i++)
								ele[i].checked = false;
						}}
						style={{
							border: "1px solid gray ",
							backgroundColor: "gray",
							color: "white",
							borderRadius: "5px",
						}}
					>
						clear
					</button>
				</div>
			</div>
			<hr />
		</>
	);
}
