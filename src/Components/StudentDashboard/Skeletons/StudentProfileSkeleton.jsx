const StudentProfileSkeleton = () => {
	return (
		<section
			className='profile bg-white rounded-2 d-flex gap-4 gap-sm-2'
			style={{
				maxHeight: "150px",
				minHeight: "150px",
				fontWeight: 900,
			}}
		>
			<div className='d-flex align-items-center justify-content-center flex-column gap-2'>
				<div
					style={{
						width: "80px",
						height: "80px",
						borderRadius: "100%",
						fontWeight: 800,
					}}
				>
					<div className='skeleton-bg card-profile'></div>
				</div>
				<span
					style={{
						fontSize: "14px",
					}}
				>
					Completed
				</span>
			</div>
			<div className='profile-details px-sm-3'>
				<div
					className='skeleton-bg name-skeleton '
					style={{ width: "60%" }}
				></div>
				<div className='skeleton-bg name-skeleton'></div>
				<div className='btn updateProfile px-3 py-1'>
					Update Profile
				</div>
			</div>
		</section>
	);
};

export default StudentProfileSkeleton;
