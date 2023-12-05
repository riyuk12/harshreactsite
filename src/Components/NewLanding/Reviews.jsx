import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import { useSelector } from "react-redux";
import { useState } from "react";
import ReviewsModal from "./Modals/ReviewsModal";
import Carousel from "react-elastic-carousel";

// for react-elastic-carousel
const breakPoints = [
	{ width: 1, itemsToShow: 1 },
	{ width: 550, itemsToShow: 2 },
	{ width: 768, itemsToShow: 3 },
	{ width: 1200, itemsToShow: 3 },
];

const Reviews = () => {
	const { reviewsData } = useSelector((state) => state.response);

	return (
		<section className='reviews-container py-4 px-5' id='reviews'>
			<header>
				<h4 className='fs-2 text-center'>Reviews</h4>
			</header>
			<main className='text-right'>
				<a
					href='#ReviewsModal'
					data-toggle='modal'
					data-target='#ReviewsModal'
					className='text-uppercase main-color view-all-link'
				>
					view all
				</a>
				<section className='reviews-carousel-container'>
					{reviewsData.length > 0 && (
						<Carousel breakPoints={breakPoints}>
							{reviewsData.map(
								({ name, textContent, videoUrl }, index) => (
									<div
										key={index}
										className='bg-white w-100 mx-3 border rounded overflow-hidden'
									>
										<div className='ratio ratio-16x9'>
											<iframe
												src={videoUrl}
												title={name}
												className='video'
											></iframe>
										</div>
										<div className='p-4 reviews-text-content'>
											<h5>{name}</h5>
											<p>{textContent}</p>
										</div>
									</div>
								)
							)}
						</Carousel>
					)}
				</section>
			</main>
			<ReviewsModal />
		</section>
	);
};

export default Reviews;
