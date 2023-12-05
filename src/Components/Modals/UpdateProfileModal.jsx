import { ImWarning } from "react-icons/im";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { profile } from "../../RouteConstants";

const UpdateProfileModal = () => {
	const { userProfileData } = useSelector((state) => state.postResp);

	return (
		userProfileData.length !== 0 &&
		userProfileData?.courseBeans[0]?.topicBeans?.length === 0 && (
			<div
				className='alert alert-warning alert-dismissible fade show'
				role='alert'
			>
				<div className='d-flex update-Remainder'>
					<p className='m-0'>
						<ImWarning /> &nbsp;Update your profile to select your
						subjects.&nbsp;
					</p>
					<Link
						className='blinking'
						style={{ color: "#7b1fa2", cursor: "pointer" }}
						to={profile}
					>
						<b>Update Profile</b>
					</Link>
				</div>
				<button
					type='button'
					className='close'
					data-dismiss='alert'
					aria-label='Close'
				>
					<span aria-hidden='true'>&times;</span>
				</button>
			</div>
		)
	);
};

export default UpdateProfileModal;
