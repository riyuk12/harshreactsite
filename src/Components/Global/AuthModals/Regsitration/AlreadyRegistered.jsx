import { useSelector } from "react-redux";

const AlreadyRegistered = ({ clearSignup, clearLogin }) => {
	const { alreadyRegisteredMessage } = useSelector((state) => state.utils);
	const handleClose = () => {
		clearLogin();
		clearSignup();
	};

	return (
		<article
			className='modal fade'
			id='existRegister'
			tabIndex='-1'
			data-bs-backdrop='static'
			data-bs-keyboard='false'
			aria-labelledby='existRegisterLabel'
			aria-hidden='true'
		>
			<button
				id='openexistRegisterModel'
				style={{ display: "none" }}
				data-bs-toggle='modal'
				data-bs-target='#existRegister'
			></button>
			<section className='modal-dialog'>
				<section className='modal-content'>
					<header className='modal-header modal-header-container'>
						<button
							type='button'
							className='btn-close'
							data-bs-dismiss='modal'
							aria-label='Close'
							onClick={handleClose}
						></button>
					</header>
					<section className='modal-body d-flex flex-column align-items-center gap-2 p-4'>
						<p className='text-center fs-6'>
							{alreadyRegisteredMessage}
						</p>
						<button
							className='btn main-btn fs-6'
							data-bs-dismiss='modal'
							data-bs-toggle='modal'
							data-bs-target='#login'
							onClick={handleClose}
						>
							Go to Login
						</button>
					</section>
				</section>
			</section>
		</article>
	);
};

export default AlreadyRegistered;
