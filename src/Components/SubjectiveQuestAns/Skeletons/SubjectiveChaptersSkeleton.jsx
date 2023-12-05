import { FaChevronRight } from "react-icons/fa";

const SubjectiveChaptersSkeleton = () => {
	return (
		<section
			className='chapters-container'
			style={{ background: "#F0F0F0", borderRadius: "8px" }}
		>
			<h5 className='d-flex justify-content-between align-items-center'>
				Chapters{" "}
				<span title='hide chapters' className='toggle-chapter-btn'>
					<FaChevronRight />
				</span>
			</h5>
			<div className='chapters-btn-container'>
				<div className='skeleton-bg full-w-skeleton'></div>
				<div className='skeleton-bg full-w-skeleton'></div>
				<div className='skeleton-bg full-w-skeleton'></div>
				<div className='skeleton-bg full-w-skeleton'></div>
				<div className='skeleton-bg full-w-skeleton'></div>
			</div>
		</section>
	);
};

export default SubjectiveChaptersSkeleton;
