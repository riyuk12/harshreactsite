const SuccessfulRegistration = () => {
	return (
		<div
			className='modal fade'
			id='successRegister'
			tabIndex='-1'
			aria-labelledby='loginModalLabel'
			aria-hidden='true'
		>
			<div className='modal-dialog'>
				<div className='modal-content'>
					<div className='modal-header'>
						<span
							className='text-center ms-auto'
							style={{ fontWeight: "bold" }}
						>
							Congratulations!{" "}
						</span>{" "}
						<h5 className='modal-title' id='loginModalLabel'></h5>
						<button
							type='button'
							className='btn-close'
							data-bs-dismiss='modal'
							aria-label='Close'
						></button>
					</div>
					<div className='modal-body mx-auto'>
						<div
							style={{
								paddingLeft: "28px",
								paddingRight: "28px",
								width: "386px",
							}}
						>
							<h1
								style={{
									fontSize: "16px",
									fontWeight: 400,
									lineHeight: "24px",
									color: "#000000",
								}}
								className='text-center'
							>
								{" "}
								You are successfully registered. Please login
								and start practicing the tests created by our
								panel
							</h1>{" "}
						</div>
						<div
							className='mb-3 d-flex justify-content-center'
							style={{ marginTop: "40px" }}
						>
							<button
								className='btn main-btn '
								data-mdb-dismiss='modal'
								data-bs-toggle='modal'
								data-bs-target='#login'
							>
								Click here to Login
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SuccessfulRegistration;
