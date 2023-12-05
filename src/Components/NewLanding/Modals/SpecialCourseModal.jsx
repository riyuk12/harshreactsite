import { useState } from "react";
import { GrClose } from "react-icons/gr";
import { FaChevronUp } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { utilitySliceActions } from "../../../Redux/Slice/UtilitySlice";

const SpecialCourseModal = () => {
	const [isOpen, setIsOpen] = useState(true);
	const { courseDetailsData } = useSelector((state) => state.response);
	const dispatch = useDispatch();

	//required for online classes
	// const handleSingUpFromModal = () => {
	// 	document.querySelector("#particular-signup").click();
	// 	dispatch(
	// 		utilitySliceActions.setCourseSelectedFromModal("Online Classes")
	// 	);
	// };

	const handleSingUpFromModal = () => {
		document.querySelector("#particular-signup").click();
		dispatch(utilitySliceActions.setCourseSelectedFromModal("cuet"));
	};

	//required for Online classes
	// handles the click on know more button
	// const handleKnowMoreFromModal = () => {
	// 	document.querySelector("#courseUpdate-link").click();
	// 	const course = courseDetailsData.find(
	// 		(course) => course.courseId === 8
	// 	);

	// 	dispatch(
	// 		utilitySliceActions.setHighlightIndex(
	// 			courseDetailsData.indexOf(course)
	// 		)
	// 	);
	// };

	const handleKnowMoreFromModal = () => {
		document.querySelector("#viewSubsBtn").click();

		dispatch(utilitySliceActions.setHighlightIndex(8));
	};

	return (
		// <article className='special-programme-card'>
		// 	<header className='d-flex align-items-center justify-content-between'>
		// 		<h3 className='special-programme-heading'>Live Classes</h3>
		// 		<span
		// 			onClick={() => setIsOpen(false)}
		// 			style={{ cursor: "pointer" }}
		// 		>
		// 			<GrClose />
		// 		</span>
		// 	</header>
		// 	<main className='d-flex flex-column gap-2'>
		// 		<p className='special-programme-content'>
		// 			Live online classes on REASONING for all competitive
		// 			exams including CUET.
		// 		</p>
		// 		<section className='d-flex flex-column gap-2'>
		// 			<div className='d-flex justify-content-between'>
		// 				<p className='m-0'>
		// 					Start Date:{" "}
		// 					<strong>
		// 						17<sup>th</sup> April 2023
		// 					</strong>
		// 					<br />
		// 					Enroll by: <strong>Enrolment still open</strong>
		// 				</p>
		// 				<p className='m-0'>
		// 					Price: <strong>₹300 INR</strong>
		// 					<br />
		// 					Duration: <strong>1 month</strong>
		// 				</p>
		// 			</div>
		// 			<p className='m-0'>
		// 				Timings: (on students demand):{"  "}
		// 				<b>9:00 PM to 10:00 PM on working days</b>
		// 			</p>
		// 			<div className='d-flex gap-2'>
		// 				<button
		// 					className='btn main-btn-outline'
		// 					onClick={handleKnowMoreFromModal}
		// 				>
		// 					Know more
		// 				</button>
		// 				<button
		// 					className='btn main-btn'
		// 					onClick={handleSingUpFromModal}
		// 				>
		// 					Sign up
		// 				</button>
		// 			</div>
		// 		</section>
		// 	</main>
		// 	<footer>
		// 		<p
		// 			style={{
		// 				fontSize: "14px",
		// 				color: "#7b1fa2",
		// 				fontWeight: "800",
		// 			}}
		// 			className='mt-2 m-0'
		// 		>
		// 			Already registered with BESST? Enrollment details are
		// 			available on your dashboard.
		// 		</p>
		// 	</footer>
		// </article>
		<article
			className={`${
				isOpen
					? "special-programme-card"
					: "peek special-programme-card"
			}`}
		>
			<header className='d-flex align-items-center justify-content-between'>
				<h3 className='special-programme-heading'>
					CUET (PG) SOCIOLOGY
				</h3>
				{isOpen ? (
					<span
						onClick={() => setIsOpen(false)}
						style={{ cursor: "pointer" }}
					>
						<GrClose />
					</span>
				) : (
					<span
						onClick={() => setIsOpen(true)}
						style={{ cursor: "pointer" }}
					>
						<FaChevronUp />
					</span>
				)}
			</header>
			<main className='d-flex flex-column gap-2'>
				<section>
					<p className='m-0'>
						Besst is offering CAPSULE COURSE for CUET (PG) SOCIOLOGY 2024.{" "}
						<strong className='main-color'>
							Book your seat now.
						</strong>
					</p>
				</section>
				<section>
					<p className='m-0'>
						<strong>You get:</strong>
					</p>
					<ol className='mb-2'>
						<li>Live Class</li>
						<li>Notes</li>
						<li>Mock Tests</li>
						<li>Reading Materials</li>
						<li>Live quiz</li>
					</ol>
					{/* <p className='m-0'>
						Special Offer{" "}
						<strong className='blinking'>80% off </strong>{" "}
						<strong className='main-color blinking'>
							Hurry!!!
						</strong>
					</p> */}
				</section>
				<section className='d-flex flex-column gap-2'>
					{/* <div className='d-flex justify-content-between'>
						<p className='m-0'>
							Price:{" "}
							<strong>
								<del>₹3000</del>{" "}
								<span className='blinking'>₹600 INR</span>
							</strong>
						</p>
						<p className='m-0'>
							Duration: <strong>1 month</strong>
						</p>
					</div> */}
					<div className='d-flex gap-2'>
						<button
							className='btn main-btn-outline'
							onClick={handleKnowMoreFromModal}
						>
							Know more
						</button>
						<button
							className='btn main-btn'
							onClick={handleSingUpFromModal}
						>
							Sign up
						</button>
					</div>
				</section>
			</main>
			<footer>
				<p
					style={{
						fontSize: "14px",
						color: "#7b1fa2",
						fontWeight: "800",
					}}
					className='mt-2 m-0'
				>
					Already registered for CUET? visit subscription on your
					dashboard and look for crash course.
				</p>
			</footer>
		</article>
	);
};

export default SpecialCourseModal;
