import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { GetTipOfTheDayThunk } from "../../Redux/Thunks/Get/GetTipOfTheDay";
import { GetNewsMessageThunk } from "../../Redux/Thunks/Get/GetNewsMessageThunk";
import CourseSwitch from "../../Components/StudentDashboard/CourseSwitch";
import StudentProfile from "../../Components/StudentDashboard/StudentProfile";
import TipsAndMessages from "../../Components/StudentDashboard/TipsAndMessages";
import UpcomingClasses from "../../Components/StudentDashboard/UpcomingClasses";
import SpecialProgramme from "../../Components/StudentDashboard/SpecialProgramme";
import PracticeCards from "../../Components/StudentDashboard/PracticeCards";
import ExamPattern from "../../Components/StudentDashboard/Modals/ExamPattern";
import AvailableTests from "../../Components/StudentDashboard/Modals/AvailableTests";
import ExamComingSoon from "../../Components/StudentDashboard/Modals/ExamComingSoon";
import RecordedClasses from "../../Components/StudentDashboard/Modals/RecordedClasses";
import MockExamOptions from "../../Components/StudentDashboard/Modals/MockExamOptions";
import AlreadyTakenTest from "../../Components/StudentDashboard/Modals/AlreadyTakenTest";
import SwitchCourseModal from "../../Components/StudentDashboard/Modals/SwitchCourseModal";
import UpdateProfileModal from "../../Components/Modals/UpdateProfileModal";
import OneLinerFooter from "../../Components/Global/Footers/OneLinerFooter";
import Header from "../../Components/Global/Navigation/Header";
import DraggableModel from "../../Components/Modals/DraggableModel";
import useRemoveModal from "../../Components/useRemoveModal";
import "react-circular-progressbar/dist/styles.css";
import { PostProfileDataThunk } from "../../Redux/Thunks/Post/PostProfileDataThunk";
import DownloadMaterial from "../../Components/StudentDashboard/Modals/DownloadMaterial";
import { GetIsEnrolledForVideoThunk } from "../../Redux/Thunks/Get/GetIsEnrolledForVideoThunk";
import SubjectivePapers from "../../Components/StudentDashboard/Modals/SubjectivePapers";
import { GetTopicListThunk } from "../../Redux/Thunks/Get/GetTopicListThunk";
import usePreferredCourseId from "../../Utils/usePreferredCourseId";
import ProgressChart from "../../Components/StudentDashboard/ProgressChart";
import Leaderboard from "../../Components/StudentDashboard/Leaderboard";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { GetDashboardConfigThunk } from "../../Redux/Thunks/Get/GetDashboardConfigThunk";
import { PostLiveQuizThunk } from "../../Redux/Thunks/Post/PostLiveQuizThunk";
import {useNavigate} from 'react-router-dom';
import baseUrl from "../../../src/Components/baseUrl";


function StudentDashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isRowCollapsed, setIsRowCollapsed] = useState({
    one: false,
    two: true,
  });
  const { userProfileData } = useSelector((state) => state.postResp);
  const preferredCourseId = usePreferredCourseId();
  useRemoveModal();

  const navigateToSubscription = () => {
    // 👇️ navigate to /contacts
    navigate('/subscription');
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    //getting tip of the day
    dispatch(
      GetTipOfTheDayThunk({
        token: Cookies.get("token"),
      })
    );

    //getting message for tips and message
    dispatch(GetNewsMessageThunk());

    //getting flag for enrolled
    dispatch(GetIsEnrolledForVideoThunk({ userId: Cookies.get("userId") }));

    let data = {
      email: Cookies.get("email"),
      token: Cookies.get("token"),
    };
    dispatch(PostProfileDataThunk(data));

    document.body.style.overflow = "auto";
  }, [dispatch]);

  useEffect(() => {
    //getting subjective topic list
    if (preferredCourseId === 6) {
      dispatch(
        GetTopicListThunk({
          token: Cookies.get("token"),
          id: preferredCourseId,
        })
      );
    }

    //getting dashboard Configuration
    if (preferredCourseId) {
      dispatch(GetDashboardConfigThunk({ id: preferredCourseId }));
    }
    
    if(preferredCourseId == 9 && Cookies.get("subscription_redirection") == "yes"){
      //checking subscription
      fetch(
        `${baseUrl()}/df/getAllSubscriptionPacks/${preferredCourseId}`,
        {
          method: "GET",
          headers: {
            "Acces-Control-Allow-Origin": "*",
            Client_ID: "MVOZ7rblFHsvdzk25vsQpQ==",
            Authorization: `${Cookies.get("token")}`,
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log("data",data)
          if(data.Data[0].allowSubscription == true){
            navigateToSubscription();
            Cookies.set(
							"subscription_redirection",
							`no`
						);
          }
        })
        .catch((e) => console.log("subscription 01 CUET", e));
    }
    

    const data = {
      courseId: preferredCourseId,
      token: Cookies.get("token"),
    };
    dispatch(PostLiveQuizThunk(data));
  }, [preferredCourseId, dispatch]);

  const initializeMinsLeftToClass = (minsLeftToClass) => {
    var minLeft = Math.floor(minsLeftToClass / 60);
    var secLeft = minsLeftToClass % 60;
    minLeft = minLeft < 10 ? "0" + minLeft : minLeft;
    secLeft = secLeft < 10 ? "0" + secLeft : secLeft;
    minsLeftToClass -= 1;

    document.getElementById("clsTimeLeft").innerHTML = minLeft + ":" + secLeft;
    if (minsLeftToClass >= 0) {
      setTimeout(function () {
        initializeMinsLeftToClass(minsLeftToClass);
      }, 1000);
      return;
    }
  };

  return (
    userProfileData && (
      <>
        {/* <Header /> */}
        <DraggableModel />
        <article style={{ backgroundColor: "#EEEE" }}>
          <section className="py-3 px-1 px-sm-4">
            <UpdateProfileModal />
            <SwitchCourseModal />
            <CourseSwitch />
            <article>
              <section
                className="collapse-nav"
                onClick={() =>
                  setIsRowCollapsed({
                    ...isRowCollapsed,
                    one: !isRowCollapsed.one,
                  })
                }
              >
                <button>
                {userProfileData.firstName ? `${userProfileData.firstName}'s Profile` : "User's Profile"}
                </button>
                {isRowCollapsed.one ? <FaChevronDown /> : <FaChevronUp />}
              </section>
              <section
                className={` ${
                  isRowCollapsed.one ? "hidden-row" : ""
                } first-row`}
              >
                <StudentProfile />
                <TipsAndMessages />
              </section>
            </article>
            <article>
              <section
                className="collapse-nav"
                onClick={() =>
                  setIsRowCollapsed({
                    ...isRowCollapsed,
                    two: !isRowCollapsed.two,
                  })
                }
              >
                {isRowCollapsed.two ? (
                  <button>Show Live Classes</button>
                ) : (
                  <button>Hide Live Classes</button>
                )}
                {isRowCollapsed.two ? <FaChevronDown /> : <FaChevronUp />}
              </section>
              <section
                className={`${
                  isRowCollapsed.two ? "hidden-row" : ""
                } second-row d-flex align-items-center gap-4
								`}
              >
                <UpcomingClasses />
                <SpecialProgramme />
              </section>
            </article>
            <article className="third-row d-flex align-item-center justify-content-center gap-4 my-4">
              <PracticeCards />
            </article>
            <article className="fourth-row">
              <ProgressChart />
              <Leaderboard />
            </article>
          </section>
          <AvailableTests
            route={"/viewTest"}
            id={"availableModal"}
            name={"mock"}
          />
          <AvailableTests route={"/examviewtest"} id={"availableModal1"} />
          <AvailableTests
            route={"/viewTest"}
            id={"scoreModal"}
            name={"practice"}
          />
          <ExamComingSoon
            title={"Mock Post Exam Process"}
            id={"availableModal2"}
            content={"comming soon..."}
          />
          <ExamComingSoon
            title={"Classes Concluded"}
            id={"eventConcluded"}
            content={"classes concluded as per planned schedule"}
          />
          <MockExamOptions />
        </article>
        <DownloadMaterial preferredCourseId={preferredCourseId} />
        <AlreadyTakenTest />
        <RecordedClasses />
        <SubjectivePapers />

        <div
          className="modal fade"
          id="availableExamTest"
          tabIndex="-1"
          aria-labelledby="syllabusModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-scrollable downloadModal">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title main-color" id="syllabusModalLabel">
                  Cuet Simulation
                </h5>

                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                {userProfileData?.courseBeans?.map((item, index) => {
                  return (
                    <div className="test-available-design" key={index}>
                      <div className="col-md-8 fs-5 font-weight-bold">
                        Mock Test
                      </div>
                      <div className="d-flex flex-column ms-5 ">
                        <div className="p-2">
                          <button
                            style={{
                              color: "white",
                            }}
                            type="button"
                            data-bs-toggle="modal"
                            data-bs-target="#availableModal"
                            className="btn main-btn "
                          >
                            Open
                          </button>
                        </div>
                        <div className="p-2">
                          {" "}
                          <button
                            style={{
                              color: "white",
                            }}
                            type="button"
                            data-bs-toggle="modal"
                            data-bs-target="#availableModal"
                            className="btn main-btn "
                          >
                            PreExam Registration
                          </button>
                        </div>
                        <div className="p-2">
                          {" "}
                          <button
                            style={{
                              color: "white",
                            }}
                            type="button"
                            data-bs-toggle="modal"
                            data-bs-target="#availableModal"
                            className="btn main-btn "
                          >
                            Post Exam
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <ExamPattern />
        <OneLinerFooter />
      </>
    )
  );
}

export default StudentDashboard;
