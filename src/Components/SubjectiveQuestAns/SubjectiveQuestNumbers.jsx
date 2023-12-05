import { useSelector } from "react-redux";

const SubjectiveQuestNumbers = ({ answerRefs }) => {
	const { subjectiveQuestionAns } = useSelector((state) => state.response);

	// handle scrolling of corresponding question in to view
	const handleClick = (id) => {
		const headerOffset = 180;
		const elementPosition =
			answerRefs.current[id].getBoundingClientRect().top;
		const offsetPosition =
			elementPosition + window.pageYOffset - headerOffset;
		window.scrollTo({
			top: offsetPosition,
			behavior: "smooth",
		});
	};

	return (
		subjectiveQuestionAns !== null &&
		subjectiveQuestionAns.length !== 0 && (
			<article className='p-1 question-number-container'>
				{subjectiveQuestionAns.map((item, index) => (
					<button
						key={item.id}
						className='btn btn-que selection-btn-stand-mcq'
						onClick={() => handleClick(index)}
					>
						{index + 1}
					</button>
				))}
			</article>
		)
	);
};

export default SubjectiveQuestNumbers;
