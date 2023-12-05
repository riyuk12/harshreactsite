import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import usePreferredCourseId from "../Utils/usePreferredCourseId";
import Cookies from "js-cookie";
import Header from "../Components/Global/Navigation/Header";
import { PostLiveQuizThunk } from "../Redux/Thunks/Post/PostLiveQuizThunk";
import { FaCheck, FaChevronLeft, FaCrown } from "react-icons/fa";
import { useNavigate } from "react-router";
import StartBtn from "../Components/LiveQuiz/StartBtn";
import { utilitySliceActions } from "../Redux/Slice/UtilitySlice";

const LiveQuiz = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const preferredCourseId = usePreferredCourseId();
  const { sortedQuiz, isInsChecked } = useSelector((state) => state.utils);
  const { liveQuizData } = useSelector((state) => state.postResp);

  //formats the date for better UX
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: "numeric", month: "short", year: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };

  useEffect(() => {
    //getting live quiz data
    if (preferredCourseId) {
      const data = {
        courseId: preferredCourseId,
        token: Cookies.get("token"),
      };
      dispatch(PostLiveQuizThunk(data));
    }
    console.log("sortedQuiz",sortedQuiz)
  }, [dispatch, preferredCourseId]);

  useEffect(() => {
    const sortedArray = [...liveQuizData].sort((a, b) => {
      const dateComparison = a.liveQuizStartDate.localeCompare(
        b.liveQuizStartDate
      );
      if (dateComparison !== 0) {
        return dateComparison;
      }
      return a.liveQuizStartTime.localeCompare(b.liveQuizStartTime);
    });

    dispatch(utilitySliceActions.setSortedQuiz(sortedArray));
  }, [liveQuizData]);

  return (
    <>
      <Header />
      <button
        onClick={() => navigate(-1)}
        type="button"
        className="back-btn-view-exam"
      >
        <FaChevronLeft />
      </button>
      <article className="full-img-bg main-view-test-wrapper">
        <h3 className="main-heading">Live Quiz</h3>
        <article className="test-data-container">
          <section className="papers-list-container">
            {sortedQuiz.length !== 0 ? (
              sortedQuiz.map((quiz, index) => (
                <Fragment key={index}>
                  <div
                    className="exam-card-container"
                    style={{
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    <article className="exam-card">
                      <section>
                        <div className="paper-heading-view-test-container">
                          <FaCrown
                            style={
                              quiz.premium == 1
                                ? {
                                    color: "#D4AF37",
                                  }
                                : {
                                    display: "none",
                                  }
                            }
                            size={22}
                          />
                          <h4 className="paper-heading-view-test">
                            {quiz.title}
                          </h4>
                        </div>
                        <p>{quiz.courseName}</p>
                        <div className="test-details-container">
                          <p>
                            <span>Time :</span>
                            <strong>{quiz.maxTime}</strong>
                          </p>
                          <p>
                            <span>Questions :</span>
                            <strong>{quiz.maxNOQ}</strong>
                          </p>
                          <p>
                            <span>Start Time :</span>
                            <strong>{quiz.liveQuizStartTime}</strong>
                          </p>

                          <p>
                            <span>Start Date :</span>
                            <strong>
                              {formatDate(quiz.liveQuizStartDate)}
                            </strong>
                          </p>
                        </div>
                      </section>
                      <StartBtn
                        quizDate={quiz?.liveQuizStartDate}
                        quizStartTime={quiz?.liveQuizStartTime}
                        enableDisableField={quiz?.enableDisableField}
                        premium={quiz?.premium}
                        quizId={quiz?.quizId}
                        courseId={quiz.courseId}
                        endTime={quiz?.maxTime}
                        isQuizLive={quiz?.liveQuizFlag}
                        isAttemptFlag={quiz?.attemptFlag}
                        liveQuizInstruction={quiz?.liveQuizInstruction}
                      />
                    </article>
                  </div>
                </Fragment>
              ))
            ) : (
              <div
                className="fallback-message-view-test-container"
                style={{
                  textAlign: "center",
                  fontSize: "15px",
                }}
              >
                No Live quiz available for this course,
                <br /> Try switching the course to participate in other live
                quiz
              </div>
            )}
          </section>
        </article>
      </article>
    </>
  );
};

export default LiveQuiz;
