import { click } from "@testing-library/user-event/dist/click";

import { useEffect } from "react";
import "./StudentMCQ.css";
export default function QuestionButton({
	clickBtn,
	setCurrentQuestion,
	currentQuestion,
	handleVisited,
}) {
	function move_up() {
		console.log(currentQuestion, "currentqustion>");

		document.getElementById("buttonscroll").scrollTop += 50;
	}

	function move_down() {
		document.getElementById("buttonscroll").scrollTop -= 50;
	}
	useEffect(() => {
		console.log(currentQuestion, "currentqustion");
		if (currentQuestion == 46) {
			move_up();
		}
		if (currentQuestion == 45) {
			move_down();
		}
	}, [currentQuestion]);
	const handleChangeQuestion = (e) => {
		console.log(Number(e.target.id), currentQuestion, "ExamQuizSummuryMCQ");
		const prev = currentQuestion;
		setCurrentQuestion(Number(e.target.id));
		localStorage.setItem("currentQuestion", Number(e.target.id));

		if (Number(e.target.id) !== currentQuestion) {
			handleVisited(currentQuestion, prev);
		}
	};
	const handleStyle = (btnProps) => {
		const styles = {
			// border: "1px solid #4F4F4F",
			background: "#EEEEEE",
			height: "35px",
			width: "35px",
		};
		if (btnProps.number === currentQuestion)
			styles.border = "2px solid red";
		if (btnProps.markAndSave) {
			styles.border = "rgb(92, 184, 91)";
			styles.color = "white";
			styles.background = "#34B601";
			styles.clipPath = "polygon(0 0%, 100% 20%, 100% 85%, 0%100%)";
		}
		if (btnProps.markReview) {
			styles.color = "white";
			styles.background = "#4E2695";
			styles.borderRadius = "80px";
			styles.color = "white";
		}
		if (btnProps.saveAndReview) {
			styles.color = "white";
			styles.background = "#4E2695";
			styles.borderRadius = "80px";
			styles.color = "white";
		}
		if (
			!btnProps.markReview &&
			!btnProps.saveAndReview &&
			!btnProps.markAndSave &&
			btnProps.visited
		) {
			styles.background = "#E64500";
			styles.color = "white";
			// styles.border = "ipx solid #792501";

			styles.clipPath = "polygon(0 0%, 100% 20%, 100% 85%, 0%100%)";
		}
		return styles;
	};

	return (
		<div
			className='d-flex flex-lg-wrap flex-nowrap  p-3 style-4'
			id='buttonscroll'
			style={{
				maxHeight: "40%",
				overflowY: "auto",
				maxWidth: "100%",
				overflowx: "auto",
			}}
		>
			{clickBtn.map((btn) => (
				<div className=' mt-1 ms-1 ' key={btn.number}>
					<button
						type='button'
						className=' btn-question '
						style={handleStyle(btn)}
						id={btn.number}
						onClick={handleChangeQuestion}
					>
						<span
							className='btn-que-mark'
							style={
								btn.saveAndReview ? { display: "block" } : {}
							}
						></span>
						{btn.number}
					</button>
				</div>
			))}
		</div>
	);
}
