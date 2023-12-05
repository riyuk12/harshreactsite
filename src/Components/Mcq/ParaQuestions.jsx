import logo from "../../Assets/images/logo.png";
import white from "../../Assets/images/white.svg";
import { AiFillFlag } from "react-icons/ai";
import parse from "html-react-parser";

const ParaQuestions = ({
	item,
	index,
	AnswerSet,
	answerAttempt,
	bookMark,
	clearAnswerSet,
}) => {
	return (
		<>
			<h2>{item.topicName ? item.topicName : ""}</h2>
			<article
				style={{
					fontSize: "20px",
					color: "black",
					backgroundColor: "white !important",
					padding: "10px 0",
				}}
			>
				{item.specialInstruction}
			</article>
			<div style={{ position: "relative" }} className='dark-bg-img'>
				<p
					className={`p-3 m-0 ${
						"para_ques" + index
					} questions-mcq-mobile fw-bold`}
				>
					{parse(String(item.paragraph_desc))}
				</p>
			</div>
			{item.pgQuesmasters.map((items, i) => (
				<div
					style={{ position: "relative" }}
					key={i}
					className='py-3 px-2 my-3'
				>
					<article
						className={`${
							i % 2 === 0 ? "dark-bg-img" : "light-bg-img"
						}`}
					>
						<div className='bookmark-question positioning-of-flag'>
							<p
								onClick={(e) => {
									bookMark(e, items.quesId, "para");
								}}
							>
								<AiFillFlag style={{ pointerEvents: "none" }} />
							</p>
						</div>
						<p
							className={`${
								"para" + i + index
							} questions-mcq-mobile`}
							style={{ fontWeight: "500" }}
						>
							Q{items.questionNumber}.&nbsp;&nbsp; &nbsp;
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
									ariaValueText={answer.optionId}
									value={answer.optionId}
									onChange={(e) => {
										AnswerSet(e, "para", index);
										answerAttempt(items.quesId, "para");
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
								className='clear-mcq-selection bookmark-question'
								onClick={() => {
									clearAnswerSet(items.quesId, "para", index);
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
			))}
		</>
	);
};

export default ParaQuestions;
