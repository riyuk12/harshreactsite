import { AiFillFlag } from "react-icons/ai";
import parse from "html-react-parser";

const McqQuestions = ({
	items,
	i,
	AnswerSet,
	answerAttempt,
	bookMark,
	clearAnswerSet,
}) => {
	return (
		<div style={{ position: "relative" }} className='py-3 px-2 my-3'>
			<article
				className={`${i % 2 === 0 ? "light-bg-img" : "dark-bg-img"}`}
			>
				<div className='bookmark-question positioning-of-flag'>
					<p
						onClick={(e) => {
							bookMark(e, items.quesId, "mcq");
						}}
					>
						<AiFillFlag style={{ pointerEvents: "none" }} />
					</p>
				</div>
				<p
					className={`${"m" + i} questions-mcq-mobile`}
					style={{ fontWeight: "500" }}
				>
					Q{items.questionNumber}.&nbsp;&nbsp;
					{parse(String(items.question))}
				</p>
				{items.optionBeans.map((answer, key) => (
					<section
						className='form-check form-check-media'
						style={{ marginLeft: "25px" }}
						key={key}
					>
						<input
							type='radio'
							className='form-check-input'
							id={answer.optionId}
							name={items.quesId}
							value={answer.optionId}
							ariaValueText={items.optionBeans.optionId}
							onChange={(e) => {
								AnswerSet(e, "mcq", i);
								answerAttempt(items.quesId, "mcq");
							}}
						/>
						<label
							className='form-check-label questions-mcq-mobile'
							htmlFor={answer.optionId}
						>
							<p>{parse(String(answer.optionValue))}</p>
						</label>
					</section>
				))}
				<div className='clear-bookmark'>
					<div
						className='clear-mcq-selection'
						onClick={() => {
							clearAnswerSet(items.quesId, "mcq");
							const ele = document.getElementsByName(
								`${items.quesId}`
							);
							for (let i = 0; i < ele.length; i++)
								ele[i].checked = false;
						}}
					>
						Clear
					</div>
				</div>
			</article>
		</div>
	);
};

export default McqQuestions;
