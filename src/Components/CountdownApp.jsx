import React, { useState, useEffect, useRef } from "react";

const STATUS = {
	STARTED: "Started",
	STOPPED: "Stopped",
};

const INITIAL_COUNT = 60;

export default function CountdownApp() {
	const [secondsRemaining, setSecondsRemaining] = useState(INITIAL_COUNT);
	const [status, setStatus] = useState(STATUS.STARTED);

	const secondsToDisplay = secondsRemaining % 60;
	const minutesRemaining = (secondsRemaining - secondsToDisplay) / 60;
	const minutesToDisplay = minutesRemaining % 60;
	const hoursToDisplay = (minutesRemaining - minutesToDisplay) / 60;

	useInterval(
		() => {
			if (secondsRemaining > 0) {
				setSecondsRemaining(secondsRemaining - 1);
			} else {
				setStatus(STATUS.STOPPED);
			}
		},
		status === STATUS.STARTED ? 1000 : null
		// passing null stops the interval
	);
	return (
		<>
			<span style={{ padding: "0 20px" }}>
				{twoDigits(hoursToDisplay)}:{twoDigits(minutesToDisplay)}:
				{twoDigits(secondsToDisplay)}
			</span>
		</>
	);
}
function useInterval(callback, delay) {
	const savedCallback = useRef();

	// Remember the latest callback.
	useEffect(() => {
		savedCallback.current = callback;
	}, [callback]);

	// Set up the interval.
	useEffect(() => {
		function tick() {
			savedCallback.current();
		}
		if (delay !== null) {
			let id = setInterval(tick, delay);
			return () => clearInterval(id);
		}
	}, [delay]);
}

const twoDigits = (num) => String(num).padStart(2, "0");
