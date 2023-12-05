import { Link } from "react-router-dom";
import { studDashboard } from "../../../RouteConstants";

const LeaveQuizModal = () => {
	return (
		<article
			className='modal fade'
			id='leaveQuiz'
			tabIndex='-1'
			aria-labelledby='loginModalLabel'
			aria-hidden='true'
		>
			<section className='modal-dialog'>
				<section className='modal-content'>
					<header className='modal-header modal-header-container'>
						<h5 className='modal-title' id='loginModalLabel'>
							Leave Quiz
						</h5>
						<button
							type='button'
							className='btn-close'
							data-bs-dismiss='modal'
							aria-label='Close'
						></button>
					</header>
					<main className='modal-body mx-auto'>
						<p className='m-0 fs-5'>
							Are you sure you want to leave quiz ?
						</p>
						<div className='btn-container'>
							<Link
								className='btn main-btn '
								data-mdb-dismiss='modal'
								to={studDashboard}
							>
								Yes
							</Link>
							<button
								type='button'
								className='btn main-btn'
								data-bs-dismiss='modal'
								aria-label='close'
							>
								No
							</button>
						</div>
					</main>
				</section>
			</section>
		</article>
	);
};

export default LeaveQuizModal;
