import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { subscriptions } from "../../RouteConstants";
import { utilitySliceActions } from "../../Redux/Slice/UtilitySlice";
import SpecialClassesDetails from "./Modals/SpecialClassesDetails";

const SpecialProgramme = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { isEnrolledForVideo } = useSelector((state) => state.response);

	// const handleEnrollNow = () => {
	// 	dispatch(utilitySliceActions.setActiveSubscriptionTab(8));
	// 	navigate(subscriptions);
	// };

	return (
		<section>
			{/* <h3
				style={{
					fontSize: "20px",
					fontWeight: "600",
					color: "#7b1fa2",
				}}
			>
				Special Programme on REASONING
			</h3>
			<section
				className='p-3'
				style={{
					border: "2px solid #E1E1E1",
					borderRadius: "5px",
					height: "290px",
					overflow: "auto",
				}}
			>
				<p
					style={{
						fontSize: "17px",
						fontWeight: "600",
						margin: 0,
					}}
				>
					Live Classes on REASONING
				</p>
				<p
					style={{
						fontSize: "14px",
					}}
				>
					BESST is organising special live classes. This will cover
					the following topics:
					<br /> Numerical Reasoning, Verbal Reasoning, Inductive
					Reasoning, Situational Judgement, Logical Reasoning,
					Abstract Reasoning by Expert.
				</p>
				<p
					style={{
						fontSize: "14px",
					}}
				>
					Name of Expert: <b>Love Kaushik Sir.</b>
				</p>

				<div
					style={{
						display: "flex",
						justifyContent: "space-between",
						fontSize: "14px",
						fontWeight: "400",
					}}
				>
					<p className='m-0'>
						Started On:{" "}
						<b>
							17<sup>th</sup> April 2023
						</b>
						<br />
						Enroll by: <strong>Ended on 16th May 2023</strong>
						<br />
					</p>
					<p className='m-0'>
						Price: <b>₹300 INR </b>
						<br />
						Duration: <b>1 month</b>
					</p>
				</div>
				<p
					className='mb-2'
					style={{
						fontSize: "14px",
						fontWeight: "400",
					}}
				>
					Timings: (on students demand):{"  "}
					<b>9:00 PM to 10:00 PM on working days</b>
				</p>

				{isEnrolledForVideo ? (
					<button
						className='btn mr-2 '
						style={{
							backgroundColor: "#b464d9",
							color: "white",
							fontSize: "14px",
							fontWeight: "500",
						}}
						disabled
					>
						Already Enrolled
					</button>
				) : (
					
					<button
						className='btn mr-2 '
						data-bs-toggle='modal'
						data-bs-target='#eventConcluded'
						style={{
							backgroundColor: "#7b1fa2",
							border: "1px solid #7b1fa2",
							color: "white",
							fontSize: "14px",
							fontWeight: "600",
						}}
					>
						Concluded
					</button>
				)}
				<button
					className='btn knowmore'
					data-bs-toggle='modal'
					data-bs-target='#specialprogramdetails'
					style={{
						border: "1px solid #7b1fa2",
						color: "#7b1fa2",
						fontSize: "14px",
						fontWeight: "600",
					}}
				>
					Know More
				</button>
			</section> */}
			<SpecialClassesDetails />
		</section>
	);
};

export default SpecialProgramme;
