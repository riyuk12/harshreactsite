import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GoLinkExternal } from "react-icons/go";
import parse from "html-react-parser";
import Swal from "sweetalert2";

import { subscriptions } from "../../../RouteConstants";
import CourseDetails from "./CourseDetails";
import { utilitySliceActions } from "../../../Redux/Slice/UtilitySlice";
import { useSwiper } from "swiper/react";
import usePreferredCourseId from "../../../Utils/usePreferredCourseId";

const data = [
	{
		id: 1,
		url: `https://cdnasb.samarth.ac.in/site-admin23/pn/IBCUETUG2023.pdf`,
		title: "Information Bulletin",
	},
	{
		id: 2,
		url: `https://cuet.samarth.ac.in/index.php/site/syllabus`,
		title: "Syllabus",
	},
	{
		id: 3,
		url: `https://cuet.samarth.ac.in/index.php/app/info/universities`,
		title: "Universities",
	},
	{
		id: 4,
		url: `https://cuet.samarth.ac.in/index.php/app/registration/instructions`,
		title: "Application Guide",
	},
	{
		id: 5,
		url: `https://cdnasb.samarth.ac.in/site-admin23/pn/FAQs+for+CUET+(UG)+-+2023+as+on+12+March+2023.pdf`,
		title: "FAQ’s",
	},
	{
		id: 6,
		url: `https://cuet.samarth.ac.in/index.php/site/contact`,
		title: "Contact us",
	},
];

const fallbackMessage = "No information available right now...";

const CourseActive = ({ item, index, slideIndex }) => {
	const [isLinksContainerOpen, setIsLinksContainerOpen] = useState(true);
	const [width, setWidth] = useState(window.innerWidth);
	const { highlightIndex } = useSelector((state) => state.utils);
	const dispatch = useDispatch();
	const swiper = useSwiper();
	const preferredCourseId = usePreferredCourseId();

	useEffect(() => {
		const handleWindowSizeChange = () => {
			setWidth(window.innerWidth);
		};
		window.addEventListener("resize", handleWindowSizeChange);

		return () => {
			window.removeEventListener("resize", handleWindowSizeChange);
		};
	}, []);

	useEffect(() => {
		///static
		if (highlightIndex === 3) {
			swiper.slideTo(highlightIndex);
		}

		setTimeout(() => {
			dispatch(utilitySliceActions.setHighlightIndex(0));
		}, 200);
	}, [highlightIndex]);

	useEffect(() => {
		if (width <= 700) {
			setIsLinksContainerOpen(false);
		} else {
			setIsLinksContainerOpen(true);
		}
	}, [width]);

	const handleClick = (item) => {
		Swal.fire({
			title: "You are being redirected to an external website.",
			showCancelButton: true,
			confirmButtonText: "OK",
			denyButtonText: `Cancel`,
		}).then((result) => {
			if (result.isConfirmed) {
				window.open(`${item}`, "_blank");
			} else if (result.isDenied) {
				Swal.fire("Changes are not saved", "", "info");
			}
		});
	};

	const handleViewSubscription = (id) => {
		dispatch(utilitySliceActions.setActiveSubscriptionTab(id));
	};

	return (
		<article
			className={`course-slide-container ${
				index === slideIndex
					? "slide slide-active p-3 overflow-hidden"
					: "slide p-3 overflow-hidden bg-white"
			}`}
		>
			<section className='course-details-header-container'>
				<div className='d-flex flex-column gap-1'>
					<h4 className='m-0'>{item.courseHead}</h4>
					<span>{item.courseSubHead}</span>
				</div>
				<div className='course-details-header-links-container'>
					{preferredCourseId !== item.courseId && (
						<button
							type='button'
							className={"btn main-btn"}
							data-bs-toggle='modal'
							data-bs-target='#registerationModal'
						>
							Enroll For Free
						</button>
					)}

					<Link
						style={{
							cursor: "pointer",
							textDecoration: "underline",
							textUnderlineOffset: "2px",
							margin: "0px",
							color: "black",
						}}
						to={subscriptions}
						onClick={() => handleViewSubscription(item.courseId)}
					>
						View Subscription Plans
					</Link>
				</div>
			</section>
			<section className='main-course-details-container'>
				<div className='course-details'>
					<div
						className='nav nav-tabs flex-nowrap p-2 gap-1 cousre-details-tabs-container'
						id='myTab'
						role='tablist'
					>
						<button
							className='nav-link active d-flex gap-2 align-items-center'
							id='course-details-tab'
							data-bs-toggle='tab'
							data-bs-target={`#course-details-section-${index}`}
							type='button'
							role='tab'
							aria-controls={`#course-details-section-${index}`}
							aria-selected='true'
						>
							Course Details
							{Number(item.courseId) === 1 && (
								<GoLinkExternal
									data-bs-target='#courseDetailsModal'
									data-bs-toggle='modal'
									size='25'
									color='#7B1FA2'
								/>
							)}
						</button>
						<button
							className='nav-link'
							id='date-tab'
							data-bs-toggle='tab'
							data-bs-target={`#date-section-${index}`}
							type='button'
							role='tab'
							aria-controls={`date-section-${index}`}
							aria-selected='false'
						>
							Dates
						</button>
						<button
							className='nav-link'
							id='update-tab'
							data-bs-toggle='tab'
							data-bs-target={`#update-section${index}`}
							type='button'
							role='tab'
							aria-controls={`update-section${index}`}
							aria-selected='false'
						>
							Updates
						</button>
						<button
							className='nav-link'
							id='review-tab'
							data-bs-toggle='tab'
							data-bs-target={`#review-section-${index}`}
							type='button'
							role='tab'
							aria-controls={`review-section-${index}`}
							aria-selected='false'
						>
							Reviews
						</button>
					</div>
					<div
						className='tab-content p-md-3'
						id='myTabContent'
						style={{ height: "365px", overflowY: "auto" }}
					>
						<div
							className='tab-pane fade show active p-3'
							style={{ textAlign: "justify" }}
							role='tabpanel'
							id={`course-details-section-${index}`}
							aria-labelledby={`course-details-section-${index}`}
						>
							{Number(item.courseId) !== 1 ? (
								parse(String(item.courseDetails))
							) : (
								<CourseDetails />
							)}
						</div>
						<div
							className='tab-pane fade h-100'
							role='tabpanel'
							id={`date-section-${index}`}
							aria-labelledby={`date-section-${index}`}
						>
							{item.impDateArr.length !== 0 ? (
								item.impDateArr.map((date, idx) => (
									<div
										key={idx}
										className='px-3 py-2 border d-flex justify-content-between align-items-center rounded mb-2'
									>
										<div>
											<h6 className='mb-1'>
												{date.detailsHead}
											</h6>
											<p className='fs-6 m-0'>
												{date.detailsHeadDescription}
											</p>
										</div>
										<a
											href={date.linksHtmlContent}
											target='_blank'
										>
											click here
										</a>
									</div>
								))
							) : (
								<div className='not-available-fallback'>
									<p>{fallbackMessage}</p>
								</div>
							)}
						</div>
						<div
							className='tab-pane fade h-100'
							id={`update-section${index}`}
							role='tabpanel'
							aria-labelledby={`update-section${index}`}
						>
							{item.impUpdateArr.length !== 0 ? (
								item.impUpdateArr.map((date, idx) => (
									<div
										key={idx}
										className='px-3 py-2 border d-flex justify-content-between align-items-center rounded mb-2'
									>
										<div>
											<h6 className='mb-1'>
												{date.detailsHead}
											</h6>
											<p className='fs-6 m-0'>
												{date.detailsHeadDescription}
											</p>
										</div>
										<a
											href={date.linksHtmlContent}
											target='_blank'
										>
											click here
										</a>
									</div>
								))
							) : (
								<div className='not-available-fallback'>
									<p>{fallbackMessage}</p>
								</div>
							)}
						</div>
						<div
							className='tab-pane fade h-100'
							id={`review-section-${index}`}
							role='tabpanel'
							aria-labelledby={`review-section-${index}`}
						>
							{item.reviews.length !== 0 ? (
								item.reviews.map((date, idx) => (
									<div
										key={idx}
										className='px-3 py-2 border d-flex justify-content-between align-items-center rounded mb-2'
									>
										<div>
											<h6 className='mb-1'>
												{date.detailsHead}
											</h6>
											<p className='fs-6 m-0'>
												{date.detailsHeadDescription}
											</p>
										</div>
										<a
											href={date.linksHtmlContent}
											target='_blank'
										>
											click here
										</a>
									</div>
								))
							) : (
								<div className='not-available-fallback'>
									<p>{fallbackMessage}</p>
								</div>
							)}
						</div>
					</div>
				</div>
				{Number(item.courseId) === 1 && (
					<>
						<div
							className='external-course-details-links-container'
							id='myTabContent'
						>
							{isLinksContainerOpen ? (
								<>
									{data.map((item, index) => (
										<p
											key={index}
											className='external-course-details-links'
											onClick={() => {
												handleClick(item.url);
											}}
										>
											→&#160; {item.title}
										</p>
									))}
									{width <= 700 && (
										<button
											className='toggle-external-links-btn'
											onClick={() =>
												setIsLinksContainerOpen(
													!isLinksContainerOpen
												)
											}
										>
											{">"}
										</button>
									)}
								</>
							) : (
								<button
									className='toggle-external-links-btn'
									onClick={() =>
										setIsLinksContainerOpen(
											!isLinksContainerOpen
										)
									}
								>
									{"<"}
								</button>
							)}
						</div>
					</>
				)}
			</section>
		</article>
	);
};

export default CourseActive;
