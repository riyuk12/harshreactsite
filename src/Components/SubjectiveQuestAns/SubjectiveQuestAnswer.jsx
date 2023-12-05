import { useDispatch, useSelector } from "react-redux";
import parse from "html-react-parser";
import { useState } from "react";
import { useEffect } from "react";
import { FaChevronLeft, FaChevronRight, FaLock } from "react-icons/fa";
import { utilitySliceActions } from "../../Redux/Slice/UtilitySlice";
import SubjectiveQuestAnswerSkeleton from "./Skeletons/SubjectiveQuestAnswerSkeleton";
import crownImage from "../../Assets/images/crown-solid 1.png";
import { subscriptions } from "../../RouteConstants";
import { useNavigate, useLocation } from "react-router-dom";

const SubjectiveQuestAnswer = ({
	eng,
	both,
	langs,
	assamese,
	language,
	answerRefs,
	selectedChapter,
	handleChapterChange,
}) => {
	const navigate = useNavigate();
	const location = useLocation();
	const [activeChapterIndex, setActiveChapterIndex] = useState(eng);
	const { subjectiveQuestionAns, chapters, isLoading } = useSelector(
		(state) => state.response
	);
	const { isChapterVisible } = useSelector((state) => state.utils);
	const dispatch = useDispatch();

	useEffect(() => {
		let index = chapters?.findIndex(
			(chapter) => chapter.chapterName === selectedChapter
		);
		setActiveChapterIndex(index);
	}, [chapters, selectedChapter]);

	// handles previous chapter activation
	const handlePrevChapter = () => {
		console.log(activeChapterIndex);
		handleChapterChange(chapters[activeChapterIndex - 1].id);
	};

	// handles next chapter activation
	const handleNextChapter = () => {
		console.log(activeChapterIndex);
		handleChapterChange(chapters[activeChapterIndex + 1].id);
	};

	if (isLoading.subjectiveQuestionAnswersLoading) {
		return <SubjectiveQuestAnswerSkeleton />;
	}

	return (
		<section className='paper-side'>
			<section
				className='paper-container'
				style={{ background: "#F0F0F0", borderRadius: "8px" }}
			>
				<div
					className='d-flex justify-content-between align-items-center pb-2 mb-4'
					style={{ borderBottom: "1px solid purple" }}
				>
					<h5 className='m-0'>Chapter: {selectedChapter}</h5>
					<div className='d-flex align-items-center gap-2'>
						<div>
							{isChapterVisible ? (
								<span
									title='hide chapters'
									className='toggle-chapter-btn'
									onClick={() =>
										dispatch(
											utilitySliceActions.toggleChaptersVisibility()
										)
									}
								>
									<FaChevronRight />
								</span>
							) : (
								<span
									title='show chapters'
									className='toggle-chapter-btn'
									onClick={() =>
										dispatch(
											utilitySliceActions.toggleChaptersVisibility()
										)
									}
								>
									<FaChevronLeft />
								</span>
							)}
						</div>
					</div>
				</div>
				<div className='question-ans-container-wrapper'>
					{subjectiveQuestionAns !== null &&
					subjectiveQuestionAns?.length !== 0 ? (
						console.log("subjectiveQuestionAns",subjectiveQuestionAns),
						subjectiveQuestionAns.map(
							(
								{
									id,
									answer,
									question,
									answerAnoLang,
									questionAnoLang,
									enableDisableField,
									premium
								},
								index
							) => (
								enableDisableField == 0 ?
								<div
									key={id}
									id={index}
									ref={(el) =>
										(answerRefs.current[index] = el)
									}
									className='question-answer-container disable-bg'
								>
									{premium==1 ? <img className="crownImg-right" src={crownImage}></img>  : ''}
									<button
										type="button"
										className="btn main-btn px-4 d-block disable-btn"
										data-toggle="modal"
										data-target={
										location.pathname !== "/subscription" &&
										"#StateCheckModal"
										}
										onClick={() => {
										navigate(subscriptions);
										}}
									>
										<FaLock /> Subscribe 
									</button>
									<div className='fw-bold subjective-qusetion-container blur'>
										{(language === eng ||
											language === both) && (
											<div className='eng-question  gap-2'>
												<span>Q{index + 1}.</span>
												What is Lorem Ipsum?
											</div>
										)}
										{(language === assamese ||
											language === both) && (
											<div className='other-question  gap-2'>
												{language !== both && (
													<span>Q{index + 1}.</span>
												)}
												{questionAnoLang
													? parse(
															String(
																questionAnoLang
															)
													  )
													: "এই ভাষাত এতিয়াও উপলব্ধ নহয়"}
											</div>
										)}
									</div>
									<div className='subjective-answer-container blur'>
										<span className='fw-bold main-color'>
											{language === assamese
												? "উত্তৰ:"
												: "Answer:"}
										</span>
										{(language === eng ||
											language === both) && (
											<div className='eng-answer'>
												Lorem Ipsum is simply dummy text of the printing and typesetting industry.
											</div>
										)}
										{(language === assamese ||
											language === both) && (
											<div className='other-answer'>
												{answerAnoLang
													? parse(
															String(
																answerAnoLang
															)
													  )
													: "এই ভাষাত এতিয়াও উপলব্ধ নহয়"}
											</div>
										)}
									</div>
									
								</div>
								:
								<div
									key={id}
									id={index}
									ref={(el) =>
										(answerRefs.current[index] = el)
									}
									className='question-answer-container light-bg-img'
								>
									<div className='fw-bold subjective-qusetion-container'>
										{(language === eng ||
											language === both) && (
											<div className='eng-question  gap-2'>
												<span>Q{index + 1}.</span>
												{parse(String(question))}
											</div>
										)}
										{(language === assamese ||
											language === both) && (
											<div className='other-question  gap-2'>
												{language !== both && (
													<span>Q{index + 1}.</span>
												)}
												{questionAnoLang
													? parse(
															String(
																questionAnoLang
															)
													  )
													: "এই ভাষাত এতিয়াও উপলব্ধ নহয়"}
											</div>
										)}
									</div>
									<div className='subjective-answer-container'>
										<span className='fw-bold main-color'>
											{language === assamese
												? "উত্তৰ:"
												: "Answer:"}
										</span>
										{(language === eng ||
											language === both) && (
											<div className='eng-answer'>
												{parse(String(answer))}
											</div>
										)}
										{(language === assamese ||
											language === both) && (
											<div className='other-answer'>
												{answerAnoLang
													? parse(
															String(
																answerAnoLang
															)
													  )
													: "এই ভাষাত এতিয়াও উপলব্ধ নহয়"}
											</div>
										)}
									</div>
								</div>
							)
						)
					) : (
						<div className='fallback-message-paper'>
							<p
								className='m-0 text-center'
								style={{ maxWidth: "350px" }}
							>
								No data found for selected chapter! Try{" "}
								<span className='main-color fw-bold'>
									changing chapters!
								</span>{" "}
								or{" "}
								<span
									style={{
										textDecoration: "underline",
										cursor: "pointer",
									}}
									className='main-color fw-bold'
									data-bs-toggle='modal'
									data-bs-target='#subjectModal'
								>
									changing subject
								</span>
							</p>
						</div>
					)}
				</div>
			</section>
			<div className='prev-nxt-btn-container'>
				<button
					disabled={
						activeChapterIndex === 0 || activeChapterIndex < 0
					}
					className='btn main-btn'
					onClick={handlePrevChapter}
				>
					Previous
				</button>
				<button
					disabled={activeChapterIndex === chapters?.length - 1}
					className='btn main-btn'
					onClick={handleNextChapter}
				>
					Next
				</button>
			</div>
		</section>
	);
};

export default SubjectiveQuestAnswer;
