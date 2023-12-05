const UpcommingClassesSkeleton = () => {
	return (
		<div
			style={{
				backgroundColor: "white",
				borderRadius: "5px",
				height: "350px",
			}}
			className='details px-3 pb-3 pt-0 flex-grow-1'
		>
			<section className='live-section-heading-container'>
				<div className='live-section-heading'>
					<h4
						className='m-0'
						style={{
							fontSize: "20px",
							fontWeight: "600",
							color: "#7b1fa2",
						}}
					>
						Live Online Classes
					</h4>
					<p className='m-0 skeleton-bg course-name-skeleton'></p>
				</div>
				<div className='dropdown'>
					<button
						className='dropdown-toggle classes-dropdown-btn'
						role='button'
						type='button'
						id='dropdownMenu2'
						style={{ border: "none" }}
						data-bs-toggle='dropdown'
						aria-expanded='false'
					>
						All
					</button>
				</div>
			</section>
			<section className='d-flex flex-column gap-2 video-series'>
				<article className='skeleton-bg rec-live-classes-skeleton'>
					<p className='m-0 text-center main-color fw-bold'></p>
				</article>
				<article className='skeleton-bg rec-live-classes-skeleton'>
					<p className='m-0 text-center main-color fw-bold'></p>
				</article>
				<article className='skeleton-bg rec-live-classes-skeleton'>
					<p className='m-0 text-center main-color fw-bold'></p>
				</article>
				<article className='skeleton-bg rec-live-classes-skeleton'>
					<p className='m-0 text-center main-color fw-bold'></p>
				</article>
			</section>
		</div>
	);
};

export default UpcommingClassesSkeleton;
