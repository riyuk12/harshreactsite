import { AiOutlineSwap } from "react-icons/ai";

const SubjectSwitchHeader = () => {
	const preferredSubject = localStorage.getItem("preferredSubject");

	return (
		<article className='switch-course-container'>
			<button
				className='selected-course m-0 bg-white'
				style={{ cursor: "none" }}
				tabIndex={-1}
			>
				{preferredSubject}
			</button>
			<button
				className='m-0 switch-course'
				data-bs-toggle='modal'
				data-bs-target='#subjectModal'
				id='openSwitchSubjectModal'
			>
				<AiOutlineSwap />
				Change Subject
			</button>
		</article>
	);
};

export default SubjectSwitchHeader;
