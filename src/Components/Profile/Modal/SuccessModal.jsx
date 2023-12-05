import { Link } from "react-router-dom";

import { studDashboard } from "../../../RouteConstants";

const SuccessModal = () => {
	return (
		<article
			className='modal fade'
			id='updateProfileModal'
			tabIndex='-1'
			aria-labelledby='updateProfileLabel'
			aria-hidden='true'
		>
			<section className='modal-dialog'>
				<section className='modal-content'>
					<header className='modal-header modal-header-container '>
						<h5 className='modal-title' id='updateProfileLabel'>
							Success!
						</h5>
						<button
							type='button'
							className='btn-close'
							data-bs-dismiss='modal'
							aria-label='Close'
						></button>
					</header>
					<main className='modal-body mx-auto'>
						<h5 className='mb-4'>Your Profile is updated!</h5>
						<div className='d-flex justify-content-between'>
							<Link
								className='btn main-btn '
								data-mdb-dismiss='modal'
								to={studDashboard}
							>
								Dashboard
							</Link>
							<button
								className='btn main-btn'
								data-bs-dismiss='modal'
							>
								Stay
							</button>
						</div>
					</main>
				</section>
			</section>
		</article>
	);
};

export default SuccessModal;
