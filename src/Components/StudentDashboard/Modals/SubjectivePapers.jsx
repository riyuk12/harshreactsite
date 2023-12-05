import { useNavigate } from "react-router";
import { routes } from "../../../RouteConstants";
import { useSelector } from "react-redux";

const SubjectivePapers = () => {
	const { topicList } = useSelector((state) => state.response);
	const preferredCourseName = localStorage.getItem("preferredCourse");
	const navigate = useNavigate();

	const handleView = (id) => {
		const activeTopic = topicList.find(
			(item) => Number(item.topicId) === Number(id)
		);
		localStorage.setItem("preferredSubject", activeTopic.topicName);
		navigate(routes.subjectiveQuest);
	};

	return (
		<article
			className='modal fade'
			id='subjectiveModal'
			tabIndex='-1'
			aria-labelledby='subjectiveModalLabel'
			aria-hidden='true'
		>
			<section className='modal-dialog modal-dialog-scrollable downloadModal'>
				<section className='modal-content bg-logo'>
					<header className='modal-header modal-header-container'>
						<h5 className='modal-title main-color'>
							Available Subjects
						</h5>
						<button
							id='closeModal'
							type='button'
							className='btn-close'
							data-bs-dismiss='modal'
							aria-label='Close'
						></button>
					</header>
					<main className='modal-body'>
						<h4 className='m-0 mb-3' style={{ fontSize: "18px" }}>
							{preferredCourseName}
						</h4>
						<section className='d-flex flex-column gap-2'>
							{topicList.map(({ topicName, topicId }) => (
								<div
									className='test-available-design'
									key={topicId}
								>
									<h5
										className='m-0'
										style={{
											fontSize: "16px",
										}}
									>
										{topicName}
									</h5>
									<button
										className='btn main-btn'
										onClick={() => handleView(topicId)}
										data-bs-dismiss='modal'
									>
										View
									</button>
								</div>
							))}
						</section>
					</main>
				</section>
			</section>
		</article>
	);
};

export default SubjectivePapers;
