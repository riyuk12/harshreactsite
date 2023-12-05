import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";

import teamwork from "../../Assets/images/team.svg";

//it is initailState for statistics
const initialState = [
	{
		number: 0,
		title: "teachers",
	},
	{
		number: 0,
		title: "students",
	},
	{
		number: 0,
		title: "mcq's",
	},
	{
		number: 0,
		title: "subjects",
	},
	{ number: 0, title: "users" },
];

const Statistics = () => {
	const [statistics, setStatistics] = useState(initialState);
	const { statisticsData } = useSelector((state) => state.response);

	//setting data when we get the response from api
	useEffect(() => {
		setStatistics([
			{
				number: statisticsData.totalTeacher
					? statisticsData.totalTeacher
					: "-",
				title: "teachers",
			},
			{
				number: statisticsData.totalStudent
					? statisticsData.totalStudent
					: "-",
				title: "students",
			},
			{
				number: statisticsData.totalMCQ ? statisticsData.totalMCQ : "-",
				title: "mcq's",
			},
			{
				number: statisticsData.totalCourses
					? statisticsData.totalCourses
					: "-",
				title: "subjects",
			},
			{
				number: statisticsData.totalUser
					? statisticsData.totalUser
					: "-",
				title: "users",
			},
		]);
	}, [statisticsData]);

	//to handle the click on right arrow
	const onRightClick = () => {
		const Arr = [...statistics];
		const lastArrEle = Arr.pop();
		setStatistics([lastArrEle, ...Arr]);
	};

	//to handle the click on left arrow
	const onLeftClick = () => {
		const Arr = [...statistics];
		const firstArrEle = Arr.shift();
		setStatistics([...Arr, firstArrEle]);
	};

	return (
		<article
			className='container-fluid py-4 overflow-hidden'
			id='statistics'
		>
			<header>
				<h4 className='mb-4 fs-2 text-center'>Strength</h4>
			</header>
			<section className='statistics-container'>
				<button
					type='button'
					className='statistics-btn btn-left'
					onClick={onLeftClick}
				>
					<GoChevronLeft size={24} className='icon-next' />
				</button>
				<hr className='statistics-hr' />
				<img src={teamwork} alt={"alt"} />
				<hr className='statistics-hr' />
				<button
					type='button'
					className='statistics-btn btn-right'
					onClick={onRightClick}
				>
					<GoChevronRight size={24} className='icon-next' />
				</button>
			</section>
			<section className='d-flex justify-content-around align-items-center text-center'>
				{statistics.map(({ number, title }, index) => (
					<div
						className='flex-shrink-1'
						key={index}
						style={{ minWidth: "200px" }}
					>
						<p className='main-color statistic-num-not-in-focus statistics-number m-0'>
							<span
								className={
									index === 2 ? "statistic-num-in-focus" : ""
								}
							>
								{index === 2 ? (
									<CountUp
										start={0}
										end={number}
										duration={1}
										delay={1}
									/>
								) : (
									<span className='fw-light hide'>
										{number}
									</span>
								)}
							</span>
						</p>
						<p className='main-color text-uppercase statistic-not-in-focus'>
							<span
								className={
									index === 2 ? "statistic-in-focus" : "hide"
								}
							>
								{title}
							</span>
						</p>
					</div>
				))}
			</section>
		</article>
	);
};

export default Statistics;
