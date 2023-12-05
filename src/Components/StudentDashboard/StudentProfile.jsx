import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { useSelector } from "react-redux";
import { profile } from "../../RouteConstants";
import StudentProfileSkeleton from "./Skeletons/StudentProfileSkeleton";

const StudentProfile = () => {
	const [percentage, setPercentage] = useState("0%");
	const { userProfileData, isLoading } = useSelector(
		(state) => state.postResp
	);

	//setting percentage
	useEffect(() => {
		setPercentage(
			Number(userProfileData?.profile?.split(".")[0]) > 100
				? 100
				: userProfileData?.profile?.split(".")[0]
		);
	}, [userProfileData]);

	if (isLoading.profileDataLoading) {
		return <StudentProfileSkeleton />;
	}

	return (
		<section
			className='profile bg-white rounded-2 d-flex gap-4 gap-sm-2'
			style={{
				maxHeight: "150px",
				minHeight: "150px",
				maxWidth: "400px",
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
					<CircularProgressbar
						styles={buildStyles({
							textColor: "purple",
							pathColor: "purple",
							trailColor: "white",
							backgroundColor: "rgb(239, 239, 239)",
						})}
						background
						strokeWidth={5}
						pathColor={"red"}
						value={percentage}
						text={`${percentage}%`}
					></CircularProgressbar>
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
				<h5
					className='fw-bold m-0'
					style={{
						fontSize: "20px",
						color: "black",
					}}
				>
					{userProfileData.firstName}
				</h5>
				<p
					className='m-0'
					style={{
						fontSize: "14px",
						fontWeight: "500",
						color: "#4F4F4F",
					}}
				>
					{userProfileData.lastName}
				</p>
				<Link className='btn updateProfile px-3 py-1' to={profile}>
					Update Profile
				</Link>
			</div>
		</section>
	);
};

export default StudentProfile;
