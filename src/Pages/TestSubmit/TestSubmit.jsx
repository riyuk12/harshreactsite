import { Link, useLocation } from "react-router-dom";

import AvailableTests from "../../Components/StudentDashboard/Modals/AvailableTests";
import OneLinerFooter from "../../Components/Global/Footers/OneLinerFooter";
import useRemoveModal from "../../Components/useRemoveModal";
import Header from "../../Components/Global/Navigation/Header";
import { studDashboard } from "../../RouteConstants";
import "../StudentMCQ/StudentMCQ.css";
import "./testSubmit.css";

function TestSubmit() {
	const location = useLocation();
	const { data } = location.state;
	useRemoveModal();

	return (
		<>
			{/* <Header /> */}
			<main className='main-test-preview-container'>
				<article className='test-preview-container'>
					<section>
						<h4 className='test-preview-heading'>
							Test submitted successfully
						</h4>
						<div className='test-preview-details-container'>
							<p className='one-line-detail'>
								Total Questions :{" "}
								<span className='fw-bold'>
									{data.totalQuest}
								</span>
							</p>
							<p className='one-line-detail'>
								Maximum Marks :{" "}
								<span className='fw-bold'>
									{data.totalMarks}
								</span>
							</p>
							<p className='one-line-detail'>
								Correct Questions :{" "}
								<span className='fw-bold'>
									{data.correctQues}
								</span>
							</p>
							<p className='one-line-detail'>
								Marks Obtained :{" "}
								<span className='fw-bold'>
									{data.positiveMarks}
								</span>
							</p>
							<p className='one-line-detail'>
								Time Taken :{" "}
								<span className='fw-bold'>
									{data.timeTaken}
								</span>
							</p>
						</div>
					</section>
					<section className='footer-test-preview-btn-container'>
						<Link className='btn main-btn' to={studDashboard}>
							Dashboard
						</Link>
						<div className='test-preview-btn-wrapper'>
							<button
								type='button'
								className='btn main-btn '
								data-bs-toggle='modal'
								data-bs-target='#exampleModal'
							>
								Take More Tests
							</button>
							<Link
								className='btn main-btn'
								to='/reviewTest'
								state={{ quizId: data.quizResultId }}
							>
								Review
							</Link>
						</div>
					</section>
				</article>
			</main>
			<AvailableTests
				route={"/viewTest"}
				id={"exampleModal"}
				name={"Test"}
			/>
			<OneLinerFooter />
		</>
	);
}

export default TestSubmit;
