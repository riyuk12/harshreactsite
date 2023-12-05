import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import group1 from "../../Assets/images/Group1.png";
import group2 from "../../Assets/images/Group2.png";
import group3 from "../../Assets/images/Group3.png";
import group4 from "../../Assets/images/Group4.png";
import group5 from "../../Assets/images/Group5.png";
import group7 from "../../Assets/images/Group7.png";
import group9 from "../../Assets/images/Group9.png";
import group10 from "../../Assets/images/Group10.png";
import group11 from "../../Assets/images/Group11.png";
import { EncryptText } from "../Encrypt/CryptoEncryption";
import PracticeCardsSkeleton from "./Skeletons/PracticeCardsSkeleton";
import { useNavigate } from "react-router";
import { routes } from "../../RouteConstants";
import baseUrl from "../baseUrl";

const PracticeCards = () => {
  const { userProfileData } = useSelector((state) => state.postResp);
  const { dashboradConfiguration, isLoading } = useSelector(
    (state) => state.response
  );
  const navigate = useNavigate();

  // cards data
  const dataFields = [
    {
      name: "Practice Papers",
      img: group1,
      target: "#scoreModal",
      toggle: "modal",
      bgColor: "group1",
      //   href: "",
      isVisible: dashboradConfiguration?.practiceFlag ? true : false,
    },
    {
      name: "Mock Papers",
      img: group2,
      target: "#availableModal",
      toggle: "modal",
      bgColor: "group2",
      //   href: "",
      isVisible: dashboradConfiguration?.mockFlag ? true : false,
    },
    // {
    //   name: "SAT",
    //   img: group2,
    //   target: "#availableModal",
    //   toggle: "modal",
    //   bgColor: "",
    // //   href: "",
    //   isVisible: dashboradConfiguration.satFlag  ? true : false,
    // },
    // {
    //   name: "MAT",
    //   img: group2,
    //   target: "#availableModal",
    //   toggle: "modal",
    //   bgColor: "",
    // //   href: "",
    //   isVisible: dashboradConfiguration.matFlag ? true : false,
    // },

    {
      name: " Mock Exam (Simulator)",
      img: group7,
      target: "#availableExamTest",
      toggle: "modal",
      bgColor: "group7",
      //   href: "",
      isVisible: dashboradConfiguration?.examSimulatorFlag ? true : false,
    },
    {
      name: "Tests Taken",
      img: group3,
      target: "#takenModal",
      toggle: "modal",
      bgColor: "group3",
      //   href: "",
      isVisible: dashboradConfiguration?.testTakenFlag ? true : false,
    },
    {
      name: "Recorded Live Classes",
      img: group9,
      target: "#classNameModal",
      toggle: "modal",
      bgColor: "group9",
      //   href: "",
      isVisible: dashboradConfiguration?.recordedClassFlag ? true : false,
    },
    {
      name: "Exam Pattern",
      img: group5,
      target: "#exampattern",
      toggle: "modal",
      bgColor: "group5",
      //   href: "",
      isVisible: dashboradConfiguration?.examPatternFlag ? true : false,
    },
    {
      name: "CUET Mock Registration",
      img: group4,
      target: "",
      toggle: "",
      bgColor: "group4",
      href: `${baseUrl()}/cuet_simulation/cuet_nta_mock_simulation_login?email=${encodeURIComponent(
        EncryptText(userProfileData.email)
      )}&token=${Cookies.get("token")}`,
      isVisible: dashboradConfiguration?.mockRegistrationFlag ? true : false,
    },
    {
      name: "Mock Post Exam CSAS - Phase 1 Delhi University",
      img: group5,
      target: "",
      toggle: "",
      bgColor: "Mockimg",
      href: `${baseUrl()}/universityOfDelhi`,
      isVisible: dashboradConfiguration?.mockRegistrationFlag ? true : false,
    },
    {
      name: "Mock Post Exam CSAS - Phase 2 Delhi University",
      img: group5,
      target: "",
      toggle: "",
      bgColor: "Mockimg",
      href: `${baseUrl()}/universityOfDelhi`,
      isVisible: dashboradConfiguration?.mockRegistrationFlag ? true : false,
    },
    {
      name: "Download Material",
      img: group7,
      target: "#downloadModal",
      toggle: "modal",
      bgColor: "group6",
      //   href: "",
      isVisible: dashboradConfiguration?.studyMaterialFlag ? true : false,
    },
    {
      name: "Subjective Papers",
      img: group10,
      target: "#subjectiveModal",
      toggle: "modal",
      bgColor: "group10",
      //   href: "",
      isVisible: dashboradConfiguration?.subjectiveFlg ? true : false,
    },
    {
      name: "Live Quiz",
      img: group11,
      target: "#",
      toggle: "",
      bgColor: "group11",
      isVisible: dashboradConfiguration?.liveQuizFlg ? true : false,
    },
  ];

  if (isLoading.dashboardConfigLoading) {
    return <PracticeCardsSkeleton />;
  }
  return dataFields.map(
    ({ name, img, target, bgColor, href, toggle, isVisible }) =>
      isVisible && (
        <button
          style={{
            border: "none",
            outlineOffset: "5px",
            borderRadius: "12px",
            outlineColor: "purple",
            textDecoration: "none",
          }}
          key={name}
          type="button"
          onClick={() =>
            name === "Live Quiz" ? navigate(routes.liveQuiz) : ""
          }
          data-bs-toggle={toggle}
          data-bs-target={target}
          target="_blank"
        >
          <a href={href} target="_blank" rel="noopener noreferrer">
            <div className={`${bgColor} practice-card`}>
              <img className="card-img" alt="icons" src={img}></img>
              <p className="m-0 text-black">{name}</p>
            </div>
          </a>
        </button>
      )
  );
};

export default PracticeCards;


// ip for UFD
// http://68.178.172.171:8081/universityOfDelhi/