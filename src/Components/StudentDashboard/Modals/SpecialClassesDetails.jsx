import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import parse from "html-react-parser";

import { GetCourseDetailsThunk } from "../../../Redux/Thunks/Get/GetCourseDetailsThunk";

const SpecialClassesDetails = () => {
	const dispatch = useDispatch();
	const { courseDetailsData } = useSelector((state) => state.response);
	const [courseDetails, setCourseDetails] = useState("");

	useEffect(() => {
		dispatch(GetCourseDetailsThunk());
	}, []);

	useEffect(() => {
		setCourseDetails(
			courseDetailsData.find((course) => course.courseId === 8)
		);
	}, [courseDetailsData]);

	return (
		<div
			className='modal fade'
			id='specialprogramdetails'
			data-bs-backdrop='static'
			data-bs-keyboard='false'
			tabIndex='-1'
			aria-labelledby='specialprogramdetails'
			aria-hidden='true'
		>
			<div className='modal-dialog modal-dialog-centered modal-dialog-scrollable'>
				<div className='modal-content'>
					<div className='modal-header'>
						<h5 className='modal-title' id='staticBackdropLabel'>
							{courseDetails?.courseHead}
						</h5>
						<button
							type='button'
							className='btn-close'
							data-bs-dismiss='modal'
							aria-label='Close'
						></button>
					</div>
					<div className='modal-body'>
						{parse(String(courseDetails?.courseDetails))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default SpecialClassesDetails;
