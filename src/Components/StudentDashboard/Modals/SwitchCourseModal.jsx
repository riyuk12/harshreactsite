import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetCoursesThunk } from "../../../Redux/Thunks/Get/GetCoursesThunk";
import { PostPreferredCourseThunk } from "../../../Redux/Thunks/Post/PostPreferredCourse";
import { postResponseDataActions } from "../../../Redux/Slice/PostResponseDataSlice";

const SwitchCourseModal = () => {
	const [selectedCourseId, setSelectedCourseId] = useState(1);
	const dispatch = useDispatch();
	const { userProfileData } = useSelector((state) => state.postResp);
	const { courses } = useSelector((state) => state.response);

	//to handle the submission of new course
	const handleSubmit = () => {
		const data = {
			...userProfileData,
			preferredCourseId: String(selectedCourseId),
		};
		dispatch(
			PostPreferredCourseThunk({ data, token: Cookies.get("token") })
		);

		localStorage.setItem("preferredCourseId", selectedCourseId);

		courses.map((course) => {
			if (course.courseId === selectedCourseId) {
				localStorage.setItem("preferredCourse", course.courseName);
			}
		});

		dispatch(postResponseDataActions.clearDownloadMaterial());
		if (userProfileData.preferredCourseId !== selectedCourseId) {
			localStorage.removeItem("visited");
		}
		window.location.reload();
	};

	useEffect(() => {
		dispatch(GetCoursesThunk({ token: Cookies.get("token") }));
	}, []);

	//checking preferredCourse by default
	useEffect(() => {
		setSelectedCourseId(userProfileData?.preferredCourseId);
	}, [userProfileData]);

	return (
		<article
			className='modal fade'
			id='coursesModal'
			tabIndex='-1'
			role='dialog'
			aria-labelledby='exampleModalLabel'
			aria-hidden='true'
		>
			<section
				className='modal-dialog modal-dialog-centered'
				role='document'
			>
				<section className='modal-content'>
					<header className='modal-header modal-header-container'>
						<h5 className='modal-title'>Switch Course</h5>
						<button
							type='button'
							className='btn-close'
							data-bs-dismiss='modal'
							aria-label='Close'
						></button>
					</header>

					<main className='modal-body'>
						<form className='switch-course-form'>
							{courses?.map(({ courseId, courseName }) => (
								<section key={courseId} className='course'>
									<input
										type='radio'
										name='course'
										id={courseName}
										value={courseName}
										checked={selectedCourseId === courseId}
										onChange={(e) =>
											setSelectedCourseId(courseId)
										}
									/>
									<label
										className='m-0 py-1 pl-2'
										htmlFor={courseName}
									>
										{courseName}
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

export default SwitchCourseModal;
