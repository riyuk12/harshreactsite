import { useSelector } from "react-redux";

const SubjectSide = () => {
	const preferredCourse = localStorage.getItem("preferredCourse");
	const { preferredCourseDetails } = useSelector((state) => state.utils);

	return (
		<>
			<section className='subject-form-container'>
				<section className='subject-form'>
					<div className='d-flex justify-content-between align-items-center mt-2'>
						<p className='profile-label'>Course Name</p>
						<p
							className='profile-label modify-btn-link text-right'
							data-bs-toggle='modal'
							data-bs-target='#coursesModal'
						>
							Switch Course
						</p>
					</div>
					<p className='subject-data-container m-0'>
						{preferredCourse}
					</p>
					<div className='d-flex justify-content-between align-items-center mt-4 gap-2'>
						<p className='profile-label'>Available Subjects</p>
						<p className='profile-label modify-btn-link text-right'>
							Modify Course
						</p>
					</div>
					<section className='subject-data-container d-flex flex-column gap-3 mt-2'>
						{preferredCourseDetails?.map(({ topicBeans }) =>
							topicBeans.length === 0 ? (
								<p
									className='m-0 text-center py-3'
									style={{
										color: "#0000009A",
									}}
								>
									Subjects are temporarily unavailable. They
									will be added as soon as possible.
								</p>
							) : (
								topicBeans.map(({ topicName, topicId }) => (
									<div
										key={topicId}
										className='subject-check-container'
									>
										<p className='subject-topic m-0'>
											{topicName}
										</p>
									</div>
								))
							)
						)}
					</section>
				</section>
			</section>
		</>
	);
};

export default SubjectSide;
