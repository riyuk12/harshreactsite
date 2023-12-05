/* eslint-disable */
import React, { useState, useEffect } from "react";
import useRemoveModal from "../../Components/useRemoveModal";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

import baseUrl from "../../Components/baseUrl";
import { AiFillLock, AiFillUnlock } from "react-icons/ai";
import { FaCheck } from "react-icons/fa";
import { FaChevronLeft, FaCrown } from "react-icons/fa";
import Header from "../../Components/Global/Navigation/Header";
import { mcqTest, subscriptions } from "../../RouteConstants";
import OneLinerFooter from "../../Components/Global/Footers/OneLinerFooter";
import usePreferredCourseId from "../../Utils/usePreferredCourseId";
import "./ViewTest.css";

const ViewTest = (props) => {
  const location = useLocation();
  const { courseId, topicId, name } = location.state;
  const [profileData, setProfileData] = useState([]);
  const [chunk, setChunk] = useState(10);
  const [filter, setfilter] = useState(false);
  const [page, setPage] = useState(0);
  const [testData, setTestData] = useState([]);
  const [testPdfData, setTestPdfData] = useState([]);
  const [tableTestPdfData, setTableTestPdfData] = useState([]);
  const [showPdfQuestions, setShowPdfQuestions] = useState(false);
  const [tableData, setTableData] = useState([]);
  const preferredCourseId = usePreferredCourseId();
  const navigate = useNavigate();

  const fallbackMessage = "No test available, Please visit later";

  function sliceIntoChunks(arr, chunkSize) {
    const res = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      const chunk = arr.slice(i, i + chunkSize);
      res.push(chunk);
    }

    setTableData(res);
    return res;
  }

  function sliceIntoChunks1(arr, chunkSize) {
    const res = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      const chunk = arr.slice(i, i + chunkSize);
      res.push(chunk);
    }

    setTableTestPdfData(res);

    return res;
  }

  useEffect(() => {
    if (testPdfData.length) {
      sliceIntoChunks1(testPdfData, chunk);
    }
  }, [testPdfData]);

  useEffect(() => {
    if (testData.length) {
      sliceIntoChunks(testData, chunk);
    }
  }, [testData]);

  const handleClick = (i) => {
    setPage(i);
  };

  useEffect(() => {
    document.body.style.overflow = "visible";
    axios
      .post(
        baseUrl() + "/profileData",
        {
          email: Cookies.get("email"),
        },
        {
          headers: {
            "Acces-Control-Allow-Origin": "*",
            Client_ID: "MVOZ7rblFHsvdzk25vsQpQ==",
            Authorization: `${Cookies.get("token")}`,
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          setProfileData(response.data.Data);
        }
      });
  }, []);

//   Mock page
  useEffect(() => {
    axios
      .post(
        baseUrl() + "/df/getAllActiveQuizByCourseAndTopic",
        {
          courseId: courseId,
          topicId: topicId,
          quizType: name === "SAT" ? 6 : 7,
        },
        {
          headers: {
            "Acces-Control-Allow-Origin": "*",
            Client_ID: "MVOZ7rblFHsvdzk25vsQpQ==",
            Authorization: Cookies.get("token"),
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          setTestData(response.data.Data);
        }
      });
  }, []);

  useEffect(() => {
    axios
      .post(
        baseUrl() + "/getPdfQuizByCourseIdAndTopicId",
        {
          courseId: courseId,
          topicId: topicId,
        },
        {
          headers: {
            "Acces-Control-Allow-Origin": "*",
            Client_ID: "MVOZ7rblFHsvdzk25vsQpQ==",
            Authorization: Cookies.get("token"),
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          setTestPdfData(response.data.Data);
        }
      });
  }, []);

  const getpage = (index) => {
    if (chunk !== tableData[index]?.length) {
      return tableData[index]?.length;
    }
    return chunk;
  };

  const getPdfpage = (index) => {
    if (chunk !== tableTestPdfData[index]?.length) {
      return tableTestPdfData[index]?.length;
    }
    return chunk;
  };

  useRemoveModal();

  return (
    <>
      {/* <Header /> */}
      <button
        onClick={() => navigate(-1)}
        type="button"
        className="back-btn-view-exam"
      >
        <FaChevronLeft />
      </button>
      <article className="full-img-bg main-view-test-wrapper">
        <h3 className="main-heading">
          {name === "practice" ? "Practice Test" : "Mock Test"}
        </h3>
        <article className="test-data-container">
          {filter ? (
            <ul className="list-group">
              <li
                className="list-group-item"
                style={{ backgroundColor: "#FAFAFA" }}
              >
                Filter By
              </li>

              {filterData.map((item, index) => (
                <li
                  className={` rounded-0 list-group-item bg-red d-flex justify-content-between align-items-center ${
                    page == index ? "" : ""
                  }`}
                  onClick={() => handleClick(index)}
                >
                  <div>{item.name}</div>
                  <div
                    className="d-flex justify-content-center align-items-center "
                    style={{
                      width: "24px",
                      height: "24px",
                      background: " #E0E0E0",
                      borderRadius: "4px",
                    }}
                  >
                    {" "}
                    {item.count}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <section className="test-pagination-list">
              <div className="paper-list-pagination-container">
                <ul className="list-group text-center">
                  {tableData.map((data, index) => (
                    <li
                      className={`pagination-list-item ${
                        page == index ? "active" : ""
                      }`}
                      onClick={() => {
                        handleClick(index);
                        setShowPdfQuestions(false);
                      }}
                    >
                      {preferredCourseId !== 6
                        ? data[index]?.title.split("#")[0]
                        : "Chapter "}
                      {index * chunk + 1} - {index * chunk + getpage(index)}{" "}
                    </li>
                  ))}
                </ul>
              </div>
              {tableTestPdfData.length ? (
                <div>
                  <h3
                    className="m-0"
                    style={{
                      color: "#7b1fa2",
                      fontWeight: 600,
                    }}
                  >
                    PDF Test
                  </h3>
                  <div className="paper-list-pagination-container">
                    <ul className="list-group text-center">
                      {tableTestPdfData.map((data, index) => (
                        <li
                          className={` pagination-list-item  ${
                            page == index ? "active" : ""
                          }`}
                          onClick={() => {
                            handleClick(index);
                            setShowPdfQuestions(true);
                          }}
                        >
                          {data[index]?.title.split("#")[0]}
                          &#160; {index * chunk + 1} -{" "}
                          {index * chunk + getPdfpage(index)}{" "}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                ""
              )}
            </section>
          )}
          <section className="papers-list-container">
            {tableData.length !== 0 && !showPdfQuestions ? (
              tableData[page].map((item, i) => (
                <div
                  key={i}
                  className="exam-card-container"
                  style={{
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <article
                    className="overlay"
                    style={
                      item.premium == 1 && item.enableDisableField == 0
                        ? { display: "flex" }
                        : { display: "none" }
                    }
                  >
                    <h3 className="lock-heading">
                      <AiFillLock />
                      Subscribe Now
                    </h3>
                    <p>Get instant access to premium questions</p>
                    <Link
                      type="button"
                      to={subscriptions}
                      className="btn main-btn"
                      style={{
                        backgroundColor: "#7b1fa2",
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                      }}
                    >
                      <AiFillUnlock size={26} /> Unlock the premium
                    </Link>
                  </article>

                  <article className="exam-card">
                    <section>
                      <div className="paper-heading-view-test-container">
                        <FaCrown
                          style={
                            item.premium == 1
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
                          {item.title}
                        </h4>
                      </div>
                      <p>{item.courseName}</p>
                      <div className="test-details-container">
                        <p>
                          <span>Time :</span>
                          <strong>{item.maxTime}</strong>
                        </p>
                        <p>
                          <span>Questions :</span>
                          <strong>{item.maxNOQ}</strong>
                        </p>
                        <p>
                          <span>Marks :</span>
                          <strong>{item.passingScore}</strong>
                        </p>
                        {item.attemptFlag === 1 && (
                          <p>
                            <span>Attempted :</span>
                            <FaCheck color="green" />
                          </p>
                        )}
                      </div>
                    </section>

                    {item.premium == 1 && item.enableDisableField == 0 ? (
                      <Link
                        type="button"
                        to={subscriptions}
                        className="btn main-btn start-btn-view-test"
                      >
                        <AiFillLock size={20} /> Start Test
                      </Link>
                    ) : (
                      <Link
                        type="button"
                        to={mcqTest}
                        state={{
                          quizId: item.quizId,
                          courseId: courseId,
                          topicId: topicId,
                          quizCode: item.quizCode,
                          negativeMarks: item.negativeMarks,
                          level: item.level,
                          name: item.title,
                        }}
                        className="btn main-btn start-btn-view-test"
                      >
                        Start Test
                      </Link>
                    )}
                  </article>
                </div>
              ))
            ) : testPdfData.length !== 0 && showPdfQuestions ? (
              testPdfData.map((item, i) => (
                <div
                  key={i}
                  className="exam-card-container"
                  style={{
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <article
                    className="overlay"
                    style={
                      item.premium == 1 && item.enableDisableField == 0
                        ? { display: "flex" }
                        : { display: "none" }
                    }
                  >
                    <h3 className="lock-heading">
                      <AiFillLock />
                      Subscribe Now
                    </h3>
                    <p>Get instant access to premium questions</p>
                    <Link
                      type="button"
                      to={subscriptions}
                      className="btn main-btn"
                      style={{
                        backgroundColor: "#7b1fa2",
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                      }}
                    >
                      <AiFillUnlock size={26} /> Unlock the premium
                    </Link>
                  </article>

                  <article className="exam-card">
                    <section>
                      <div className="paper-heading-view-test-container">
                        {item.premium == 0 && (
                          <FaCrown
                            style={{
                              color: "#D4AF37",
                            }}
                            size={22}
                          />
                        )}
                        <h4 className="paper-heading-view-test">
                          {item.title}
                        </h4>
                      </div>
                      <p>{item.courseName}</p>
                      <div className="test-details-container">
                        <p>
                          <span>Time :</span>
                          <strong>{item.maxTime}</strong>
                        </p>

                        <p>
                          <span>Questions :</span>
                          <strong>{item.maxNOQ}</strong>
                        </p>

                        <p>
                          <span>Marks :</span>
                          <strong>{item.passingScore}</strong>
                        </p>

                        {item.attemptFlag === 1 && (
                          <p>
                            <span>Attempted :</span>
                            <FaCheck color="green" />
                          </p>
                        )}
                      </div>
                    </section>

                    {item.premium == 1 && item.enableDisableField == 0 ? (
                      <Link
                        type="button"
                        to={subscriptions}
                        className="btn main-btn"
                        style={{
                          // backgroundColor: "#6c5f71",
                          width: "120px",
                        }}
                      >
                        <AiFillLock
                          size={20}
                          style={{
                            marginRight: 0,
                          }}
                        />{" "}
                        Start Test
                      </Link>
                    ) : (
                      <Link
                        type="button"
                        to="/pdftestexam"
                        state={{
                          // quizId: item.quizId,
                          // courseId: courseId,
                          // topicId: topicId,
                          // quizCode: item.quizCode,
                          // negativeMarks: item.negativeMarks,
                          // level: item.level,
                          // name: item.title,
                          pdfQuizId: item.pdfQuizId,
                        }}
                        className="btn main-btn"
                        style={{
                          width: "120px",
                        }}
                      >
                        Start Test
                      </Link>
                    )}
                  </article>
                </div>
              ))
            ) : (
              <div className="fallback-message-view-test-container">
                <p>{fallbackMessage}</p>
              </div>
            )}
          </section>
        </article>
      </article>

      <OneLinerFooter />
    </>
  );
};

export default ViewTest;
