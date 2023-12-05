import { useState, useEffect, useRef } from "react";
import { AiOutlineSwap } from "react-icons/ai";
import { useSelector } from "react-redux";

const CourseSwitch = () => {
	const [isTourModalOneOpen, setIsTourModalOneOpen] = useState(false);
	const [isTourModalTwoOpen, setIsTourModalTwoOpen] = useState(false);
	const preferredCourse = localStorage.getItem("preferredCourse");
	const { userProfileData, isLoading } = useSelector(
		(state) => state.postResp
	);
	const { courses } = useSelector((state) => state.response);
	const tourModalOneRef = useRef(null);
	const tourModalTwoRef = useRef(null);

	//to check weather the user has came for the first time on the page so that we can show the tour
	const visited = localStorage.getItem("visited");
	useEffect(() => {
		if (!visited) {
			tourModalOneRef.current.style.zIndex = 9999;
			setIsTourModalOneOpen(true);
			localStorage.setItem("visited", true);
			document.querySelector("body").classList.add("overflow-hidden");
		}
	}, [visited]);

	//sets the preferred cousrse when user first logs in
	useEffect(() => {
		const preferedCourseId = userProfileData.preferredCourseId;
		const courseDetails = courses?.filter(
			(course) => course.courseId === preferedCourseId
		);
		courseDetails?.map(({ courseName }) =>
			localStorage.setItem("preferredCourse", courseName)
		);
	}, [userProfileData]);

	//executes when ok, got it is clicked on first tour modal
	const handleOpenTourTwo = () => {
		setIsTourModalOneOpen(false);
		tourModalOneRef.current.style.zIndex = 9;
		tourModalTwoRef.current.style.zIndex = 9999;
		setIsTourModalTwoOpen(true);
	};

	//executes when last modal is clicked
	const handleEndTour = () => {
		setIsTourModalTwoOpen(false);
		tourModalTwoRef.current.style.zIndex = 9;
		document.querySelector("body").classList.remove("overflow-hidden");
	};

	return (
		<article className='course-switch-container'>
			<section className='tour-container' ref={tourModalOneRef}>
				{isTourModalOneOpen && (
					<div className='tour-modal'>
						<div className='indicator'></div>
						<p>
							Selected Course Dashboard name appears here to
							locate the current course page here.
						</p>
						<button
							className='btn main-btn-outline py-1 px-2'
							onClick={handleOpenTourTwo}
						>
							Ok, Got it!
						</button>
					</div>
				)}
				{isLoading.profileDataLoading ? (
					<div
						className='skeleton-bg selected-course'
						style={{
							height: "25px",
							width: "300px",
							borderRadius: "6px",
						}}
					></div>
				) : (
					<button className='selected-course m-0' tabIndex={-1}>
						{preferredCourse}
					</button>
				)}
			</section>
			<section className='tour-container' ref={tourModalTwoRef}>
				{isTourModalTwoOpen && (
					<div className='tour-modal-2'>
						<div className='indicator-2'></div>
						<p>
							You can switch between the courses you've added to
							your account
						</p>
						<button
							className='btn main-btn-outline px-2 py-1'
							onClick={handleEndTour}
						>
							Ok, Got it!
						</button>
					</div>
				)}
				<button
					className='m-0 switch-course'
					data-bs-toggle='modal'
					data-bs-target='#coursesModal'
					id='openSwitchCourseModal'
					disabled={isTourModalTwoOpen}
					tabIndex={isTourModalTwoOpen || isTourModalOneOpen ? -1 : 1}
				>
					<AiOutlineSwap />
					Switch Courses
				</button>
			</section>
			{(isTourModalOneOpen || isTourModalTwoOpen) && (
				<div className='backdrop'></div>
			)}
		</article>
	);
};

export default CourseSwitch;
