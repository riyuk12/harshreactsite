const ConfirmSubmissionModal = ({ submitQuiz }) => {
	return (
		<article
			className='modal fade'
			id='confirmQuiz'
			tabIndex='-1'
			aria-labelledby='loginModalLabel'
			aria-hidden='true'
		>
			<section className='modal-dialog'>
				<section className='modal-content'>
					<header className='modal-header modal-header-container'>
						<h5
							className='modal-title fs-sm-5 fs-6'
							id='loginModalLabel'
						>
							Quiz Submission
						</h5>
						<button
							type='button'
							className='btn-close'
							data-bs-dismiss='modal'
							aria-label='close'
						></button>
					</header>
					<main className='modal-body mx-auto'>
						<p className='m-0 fs-sm-5'>
							Are you sure you want to submit the quiz ?
						</p>
						<div className='btn-container'>
							<button
								type='submit'
								className='btn main-btn '
								data-mdb-dismiss='modal'
								id='submitbtn'
								onClick={(e) => {
									e.preventDefault();
									submitQuiz(e);
								}}
							>
								Yes
							</button>
							<button
								type='button'
								className='btn main-btn '
								data-bs-dismiss='modal'
								aria-label='Close'
							>
								No
							</button>
						</div>
					</main>
				</section>
			</section>
		</article>
	);
};

export default ConfirmSubmissionModal;
