import React from "react";
import { useSelector } from "react-redux";
import { ImYoutube2 } from "react-icons/im";

const ReviewsModal = () => {
	const { reviewsData } = useSelector((state) => state.response);

	return (
		<article
			className='modal fade'
			id='ReviewsModal'
			aria-labelledby='#ReviewsModal'
			tabIndex='-1'
			aria-hidden='true'
		>
			<section className='modal-dialog modal-lg modal-dialog-scrollable'>
				<div className='modal-content'>
					<header className='modal-header'>
						<button
							type='button'
							data-dismiss='modal'
							className='btn-close'
							data-bs-dismiss='modal'
							aria-label='Close'
						></button>
					</header>
					<main className='modal-body'>
						<section className='d-flex flex-column text-center gap-4 justify-content-evenly'>
							{reviewsData.map(
								({ id, name, videoUrl, textContent }) => (
									<section
										key={id}
										className='bg-white w-100 border rounded overflow-hidden'
									>
										<div className='ratio ratio-16x9'>
											<iframe
												src={videoUrl}
												title={name}
												className='yb-player-icon'
											></iframe>
										</div>
										<div className='p-4'>
											<p className='mb-0 fw-bolder'>
												{name}
											</p>
											<p>{textContent}</p>
										</div>
									</section>
								)
							)}
						</section>
					</main>
					<footer className='modal-footer d-flex justify-content-center fw-bolder fs-6 p-0'>
						<a
							href='https://www.youtube.com/channel/UCOWq3a0_HYLFYj7ZqWAjSeA'
							target='_blank'
						>
							For More Videos Please Visit{"   "}
							<ImYoutube2 size={55} color='red' /> Channel
						</a>
					</footer>
				</div>
			</section>
		</article>
	);
};

export default ReviewsModal;
