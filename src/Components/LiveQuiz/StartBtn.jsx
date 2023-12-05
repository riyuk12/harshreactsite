import { useEffect, useState } from "react";
import { AiFillLock } from "react-icons/ai";
import { useNavigate } from "react-router";
import { subscriptions } from "../../RouteConstants";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const StartBtn = ({
	quizDate,
	quizId,
	quizStartTime,
	premium,
	enableDisableField,
	endTime,
	isAttemptFlag,
}) => {
	const currentDate = new Date().toISOString().split("T")[0];
	const [countdown, setCountdown] = useState("");
	const [minutesDiff, setMinuteDiff] = useState("");
	const { sortedQuiz, isInsChecked } = useSelector((state) => state.utils);

	const navigate = useNavigate();

	const [quizEndTime, setQuizEndTime] = useState(false);

	//get the endtime for the quiz
	useEffect(() => {
		const startDateTime = new Date(`${quizDate}T${quizStartTime}`);
		const endDateTime = new Date(startDateTime.getTime() + endTime * 60000); // convert examTime minutes in milliseconds

		const formattedEndTime = endDateTime.toLocaleTimeString([], {
			hour: "2-digit",
			minute: "2-digit",
			hour12: false,
		});
		setQuizEndTime(formattedEndTime);
	}, [quizDate, quizStartTime]);
	// console.log(quizEndTime, "quizEndTimequizEndTime-----");

	const now = new Date();
	const targetTime = new Date(
		now.getFullYear(),
		now.getMonth(),
		now.getDate(),
		quizStartTime.split(":")[0],
		quizStartTime.split(":")[1]
		// "10",
		// "23"
	);

	//quiz end time
	const end_time = new Date();
	if (quizEndTime) {
		end_time.setHours(quizEndTime?.split(":")[0]);
		end_time.setMinutes(quizEndTime?.split(":")[1]);
		// end_time.setHours(15);
		// end_time.setMinutes(24);
		end_time.setSeconds(0);
	}

	useEffect(() => {
		const interval = setInterval(() => {
			const now = new Date();
			const targetTime = new Date(
				now.getFullYear(),
				now.getMonth(),
				now.getDate(),
				quizStartTime.split(":")[0],
				quizStartTime.split(":")[1]
				// "10",
				// "23"
			);

			const timeDiff = targetTime - now;
			const diff = Math.floor(timeDiff / (1000 * 60)); // Calculate the time difference in minutes
			setMinuteDiff(diff);

			let currDate = new Date();
			// Format the current date as "YYYY-MM-DD" and the current time as "HH:MM"
			const formattedCurrentDate = currDate.toISOString().split("T")[0];
			const formattedCurrentTime = currDate.toLocaleTimeString("en-US", {
				hour12: false,
			});

			// Find the object matching the current date and time
			const matchingQuiz = sortedQuiz.find((quiz) => {
				return (
					quiz.liveQuizStartDate === formattedCurrentDate &&
					quiz.liveQuizStartTime >= formattedCurrentTime
				);
			});

			if (diff <= 9) {
				clearInterval(interval);
				setCountdown("Go to quiz");
				// handleRedirect(matchingQuiz?.quizId);  ===auto redirect
			} else {
				const hours = Math.floor(timeDiff / (1000 * 60 * 60))
					.toString()
					.padStart(2, "0");
				const minutes = Math.floor(
					(timeDiff % (1000 * 60 * 60)) / (1000 * 60)
				)
					.toString()
					.padStart(2, "0");
				const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000)
					.toString()
					.padStart(2, "0");
				setCountdown(`Go to quiz in ${hours}:${minutes}:${seconds}`);
			}
		}, 1000);

		return () => clearInterval(interval);
	}, [navigate]);

	// useEffect(() => {
	// 	const interval = setInterval(() => {
	// 		const now = new Date();
	// 		const targetTime = new Date(
	// 			now.getFullYear(),
	// 			now.getMonth(),
	// 			now.getDate(),
	// 			quizStartTime.split(":")[0],
	// 			quizStartTime.split(":")[1]
	// 			// "15",
	// 			// "00"
	// 		);

	// 		let currDate = new Date();

	// 		// Format the current date as "YYYY-MM-DD" and the current time as "HH:MM"
	// 		const formattedCurrentDate = currDate.toISOString().split("T")[0];
	// 		const formattedCurrentTime = currDate.toLocaleTimeString("en-US", {
	// 			hour12: false,
	// 		});

	// 		// Find the object matching the current date and time
	// 		const matchingQuiz = sortedQuiz.find((quiz) => {
	// 			return (
	// 				quiz.liveQuizStartDate === formattedCurrentDate &&
	// 				quiz.liveQuizStartTime >= formattedCurrentTime
	// 			);
	// 		});

	// 		console.log(matchingQuiz, "------matchingQuiz"); // Output the matching object

	// 		if (now >= targetTime) {
	// 			clearInterval(interval);
	// 			setCountdown("Started");
	// 			handleRedirect(matchingQuiz?.quizId);
	// 		} else {
	// 			const timeDiff = targetTime - now;
	// 			const hours = Math.floor(timeDiff / (1000 * 60 * 60))
	// 				.toString()
	// 				.padStart(2, "0");
	// 			const minutes = Math.floor(
	// 				(timeDiff % (1000 * 60 * 60)) / (1000 * 60)
	// 			)
	// 				.toString()
	// 				.padStart(2, "0");
	// 			const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000)
	// 				.toString()
	// 				.padStart(2, "0");
	// 			setCountdown(`starting in ${hours}:${minutes}:${seconds}`);
	// 		}
	// 	}, 1000);

	// 	return () => clearInterval(interval);
	// }, [navigate]);

	const handleRedirect = (id) => {
		const activeQuiz = sortedQuiz.find((item) => id === item.quizId);
		// console.log(activeQuiz, "active-redirect");
		navigate("/quiz-instructions", {
			state: {
				name: activeQuiz.title,
				quizId: activeQuiz.quizId,
				courseId: activeQuiz.courseId,
				endTime: activeQuiz.maxTime,
				quizDate: activeQuiz.liveQuizStartDate,
				quizStartTime: activeQuiz.liveQuizStartTime,
				isQuizLive: activeQuiz.liveQuizFlag,
				liveQuizInstruction: activeQuiz.liveQuizInstruction,
			},
		});
	};

	return (
		<>
			{premium == 1 && enableDisableField == 0 ? (
				<Link
					type='button'
					to={subscriptions}
					disabled={
						String(currentDate) !== String(quizDate) ||
						minutesDiff >= 10 ||
						minutesDiff <= 0
					}
					className='btn main-btn start-btn-view-test'
				>
					<AiFillLock size={20} />{" "}
					<span>
						{currentDate < quizDate
							? "coming soon"
							: currentDate === quizDate && now > end_time
							? "expired"
							: currentDate === quizDate && countdown}
					</span>
				</Link>
			) : (
				<button
					onClick={() => handleRedirect(quizId)}
					style={{
						width: "155px",
						fontSize: "13px",
					}}
					disabled={
						String(currentDate) !== String(quizDate) ||
						minutesDiff >= 10 ||
						now > end_time
						// isAttemptFlag
					}
					type='button'
					className='btn main-btn start-btn-view-test'
				>
					<span>
						{currentDate < quizDate
							? "coming soon"
							: currentDate === quizDate && now > end_time
							? "expired"
							: currentDate === quizDate && countdown}
					</span>
				</button>
			)}
		</>
	);
};

export default StartBtn;
