import { useNavigate } from "react-router";

import Fail from "../../Assets/Error.png";
import { subscriptions } from "../../RouteConstants";

export default function PaymentError({ profileData, orderId }) {
	const navigate = useNavigate();
	return (
		<>
			<div id='content' className='align-self-center fs-4 fs-md-3'>
				<p>
					<strong>Error</strong>
				</p>
				<p className='pb-3'>
					Something has gone wrong, please try again
				</p>
				<div className='mt-4'>
					<button
						className='btn btn-secondary mr-2 mt-2 fs-5'
						onClick={() => navigate(subscriptions)}
					>
						Retry again
					</button>
				</div>
			</div>
			{/* transaction-img */}
			<div className='pb-2'>
				<img src={Fail} alt='success' width={55} />
			</div>
		</>
	);
}
