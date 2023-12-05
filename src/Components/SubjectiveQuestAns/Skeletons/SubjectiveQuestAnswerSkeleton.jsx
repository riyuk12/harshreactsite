const SubjectiveQuestAnswerSkeleton = () => {
	return (
		<section className='paper-side'>
			<section
				className='paper-container'
				style={{ background: "#F0F0F0", borderRadius: "8px" }}
			>
				<div
					className='d-flex justify-content-between align-items-sm-center align-items-start gap-2 gap-sm-4 pb-2 mb-4 flex-column flex-sm-row'
					style={{ borderBottom: "1px solid purple" }}
				>
					<div className='name-skeleton skeleton-bg'></div>
				</div>
				<div className='question-ans-container-wrapper'>
					{[0, 1, 2, 3, 4, 5].map((item) => (
						<div
							className='question-answer-container light-bg-img'
							style={{ height: "200px" }}
						>
							<div className='subjective-qusetion-container skeleton-bg small-name-skeleton'></div>
							<div className='subjective-answer-container pulse-animation answer-container-skeleton'></div>
						</div>
					))}
				</div>
			</section>
			<div className='prev-nxt-btn-container'>
				<button className='btn main-btn'>Previous</button>
				<button className='btn main-btn'>Next</button>
			</div>
		</section>
	);
};

export default SubjectiveQuestAnswerSkeleton;
