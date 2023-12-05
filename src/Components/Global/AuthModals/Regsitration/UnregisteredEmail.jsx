const UnregisteredEmail = ({
	clearForgotPassword,
	clearLogin,
	setUserDetailsForForgotPassword,
}) => {
	return (
		<article
			className='modal fade'
			id='notRegister'
			tabIndex='-1'
			aria-labelledby='loginModalLabel'
			aria-hidden='true'
			data-bs-backdrop='static'
			data-bs-keyboard='false'
		>
			<button
				id='opennotRegisterModel'
				data-bs-toggle='modal'
				data-bs-target='#notRegister'
				onClick={() => {
					clearLogin();
					clearForgotPassword();
				}}
			></button>
			<section className='modal-dialog'>
				<section className='modal-content'>
					<header className='modal-header modal-header-container'>
						<button
							type='button'
							className='btn-close'
							data-bs-dismiss='modal'
							aria-label='Close'
						></button>
					</header>
					<main className='modal-body mx-auto'>
						<section
							style={{
								paddingLeft: "28px",
								paddingRight: "28px",
								width: "386px",
							}}
						>
							<p className='text-center'>
								Unregistered email id.
								<span
									type='button'
									data-bs-toggle='modal'
									data-bs-target='#forgotpassword'
									className='link-style pointer ml-1'
									style={{ fontSize: "16px" }}
									onClick={() => {
										clearLogin();
										clearForgotPassword();
									}}
								>
									Try again
								</span>
							</p>
						</section>
						<section className='d-flex justify-content-center align-items-center my-4'>
							<hr
								style={{
									width: "40%",
								}}
							/>
							<span className='mr-2 ms-2'>or</span>
							<hr
								style={{
									width: "40%",
								}}
							/>
						</section>
						<section className='mb-3 d-flex justify-content-center align-items-center gap-3'>
							<p
								className='text-center link-style m-0'
								style={{ fontSize: "16px" }}
							>
								Not registered?
							</p>
							<button
								className='btn main-btn '
								data-mdb-dismiss='modal'
								data-bs-toggle='modal'
								data-bs-target='#registerationModal'
								onClick={() => {
									clearLogin();
									clearForgotPassword();
								}}
							>
								Sign up
							</button>
						</section>
					</main>
				</section>
			</section>
		</article>
	);
};

export default UnregisteredEmail;
