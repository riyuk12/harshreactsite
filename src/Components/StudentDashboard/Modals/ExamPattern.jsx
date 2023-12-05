import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { GetExamPatternThunk } from "../../../Redux/Thunks/Get/GetExamPatternThunk";

const ExamPattern = () => {
	const { examPattern } = useSelector((state) => state.response);
	const [section, setSection] = useState("");
	const [subject, setSubject] = useState("");
	const dispatch = useDispatch();
	const { userProfileData } = useSelector((state) => state.postResp);
	const preferredCourse = localStorage.getItem("preferredCourse");

	useEffect(() => {
		dispatch(GetExamPatternThunk({ id: 1 }));
	}, []);

	//function and data related to inner modals of exam pattern
	const chunklanguage = (ar) => {
		var array = ar[0].lan;
		const perChunk =
			ar[0].title == "Section III"
				? 1
				: ar[0].title == "Section II"
				? 2
				: 4; // items per chunk

		const result = array.reduce((resultArray, item, index) => {
			const chunkIndex = Math.floor(index / perChunk);
			if (!resultArray[chunkIndex]) {
				resultArray[chunkIndex] = []; // start a new chunk
			}
			resultArray[chunkIndex].push(item);
			return resultArray;
		}, []);

		return result;
	};

	const langugageData = [
		{
			id: 1,
			title: "Section IA",
			lan: [
				"English",
				"Hindi",
				"Assamese",
				"Bengali ",
				"Gujarati",
				"Kannada",
				"Malayalam",
				"Marathi",
				"Odia",
				"Punjabi",
				"Tamil",
				"Telegu",
				"Urdu",
			],
		},
		{
			id: 2,
			title: "Section IB",
			lan: [
				"Arabic",
				"Bodo",
				"Chinese",
				"Dogri",
				"French",
				"German",
				"Italian",
				"Japanese",
				"Kashmiri",
				"Konkani",
				"Maithili",
				"Manipuri",
				"Nepali",
				"Persian",
				"Russian",
				"Santhali",
				"Sindhi",
				"Spanish",
				"Tibetan",
				"Sanskrit",
			],
		},
		{
			id: 3,
			title: "Section II",
			lan: [
				"Accountancy / Bookkeeping",
				"Agriculture",
				"Anthropology",
				"Biologyc / Biological Studies / Biotechnology / Biochemistry",
				"Business Studies",
				"Chemistry",
				"Environmental Studies",
				"Computer Science / Informative Practices",
				"Economics / Business Economics",
				"Engineering Graphics",
				"Fine Arts / Visual Arts / Commercial Art",
				"Geography / Geology",
				"History",
				"Home Science",
				"Knowledge Tradition Practices India",
				"Legal Studies",
				"Mass Media / Mass Communication",
				"Mathematics",
				"Performing Arts: i) Dance(Kathak / Bharatnatyam / Kathakali / Odissi / Kuchipudi / Manipuri), ii) Drama, iii) Music(Hindustani / Carnatic / Rabindra Sangeet / Percussion / Non-Percussion)",
				"Physical Education/National Cadet Corps(NCC)/Yoga",
				"Physics",
				"Political Science",
				"Psychology",
				"Sanskrit",
				"Sociology",
				"Teaching Aptitude",
			],
		},
		{
			id: 4,
			title: "Section III",
			lan: [
				"General Knowledge",
				"Current Affairs",
				"General Mental Ability",
				"Numerical Ability",
				"Quantitative Reasoning (Simple Application of Basic Mathematical Concept/Arithmetic/Algebra/Geometry/Mensuration/Statistics taught till className 8) ",
				"Logical and Analytical reasoning",
			],
		},
	];

	const handleLink = (section, subject) => {
		setSubject(subject);
		setSection(section);
		document.getElementById("languageModal").click();
	};

	return (
		<>
			<article
				className='modal fade'
				id='exampattern'
				tabIndex='-1'
				aria-labelledby='syllabusModalLabel'
				aria-hidden='true'
			>
				<section className='modal-dialog modal-dialog-scrollable downloadModal'>
					<section className='modal-content bg-logo exam-pattern-modal'>
						<header className='modal-header modal-header-container'>
							<h5 className='modal-title' id='syllabusModalLabel'>
								Exam Pattern
							</h5>
							<button
								type='button'
								className='btn-close'
								data-bs-dismiss='modal'
								aria-label='Close'
							></button>
						</header>
						{userProfileData.preferredCourseId === 1 ? (
							<main className='modal-body'>
								<div className='exam-pattern-main p-sm-3 p-3 m-auto'>
									<p className='mb-1'>{preferredCourse}</p>
									<table>
										<tbody>
											<tr>
												<th className='exam-pattern-thead'>
													Sections
												</th>
												{examPattern.map((item) => (
													<td
														key={item.sections}
														className='exam-pattern-tdata'
													>
														{item.sections}
													</td>
												))}
											</tr>
											<tr>
												<th className='exam-pattern-thead'>
													Subjects
												</th>
												{examPattern.map((item) => (
													<td
														key={item.sections}
														className='exam-pattern-tdata'
														onClick={() =>
															handleLink(
																item.sections,
																item.subjects
															)
														}
														style={{
															border: "1px solid #9E9E9E",
															textAlign: "center",
															color: "#7b1fa2",
															cursor: "pointer",
														}}
													>
														{item.subjects}
													</td>
												))}
											</tr>
											<tr>
												<th className='exam-pattern-thead'>
													Total number of Questions
												</th>
												{examPattern.map((item) => (
													<td
														key={item.sections}
														className='exam-pattern-tdata'
													>
														{item.noOfQuestions}
													</td>
												))}
											</tr>
											<tr>
												<th className='exam-pattern-thead'>
													Questions to be Attempted
												</th>
												{examPattern.map((item) => (
													<td
														key={item.sections}
														className='exam-pattern-tdata'
													>
														{item.toBeAttempted}
													</td>
												))}
											</tr>
											<tr>
												<th className='exam-pattern-thead'>
													Duration
												</th>
												{examPattern.map((item) => (
													<td
														key={item.sections}
														className='exam-pattern-tdata'
													>
														{item.duration}
													</td>
												))}
											</tr>
										</tbody>
									</table>
								</div>
							</main>
						) : (
							<p className='m-4 mx-auto fw-bold'>
								Coming Soon...
							</p>
						)}
					</section>
				</section>
			</article>

			<button
				data-bs-toggle='modal'
				className='d-none'
				id='languageModal'
				data-bs-target='#internalLink1'
			></button>

			{/* modal inside exam pattern */}
			<article
				className='modal fade'
				id='internalLink1'
				tabIndex='-1'
				aria-labelledby='syllabusModalLabel'
				aria-hidden='true'
			>
				<section className='modal-dialog modal-dialog-scrollable downloadModal'>
					<section className='modal-content bg-logo'>
						<header className='modal-header modal-header-container'>
							<h6
								className='modal-title '
								id='syllabusModalLabel'
							>
								Exam Pattern
							</h6>
							<button
								type='button'
								className='btn-close'
								data-bs-dismiss='modal'
								aria-label='Close'
							></button>
						</header>
						<main className='modal-body exam-pattern-main'>
							<h6>
								{section}{" "}
								<span style={{ color: "#7b1fa2" }}>
									- {preferredCourse}
								</span>
							</h6>
							<table
								className='table table-borderless'
								style={{
									width: "100%",
									borderTopStyle: "none",
									borderBottomStyle: "none",
								}}
							>
								<thead>
									<tr
										style={{
											borderRadius: "5px",
											cursor: "pointer",
										}}
									>
										<th
											colSpan={4}
											style={{
												height: "30px",
												backgroundColor: "#E1E1E1AA",
												border: "1px solid #AEAEAE",
											}}
										>
											{subject}
										</th>
									</tr>
								</thead>
								<tbody>
									{section &&
										subject &&
										chunklanguage(
											langugageData.filter(
												(item) => item.title == section
											)
										).map((data, index) => (
											<tr
												key={index}
												style={{
													backgroundColor:
														"#FFFFFF22",
												}}
											>
												{data.map((data, index) => (
													<td
														key={index}
														style={{
															padding: "10px",
														}}
														className='exam-pattern-tdata'
													>
														{data}
													</td>
												))}
											</tr>
										))}
								</tbody>
							</table>
						</main>
						<div className='modal-footer'>
							<button
								className='btn main-btn'
								data-bs-toggle='modal'
								data-bs-target='#exampattern'
								aria-label='close'
							>
								Back
							</button>
						</div>
					</section>
				</section>
			</article>
		</>
	);
};

export default ExamPattern;
