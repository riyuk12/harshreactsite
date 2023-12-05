import Cookies from "js-cookie";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { postResponseDataActions } from "../../../../Redux/Slice/PostResponseDataSlice";
import { PostProfileDataThunk } from "../../../../Redux/Thunks/Post/PostProfileDataThunk";
import { payHistory, studDashboard } from "../../../../RouteConstants";
import { utilitySliceActions } from "../../../../Redux/Slice/UtilitySlice";


const AuthMenu = () => {
	const { userProfileData, userProfileDataStatus } = useSelector(
		(state) => state.postResp
	);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	useEffect(() => {
	   
		//getting profile details
		if (Object.keys(userProfileData).length === 0) {
			if (Cookies.get("token")) {
				let data = {
					email: Cookies.get("email"),
					token: Cookies.get("token"),
				};
				dispatch(PostProfileDataThunk(data));
				if (userProfileDataStatus === 403) {
					Cookies.remove("token");
					Cookies.remove("email");
					Cookies.remove("userId");
					navigate("/");
				}
			} else {
				navigate("/");
			}
		}
	}, []);
	
	//handles logout functionality
	const handleLogout = () => {
		Cookies.remove("token");
		Cookies.remove("email");
		Cookies.remove("userId");
		Cookies.remove("cuetPromoFlag");
		Cookies.remove("subscription_redirection");
		Cookies.remove("preferredCourseId");
		localStorage.clear();
		dispatch(postResponseDataActions.clearUserProfileData());
		dispatch(utilitySliceActions.setIsAuthenticated(false));

		window.location.href = "/";

		
	};

	return (
		<div className='nav-item'>
			<div className='dropdown'>
				<button className='dropbtn'>
					{userProfileData.firstName &&
						userProfileData.firstName.split("")[0].toUpperCase()}
				</button>
				<div className='dropdown-content'>
					<Link to='/'>Home</Link>
					<Link to={studDashboard}>Dashboard</Link>
					<Link to={payHistory}> Payment History </Link>
					<Link to='/' onClick={handleLogout}>
						Logout
					</Link>
				</div>
			</div>
		</div>
	);
};

export default AuthMenu;
