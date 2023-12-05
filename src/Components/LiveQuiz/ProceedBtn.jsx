import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { utilitySliceActions } from "../../Redux/Slice/UtilitySlice";

const ProceedBtn = ({
	name,
	quizId,
	courseId,
	endTime,
	quizDate,
	isInsChecked,
	quizStartTime,
	isQuizLive,
}) => {
	const [countdown, setCountdown] = useState("");
	const [isButtonDisabled, setIsButtonDisabled] = useState(false);
	const { isRedirectedOnce } = useSelector((state) => state.utils);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	// console.log(quizDate, quizStartTime, name);

	// console.log(quizStartTime, "-------))");

	useEffect(() => {
		const interval = setInterval(() => {
			const now = new Date();
			const quizDateTime = new Date(`${quizDate}T${quizStartTime}`);
			// const quizDateTime = new Date(`${quizDate}T${"10:29"}`);
			const diff = quizDateTime - now;

			if (diff <= 0) {
				clearInterval(interval);
				setCountdown("Proceed");
				setIsButtonDisabled(false);
				if (isInsChecked && !isButtonDisabled && !isRedirectedOnce) {
					handleStartLiveQuiz();
					dispatch(utilitySliceActions.setIsRedirectedOncetrue());
				}
			} else {
				const hours = String(
					Math.floor(diff / (1000 * 60 * 60))
				).padStart(2, "0");
				const minutes = String(
					Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
				).padStart(2, "0");
				const seconds = String(
					Math.floor((diff % (1000 * 60)) / 1000)
				).padStart(2, "0");
				setCountdown(`Auto starting in ${hours}:${minutes}:${seconds}`);
				setIsButtonDisabled(true);
			}
		}, 1000);

		return () => clearInterval(interval);
	}, [isInsChecked]);

	console.log(isInsChecked, isButtonDisabled, "---");

	const handleStartLiveQuiz = () => {
		navigate("/StudentExamTestMcq", {
			state: {
				name: name,
				quizId: quizId,
				courseId: courseId,
				endTime: endTime,
				quizDate: quizDate,
				quizStartTime: quizStartTime,
				isQuizLive: isQuizLive,
			},
		});
	};

	return (
		<button
			type='button'
			className='btn btn-success align-center'
			style={{
				width: "250px",
				color: "white",
				zIndex: 999,
			}}
			disabled={!isInsChecked || isButtonDisabled}
			onClick={handleStartLiveQuiz}
		>
			{countdown}
		</button>
	);
};

export default ProceedBtn;
