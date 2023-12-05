import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import axios from "axios";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import usePreferredCourseId from "../../../Utils/usePreferredCourseId";
import baseUrl from "../../../Components/baseUrl";

const AlreadyTakenTest = () => {
	const [testData, setTestData] = useState("");
	const [selectedFilter, setSelectedFilter] = useState(2);
	const [filteredData, setFilteredData] = useState([]);
	const { userProfileData } = useSelector((state) => state.postResp);
	const preferredCourseId = usePreferredCourseId();

	// getting Already taken test data here
	const getTestData = async () => {
		try {
			const response = await axios.post(
				`${baseUrl()}/getAllSubmittedQuizByUserId`,
				{
					userId: Cookies.get("userId"),
				},
				{
					headers: {
						"Acces-Control-Allow-Origin": "*",
						Client_ID: "MVOZ7rblFHsvdzk25vsQpQ==",
						Authorization: `${Cookies.get("token")}`,
					},
				}
			);

			if (response.status === 200) {
				setTestData(response.data.Data);
				console.log(response.data.Data)
			}
		} catch (error) {
			console.log("error for getalltestsubmittedbyuserId", error);
		}
	};
	useEffect(() => {
		getTestData();
	}, []);

	//filtering data on load comparing with 2 to show all practice paper
	useEffect(() => {
		if (testData.length > 0) {
			if (preferredCourseId !== 8) {
				let filterData = testData
					?.filter((item) => Number(item.quizType) === 2)
					.filter(
						(item) =>
							item?.courseId ===
							userProfileData?.preferredCourseId
					);
				setFilteredData(filterData);
			} else {
				let filterData = testData
					?.filter((item) => Number(item.quizType) === 2)
					.filter((item) => item?.courseId === 4);
				setFilteredData(filterData);
			}
		}
		setSelectedFilter(2);
	}, [testData.length, userProfileData]);

	//handles filtering based on quizType and courseId
	const handleFilter = (quizType) => {
		setSelectedFilter(quizType);
		if (preferredCourseId !== 8) {
			let filterData = testData
				.filter((item) => Number(item.quizType) === quizType)
				.filter(
					(item) =>
						item?.courseId === userProfileData?.preferredCourseId
				);
			setFilteredData(filterData);
		} else {
			let filterData = testData
				?.filter((item) => Number(item.quizType) === quizType)
				.filter((item) => item?.courseId === 4);
			setFilteredData(filterData);
		}
	};
	//
	return (
		<article
			className='modal fade'
			id='takenModal'
			tabIndex='-1'
			aria-labelledby='takenModalLabel'
			aria-hidden='true'
			style={{ width: "100%" }}
		>
			<section className='modal-dialog modal-dialog-scrollable downloadModal'>
				<section className='modal-content'>
					<header className='modal-header modal-header-container'>
						<h5
							className='modal-title main-color'
							id='takenModalLabel'
						>
							Test Taken Before
						</h5>
						<button
							type='button'
							className='btn-close'
							data-bs-dismiss='modal'
							aria-label='Close'
						></button>
					</header>
					<main className='modal-body'>
						<div className='filter-btn-container mb-2'>
							<button
								className={`${selectedFilter === 2 && "seleted-filter"
									} filter-btn`}
								onClick={() => handleFilter(2)}
							>
								Practice Papers
							</button>
							<button
								className={`${selectedFilter === 1 && "seleted-filter"
									} filter-btn`}
								onClick={() => handleFilter(1)}
							>
								Mock Papers
							</button>
							{userProfileData.preferredCourseId === 1 && (
								<button
									className={`${selectedFilter === 3 && "seleted-filter"
										} filter-btn`}
									onClick={() => handleFilter(3)}
								>
									Mock Exam
								</button>
							)}
							<button
								className={`${selectedFilter === 5 && "seleted-filter"
									} filter-btn`}
								onClick={() => handleFilter(5)}
							>
								Live Quiz
							</button>
						</div>
						<div className='mb-2 completed-exam-table-container'>
							<table
								style={{
									width: "100%",
									border: "1px solid black",
								}}
							>
								<thead>
									<tr>
										<th
											style={{
												width: "20%",
												textAlign: "center",
												background: "#7b1fa2",
												color: "white",
												padding: "10px",
											}}
										>
											Quiz Title
										</th>
										<th
											style={{
												width: "20%",
												textAlign: "center",
												background: "#7b1fa2",
												color: "white",
												padding: "10px",
											}}
										>
											Quiz Code
										</th>
										<th
											style={{
												width: "20%",
												textAlign: "center",
												background: "#7b1fa2",
												color: "white",
												padding: "10px",
											}}
										>
											Date
										</th>
									
										<th
											style={{
												width: "20%",
												textAlign: "center",
												background: "#7b1fa2",
												color: "white",
												padding: "10px",
											}}
										>
											Action
										</th>
									</tr>
								</thead>
								<tbody>
									{filteredData.map((item, index) => (
										<tr key={index}>
											<td
												style={{
													border: "1px solid black",
													textAlign: "center",
												}}
											>
												{item.quizTitle}
											</td>
											<td
												style={{
													border: "1px solid black",
													textAlign: "center",
												}}
											>
												{item.quizCode}
											</td>
											<td
												style={{
													border: "1px solid black",
													textAlign: "center",
												}}
											>
												{moment(
													item.submittedDate
												).format("DD-MM-YYYY")}
											</td>
											<td
												style={{
													border: "1px solid black",
													textAlign: "center",
												}}
											>
												{" "}
												<Link
													className='btn main-btn '
													to='/reviewTest'
													state={{
														quizId: item.quizResultId,
													}}
												>
													Review
												</Link>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
						{filteredData?.length === 0 && (
							<p className='m-0 text-center py-3 m-auto'>
								No test taken!
							</p>
						)}
					</main>
					{/* <button
						style={{
							margin: "auto",
							marginBottom: "20px",
						}}
						className='btn main-btn'
						data-bs-dismiss='modal'
						aria-label='close'
					>
						Back
					</button> */}
				</section>
			</section>
		</article>
	);
};

export default AlreadyTakenTest;
