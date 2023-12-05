import CourseDetails from "../Course/CourseDetails";

const CourseDetailsModal = () => {
	return (
		<article
			className='modal fade'
			id='courseDetailsModal'
			tabIndex='-1'
			aria-labelledby='courseDetailsModalLabel'
			aria-hidden='true'
		>
			<section className='modal-dialog modal-lg'>
				<section className='modal-content'>
					<header className='modal-header modal-header-container'>
						<h5 className='modal-title' id='staticBackdropLabel'>
							Course Details - CUET
						</h5>
						<button
							type='button'
							className='btn-close'
							data-bs-dismiss='modal'
							aria-label='Close'
						></button>
					</header>
					<main
						className='modal-body'
						style={{
							backgroundColor: "#FAFAFA",
							height: "550px",
							overflowY: "scroll",
							border: "1px solid #E1E1E1",
							margin: "15px",
						}}
					>
						<CourseDetails />
					</main>
				</section>
			</section>
		</article>
	);
};

export default CourseDetailsModal;
