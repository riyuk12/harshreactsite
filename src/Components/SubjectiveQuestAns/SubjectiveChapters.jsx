import { useDispatch, useSelector } from "react-redux";
import SubjectiveChaptersSkeleton from "./Skeletons/SubjectiveChaptersSkeleton";
import crownImage from "../../Assets/images/crown-solid 1.png";

const SubjectiveChapters = ({ selectedChapter, handleChapterChange }) => {
	const { chapters, isLoading } = useSelector((state) => state.response);
	const dispatch = useDispatch();

	if (isLoading.chaptersLoading) {
		return <SubjectiveChaptersSkeleton />;
	}
	return (
		<>
			<section
				className='chapters-container'
				style={{ background: "#F0F0F0", borderRadius: "8px" }}
			>
				<h5 className='d-flex justify-content-between align-items-center'>
					Chapters{" "}
				</h5>
				<div className='chapters-btn-container'>
					{chapters !== null && chapters.length !== 0 ? (
						chapters?.map(({ id, chapterName, premium, enableDisableField }) => (
							
							<button
								key={id}
								className={`chapter-name ${
									chapterName === selectedChapter
										? "active-chapters-btn"
										: ""
								}`}
								title={chapterName}
								onClick={() => handleChapterChange(id)}
							>
								{premium==1 ? <img className="crownImg" src={crownImage}></img>  : ''}
								{" " + chapterName}
							</button>
						))
					) : (
						<div className='fallback-message-paper limit-height'>
							<p
								className='m-0 text-center'
								style={{ fontSize: "14px" }}
							>
								No data found for selected subject! Try
								switching the subject from{" "}
								<span
									style={{
										textDecoration: "underline",
										cursor: "pointer",
									}}
									className='main-color fw-bold'
									data-bs-toggle='modal'
									data-bs-target='#subjectModal'
								>
									change subject
								</span>
								!
							</p>
						</div>
					)}
				</div>
			</section>
		</>
	);
};

export default SubjectiveChapters;
