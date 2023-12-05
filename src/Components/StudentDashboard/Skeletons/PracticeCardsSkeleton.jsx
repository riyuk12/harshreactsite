const PracticeCardsSkeleton = () => {
	return (
		<div className='card-skeleton-container'>
			{[0, 1, 2, 3, 4, 5, 6].map((item) => (
				<div key={item} className='card-skeleton'>
					<div className='card-profile skeleton-bg'></div>
					<div className='card-title skeleton-bg'></div>
				</div>
			))}
		</div>
	);
};

export default PracticeCardsSkeleton;
