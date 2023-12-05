/* eslint-disable */
import axios from "axios";
import Cookies from "js-cookie";
import baseUrl from "../../Components/baseUrl";
import React, { useEffect, useState } from "react";
import Logo from "../../Assets/images/logo.png";
import userLogo from "../../Assets/images/avatar.png";
import profileHook from "./useProfile";
import "./StudentMCQ.css";
// import { AiFillFlag } from "react-icons/ai";

import "./StudentMCQ.css";
import QuestionButton from "./QuestionButton";

import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import $ from "jquery";
import { FaUser } from "react-icons/fa";
import { studDashboard, testSubmit } from "../../RouteConstants";

export default function StudentFeedback() {
  const [mcqDatas, setMcqDatas] = useState([]);
  const [allQuestion, setAllQuestion] = useState([]);
  const [totalQuestion, setTotalQuestion] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(1);

  const profileData = profileHook();

  const { firstName, lastName, image } = profileData;
  const [clickBtn, setClickBtn] = useState([]);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const location = useLocation();
  const { name } = location.state;

  console.log(location, "location");
  const { quizId, courseId } = { quizId: 1, courseId: 2 };
  const navigate = useNavigate();

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
      });
    }

    setClickBtn(arr);
  }, [totalQuestion]);

  // const quizId = 137;
  useEffect(() => {
    axios
      .post(
        baseUrl() + "/df/getMcqPragByQuizId",
        {
          quizId: quizId,
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
          setMcqDatas(response.data.Data);
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
    setAllQuestion(mcqDataUpate);
    setTotalQuestion(questionNumber);
  }, [mcqDatas]);

  const handleNext = () => {
    if (currentQuestion < totalQuestion) {
      setCurrentQuestion((currentQuestion) => currentQuestion + 1);
      return;
    }
    setCurrentQuestion(totalQuestion);
  };

  const handlePrevious = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion((currentQuestion) => currentQuestion - 1);
      return;
    }
    setCurrentQuestion(1);
  };

  const handleClick = () => {
    navigate(studDashboard);
  };

  const submitQuiz = (e) => {
    const resultTime =
      (hours < 10 ? "0" + hours : hours) +
      ":" +
      (minutes < 10 ? "0" + minutes : minutes) +
      ":" +
      (seconds < 10 ? "0" + seconds : seconds);
    // console.log("", allQuestion);
    // return;
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
        if (response.status === 200) {
          // console.log("data", response.data.Data);
          navigate(testSubmit, {
            state: { data: response.data.Data },
          });
        }
      });
    // console.log("submitted");
  };

  return (
    <>
      {" "}
      <div
        className="w-100"
        style={{
          backgroundColor: "#F18C18",
          marginTop: "100px",
          height: "60px",
        }}
      >
        <p
          className="p-3 ms-5"
          style={{
            color: "white",
            fontSize: "20px",
            fontWeight: "600",
            lineHeight: "22px",
            fontFamily: "Poppins",
          }}
        >
          CUET(UG) - {name}
        </p>
      </div>
      <section
        className="container-fluid  position-relative"
        style={{ width: "90%" }}
      >
        <nav className="d-flex align-items-center navbar navbar-expand-lg shadow-none navbar-light px-5 py-1 fixed-top white-bg">
          <Link className="navbar-brand" to="/">
            <img
              src={Logo}
              alt=""
              width="70"
              height="auto"
              className="d-inline-block align-text-top"
            />
          </Link>
          <div style={{ width: "50%" }}>
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
          </div>
          <div className="w-100 d-flex justify-content-end mt-2">
            <div>
              <img src={image ? <FaUser /> : Logo}></img>
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
                  {firstName}
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
              <h6
                className="ms-2"
                style={{
                  fontSize: "12px",
                  fontWeight: "400",
                  lineHeight: "18px",
                  fontFamily: "poppins",
                }}
              >
                Remaining :{" "}
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
            </div>
          </div>
        </nav>{" "}
        <div className="mt-4">Student Feedback on Mock Test</div>
        <div className="row mt-3 d-flex justify-content-between">
          <div className="col-lg-2">
            <label
              htmlFor="exampleInputEmail1"
              style={{
                fontSize: "14px",
                fontWeight: "400",
                lineHeight: "21px",
              }}
            >
              Name *
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
            />
          </div>
          <div className="col-lg-2">
            <label
              htmlFor="exampleInputEmail1"
              style={{
                fontSize: "14px",
                fontWeight: "400",
                lineHeight: "21px",
              }}
            >
              Email *
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
            />
          </div>
          <div className="col-lg-2">
            <label
              htmlFor="exampleInputEmail1"
              style={{
                fontSize: "14px",
                fontWeight: "400",
                lineHeight: "21px",
              }}
            >
              Mobile *
            </label>
            <input
              style={{ width: "100%" }}
              type="number"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
            />
          </div>
          <div className="col-lg-2 ">
            <label
              htmlFor="exampleInputEmail1"
              style={{
                fontSize: "14px",
                fontWeight: "400",
                lineHeight: "21px",
              }}
            >
              State *
            </label>
            <input
              style={{ width: "90%" }}
              type="text"
              className="form-control "
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
            />
          </div>
          <div className="col-lg-2 ">
            <label
              htmlFor="exampleInputEmail1"
              style={{
                fontSize: "14px",
                fontWeight: "400",
                lineHeight: "21px",
              }}
            >
              District *
            </label>
            <input
              style={{ width: "100%" }}
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
            />
          </div>
        </div>
        <div className="row mt-3 d-flex justify-content-between">
          <div className="col-lg-4">
            <label
              htmlFor="exampleInputEmail1"
              style={{
                fontSize: "14px",
                fontWeight: "400",
                lineHeight: "21px",
              }}
            >
              Overall Experiece of Computer Based Test: *
            </label>
            <select className="custom-select" id="inputGroupSelect01">
              <option selected>select...</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
          <div className="col-lg-4">
            <label
              htmlFor="exampleInputEmail1"
              style={{
                fontSize: "14px",
                fontWeight: "400",
                lineHeight: "21px",
              }}
            >
              I could easily navigate between questions: *{" "}
            </label>
            <select className="custom-select" id="inputGroupSelect01">
              <option selected>select...</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
          <div className="col-lg-4">
            <label
              htmlFor="exampleInputEmail1"
              style={{
                fontSize: "14px",
                fontWeight: "400",
                lineHeight: "21px",
              }}
            >
              I have understood the various marking schemes: *{" "}
            </label>
            <select className="custom-select" id="inputGroupSelect01">
              <option selected>select...</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
        </div>
        <div className="row mt-3 d-flex justify-content-between">
          <div className="col-lg-4">
            <label
              htmlFor="exampleInputEmail1"
              style={{
                fontSize: "14px",
                fontWeight: "400",
                lineHeight: "21px",
              }}
            >
              I am confident of taking a CBT now: *{" "}
            </label>
            <select className="custom-select" id="inputGroupSelect01">
              <option selected>select...</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
          <div className="col-lg-4">
            <label
              htmlFor="exampleInputEmail1"
              style={{
                fontSize: "14px",
                fontWeight: "400",
                lineHeight: "21px",
              }}
            >
              I Found mock test extremly user friendly: *{" "}
            </label>
            <select className="custom-select" id="inputGroupSelect01">
              <option selected>select...</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
          <div className="col-lg-4">
            <label
              htmlFor="exampleInputEmail1"
              style={{
                fontSize: "14px",
                fontWeight: "400",
                lineHeight: "21px",
              }}
            >
              Staff at TPC was helpful: *{" "}
            </label>
            <select className="custom-select" id="inputGroupSelect01">
              <option selected>select...</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
        </div>
        <div className="row mt-3 d-flex justify-content-between">
          <div className="col-lg-6">
            <label
              htmlFor="exampleInputEmail1"
              style={{
                fontSize: "14px",
                fontWeight: "400",
                lineHeight: "21px",
              }}
            >
              I would like to practice more on Computer Based Test at Test
              practice Centre: *{" "}
            </label>
            <select className="custom-select" id="inputGroupSelect01">
              <option selected>select...</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
          <div className="col-lg-6">
            <label
              htmlFor="exampleInputEmail1"
              style={{
                fontSize: "14px",
                fontWeight: "400",
                lineHeight: "21px",
              }}
            >
              I find Infrastructure and Computer Facility at Test practice
              Centre useful: *{" "}
            </label>
            <select className="custom-select" id="inputGroupSelect01">
              <option selected>select...</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
        </div>
        <div className="row mt-3 d-flex justify-content-between">
          <div className="col-lg-3">
            <label
              htmlFor="exampleInputEmail1"
              style={{
                fontSize: "14px",
                fontWeight: "400",
                lineHeight: "21px",
              }}
            >
              Category *{" "}
            </label>
            <select className="custom-select" id="inputGroupSelect01">
              <option selected>select...</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
          <div className="col-lg-3">
            <label
              htmlFor="exampleInputEmail1"
              style={{
                fontSize: "14px",
                fontWeight: "400",
                lineHeight: "21px",
              }}
            >
              Subject *
            </label>
            <input
              type="text"
              style={{ width: "100% " }}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Subject"
            />
          </div>
          <div className="col-lg-6">
            <label
              htmlFor="exampleInputEmail1"
              style={{
                fontSize: "14px",
                fontWeight: "400",
                lineHeight: "21px",
              }}
            >
              Test Practice Center Name (If Alloted) *
            </label>
            <input
              type="text"
              className="form-control"
              style={{ width: "100% " }}
              aria-label="Text input with segmented dropdown button"
            />
          </div>
        </div>
        <div className="row mt-3 d-flex justify-content-between">
          <div className="col-lg-12">
            <label
              htmlFor="exampleInputEmail1"
              style={{
                fontSize: "14px",
                fontWeight: "400",
                lineHeight: "21px",
              }}
            >
              FeedBack *{" "}
            </label>
            <textarea
              style={{ width: "100%" }}
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
            ></textarea>
          </div>
        </div>
        <div className=" col-lg-4 mt-5">
          <button
            className="btn btn-success  "
            style={{
              backgroundColor: "#008B21 !important",
              width: "100px",
            }}
          >
            Save
          </button>
          <button
            className="btn ms-3  "
            onClick={() => handleClick()}
            style={{
              backgroundColor: "#7b1fa2",
              width: "",
              color: "white",
            }}
          >
            Skip & Close
          </button>
        </div>
      </section>
      <footer className="footer  py-5 main-color-bg border-todiv fw-light  mt-5">
        {" "}
        <div className="footer-links-container flex-sm-row flex-column mb-5 white">
          <a
            href="https://besst.in/registration/documents/Terms%20and%20Conditiion%20BESST.pdf"
            target="_blank"
          >
            Terms And Conditions
          </a>
          <span className="white d-sm-inline d-none">|</span>
          <a
            href="https://besst.in/registration/documents/PRIVACY%20POLICY%20BESST.pdf"
            target="_blank"
          >
            Privacy Policy
          </a>

          <span className="white d-sm-inline d-none">|</span>
          <a href="#" target="_blank">
            Data Sharing Policy
          </a>
        </div>
        <div className="container text-center">
          <span className="white">
            Copyright &#169; 2023 BESST(Brahmaputra Exam Success Support Team
            Private Limited ){" "}
          </span>
        </div>
      </footer>
    </>
  );
}
