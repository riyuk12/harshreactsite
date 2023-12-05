import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetChaptersThunk } from "../../../Redux/Thunks/Get/GetChaptersThunk";
import Cookies from "js-cookie";
import { responseDataActions } from "../../../Redux/Slice/ResponseDataSlice";

const SwitchSubjectModal = () => {
	const { topicList } = useSelector((state) => state.response);
	const [selectedSubjectId, setSelectedSubjectId] = useState();
	const preferredSubject = localStorage.getItem("preferredSubject");
	const dispatch = useDispatch();

	//to handle the submission of new subject
	const handleSubmit = () => {
		dispatch(responseDataActions.clearChapters());
		const activeTopic = topicList.find(
			(subject) => subject.topicId === selectedSubjectId
		);
		localStorage.setItem("preferredSubject", activeTopic.topicName);
		dispatch(
			GetChaptersThunk({
				token: Cookies.get("token"),
				id: activeTopic.topicId,
			})
		);
		dispatch(responseDataActions.clearQuestAnswers());
	};

	//checking preferredSubject by default
	useEffect(() => {
		if (topicList && topicList.length !== 0) {
			const activeTopic = topicList.find(
				(subject) => subject.topicName === preferredSubject
			);

			setSelectedSubjectId(activeTopic.topicId);
		}
	}, [topicList]);

	return (
		<article
			className='modal fade'
			id='subjectModal'
			tabIndex='-1'
			role='dialog'
			aria-labelledby='subjectModalLabel'
			aria-hidden='true'
		>
			<section
				className='modal-dialog modal-dialog-centered modal-dialog-scrollable'
				role='document'
			>
				<section className='modal-content'>
					<header className='modal-header modal-header-container'>
						<h5 className='modal-title'>Change Subject</h5>
						<button
							type='button'
							className='btn-close'
							data-bs-dismiss='modal'
							aria-label='Close'
						></button>
					</header>

					<main className='modal-body'>
						<form className='switch-course-form'>
							{topicList?.map(({ topicName, topicId }) => (
								<section key={topicId} className='course'>
									<input
										type='radio'
										name='course'
										id={topicName}
										value={topicName}
										checked={selectedSubjectId === topicId}
										onChange={(e) =>
											setSelectedSubjectId(topicId)
										}
									/>
									<label
										className='m-0 py-1 pl-2'
										htmlFor={topicName}
									>
										{topicName}
									</label>
								</section>
							))}
						</form>
					</main>
					<footer className='modal-footer py-1 px-3'>
						<button
							type='button'
							className='btn main-btn px-3 py-2'
							data-bs-dismiss='modal'
							onClick={handleSubmit}
						>
							Submit
						</button>
					</footer>
				</section>
			</section>
		</article>
	);
};

export default SwitchSubjectModal;
