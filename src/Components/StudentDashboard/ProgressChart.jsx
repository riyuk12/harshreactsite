import { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto"; // CAUTION! its required
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";

import { GetPerformanceByPercentileThunk } from "../../Redux/Thunks/Get/GetPerformanceByPercentileThunk";
import { GetPerformanceHistoryByQuizCountThunk } from "../../Redux/Thunks/Get/GetPerformanceHistoryByQuizCountThunk";

const ProgressChart = () => {
	const dispatch = useDispatch();
	const { performanceHistoryByQuizCount } = useSelector(
		(state) => state.response
	);
	const [xAxisLabels, setxAxisLabels] = useState([]);
	const [dataPoints, setDataPoints] = useState([]);
	const [selectedDuration, setSelectedDuration] = useState(1);
	const [isLineGraph, setIsLineGraph] = useState(true);
	const [data, setData] = useState({
		labels: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110],
		datasets: [
			{
				label: "Today",
				data: [0, 285, 345, 456, 650, 624, 424, 557],
				borderColor: "#7B1FA2",
			},
			// {
			// 	label: "Yesterday",
			// 	data: [
			// 		0, 451, 324, 256, 674, 586, 554, 356, 385, 720, 554, 356,
			// 		385,
			// 	],
			// 	borderColor: "#DADEE3",
			// },
		],
	});

	// setting the graphs X-axis label and data points on the graphs
	useEffect(() => {
		if (performanceHistoryByQuizCount.length > 0) {
			const labels = [];
			performanceHistoryByQuizCount.map((item) =>
				labels.push(item.dateMonh)
			);
			setxAxisLabels(labels);

			const points = [];
			performanceHistoryByQuizCount.map((item) =>
				points.push(item.statitsicValue)
			);
			setDataPoints(points);
		}
	}, [performanceHistoryByQuizCount]);

	//setting the graph data
	useEffect(() => {
		if (xAxisLabels.length > 0 && dataPoints.length > 0) {
			setData({
				labels: xAxisLabels.reverse(),
				datasets: [
					{
						label: "Today",
						data: dataPoints.reverse(),
						borderColor: "#7B1FA2",
					},
				],
			});
		}
	}, [xAxisLabels, dataPoints]);

	useEffect(() => {
		// 1 for daily and 2 for monthly
		// dispatch(
		// 	GetPerformanceByPercentileThunk({
		// 		token: Cookies.get("token"),
		// 		userId: Cookies.get("userId"),
		// 		dailyMonthlyFlag: 2,
		// 	})
		// );
	}, []);

	useEffect(() => {
		dispatch(
			GetPerformanceHistoryByQuizCountThunk({
				token: Cookies.get("token"),
				userId: Cookies.get("userId"),
				dailyMonthlyFlag: selectedDuration,
			})
		);
	}, [dispatch, selectedDuration]);

	const handleViewChange = (bool) => {
		setIsLineGraph(bool);
	};

	//graph customization options https://www.chartjs.org/docs/4.3.0/
	const options = {
		scales: {
			x: {
				title: {
					display: true,
					text: "Dates",
					color: "black",
					padding: 8,
					font: {
						size: 17,
						weight: "bold",
					},
				},
				grid: {
					display: false,
				},
			},
			y: {
				beginAtZero: true,
				title: {
					display: true,
					text: "Submitted Quiz",
					color: "black",
					padding: 8,
					font: {
						size: 17,
						weight: "bold",
					},
				},
			},
		},
		plugins: {
			legend: {
				align: "end",
				labels: {
					boxWidth: 10,
					boxHeight: 10,
					useBorderRadius: true,
					borderRadius: 5,
				},
			},
			tooltip: {
				backgroundColor: "#FFFFFFEE",
				bodyColor: "#000",
				titleColor: "#000",
				footerColor: "#000",
				padding: "10",
			},
		},
		pointBackgroundColor: "#FFF",
		borderWidth: "4",
		pointBorderWidth: "2",
		tension: "0.45",
		legend: false,
		responsive: true,
		maintainAspectRatio: false,
	};

	return (
		<section className='progress-chart-container message p-3'>
			<section className='live-section-heading-container'>
				<h4
					className='m-0'
					style={{
						fontSize: "20px",
						fontWeight: "600",
						color: "#7b1fa2",
					}}
				>
					Performance Activity
				</h4>
				<div style={{ display: "flex", gap: "1.5rem" }}>
					<div className='dropdown'>
						<button
							className='dropdown-toggle classes-dropdown-btn'
							role='button'
							type='button'
							id='dropdownMenu2'
							style={{ border: "none" }}
							data-bs-toggle='dropdown'
							aria-expanded='false'
						>
							{isLineGraph ? "Line Graph" : "Bar Graph"}
						</button>
						<ul className='dropdown-menu'>
							<li
								className='dropdown-item py-2'
								onClick={() => handleViewChange(true)}
							>
								Line Chart
							</li>
							<li
								className='dropdown-item py-2'
								onClick={() => handleViewChange(false)}
							>
								Bar Chart
							</li>
						</ul>
					</div>
					<div className='dropdown'>
						<button
							className='dropdown-toggle classes-dropdown-btn'
							role='button'
							type='button'
							id='dropdownMenu2'
							style={{ border: "none" }}
							data-bs-toggle='dropdown'
							aria-expanded='false'
						>
							{selectedDuration === 1 ? "Daily" : "Monthly"}
						</button>
						<ul className='dropdown-menu'>
							<li
								className='dropdown-item py-2'
								onClick={() => setSelectedDuration(1)}
							>
								Daily
							</li>
							<li
								className='dropdown-item py-2'
								onClick={() => setSelectedDuration(2)}
							>
								Monthly
							</li>
						</ul>
					</div>
				</div>
			</section>
			<section className='chart-container'>
				{isLineGraph ? (
					performanceHistoryByQuizCount.length !== 0 ? (
						<Line data={data} options={options} />
					) : (
						<section className='graph-fallback'>
							<p>
								Start performing test/exams to see your
								daily/monthly progress
							</p>
						</section>
					)
				) : performanceHistoryByQuizCount.length !== 0 ? (
					<Bar data={data} options={options} />
				) : (
					<section className='graph-fallback'>
						<p>
							Start performing test/exams to see your
							daily/monthly progress
						</p>
					</section>
				)}
			</section>
		</section>
	);
};

export default ProgressChart;
