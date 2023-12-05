import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { utilitySliceActions } from "../../../Redux/Slice/UtilitySlice";
import { profile } from "../../../RouteConstants";

const AvailableTests = ({ route, id, name }) => {
  const { userProfileData } = useSelector((state) => state.postResp);
  const { preferredCourseDetails } = useSelector((state) => state.utils);
  const { courses } = useSelector((state) => state.response);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = (courseId, topicId) => {
    navigate(route, {
      state: {
        courseId,
        topicId,
        name,
      },
    });
    document.getElementById("closeModal").click();
  };

  const preferedCourseId = userProfileData.preferredCourseId;

  useEffect(() => {
    let courseDetails;
    if (preferedCourseId !== 8) {
      courseDetails = courses?.filter(
        (course) => course?.courseId === preferedCourseId
      );
    } else {
      courseDetails = courses?.filter((course) => course?.courseId === 4);
    }
    dispatch(utilitySliceActions.setPreferredCourseDetails(courseDetails));
  }, [preferedCourseId, courses]);

  
  return (
    <article
      className="modal fade"
      id={id}
      tabIndex="-1"
      aria-labelledby="availableModalLabel"
      aria-hidden="true"
    >
      <section className="modal-dialog modal-dialog-scrollable downloadModal">
        <section className="modal-content bg-logo">
          <header className="modal-header modal-header-container">
            <h5 className="modal-title main-color" id="availableModalLabel">
              Available Subjects
            </h5>
            <button
              id="closeModal"
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </header>
          <main className="modal-body" style={{ margin: "1rem 0" }}>
            {preferredCourseDetails?.map(
              ({ topicBeans, courseName, courseId }) => (
                <Fragment key={courseId}>
                  <h4 className="m-0 mb-3" style={{ fontSize: "18px" }}>
                    {preferedCourseId !== 8 ? courseName : `Online Classes`}
                  </h4>
                  {topicBeans?.length === 0 ? (
                    <p className="mb-0 text-center">
                      please add subjects by{" "}
                      <Link
                        className="blinking"
                        style={{
                          color: "#7b1fa2",
                          cursor: "pointer",
                        }}
                        to={profile}
                      >
                        <b>updating your profile</b>
                      </Link>{" "}
                      to solve papers
                    </p>
                  ) : (
                    <section className="d-flex flex-column gap-3">
                      {topicBeans
                        .filter((data) => {
                          if (name === "practice") {
                            return data.practice_flag === 1;
                          } else if (name === "mock") {
                            return data.mock_flag === 1;
                          }  else {
                            return data.exam_flag === 1;
                          }  
                        })
                        .map(({ topicId, topicName }) => (
                          <div key={topicId} className="test-available-design">
                            <h5
                              className="m-0"
                              style={{
                                fontSize: "16px",
                              }}
                            >
                              {topicName}
                            </h5>
                            <button
                              onClick={() => handleClick(courseId, topicId)}
                              className="btn main-btn"
                            >
                              View
                            </button>
                          </div>
                        ))}
                    </section>
                  )}
                </Fragment>
              )
            )}
          </main>
        </section>
      </section>
    </article>
  );
};

export default AvailableTests;
