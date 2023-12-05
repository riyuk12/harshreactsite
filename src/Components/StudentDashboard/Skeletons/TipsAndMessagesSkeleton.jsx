const TipsAndMessagesSkeleton = () => {
	return (
		<section
			className='bg-white rounded-2 d-flex align-items-center flex-fill message p-2'
			style={{ maxHeight: "150px", minHeight: "150px" }}
		>
			<article
				id='carouselExampleIndicators'
				className='carousel slide d-flex justify-content-center align-items-center'
				data-bs-ride='carousel'
				style={{ minHeight: "100px" }}
			>
				<section className='carousel-inner'>
					<div className='carousel-item active'>
						<div className='p-1 d-flex flex-column align-items-center'>
							<h5 className='animate-charcter1 fw-bold m-0'>
								Message :
							</h5>
							<div className='skeleton-bg name-skeleton'></div>
							<div className='skeleton-bg small-name-skeleton mt-2'></div>
						</div>
					</div>
				</section>
			</article>
		</section>
	);
};

export default TipsAndMessagesSkeleton;
