const AuthButtons = () => {
	return (
		<div className='auth-btn-container'>
			<button
				className='btn main-btn-outline px-4 py-2'
				type='button'
				id='particular-signup'
				data-bs-toggle='modal'
				data-bs-target='#registerationModal'
			>
				Sign up
			</button>

			<button
				className='btn main-btn-outline main-btn px-4 py-2'
				type='button'
				id='particular-login'
				data-bs-toggle='modal'
				data-bs-target='#login'
			>
				Sign In
			</button>
		</div>
	);
};

export default AuthButtons;
