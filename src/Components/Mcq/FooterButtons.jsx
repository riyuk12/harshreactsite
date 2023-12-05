const FooterButtons = ({
	nextPrev,
	button1Text,
	button2Text,
	handleClickBtn1,
	handleClickBtn2,
}) => {
	return (
		<div className='btn-container'>
			<button
				className='btn-mcq'
				type='button'
				id='prevBtn'
				onClick={() => nextPrev(-1)}
			>
				Previous
			</button>

			<button
				className='btn-mcq'
				type='button'
				id='nextBtn'
				onClick={() => nextPrev(1)}
			>
				Next
			</button>

			<button
				className='btn-mcq'
				data-bs-toggle='modal'
				data-trigger='focus'
				data-bs-target='#leaveQuiz'
				id='openleaveQuiz'
				onClick={handleClickBtn1}
			>
				{button1Text}
			</button>

			<button
				className='btn-mcq'
				data-bs-toggle='modal'
				data-bs-target='#confirmQuiz'
				type='submit'
				id='submitbtn'
				onClick={handleClickBtn2}
			>
				{button2Text}
			</button>
		</div>
	);
};

export default FooterButtons;
