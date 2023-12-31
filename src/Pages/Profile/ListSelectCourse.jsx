import React, { useEffect, useState } from "react";

const ListSelectCourse = (props) => {
	const { subjects, setMainData } = props;
	//   const [courseId, setCourseId] = useState(null);
	const [courseId] = useState(null);
	const [subjectsSelect, setSubjectsSelect] = useState([]);
	//   const [subjectData, setSubjectData] = useState([]);
	//   const [subjectCategory, setSubjectCategory] = useState([]);

	useEffect(() => {
		const data = subjects.filter((item) => item.courseId === Number(1));
		// setSubjectData(data);
		// setSubjectCategory(data[0]?.categorys || []); //data store in array
		setSubjectsSelect(data[0]?.categorys || []); // Upadte Section data
		// console.log("SubjectCategory", data[0]?.categorys || []);
	}, [courseId, subjects]);

	useEffect(() => {
		setMainData((prev) => ({ ...prev, categorys: subjectsSelect }));
	}, [subjectsSelect, setSubjectsSelect]);
	return (
		<>
			{subjectsSelect.map((list, index) => (
				<CoursesList
					list={list}
					id={index}
					key={index}
					subjectsSelect={subjectsSelect}
					setSubjectsSelect={setSubjectsSelect}
				/>
			))}
		</>
	);
};

export default ListSelectCourse;

function CoursesList({ list, setSubjectsSelect, subjectsSelect, id }) {
	return (
		<>
			<h5 style={{ fontSize: "15px", color: "#ba00ba" }}>
				{list.catlevel}
			</h5>
			<div className=''>
				{list.topicBeans.map((beans, index) => (
					<label className='custom-radio_ d-block' key={index}>
						<span
							className='radio-btn_ d-flex'
							style={beans.selection ? { border: "" } : {}}
						>
							<span className='hobbies-icon_'>
								<span>{beans.topicName}</span>
							</span>
							<input
								type='checkbox'
								name='radio_'
								style={{ width: "25px", marginLeft: "auto" }}
								onChange={(e) =>
									courseChange(
										e,
										beans.topicId,
										subjectsSelect[id],
										id,
										subjectsSelect,
										setSubjectsSelect
									)
								}
								checked={beans.selection || false}
							/>
						</span>
					</label>
				))}
			</div>
		</>
	);
}

function courseChange(
	_item,
	_id,
	_selectedCourseDetails,
	subjectIndex,
	subjectsSelect,
	setSubjectsSelect
) {
	console.log(
		_selectedCourseDetails?.topicBeans.filter(
			(course) => course.selection !== true
		)
	);
	if (
		_selectedCourseDetails?.topicBeans.filter(
			(course) => course.selection !== false
		).length < _selectedCourseDetails.maxSelection
	) {
		let temp = _selectedCourseDetails?.topicBeans.map((e) =>
			e.topicId == _id ? { ...e, selection: _item.target.checked } : e
		);

		// console.log("temp", temp);
		/**
		 *  updating Object type in react refer to
		 *  https://bobbyhadz.com/blog/react-update-object-in-array#:~:text=To%20update%20an%20object%20in,all%20other%20objects%20as%20is.
		 */
		const updateData = subjectsSelect.map((obj, index) => {
			if (index == subjectIndex) {
				return { ...obj, topicBeans: temp };
			}
			return obj;
		});

		setSubjectsSelect(updateData);
	} else if (
		_selectedCourseDetails?.topicBeans.filter(
			(course) => course.selection !== false
		).length < _selectedCourseDetails.maxSelection ||
		_item.target.checked == false
	) {
		let temp = _selectedCourseDetails?.topicBeans.map((e) =>
			e.topicId == _id ? { ...e, selection: _item.target.checked } : e
		);

		// console.log(temp);
		/**
		 *  updating Object type in react refer to
		 *  https://bobbyhadz.com/blog/react-update-object-in-array#:~:text=To%20update%20an%20object%20in,all%20other%20objects%20as%20is.
		 */
		const updateData = subjectsSelect.map((obj, index) => {
			if (index == subjectIndex) {
				return { ...obj, topicBeans: temp };
			}
			return obj;
		});
		setSubjectsSelect(updateData);
	} else {
		alert(
			"Atmost one language subject can be opted from Section I (Languages)."
		);
	}

	// setMainData((prev) => ({ ...prev, categorys: subjectsSelect }));
}
