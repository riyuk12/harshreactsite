const ExamComingSoon = ({ title, id, content }) => {
	return (
		<article
			className='modal fade'
			tabIndex='-1'
			id={id}
			role='dialog'
			aria-labelledby='exampleModalCenterTitle'
			aria-hidden='true'
		>
			<section className='modal-dialog modal-dialog-centered'>
				<section className='modal-content bg-logo'>
					<header className='modal-header modal-header-container'>
						<h5 className='m-0' style={{ color: "#7B1FA2" }}>
							{title}
						</h5>
						<button
							type='button'
							className='btn-close'
							data-bs-dismiss='modal'
							aria-label='Close'
						></button>
					</header>
					<main className='modal-body'>
						<p
							className='m-0 py-5 px-3'
							style={{ fontWeight: 500, fontSize: "18px" }}
						>
							{content}
						</p>
					</main>
					<footer className='modal-footer px-1 py-2 m-0'>
						<button
							type='button'
							className='btn main-btn'
							data-bs-dismiss='modal'
							aria-label='close'
						>
							Understood
						</button>
					</footer>
				</section>
			</section>
		</article>
	);
};

export default ExamComingSoon;
