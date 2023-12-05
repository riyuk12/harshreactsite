import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

//getting courseId
const usePreferredSubjectId = () => {
	const { topicList } = useSelector((state) => state.response);
	const [preferredSubjectId, setPreferredSubjectId] = useState("");
	const preferredSubject = localStorage.getItem("preferredSubject");

	useEffect(() => {
		let topic = topicList.find(
			(topic) => topic.topicName === preferredSubject
		);
		setPreferredSubjectId(topic?.topicId);
	}, [topicList, preferredSubject]);

	return preferredSubjectId;
};

export default usePreferredSubjectId;
