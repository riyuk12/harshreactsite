import { Fragment, useEffect, useState } from "react";
import { GiLaurels } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";

import { GetPerformanceRankingThunk } from "../../Redux/Thunks/Get/GetPerformanceRankingThunk";
import { GetPerformanceRankingByTopicThunk } from "../../Redux/Thunks/Get/GetPerformanceRankingByTopicThunk";
import ProfilePic from "../../Assets/images/profilePic.jpg";
import usePreferredCourseId from "../../Utils/usePreferredCourseId";
import baseUrl from "../../Components/baseUrl";

const Leaderboard = () => {
  const { performanceRanking, courses } = useSelector(
    (state) => state.response
  );
  const [showAll, setShowAll] = useState(false);
  const [myRank, setMyRank] = useState({});
  const [selectedTopicId, setSelectedTopicId] = useState(0);
  const [topicList, setTopicList] = useState([]);
  const preferredCourseId = usePreferredCourseId();
  const preferredCourseName = localStorage.getItem("preferredCourse");
  const dispatch = useDispatch();

  //handle the change in the dropdown
  const handleTopicChange = (id) => {
    setSelectedTopicId(id);
    dispatch(
      GetPerformanceRankingByTopicThunk({
        token: Cookies.get("token"),
        courseId: preferredCourseId,
        topicId: id,
      })
    );
  };

  useEffect(() => {
    const topics = courses?.find(
      (course) => course.courseId === preferredCourseId
    )?.topicBeans;
    setTopicList(topics);
  }, [courses, preferredCourseId]);

  const getLeaderBoardDataCourseWise = () => {
    setSelectedTopicId(0);
    if (preferredCourseId) {
      dispatch(
        GetPerformanceRankingThunk({
          token: Cookies.get("token"),
          courseId: preferredCourseId,
        })
      );
    }
  };

  //getting the leaderBoard rankers list
  useEffect(() => {
    getLeaderBoardDataCourseWise();
  }, [preferredCourseId]);

  //finding own rank
  useEffect(() => {
    const myObj = performanceRanking.find((ranker) => {
      return Number(ranker.userId) === Number(Cookies.get("userId"));
    });
    setMyRank(myObj);
  }, [performanceRanking]);

  return (
    <section className="leaderboard-container profile gap-4 gap-sm-2 p-3">
      <section className="live-section-heading-container">
        <h4
          className="m-0"
          style={{
            fontSize: "20px",
            fontWeight: "600",
            color: "#7b1fa2",
          }}
        >
          Leaderboard
        </h4>
        {topicList && (
          <div className="dropdown">
            <button
              className="dropdown-toggle classes-dropdown-btn text-truncate"
              type="button"
              id="dropdownMenu2"
              style={{ border: "none" }}
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {selectedTopicId !== 0
                ? topicList.find((topic) => topic.topicId === selectedTopicId)
                    ?.topicName
                : preferredCourseName}
            </button>

            <ul
              className="dropdown-menu"
              style={{ maxHeight: "200px", overflow: "auto" }}
            >
              {topicList.length === 0 ? (
                <li className="dropdown-item py-2">No topics available</li>
              ) : (
                <>
                  <li
                    className="dropdown-item py-2"
                    onClick={() => getLeaderBoardDataCourseWise()}
                  >
                    {preferredCourseName}
                  </li>
                  {topicList.map(({ topicName, topicId }) => (
                    <li
                      key={topicId}
                      className="dropdown-item py-2"
                      onClick={() => handleTopicChange(topicId)}
                    >
                      {topicName}
                    </li>
                  ))}
                </>
              )}
            </ul>
          </div>
        )}
      </section>
      <section className="d-flex flex-column gap-2 align-items-center">
        <div className="first-rank-holder">
          <h4 className="most-pts-heading">Most points</h4>
          <div>
            <div className="leader-details">
              {performanceRanking[0]?.candidateImage ? (
                <img
                  src={`${baseUrl()}/df/showProfilePic/${performanceRanking[0]?.candidateImage}`}
                  alt="profile"
                  className="leader-profile"
                />
              ) : (
                <img
                  src={ProfilePic}
                  alt="profile"
                  className="leader-profile"
                />
              )}
              <span className="leader-badge">
                <GiLaurels />
              </span>
            </div>
            <p className="m-0 text-center">
              {performanceRanking[0]?.userName
                ? performanceRanking[0].userName
                : "user 1"}
            </p>
          </div>
          <p className="m-0 points">{performanceRanking[0]?.percentage}</p>
        </div>
        <div className="rank-holders-container">
          {performanceRanking.map((ranker, index) =>
            showAll
              ? index >= 1 && (
                  <div
                    key={index}
                    className={`rank-holder ${
                      Number(ranker.userId) === Number(Cookies.get("userId"))
                        ? "my-rank"
                        : ""
                    }`}
                  >
                    <div className="rank-holder-details">
                      <span className="rank">
                        {ranker.ranks === 1
                          ? "1st"
                          : ranker.ranks === 2
                          ? "2nd"
                          : ranker.ranks === 3
                          ? "3rd"
                          : `${ranker.ranks}th`}
                      </span>
                      {ranker.candidateImage ? (
                        <img
                          src={`${baseUrl()}/df/showProfilePic/${ranker.candidateImage}`}
                          alt="profile"
                          className="runner-up-profile"
                        />
                      ) : (
                        <img
                          src={ProfilePic}
                          alt="profile"
                          className="runner-up-profile"
                        />
                      )}
                      <p className="m-0">
                        {ranker.userName
                          ? ranker.userName
                          : `user ${index + 1}`}
                      </p>
                    </div>
                    <p className="m-0 points">{ranker.percentage}</p>
                  </div>
                )
              : index === 1 && (
                  <Fragment key={index}>
                    <div className="rank-holder">
                      <div className="rank-holder-details">
                        <span className="rank">
                          {ranker.ranks === 1
                            ? "1st"
                            : ranker.ranks === 2
                            ? "2nd"
                            : ranker.ranks === 3
                            ? "3rd"
                            : `${ranker.ranks}th`}
                        </span>
                        {ranker.candidateImage ? (
                          <img
                            src={`${baseUrl()}/df/showProfilePic/${ranker.candidateImage}`}
                            alt="profile"
                            className="runner-up-profile"
                          />
                        ) : (
                          <img
                            src={ProfilePic}
                            alt="profile"
                            className="runner-up-profile"
                          />
                        )}
                        <p className="m-0">
                          {ranker.userName
                            ? ranker.userName
                            : `user ${index + 1}`}
                        </p>
                      </div>
                      <p className="m-0 points">{ranker.percentage}</p>
                    </div>
                    {/* {myRank && (
                      <div className="rank-holder my-rank">
                        <div className="rank-holder-details">
                          <span className="rank">
                            {myRank?.ranks === 1
                              ? "1st"
                              : myRank?.ranks === 2
                              ? "2nd"
                              : myRank?.ranks === 3
                              ? "3rd"
                              : `${myRank?.ranks}th`}
                          </span>
                          <img
                            src={`${baseUrl()}/df/showProfilePic/${ranker.candidateImage}`}
                            alt="profile"
                            className="runner-up-profile"
                          />
                          <p className="m-0">{myRank?.userName}</p>
                        </div>
                        <p className="m-0 points">{myRank?.percentage}</p>
                      </div>
                    )} */}
                  </Fragment>
                )
          )}
        </div>
        <div>
          {showAll ? (
            <button
              className="view-more-leaders main-color"
              onClick={() => setShowAll(false)}
            >
              View less
            </button>
          ) : (
            <button
              className="view-more-leaders main-color"
              onClick={() => setShowAll(true)}
            >
              View more
            </button>
          )}
        </div>
      </section>
    </section>
  );
};

export default Leaderboard;
