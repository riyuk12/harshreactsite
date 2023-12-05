import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

//getting courseId
const usePreferredCourseId = () => {
	const { courses } = useSelector((state) => state.response);
	const [preferredCourseId, setPreferredCourseId] = useState("");
	const preferredCourse = localStorage.getItem("preferredCourse");

	useEffect(() => {
		let course = courses.find(
			(course) => course.courseName === preferredCourse
		);
		setPreferredCourseId(course?.courseId);
	}, [courses, preferredCourse]);

	return preferredCourseId;
};

export default usePreferredCourseId;
