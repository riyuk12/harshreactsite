/* eslint-disable */
import axios from "axios";
import Cookies from "js-cookie";
import "./StudentMCQ.css";
import baseUrl from "../../Components/baseUrl";
import React, { useEffect, useState } from "react";
import Logo from "../../Assets/images/logo.png";
import profileHook from "./useProfile";
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";

import "./StudentMCQ.css";
import QuestionButton from "./QuestionButton";

import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import LandingPageFooter from "../../Components/Global/Footers/LandingPageFooter";
import { studDashboard } from "../../RouteConstants";
import parse from "html-react-parser";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

export default function StudentExamTestMCQ() {
  const [mcqDatas, setMcqDatas] = useState([]);
  const save_review = localStorage.getItem("SaveReview");
  const not_answred = localStorage.getItem("NotAnswered");
  const dispatch = useDispatch();

  const save_answer = localStorage.getItem("Answer");
  const mark_review = localStorage.getItem("markReview");
  const not_visited = localStorage.getItem("NotVisited");
  const finalsub = localStorage.getItem("finalsubmit");
  const [isFinalSubmit, setIsFinalSubmt] = useState(
    finalsub ? JSON.parse(finalsub) : false
  );

  const [saveReview, setSaveReview] = useState(save_review || 0);
  const [notAnswered, setNotAnswered] = useState(not_answred || 0);
  const [answer, setAnswer] = useState(save_answer || 0);
  const [markReview, setMarkReview] = useState(mark_review || 0);

  const [allQuestion, setAllQuestion] = useState([]);
  const [totalQuestion, setTotalQuestion] = useState(0);
  const [notVisited, setNotVisited] = useState(not_visited || totalQuestion);

  const current_question = localStorage.getItem("currentQuestion");
  const [currentQuestion, setCurrentQuestion] = useState(
    Number(current_question) || 1
  );

  const profileData = profileHook();
  const { firstName, lastName, image } = profileData;
  const timer = localStorage.getItem("timer")
    ? JSON.parse(localStorage.getItem("timer"))
    : null;
  const [seconds, setSeconds] = useState(timer?.second || 0);
  const [minutes, setMinutes] = useState(timer?.minute || 0);
  const [hours, setHours] = useState(timer?.hour || 0);
  const [collapse, setCollapse] = useState(false);
  const location = useLocation();
  const {
    quizId,
    courseId,
    name,
    user_Name,
    seo,
    path,
    endTime,
    quizDate,
    quizStartTime,
    isQuizLive,
  } = location.state;
  const navigate = useNavigate();
  const answeredQuestions = localStorage.getItem("questions");
  const answrd = answeredQuestions?.length && JSON.parse(answeredQuestions);
  const [clickBtn, setClickBtn] = useState(answrd);
  const [isTimeElapsed, setIsTimeElapsed] = useState(false);
  const [remainingTime, setRemainingTime] = useState(null);
  const [quizEndTime, setQuizEndTime] = useState(endTime);
  const [isWarningShown, setIsWarningShown] = useState({
    first: false,
    second: false,
    third: false,
  });
  const allques =
    localStorage.getItem("allquestions")?.length &&
    JSON.parse(localStorage.getItem("allquestions"));


  useEffect(() => {
    let timer;
    if (mcqDatas.length > 0) {
      timer = setInterval(() => {
        setSeconds((seconds) => 1 + seconds);
        if (seconds === 59) {
          setMinutes((minutes) => minutes + 1);
          setSeconds(0);
        }
        if (minutes === 59) {
          setHours((hours) => hours + 1);
          setMinutes(0);
        }
      }, 1000);
    }

    return () => {
      clearTimeout(timer);
    };
  });

  useEffect(() => {
    const arr = [];

    for (let i = 0; i < totalQuestion; i++) {
      arr.push({
        number: i + 1,
        markAndSave: false,
        markReview: false,
        saveAndReview: false,
        visited: false,
      });
    }
    if (!answrd?.length) {
      setClickBtn(arr);
    }
  }, [totalQuestion]);

  useEffect(() => {
    if (answrd?.length) {
      console.log(answrd, "answeredQuestions");
      setClickBtn(answrd);
    }
  }, [answrd?.length]);

  // const quizId = 137;
  useEffect(() => {
    let url = "getMcqPragByQuizId";
    if (user_Name) {
      url = "getFreePragByQuizId";
    }
    axios
      .post(
        baseUrl() + "/df/" + url,
        {
          quizId: quizId,
        },
        {
          headers: {
            "Acces-Control-Allow-Origin": "*",
            Client_ID: "MVOZ7rblFHsvdzk25vsQpQ==",
            // Authorization: `${Cookies.get("token")}`,
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          setMcqDatas(response.data.Data);
          if (localStorage.getItem("NotVisited") == 0 && !isFinalSubmit) {
            setNotVisited(response.data.Data[0].quesmasters.length);

            localStorage.setItem(
              "NotVisited",
              response.data.Data[0].quesmasters.length
            );
          }
        }
      });
  }, [quizId]);


  // 👇👇 this Effect will set the question number for every Question

  useEffect(() => {
    let questionNumber = 0;
    const mcqDataUpate = mcqDatas.map((questionSet, i) => {
      const updateQuestion = questionSet.quesmasters.map((mcqQuestion) => {
        questionNumber++;
        const option = mcqQuestion.optionBeans.map((option) => {
          return { ...option, selected: 0 };
        });
        return {
          ...mcqQuestion,
          questionNumber: questionNumber,
          optionBeans: option,
        };
      });

      const updateParagraphQuestion = questionSet.paragraphQuestions.map(
        (paragraphQuestion) => {
          const updateParagraph = paragraphQuestion.pgQuesmasters.map(
            (paragraph) => {
              questionNumber++;
              const option = paragraph.optionBeans.map((option) => {
                return { ...option, selected: 0 };
              });
              return {
                ...paragraph,
                questionNumber: questionNumber,
                optionBeans: option,
              };
            }
          );
          return {
            ...paragraphQuestion,
            pgQuesmasters: updateParagraph,
          };
        }
      );
      return {
        ...questionSet,
        quesmasters: updateQuestion,
        paragraphQuestions: updateParagraphQuestion,
      };
    });

    // console.log("updated mcqDataUpate with Question Number 👍🏼", mcqDataUpate);
    if (!allques?.length) {
      setAllQuestion(mcqDataUpate);
    }
    setTotalQuestion(questionNumber);
  }, [mcqDatas]);

  useEffect(() => {
    console.log(allques, "allques");
    if (allques?.length) {
      console.log("setal", allques);
      setAllQuestion(allques);
    }
  }, [allques?.length]);

  const handleNext = () => {
    if (currentQuestion < totalQuestion) {
      setCurrentQuestion(currentQuestion + 1);
      localStorage.setItem("currentQuestion", currentQuestion + 1);

      return;
    }
    setCurrentQuestion(totalQuestion);
  };

  const handleVisited = (e, prv) => {
    console.log(e, prv, "ExamQuizSummuryMCQExamQuizSummuryMCQ");
    const clickUpdate = clickBtn.map((btn) => {
      if (btn.number === e)
        return {
          ...btn,
          markReview: btn.markReview,
          markAndSave: btn.markAndSave,
          saveAndReview: btn.saveAndReview,
          visited: true,
        };
      return btn;
    });
    localStorage.setItem("questions", JSON.stringify(clickUpdate));

    setClickBtn(clickUpdate);
    console.log(clickUpdate, "button");
    const not_answered = clickUpdate.filter(
      (ans) =>
        ans.visited && !ans.markReview && !ans.markAndSave && !ans.saveAndReview
    );
    console.log(not_answered, "notanswer");
    setNotAnswered(not_answered.length);
    localStorage.setItem("NotAnswered", not_answered.length);
    if (e < prv) {
      const visited = clickUpdate.filter((ans) => !ans.visited);
      if (visited.length > 0) {
        setNotVisited(visited.length - 1);
        localStorage.setItem("NotVisited", visited.length - 1);
      }
    }
  };

  const handleBack = () => {
    console.log(currentQuestion, totalQuestion, "current");
    if (currentQuestion <= totalQuestion && currentQuestion > 1) {
      setCurrentQuestion(currentQuestion - 1);
      localStorage.setItem("currentQuestion", currentQuestion - 1);

      return;
    }
    setCurrentQuestion(totalQuestion);
  };

  const handlePrevious = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion((currentQuestion) => currentQuestion - 1);
      localStorage.setItem("currentQuestion", currentQuestion - 1);

      return;
    }
    setCurrentQuestion(1);
    localStorage.setItem("currentQuestion", 1);
  };

  const update = () => {
    var check = false;
    const val = clickBtn.map((btn) => {
      if (btn.visited) {
        check = true;
      }
      if (btn.number === currentQuestion)
        return {
          ...btn,
          markAndSave: false,
          markReview: false,
          saveAndReview: false,
          visited: true,
        };
      return btn;
    });
    localStorage.setItem("questions", JSON.stringify(val));
    setClickBtn(val);
    const answred = val.filter((ans) => ans.markAndSave);
    setAnswer(answred.length);
    localStorage.setItem("Answer", answred.length);
    const answered_review = val.filter((data) => data.saveAndReview);
    setSaveReview(answered_review.length);
    const mark_review = val.filter((ans) => ans.markReview);
    localStorage.setItem("SaveReview", answered_review.length);

    setMarkReview(mark_review.length);
    localStorage.setItem("markReview", mark_review.length);
    // console.log("filter", filter);
    // handleNext();
    const notvisited = val.filter((ans) => !ans.visited);

    if (notvisited.length > 0) {
      console.log(check, "checksss");
      if (check) {
        setNotVisited(notvisited.length);
        localStorage.setItem("NotVisited", notvisited.length);
      } else {
        setNotVisited(notvisited.length - 1);
        localStorage.setItem("NotVisited", notvisited.length - 1);
      }
    }

    const not_answered = val.filter(
      (ans) =>
        ans.visited && !ans.markReview && !ans.markAndSave && !ans.saveAndReview
    );
    console.log(not_answered, "notanswer");

    setNotAnswered(not_answered.length);
    localStorage.setItem("NotAnswered", not_answered.length);
  };

  //get the endtime for the quiz
  useEffect(() => {
    if (isQuizLive) {
      const startDateTime = new Date(`${quizDate}T${quizStartTime}`);
      const endDateTime = new Date(startDateTime.getTime() + endTime * 60000); // convert examTime minutes in milliseconds

      const formattedEndTime = endDateTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
      setQuizEndTime(formattedEndTime);
    }
  }, [quizDate, quizStartTime, isQuizLive]);

  //for time remaining (Live Quiz)
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      // const end = new Date(`${quizDate}T${"17:40"}`).getTime(); //fake time
      const end = new Date(`${quizDate}T${quizEndTime}`).getTime();

      const timeDiff = end - now;

      if (timeDiff <= 0) {
        clearInterval(interval);
        setRemainingTime("00:00:00");
      } else {
        const hours = Math.floor(timeDiff / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

        const formattedTime = `${padZero(hours)}:${padZero(minutes)}:${padZero(
          seconds
        )}`;
        setRemainingTime(formattedTime);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [quizEndTime]);

  const padZero = (num) => {
    return num.toString().padStart(2, "0");
  };

  //for time elapsed (Live Quiz)
  const startTime = new Date();
  startTime.setHours(17);
  startTime.setMinutes(30); //fake time
  startTime.setHours(quizStartTime?.split(":")[0]);
  startTime.setMinutes(quizStartTime?.split(":")[1]);
  startTime.setSeconds(0);

  const endQuizTime = new Date();
  endQuizTime.setHours(quizEndTime?.split(":")[0]);
  endQuizTime.setMinutes(quizEndTime?.split(":")[1]);
  endQuizTime.setHours(17);
  endQuizTime.setMinutes(40);
  endQuizTime.setSeconds(0); //fake time

  console.log(quizEndTime, "timeEnd---");

  const [timeElapsed, setTimeElapsed] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      const currentTime = new Date();

      if (currentTime >= startTime && currentTime <= endQuizTime) {
        const elapsedTime =
          currentTime - new Date(`${quizDate}T${quizStartTime}`);
        // currentTime - new Date(`${quizDate}T${"17:30"}`); //fake time
        const hours = Math.floor(elapsedTime / (1000 * 60 * 60));
        const minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
        const seconds = Math.floor((elapsedTime / 1000) % 60);

        setTimeElapsed(
          `${hours.toString().padStart(2, "0")}:${minutes
            .toString()
            .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
        );
      } else if (currentTime < startTime) {
        setTimeElapsed("yet to start");
      } else {
        setTimeElapsed("completed");
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [quizStartTime]);

  // auto submission interval checker (every 10 secs)
  useEffect(() => {
    const interval = setInterval(() => {
      if (remainingTime == "00:00:00") {
        autoSubmitQuiz();
        clearInterval(interval);
      }
    }, 1000); // Check every sec if the time is completed (adjust as needed)

    return () => {
      clearInterval(interval);
    };
  }, [remainingTime]);

  //show alert message on specific time intervals
  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = new Date();
      // const startTime = new Date(`${quizDate}T${"17:30"}`); //fake time
      const startTime = new Date(`${quizDate}T${quizStartTime}`);
      const elapsedTime =
        (currentTime.getTime() - startTime.getTime()) / (1000 * 60); // Convert to minutes

      console.log(Math.floor(elapsedTime), "EEEtime");
      // const tendTime = 10;
      console.log(endTime, "endTime");

      console.log(Math.ceil(endTime / 2), "1111111");
      console.log(Math.ceil(endTime / 2 + endTime / 5), "22222");
      console.log(Math.ceil(endTime / 2 + endTime / 5 + endTime / 10), "33333");

      console.log(
        remainingTime,
        remainingTime.split(":")[1],
        "(((((((((INSIDE"
      );
      if (
        Math.floor(elapsedTime) === Math.ceil(endTime / 2) &&
        !isWarningShown.first
      ) {
        console.log("first", isWarningShown.first);
        Swal.fire({
          icon: "info",
          toast: true,
          title: `only ${remainingTime.split(":")[1] ? remainingTime.split(":")[1] : "00" 
            } minutes left in submission`,
          position: "bottom-right",
          showConfirmButton: false,
          timer: 60000,
          timerProgressBar: true,
        });
        setIsWarningShown({ ...isWarningShown, first: true });
      }

      if (
        Math.floor(elapsedTime) === Math.ceil(endTime / 2 + endTime / 5) &&
        !isWarningShown.second
      ) {
        console.log("secondddd");
        Swal.fire({
          icon: "info",
          toast: true,
          title: `only ${remainingTime.split(":")[1] ? remainingTime.split(":")[1] : "00" 
            } minutes left in submission`,
          position: "bottom-right",
          showConfirmButton: false,
          timer: 60000,
          timerProgressBar: true,
        });
        setIsWarningShown({ ...isWarningShown, second: true });
      }

      if (
        Math.floor(elapsedTime) ===
        Math.ceil(endTime / 2 + endTime / 5 + endTime / 10) &&
        !isWarningShown.third
      ) {
        console.log("thirdddd");
        Swal.fire({
          icon: "info",
          toast: true,
          title: `only ${remainingTime.split(":")[1] ? remainingTime.split(":")[1] : "00" 
            } minutes left in submission`,
          position: "bottom-right",
          showConfirmButton: false,
          timer: 60000,
          timerProgressBar: true,
        });
        setIsWarningShown({ ...isWarningShown, third: true });
      }
    }, 30000);

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, [remainingTime]);

  const autoSubmitQuiz = () => {
    const resultTime =
      (hours < 10 ? "0" + hours : hours) +
      ":" +
      (minutes < 10 ? "0" + minutes : minutes) +
      ":" +
      (seconds < 10 ? "0" + seconds : seconds);

    axios
      .post(
        baseUrl() + "/df/saveMcqPragraphQuizData",
        {
          quizId: quizId,
          courseId: courseId,
          userId: Cookies.get("userId"),
          quizSectionWises: allQuestion,
          timeTaken: resultTime,
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
        // console.log(response, "response");
        if (response.status === 200) {
          navigate("/SubmitExam", {
            state: {
              data: response.data.Data,
              name: name,
              notVisited: notVisited,
              path: path,
              quizId: quizId,
              courseId: courseId,
              isQuizLive: isQuizLive,
            },
          });
        }
      });
    localStorage.setItem("allquestions", []);
    localStorage.setItem("Answer", 0);
    localStorage.setItem("NotVisited", 0);
    localStorage.setItem("questions", []);
    localStorage.setItem("markReview", 0);
    localStorage.setItem("SaveReview", 0);
    localStorage.setItem("NotAnswered", 0);
    localStorage.setItem("currentQuestion", 1);
    localStorage.setItem("timer", null);
    setIsWarningShown({
      first: false,
      second: false,
      third: false,
    });
  };

  const submitQuiz = (e) => {
    // console.log("submitted");
    const resultTime =
      (hours < 10 ? "0" + hours : hours) +
      ":" +
      (minutes < 10 ? "0" + minutes : minutes) +
      ":" +
      (seconds < 10 ? "0" + seconds : seconds);

    if (seo) {
      axios
        .post(
          baseUrl() + "/df/saveFreeMcqPragraphQuizData",
          {
            quizId: quizId,
            courseId: courseId,
            userId: Cookies.get("userId"),
            quizSectionWises: allQuestion,
            timeTaken: resultTime,
          },
          {
            headers: {
              "Acces-Control-Allow-Origin": "*",
              Client_ID: "MVOZ7rblFHsvdzk25vsQpQ==",
              // Authorization: `${Cookies.get('token')}`,
            },
          }
        )
        .then((response) => {
          console.log(response, "response");
          if (response.status === 200) {
            navigate("/StartTestReview", {
              state: {
                data: {
                  totalMarks: response.data.Data.totalMarks,
                  studentresult: response.data.Data,
                  score: response.data.Data.marksObtained,
                  path: path,
                  hr: hours,
                  min: minutes,
                  sec: seconds,
                  user_Name: user_Name,
                  quizId: quizId,
                  courseId: courseId,
                  userId: Cookies.get("userId"),
                  quizSectionWises: allQuestion,

                  timeTaken: resultTime,
                  result: [],
                  notVisited: notVisited,
                  saveReview: saveReview,
                  notAnswered: notAnswered,
                  answer: answer,
                  markReview: markReview,
                  totalQuest: totalQuestion,
                  name: name,
                  seo: seo,
                  feedbackresult: response.data.Data.questionsBeans,
                  // isCorrect:response.data.Data.questionsBeans[0].optionBeans.isCorrect,
                  // selected:response.data.Data.questionsBeans[0].optionBeansselected,
                  // optionValue:response.data.Data.questionsBeans[0].optionBeansoptionValue
                },
              },
            });
          }
        });
      localStorage.setItem("allquestions", []);
      localStorage.setItem("Answer", 0);
      localStorage.setItem("NotVisited", 0);
      localStorage.setItem("questions", []);
      localStorage.setItem("markReview", 0);
      localStorage.setItem("SaveReview", 0);
      localStorage.setItem("NotAnswered", 0);
      localStorage.setItem("currentQuestion", 1);
      localStorage.setItem("timer", null);
      setIsWarningShown({
        first: false,
        second: false,
        third: false,
      });
    } else {
      navigate("/ExamQuizSummuryMCQ", {
        state: {
          data: {
            hr: hours,
            min: minutes,
            sec: seconds,
            quizId: quizId,
            courseId: courseId,
            userId: Cookies.get("userId"),
            quizSectionWises: allQuestion,
            timeTaken: resultTime,
            result: [],
            notVisited: notVisited,
            saveReview: saveReview,
            notAnswered: notAnswered,
            answer: answer,
            markReview: markReview,
            totalQuest: totalQuestion,
            name: name,
            path: path,
            isQuizLive: isQuizLive,
          },
        },
      });
    }
    //   }
    // });
  };

  return (
    <>
      <div
        className="modal fade"
        id="leaveQuiz"
        tabIndex="-1"
        aria-labelledby="loginModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="loginModalLabel">
                Leave Quiz
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body mx-auto">
              <img
                style={{ zIndex: -1 }}
                src={"logo"}
                className="water-mark-quiz"
              ></img>
              <form>
                <h1 style={{ fontSize: "20px" }}>
                  Are you sure you want to leave quiz ?
                </h1>
                <div className="mb-3 d-flex justify-content-center"></div>
                <Link
                  className="btn main-btn "
                  data-mdb-dismiss="modal"
                  to={studDashboard}
                >
                  Yes
                </Link>
                <button
                  type="button"
                  className="btn main-btn"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  style={{ marginLeft: "50px" }}
                >
                  No
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <button
        className="btn main-btn  px-4"
        style={{
          margin: "10px 10px 10px 0px",
          padding: "9px 20px",
          fontSize: "17px",
          borderRadius: "0px",
        }}
        data-bs-toggle="modal"
        data-trigger="focus"
        data-bs-target="#leaveQuiz"
        id="openleaveQuiz"
      >
        Leave Quiz
      </button>{" "}
      <div
        className="w-100"
        style={{
          backgroundColor: "#F18C18",
          marginTop: "30px",
          height: "60px",
          fontFamily: "Poppins",
        }}
      >
        <p
          className="p-3 "
          style={{
            color: "white",
            fontSize: "20px",
            fontWeight: "600",
            lineHeight: "22px",
            fontFamily: "Poppins",
          }}
        >
          {name}
        </p>
      </div>
      <section
        className="container-fluid  position-relative"
        style={{ width: "90%" }}
      >
        <button
          onClick={() => navigate(-1)}
          type="button"
          className="btn btn-circle  btn-dark ms-1 "
          style={{
            marginTop: "1%",
            // backgroundColor: "red",
            position: "fixed",
            top: "50%",
            left: "0%",
          }}
        >
          {"<"}
        </button>
        <nav className="d-md-flex  navbar-expand-lg shadow-none navbar-light px-3 py-1 fixed-top white-bg">
          <div className="d-flex align-items-center">
            {" "}
            <Link className="navbar-brand" to="/">
              <img
                src={Logo}
                alt=""
                width="70"
                height="auto"
                className="d-inline-block align-text-top"
              />
            </Link>
            <div style={{ width: "100%" }}>
              <div
                style={{
                  fontSize: "12px",
                  fontWeight: "600",
                  lineHeight: "11px",
                }}
              >
                Brahmaputra Exam Success Support Team (besst)
              </div>
              <div
                style={{
                  fontSize: "13px",
                  fontWeight: "400",
                  lineHeight: "22px",
                }}
              >
                Besst Exam Simulator
              </div>
            </div>{" "}
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>

          <div className="collapse navbar-collapse" id="navbarNav">
            <div className="w-100 d-flex justify-content-md-end mt-2">
              <div
                style={{
                  alignItems: "center",
                  border: "1px solid black",
                  display: "flex",
                  justifyContent: "center",
                  height: "70px",
                  width: "80px",
                }}
              >
                {image ? (
                  <img
                    style={{
                      height: "70px",
                      width: "80px",
                    }}
                    src={baseUrl() + "/df/showProfilePic/" + image}
                  ></img>
                ) : (
                  <FaUser size={40} />
                )}
              </div>

              <div
                className=" ms-2 "
                style={{
                  lineHeight: "18px",
                }}
              >
                <h6
                  className="ms-2"
                  style={{
                    fontSize: "12px",
                    fontWeight: "400",
                    lineHeight: "18px",
                    fontFamily: "poppins",
                  }}
                >
                  Candidate name:
                  <span
                    className="p-2"
                    style={{
                      color: "#FB8900",
                      fontSize: "12px",
                      fontWeight: "600",
                      lineHeight: "18px",
                      fontFamily: "poppins",
                    }}
                  >
                    {user_Name ? user_Name : firstName}
                  </span>
                </h6>
                <h6
                  className="ms-2"
                  style={{
                    fontSize: "12px",
                    fontWeight: "400",
                    lineHeight: "18px",
                    fontFamily: "poppins",
                  }}
                >
                  Subject name:{" "}
                  <span
                    className="p-2"
                    style={{
                      color: "#FB8900",
                      fontSize: "12px",
                      fontWeight: "600",
                      lineHeight: "18px",
                      fontFamily: "poppins",
                    }}
                  >
                    {name}
                  </span>
                </h6>
                {!isQuizLive && (
                  <h6
                    className="ms-2"
                    onClick={() => setIsTimeElapsed(!isTimeElapsed)}
                    style={{
                      fontSize: "12px",
                      fontWeight: "400",
                      lineHeight: "18px",
                      fontFamily: "poppins",
                    }}
                  >
                    Time Elapsed :{" "}
                    <span
                      style={{
                        border: "1px solid #078FC5",
                        backgroundColor: "#078FC5",
                        borderRadius: "15px",
                        padding: "4px",
                        color: "white",
                      }}
                    >
                      {hours < 10 ? "0" + hours : hours}:
                      {minutes < 10 ? "0" + minutes : minutes}:
                      {seconds < 10 ? "0" + seconds : seconds}
                    </span>
                  </h6>
                )}
                {isTimeElapsed ? (
                  <h6
                    className="ms-2"
                    onClick={() => setIsTimeElapsed(!isTimeElapsed)}
                    style={{
                      cursor: "pointer",
                      fontSize: "12px",
                      fontWeight: "400",
                      lineHeight: "18px",
                      fontFamily: "poppins",
                    }}
                  >
                    Time Elapsed :{" "}
                    <span
                      style={{
                        border: "1px solid #078FC5",
                        backgroundColor: "#078FC5",
                        borderRadius: "15px",
                        maxWidth: "70px",
                        display: "inline-block",
                        padding: "4px",
                        color: "white",
                      }}
                    >
                      {timeElapsed}
                    </span>
                  </h6>
                ) : (
                  <h6
                    className="ms-2"
                    onClick={() => setIsTimeElapsed(!isTimeElapsed)}
                    style={{
                      cursor: "pointer",
                      fontSize: "12px",
                      fontWeight: "400",
                      lineHeight: "18px",
                      fontFamily: "poppins",
                    }}
                  >
                    Time Remaining :{" "}
                    <span
                      style={{
                        border: "1px solid #078FC5",
                        backgroundColor: "#078FC5",
                        maxWidth: "70px",
                        display: "inline-block",
                        borderRadius: "15px",
                        padding: "4px",
                        color: "white",
                      }}
                    >
                      {isTimeElapsed
                        ? `${hours < 10 ? "0" + hours : hours}:${
                            minutes < 10 ? "0" + minutes : minutes
                          }:${seconds < 10 ? "0" + seconds : seconds}`
                        : remainingTime}
                    </span>
                  </h6>
                )}
              </div>
            </div>
          </div>
        </nav>{" "}
        {/* responsive */}
        <div style={{ marginTop: "30px", height: "80%" }}>
          <>
            <div>
              <h1 className="text-end"></h1>
            </div>
            {allQuestion.map((questionSet, idx) => (
              <div id={`data/${questionSet.topicId}`} key={idx}>
                {/* mcq-alternate-color */}
                <>
                  {/* <h2>{questionSet.topicName}</h2> */}
                  <article>{questionSet.specialInstruction}</article>
                  <div className="row display-flex justify-content-between">
                    <div
                      style={{ position: "relative" }}
                      className={
                        collapse
                          ? "col-lg-12 col-sm-12 order-lg-1 order-sm-1 order-1 "
                          : "col-lg-7 col-sm-12  order-sm-1  order-lg-1 order-1 "
                      }
                    >
                      <img src={Logo} className="water-mark-quiz"></img>
                      <McqPaper
                        {...{
                          remainingTime,
                          setAnswer,
                          submitQuiz,
                          autoSubmitQuiz,
                          setMarkReview,
                          setNotVisited,
                          setIsFinalSubmt,
                          setNotAnswered,
                          setSaveReview,
                          questionSet,
                          currentQuestion,
                          clickBtn,
                          totalQuestion,
                          setAllQuestion,
                          handleNext,
                          handleBack,
                          handleVisited,
                          setClickBtn,
                        }}
                      />
                      {!collapse ? (
                        <div
                          className="d-none d-md-flex"
                          onClick={() => setCollapse(!collapse)}
                          style={{
                            position: "absolute",
                            right: "-50px",
                            width: "27px",
                            borderRadius: "2px",
                            height: "27px",
                            top: "40%",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "black",
                          }}
                        >
                          <AiOutlineRight
                            className="m-0"
                            onClick={() => setCollapse(!collapse)}
                            color="white"
                            size={18}
                          />
                        </div>
                      ) : (
                        <div
                          className="d-none d-md-block"
                          onClick={() => setCollapse(!collapse)}
                          style={{
                            position: "absolute",
                            right: "-50px",
                            width: "27px",
                            borderRadius: "2px",
                            height: "27px",
                            top: "40%",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "black",
                          }}
                        >
                          <AiOutlineLeft
                            className="m-0"
                            onClick={() => setCollapse(!collapse)}
                            color="white"
                            size={20}
                          />
                        </div>
                      )}
                    </div>
                    <div
                      className={
                        collapse
                          ? " d-none"
                          : "col-lg-4 col-sm-12 p-4 col-md-12 order-sm-1 order-lg-1 order-1  "
                      }
                    >
                      <div
                        className=" "
                        style={{
                          border: "2px  dashed gray",
                        }}
                      >
                        <div className="d-flex justify-content-around">
                          <div className=" p-2">
                            <div className="d-flex ">
                              <button
                                style={{
                                  width: "30px",
                                  height: "30px",
                                  backgroundColor: "#EEEEEE",
                                  border: "1px solid black",
                                  borderRadius: "5px",
                                }}
                              >
                                {notVisited}
                              </button>
                              <p className="ms-3">Not Visited</p>
                            </div>
                            <div className="d-flex  ">
                              <div className="d-flex text-center align-items-center ractangle1  ">
                                <span className="text-white ms-3 text-center">
                                  {answer}
                                </span>
                              </div>

                              <p className="ms-3">Answered</p>
                            </div>{" "}
                          </div>
                          <div className="p-2">
                            <div className="d-flex p-0 ">
                              <div className="d-flex text-center align-items-center ractangle ">
                                <span className="text-white ms-2 text-center">
                                  {" "}
                                  {notAnswered}
                                </span>
                              </div>
                              <p className="ms-3 ">Not Answered</p>
                            </div>{" "}
                            <div className="d-flex ">
                              <button
                                style={{
                                  minWidth: "30px",
                                  height: "30px",
                                  backgroundColor: "#4E2695",
                                  color: "white",
                                  borderRadius: "50%",
                                }}
                              >
                                {markReview}
                              </button>
                              <p className="ms-3">Marked for review</p>
                            </div>
                          </div>
                        </div>
                        <div className="d-flex ms-4 ">
                          <button
                            style={{
                              minWidth: "30px",
                              height: "30px",
                              backgroundColor: "#4E2695",
                              color: "white",
                              borderRadius: "50%",
                            }}
                          >
                            {saveReview}
                          </button>
                          <span
                            style={{
                              width: "8px",
                              height: "8px",

                              backgroundColor: "rgb(92, 184, 91)",
                              borderRadius: "50%",
                              position: "absolute",
                              marginTop: "18px",
                              marginLeft: "20px",
                            }}
                          ></span>
                          <p className="ms-3">
                            <b> Answered & Marked for review </b>
                            <br />
                            (Will be considered for evaluation)
                          </p>
                        </div>{" "}
                      </div>

                      <QuestionButton
                        {...{
                          clickBtn,
                          setCurrentQuestion,
                          currentQuestion,
                          handleVisited,
                        }}
                      />
                    </div>
                  </div>
                </>
              </div>
            ))}
          </>
        </div>
      </section>
      <LandingPageFooter />
    </>
  );
}

function McqPaper({
  setAnswer,
  autoSubmitQuiz,
  remainingTime,
  submitQuiz,
  setMarkReview,
  setNotVisited,
  setNotAnswered,
  setSaveReview,
  questionSet,
  currentQuestion,
  totalQuestion,
  setAllQuestion,
  handleNext,
  handleBack,
  setIsFinalSubmt,
  handleVisited,
  clickBtn,
  setClickBtn,
}) {
  const [filter, setFilter] = useState([]);

  useEffect(() => {
    const quesmasterUpdate = questionSet.quesmasters.filter(
      (question) => question.questionNumber === currentQuestion
    );
    setFilter([...quesmasterUpdate]);

    const paragraphQuestionsUpdate = questionSet.paragraphQuestions.map(
      (pgQuestion) => {
        let pg = pgQuestion.pgQuesmasters.map((question) => {
          if (question.questionNumber === currentQuestion) return question;
          return null;
        });

        let filterPg = pg.filter((question) => question);
        if (filterPg.length) {
          filterPg[0].paragraph_desc = pgQuestion?.paragraph_desc;
        }
        if (filterPg.length) setFilter([...filterPg]);
        return filterPg;
      }
    );
  }, [
    currentQuestion,
    questionSet.paragraphQuestions,
    questionSet.quesmasters,
  ]);

  useEffect(() => {
    const quesId = filter.map((question) => question.quesId);
    const ele = document.getElementsByName(`${quesId}`);
    for (let i = 0; i < ele.length; i++) {
      if (ele[i].ariaChecked === "0") {
        ele[i].checked = false;
        // console.log(ele[i].ariaChecked, typeof ele[i].ariaChecked);
      } else ele[i].checked = true;
    }
  }, [filter]);
  useEffect(() => {
    if (currentQuestion == totalQuestion) {
      setIsFinalSubmt(true);
      localStorage.setItem("finalsubmit", true);
    }
  }, [currentQuestion]);
  const handleSaveNext = (e) => {
    e.preventDefault();
    const quesId = filter.map((question) => question.quesId);
    const ele = document.getElementsByName(`${quesId}`);
    let answer = "";
    for (let i = 0; i < ele.length; i++) {
      if (ele[i].checked) {
        answer = ele[i].value;
        break;
      }
    }
    if (answer === "") {
      alert("Please select an option");
      return true;
    } else {
      console.log("save answer");
      if (currentQuestion <= questionSet.quesmasters.length) {
        const optionUpdate = questionSet.quesmasters.map((mcqQuestion) => {
          const updateOption = mcqQuestion.optionBeans.map((option) => {
            if (mcqQuestion.questionNumber === currentQuestion) {
              // console.log("option.optionId", typeof option.optionId);

              if (option.optionId === Number(answer))
                return { ...option, selected: 1 };
              else return { ...option, selected: 0 };
            }
            return option;
          });
          return { ...mcqQuestion, optionBeans: updateOption };
        });
        setAllQuestion([{ ...questionSet, quesmasters: optionUpdate }]);
        localStorage.setItem(
          "allquestions",
          JSON.stringify([{ ...questionSet, quesmasters: optionUpdate }])
        );
      } else if (
        currentQuestion - questionSet.quesmasters.length <=
        totalQuestion - questionSet.quesmasters.length
      ) {
        const optionUpdate = questionSet.paragraphQuestions.map(
          (pgQuestion) => {
            const updateQuestion = pgQuestion.pgQuesmasters.map((question) => {
              const updateOption = question.optionBeans.map((option) => {
                if (question.questionNumber === currentQuestion) {
                  // console.log("option.optionId", typeof option.optionId);
                  if (option.optionId === Number(answer))
                    return {
                      ...option,
                      selected: 1,
                    };
                  else
                    return {
                      ...option,
                      selected: 0,
                    };
                }
                return option;
              });
              return {
                ...question,
                optionBeans: updateOption,
              };
            });

            return { ...pgQuestion, pgQuesmasters: updateQuestion };
          }
        );
        // console.log("updateQuestion", optionUpdate);

        setAllQuestion([{ ...questionSet, paragraphQuestions: optionUpdate }]);
        localStorage.setItem(
          "allquestions",
          JSON.stringify([{ ...questionSet, paragraphQuestions: optionUpdate }])
        );
      }

      // Save Question button
      const val = clickBtn.map((btn) => {
        if (btn.number === currentQuestion)
          return {
            ...btn,
            markAndSave: true,
            markReview: false,
            saveAndReview: false,
            visited: true,
          };
        return btn;
      });
      localStorage.setItem("questions", JSON.stringify(val));
      setClickBtn(val);
      const answred = val.filter((ans) => ans.markAndSave);
      setAnswer(answred.length);
      localStorage.setItem("Answer", answred.length);
      const answered_review = val.filter((data) => data.saveAndReview);
      setSaveReview(answered_review.length);
      const mark_review = val.filter((ans) => ans.markReview);
      localStorage.setItem("SaveReview", answered_review.length);
      const not_answered = val.filter(
        (ans) =>
          ans.visited &&
          !ans.markReview &&
          !ans.markAndSave &&
          !ans.saveAndReview
      );
      console.log(not_answered, "notanswer");
      setNotAnswered(not_answered.length);
      localStorage.setItem("NotAnswered", not_answered.length);
      setMarkReview(mark_review.length);
      localStorage.setItem("markReview", mark_review.length);
      // console.log("filter", filter);
      handleNext();
      const notvisited = val.filter((ans) => !ans.visited);

      setNotVisited(notvisited.length);
      localStorage.setItem("NotVisited", notvisited.length);
    }
  };

  const handleClearResponse = (e) => {
    const quesId = filter.map((question) => question.quesId);
    const ele = document.getElementsByName(`${quesId}`);
    for (let i = 0; i < ele.length; i++) ele[i].checked = false;
    if (currentQuestion <= questionSet.quesmasters.length) {
      const optionUpdate = questionSet.quesmasters.map((mcqQuestion) => {
        const updateOption = mcqQuestion.optionBeans.map((option) => {
          if (mcqQuestion.questionNumber === currentQuestion) {
            return { ...option, selected: 0 };
          }
          return option;
        });
        return { ...mcqQuestion, optionBeans: updateOption };
      });
      setAllQuestion([{ ...questionSet, quesmasters: optionUpdate }]);
    } else if (
      currentQuestion - questionSet.quesmasters.length <=
      totalQuestion - questionSet.quesmasters.length
    ) {
      const optionUpdate = questionSet.paragraphQuestions.map((pgQuestion) => {
        const updateQuestion = pgQuestion.pgQuesmasters.map((question) => {
          const updateOption = question.optionBeans.map((option) => {
            if (question.questionNumber === currentQuestion) {
              return { ...option, selected: 0 };
            }
            return option;
          });
          return { ...question, optionBeans: updateOption };
        });

        return { ...pgQuestion, pgQuesmasters: updateQuestion };
      });
      // console.log("updateQuestion", optionUpdate);

      setAllQuestion([{ ...questionSet, paragraphQuestions: optionUpdate }]);
    }

    // Save Question button
    const val = clickBtn.map((btn) => {
      if (btn.number === currentQuestion)
        return {
          ...btn,
          markAndSave: false,
          markReview: false,
          saveAndReview: false,
          visited: true,
        };
      return btn;
    });

    localStorage.setItem("questions", JSON.stringify(val));
    setClickBtn(val);
    const answred = val.filter((ans) => ans.markAndSave);
    setAnswer(answred.length);
    localStorage.setItem("Answer", answred.length);
    const answered_review = val.filter((data) => data.saveAndReview);
    setSaveReview(answered_review.length);
    const mark_review = val.filter((ans) => ans.markReview);
    localStorage.setItem("SaveReview", answered_review.length);
    const not_answered = val.filter(
      (ans) =>
        ans.visited && !ans.markReview && !ans.markAndSave && !ans.saveAndReview
    );
    console.log(not_answered, "notanswer");
    setNotAnswered(not_answered.length);
    localStorage.setItem("NotAnswered", not_answered.length);
    setMarkReview(mark_review.length);
    localStorage.setItem("markReview", mark_review.length);
    // console.log("filter", filter);
    handleNext();
    const notvisited = val.filter((ans) => !ans.visited);

    setNotVisited(notvisited.length);
    localStorage.setItem("NotVisited", notvisited.length);
  };

  const handleMarkForReview = (e) => {
    handleClearResponse();
    const clickUpdate = clickBtn.map((btn) => {
      if (btn.number === currentQuestion)
        return {
          ...btn,
          markReview: true,
          markAndSave: false,
          saveAndReview: false,
          visited: true,
        };

      return btn;
    });
    localStorage.setItem("questions", JSON.stringify(clickUpdate));
    setClickBtn(clickUpdate);
    const answred = clickUpdate.filter((ans) => ans.markAndSave);
    setAnswer(answred.length);
    localStorage.setItem("Answer", answred.length);
    const answered_review = clickUpdate.filter((data) => data.saveAndReview);
    setSaveReview(answered_review.length);
    const mark_review = clickUpdate.filter((ans) => ans.markReview);
    const not_answered = clickUpdate.filter(
      (ans) =>
        ans.visited && !ans.markReview && !ans.markAndSave && !ans.saveAndReview
    );
    console.log(not_answered, "notanswer");
    setNotAnswered(not_answered.length);
    localStorage.setItem("NotAnswered", not_answered.length);
    localStorage.setItem("SaveReview", answered_review.length);

    setMarkReview(mark_review.length);
    localStorage.setItem("markReview", mark_review.length);
    // console.log("filter", filter);
    handleNext();
    const notvisited = clickUpdate.filter((ans) => !ans.visited);

    console.log(
      notvisited.length,
      currentQuestion,
      totalQuestion,
      "Mark for review>>>"
    );

    setNotVisited(notvisited.length);
    localStorage.setItem("NotVisited", notvisited.length);

  };
  const handleBackbtn = () => {
    handleClearResponse();

    const clickUpdate = clickBtn.map((btn) => {
      if (btn.number === currentQuestion)
        return {
          ...btn,
          markReview: btn.markReview,
          markAndSave: btn.markAndSave,
          saveAndReview: btn.saveAndReview,
          visited: true,
        };
      return btn;
    });
    localStorage.setItem("questions", JSON.stringify(clickUpdate));

    setClickBtn(clickUpdate);
    console.log(clickUpdate, "button");
    const not_answered = clickUpdate.filter(
      (ans) =>
        ans.visited && !ans.markReview && !ans.markAndSave && !ans.saveAndReview
    );
    console.log(not_answered, "notanswer");
    setNotAnswered(not_answered.length);
    localStorage.setItem("NotAnswered", not_answered.length);

    const notvisited = clickUpdate.filter((ans) => !ans.visited);
    if (notvisited.length > 0) {
      setNotVisited(notvisited.length);
      localStorage.setItem("NotVisited", notvisited.length);
    }

    handleBack();
  };
  const handleNextBtn = (e) => {
    handleClearResponse();

    const clickUpdate = clickBtn.map((btn) => {
      if (btn.number === currentQuestion)
        return {
          ...btn,
          markReview: btn.markReview,
          markAndSave: btn.markAndSave,
          saveAndReview: btn.saveAndReview,
          visited: true,
        };
      return btn;
    });
    localStorage.setItem("questions", JSON.stringify(clickUpdate));

    setClickBtn(clickUpdate);
    console.log(clickUpdate, "button");
    const not_answered = clickUpdate.filter(
      (ans) =>
        ans.visited && !ans.markReview && !ans.markAndSave && !ans.saveAndReview
    );
    console.log(not_answered, "notanswer");
    setNotAnswered(not_answered.length);
    localStorage.setItem("NotAnswered", not_answered.length);

    const notvisited = clickUpdate.filter((ans) => !ans.visited);
    if (notvisited.length > 0) {
      setNotVisited(notvisited.length);
      localStorage.setItem("NotVisited", notvisited.length);
    }

    handleNext();
  };

  const handleSaveAndMark = (e) => {
    // const notMarkAnswer = handleSaveNext(e);
    e.preventDefault();
    const quesId = filter.map((question) => question.quesId);
    // console.log("quesId", quesId);
    const ele = document.getElementsByName(`${quesId}`);
    let answer = "";
    for (let i = 0; i < ele.length; i++) {
      if (ele[i].checked) {
        answer = ele[i].value;
        break;
      }
    }
    // console.log("answer", answer);
    if (answer === "") {
      alert("Please select an option");
      return true;
    } else {
      if (currentQuestion <= questionSet.quesmasters.length) {
        const optionUpdate = questionSet.quesmasters.map((mcqQuestion) => {
          const updateOption = mcqQuestion.optionBeans.map((option) => {
            if (mcqQuestion.questionNumber === currentQuestion) {
              // console.log("option.optionId", typeof option.optionId);

              if (option.optionId === Number(answer))
                return { ...option, selected: 1 };
              else return { ...option, selected: 0 };
            }
            return option;
          });
          return { ...mcqQuestion, optionBeans: updateOption };
        });
        setAllQuestion([{ ...questionSet, quesmasters: optionUpdate }]);
        localStorage.setItem(
          "allquestions",
          JSON.stringify([{ ...questionSet, quesmasters: optionUpdate }])
        );
      } else if (
        currentQuestion - questionSet.quesmasters.length <=
        totalQuestion - questionSet.quesmasters.length
      ) {
        const optionUpdate = questionSet.paragraphQuestions.map(
          (pgQuestion) => {
            const updateQuestion = pgQuestion.pgQuesmasters.map((question) => {
              const updateOption = question.optionBeans.map((option) => {
                if (question.questionNumber === currentQuestion) {
                  // console.log("option.optionId", typeof option.optionId);
                  if (option.optionId === Number(answer))
                    return {
                      ...option,
                      selected: 1,
                    };
                  else
                    return {
                      ...option,
                      selected: 0,
                    };
                }
                return option;
              });
              return {
                ...question,
                optionBeans: updateOption,
              };
            });

            return { ...pgQuestion, pgQuesmasters: updateQuestion };
          }
        );
        // console.log("updateQuestion", optionUpdate);

        setAllQuestion([{ ...questionSet, paragraphQuestions: optionUpdate }]);
        localStorage.setItem(
          "allquestions",
          JSON.stringify([{ ...questionSet, paragraphQuestions: optionUpdate }])
        );
      }
      // if (notMarkAnswer) return;
      const clickUpdate = clickBtn.map((btn) => {
        if (btn.number === currentQuestion)
          return {
            ...btn,
            markReview: false,
            markAndSave: false,
            saveAndReview: true,
            visited: true,
          };
        return btn;
      });
      localStorage.setItem("questions", JSON.stringify(clickUpdate));
      setClickBtn(clickUpdate);
      const answred = clickUpdate.filter((ans) => ans.markAndSave);
      setAnswer(answred.length);
      localStorage.setItem("Answer", answred.length);
      const answered_review = clickUpdate.filter((data) => data.saveAndReview);
      setSaveReview(answered_review.length);
      const mark_review = clickUpdate.filter((ans) => ans.markReview);
      localStorage.setItem("SaveReview", answered_review.length);
      const not_answered = clickUpdate.filter(
        (ans) =>
          ans.visited &&
          !ans.markReview &&
          !ans.markAndSave &&
          !ans.saveAndReview
      );
      console.log(not_answered, "notanswer");
      setNotAnswered(not_answered.length);
      localStorage.setItem("NotAnswered", not_answered.length);
      setMarkReview(mark_review.length);
      localStorage.setItem("markReview", mark_review.length);
      // console.log("filter", filter);
      handleNext();
      const notvisited = clickUpdate.filter((ans) => !ans.visited);
      console.log(notvisited.length, "Callllll");

      setNotVisited(notvisited.length);
      localStorage.setItem("NotVisited", notvisited.length);
    }


  };

  const [more, setMore] = useState(false);

  const getSort = (e) => {
    return e.split("", 500);
  };
  const question = filter.map((question, idx) => (
    <div style={{ position: "relative" }} key={idx}>
      <h5>Question- {question.questionNumber}</h5>
      <hr />
      <div
        id="style-3"
        style={{
          position: "relative",
          overflowX: "auto",
          height: "maxContent",
        }}
      >
        {question?.paragraph_desc ? (
          <p>
            {more ? question.paragraph_desc : getSort(question.paragraph_desc)}

            <a
              className="ms-1"
              style={{
                color: "blue",
                cursor: "pointer",
                // textDecoration: "underline",
              }}
              onClick={() => setMore(!more)}
            >
              {!more ? "See more.." : "See Less"}
            </a>
          </p>
        ) : (
          ""
        )}
        <p className={`questions-mcq-mobile m-0`}>
          {question.questionNumber}.&nbsp;&nbsp;
          <span>{parse(String(question.question))}</span>
        </p>
        {question.optionBeans.map((answer, key) => (
          <div
            className="form-check form-check-media"
            style={{ margin: "0 0 0 15px" }}
            key={key}
          >
            {/* <input
            type="radio"
            className="form-check-input"
            id={answer.optionId}
            aria-checked={answer.selected || 0}
            value={answer.optionId}
            name={question.quesId}
          /> */}
            {"(" + (key + 10).toString(36).toLowerCase() + ")" + " "}
            <label
              htmlFor={answer.optionId}
              className="form-check-label questions-mcq-mobile"
            >
              <span>{parse(String(answer.optionValue))}</span>
            </label>
          </div>
        ))}
        <div
          className="d-flex justify-content-between mt-3"
          style={{ maxWidth: "70%" }}
        >
          {question.optionBeans.map((answer, key) => (
            <div>
              <input
                type="radio"
                className="form-check-input ms-3"
                id={answer.optionId}
                aria-checked={answer.selected || 0}
                value={answer.optionId}
                name={question.quesId}
              />
              <label
                htmlFor={answer.optionId}
                className="form-check-label questions-mcq-mobile"
              >
                <div className="ms-5">
                  {"(" + (key + 10).toString(36).toLowerCase() + ")" + " "}
                </div>
                {/* <span
                  dangerouslySetInnerHTML={{ __html: answer.optionValue }}
                ></span> */}
                {/* <input
                type="radio"
                className="form-check-input ms-3"
                id={answer.optionId}
                aria-checked={answer.selected || 0}
                value={answer.optionId}
                name={question.quesId}
              /> */}
              </label>
            </div>
          ))}
        </div>
      </div>
      <hr />
      <div className="d-flex flex-wrap gap-1 mt-2">
        <button
          className="btn-mcq"
          type="button"
          style={{
            background: "#5CB85B",
            display: "flex",
            alignItems: "center",
            height: "40px",
          }}
          onClick={handleSaveNext}
        >
          Save & Next
        </button>
        <button
          className="btn-mcq"
          type="button"
          style={{
            background: "white",
            border: "1px solid #E1E1E1",
            fontSize: "16px",
            fontWeight: "600",
            color: "black",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "40px",
          }}
          onClick={handleClearResponse}
        >
          Clear
        </button>
        <button
          className="btn-mcq"
          style={{
            background: "#F0AD4E",
            fontSize: "16px",
            fontWeight: "600",
            color: "white",
            // width: "38%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "40px",
          }}
          type="button"
          onClick={handleSaveAndMark}
        >
          Save & Mark for Review
        </button>

        <button
          className="btn-mcq"
          type="button"
          style={{
            background: "#3279B7",
            fontSize: "16px",
            fontWeight: "600",
            color: "white",
            // width: "38%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "40px",
          }}
          onClick={handleMarkForReview}
        >
          Mark for Review & Next
        </button>
      </div>
      <div
        className="mt-3 d-flex justify-content-between"
        style={{
          backgroundColor: "#F5F5F5",
          borderTop: "1px solid gray",
        }}
      >
        <div className="p-1 d-flex ">
          <button
            className="btn-mcq"
            type="button"
            style={{
              background: "white",
              fontSize: "16px",
              fontWeight: "600",
              color: "black",
              // width: "3%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "40px",
            }}
            onClick={handleBackbtn}
          >
            {"<<"} BACK
          </button>
          <button
            className="btn-mcq ms-1"
            type="button"
            style={{
              background: "white",
              fontSize: "16px",
              fontWeight: "600",
              color: "black",
              // width: "3%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "40px",
            }}
            onClick={handleNextBtn}
          >
            NEXT {">>"}
          </button>
        </div>
        <div className="p-1">
          {remainingTime <= "00:01:00" && remainingTime >= "00:00:00" ? (
            <button
              className="btn-mcq"
              type="button"
              style={{
                background: "#5CB85B",
                fontSize: "12px",
                fontWeight: "400",
                color: "white",
                fontVariant: "small-caps",
                // width: "3%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "40px",
              }}
              onClick={submitQuiz}
            >
              AUTO SUBMITING IN {remainingTime}
            </button>
          ) : (
            <button
              className="btn-mcq"
              type="button"
              style={{
                background: "#5CB85B",
                fontSize: "14px",
                fontWeight: "600",
                color: "white",
                fontVariant: "small-caps",
                // width: "3%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "40px",
              }}
              onClick={submitQuiz}
            >
              SUBMIT
            </button>
          )}
        </div>
      </div>
    </div>
  ));

  return <>{question}</>;
}


