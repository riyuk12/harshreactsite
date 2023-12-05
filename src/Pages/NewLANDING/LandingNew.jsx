import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import {
  FaFacebookF,
  FaInstagram,
  FaLocationArrow,
  FaPlus,
  FaShareAlt,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import baseUrl from "../../Components/baseUrl"

import Header from "../../Components/Global/Navigation/Header";
import useRemoveModal from "../../Components/useRemoveModal";
import CourseUpdate from "../../Components/NewLanding/CourseUpdate";
import ContactUs from "../../Components/NewLanding/ContactUs";
import Statistics from "../../Components/NewLanding/Statistics";
import Services from "../../Components/NewLanding/Services";
import Reviews from "../../Components/NewLanding/Reviews";
import About from "../../Components/NewLanding/About";
import Headline from "../../Components/NewLanding/Headline";
import LandingPageFooter from "../../Components/Global/Footers/LandingPageFooter";
import DraggableModel from "../../Components/Modals/DraggableModel";
import { register, studDashboard } from "../../RouteConstants";
import { EncryptText } from "../../Components/Encrypt/CryptoEncryption";
import { GetNewsThunk } from "../../Redux/Thunks/Get/GetNewsThunk";
import { GetCurrentAffairsThunk } from "../../Redux/Thunks/Get/GetCurrentAffairsThunk";
import { GetCourseDetailsThunk } from "../../Redux/Thunks/Get/GetCourseDetailsThunk";
import { GetStatisticsThunk } from "../../Redux/Thunks/Get/GetStatisticsThunk";
import { GetContactDetailsThunk } from "../../Redux/Thunks/Get/GetContactDetailsThunk";
import { GetSubscriptionPacksThunk } from "../../Redux/Thunks/Get/GetSubscriptionPacks";
import { GetReviewsThunk } from "../../Redux/Thunks/Get/GetReviewsThunk";
import "./landing.css";
import "../../Components/otp.css";
import "./utilities/FaceBook.css";
import SpecialCourseModal from "../../Components/NewLanding/Modals/SpecialCourseModal";
import Modal from "react-modal";
import Slider from "../../Components/Copy/Slider/Slider";
import NavBar from "../../Components/Copy/Navbar/Navbar";
import Footer from "../../Components/Copy/AboutUs/AboutUs";
import IntroPlatform from "../../Components/Copy/Intro_platform/Intro_platform";
import Courses from "../../Components/Copy/Course/Course";
import Course_Search from "../../Components/Copy/CourseSearch/CourseForm";
import OfferingPage from "../../Components/Copy/Offering_page/Offering_page";
import Testimonials from "../../Components/Copy/Testimonial/Testimonials";
import NewsUpdte from "../../Components/Copy/NewsUpdate.js/NewUpdate";
import Blog from "../../Components/Copy/Blog/Blog";
import Iq_page from "../../Components/Copy/IQPage/IQPage";
import CurrentAffair from "../../Components/Copy/CurrentAffiers/Current";
import Register from "../../Components/Copy/RegisterPage/Register";
import FAQ from "../../Components/Copy/Faq/Faq";
const Landing = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const history = useNavigate();
  // const [allTeachers, setAllTeachers] = useState([]);
  const [clinetLocation, setClinetLocation] = useState({ lat: "", lon: "" });

  const dispatch = useDispatch();
  const backToTopRef = useRef(null);

  // Initial API calls...
  useEffect(() => {
    dispatch(GetNewsThunk());
    dispatch(GetCurrentAffairsThunk());
    dispatch(GetCourseDetailsThunk());
    dispatch(GetStatisticsThunk());
    dispatch(GetContactDetailsThunk());
    dispatch(GetReviewsThunk());
    dispatch(GetSubscriptionPacksThunk({ id: 1 }));
  }, [dispatch]);
  useRemoveModal();

  //back to top functionality and visibility of that button
  useEffect(() => {
    let plane = backToTopRef.current;
    plane.addEventListener("click", (e) => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    });

    const handleScroll = () => {
      if (document.documentElement.scrollTop > 30) {
        plane.style.transform = "scale(1)";
      } else {
        plane.style.transform = "scale(0)";
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [backToTopRef.current]);

  // Auto load Feature

  useEffect(() => {
    const timer = setTimeout(() => {
      setModalIsOpen(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // useEffect(() => {
  // 	fetch(`${baseUrl()}/df/findUserRole/2`, {
  // 		method: "GET",
  // 		headers: {
  // 			"Acces-Control-Allow-Origin": "*",
  // 			Client_ID: "MVOZ7rblFHsvdzk25vsQpQ==",
  // 		},
  // 	})
  // 		.then((response) => response.json())
  // 		.then((data) => {
  // 			setAllTeachers(data.result);
  // 		});
  // }, []);

  useEffect(() => {
    const paramsString = window.location.search;
    const searchParams = new URLSearchParams(paramsString);
    const res = searchParams.get("code");
    const prompt = searchParams.get("prompt");
    const code = decodeURIComponent(res);
    // for google Auth
    if (prompt) {
      async function tokenCall() {
        try {
          const response = await axios.post(
            `https://accounts.google.com/o/oauth2/token`,
            {
              client_id: process.env.REACT_APP_CLIENT_ID,
              code: code,
              scope:
                "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email",
              client_secret: process.env.REACT_APP_CLIENT_SECRET,
              redirect_uri: process.env.REACT_APP_CLIENT_URL,
              grant_type: "authorization_code",
            }
          );
          Cookies.set("google_access_token", response.data.access_token);
          window.history.pushState({}, null, "/registration");

          token();
        } catch (err) {
          console.log(err);
        }
      }
      tokenCall();
    }
  }, []);

  //setting location of user
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setClinetLocation({
        lat: position.coords.latitude.toFixed(2),
        lon: position.coords.longitude.toFixed(2),
      });
    });
  }, []);

  async function token() {
    if (Cookies.get("google_access_token") != null) {
      if (Cookies.get("google_access_token")) {
        const res = await axios.get(
          "https://people.googleapis.com/v1/people/me?personFields=emailAddresses,names",
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("google_access_token")}`,
            },
          }
        );
        if (res.data) Cookies.set("google_access_token", null);

        onLoginSuccess(res.data);
      }
    }
  }

  // FIXME:
  const onLoginSuccess = (res) => {
    const body = {
      email: res.emailAddresses[0].value,
      name: res.names[0].givenName,
      lastname: res.names[0].familyName,
      source: "Google",
      uid: res.resourceName,
      latitude: clinetLocation.lat,
      longitude: clinetLocation.lon,
    };

    navigator.geolocation.getCurrentPosition((position) => {
      setClinetLocation({
        lat: position.coords.latitude.toFixed(2),
        lon: position.coords.longitude.toFixed(2),
      });
    });

    axios
      .post(`${baseUrl()}/wl/extLogin`, {
        email: EncryptText(res.emailAddresses[0].value),
        name: res.names[0].givenName,
        source: "Google",
        uid: res.resourceName.split("/")[1],
        latitude: clinetLocation.lat,
        longitude: clinetLocation.lon,
      })
      .then((response) => {
        if (response.data.result.hasPerDtlsUpdated === false) {
          history(register, {
            state: {
              profileObj: {
                email: res.emailAddresses[0].value,
                name: res.names[0].givenName,
                lastname: res.names[0].familyName,
                latitude: clinetLocation.lat,
                longitude: clinetLocation.lon,
                uid: res.resourceName.split("/")[1],
                source: "Google",
              },
              res: res,
            },
          });
          const modal = document.querySelector(".modal-backdrop");
          modal.remove();
        } else {
          history(studDashboard);
          Cookies.set("token", `Bearer ${response.data.result.token}`);
          Cookies.set("email", res.emailAddresses[0].value);
          Cookies.set("userId", response.data.result.userLoginResBean.userId);
        }
      })
      .catch((err) => {
        console.error("Not Login in Google");
      });
  };

  // useEffect(() => {
  // 	let timer;
  // 	if (currentAffairsFoucus) {
  // 		timer = setTimeout(() => {
  // 			setCurrentAffairsFoucus(false);
  // 			setCurrentAffairsFlag(false);
  // 			setNewsBlink(false);
  // 		}, 5000);
  // 	}
  // 	return () => {
  // 		clearTimeout(timer);
  // 	};
  // }, [currentAffairsFoucus]);

  //to handle the click of share button
  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Register on besst.in for CUET",
          text:
            "\nDear friend," +
            "\n\nBESST (http://besst.in) is a secure online platform dedicated to help students achieve their CUET(Common University Entrance Test) dream." +
            "\nBESST will provide PRACTICE/MOCK tests and LIVE classes created by expert panel of teachers to help you to reach your potential to the fullest." +
            "\nRegister now and start practicing your chosen subjects." +
            "\n\nRegards," +
            "\nTeam Besst," +
            "\nWhatapp no:9365834467" +
            "\nEmail: info@besst.in",
          url: "https://besst.in/" + "\n",
        })
        .then(() => console.log("Successful share"))
        .catch((error) => console.log("Error sharing", error));
    }
  };

  //for whatsapp chat
  const phoneNumber = process.env.REACT_APP_PHONE_NUMBER;
  const defaultMessage = process.env.REACT_APP_MESSAGE;

  return (
    <>
      {/* Auto load modal  */}
      <div className="landing-content">

        {/* home page po Modal */}
        {/* <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          contentLabel="Advertisement Modal"
          className="custom-modal"
          overlayClassName="custom-overlay"
        >
          <button
            className="close-button"
            onClick={() => setModalIsOpen(false)}
          >
            Close
          </button> */}
{/* 
          <div className="content-top-pop">
            <h2>Special Offer!</h2>
            <p>content</p>
          </div>
          <div className="col-sm-12">
            <form action="">
              <div className="">
                <input
                  type="text"
                  name="first_name"
                  id="first_name"
                  // value={firstName}
                  className="input-field"
                  // onChange={(e) => setFirstName(e.target.value)}
                  // onBlur={(e) => handleFirstName(e, "first")}
                  placeholder="Email ID"
                />
              </div>
              <div className="pt-1">
                <input
                  type="text"
                  name="first_name"
                  id="first_name"
                  // value={firstName}
                  className="input-field"
                  // onChange={(e) => setFirstName(e.target.value)}
                  // onBlur={(e) => handleFirstName(e, "first")}
                  placeholder="Promo code"
                />
              </div>
              <div className="pt-3 ">
                <input
                  type="submit"
                  value="Apply"
                  className="btn main-btn"
                  name="register"
                  //   onClick={(e) => {
                  //     e.preventDefault();
                  //     formValidation();
                  //   }}
                />
              </div>
            </form>
          </div> */}
        
      </div>
      {/* End of autoload modal*/}

      <article className="bg-white" id={"home"}>
        <div className="fab-wrapper" style={{ zIndex: "999" }}>
          <input id="fabCheckbox" type="checkbox" className="fab-checkbox" />
          <label className="fab" htmlFor="fabCheckbox">
            <span className="fab-dots fab-dots-2">
              <FaPlus />
            </span>
          </label>
          <div className="fab-wheel white">
            <a
              className="fab-action fab-action-1"
              style={{ cursor: "pointer" }}
              onClick={handleShare}
            >
              <FaShareAlt />
            </a>
            <a
              className="fab-action fab-action-2"
              target="_blank"
              href="https://www.twitter.com/besst_is_best"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 512 512"
              >
                <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
              </svg>
            </a>
            <a
              className="fab-action fab-action-3"
              target="_blank"
              href={`https://wa.me/${phoneNumber}?text=${defaultMessage}`}
            >
              <FaWhatsapp />
            </a>
            <a
              className="fab-action fab-action-4"
              target="_blank"
              href="https://www.youtube.com/channel/UCOWq3a0_HYLFYj7ZqWAjSeA"
            >
              <FaYoutube />
            </a>
            <a
              className="fab-action fab-action-5"
              target="_blank"
              href="https://www.instagram.com/besst_is_best"
            >
              <FaInstagram />
            </a>
            <a
              className="fab-action fab-action-6"
              target="_blank"
              href="https://www.facebook.com/Brahmaputra-Exam-Success-Support-Team-BESST-110677481604226/"
            >
              <FaFacebookF />
            </a>
          </div>
        </div>
        {/* <NavBar/> */}
        <Slider />
        <IntroPlatform />
        <Courses />
        <Course_Search/>
        <OfferingPage />
        <Testimonials />
        <NewsUpdte/>
        <Blog/>
        <Iq_page/>
        <CurrentAffair/>
        <Register/>
        <FAQ/>
        {/* <Footer/> */}
        {!Cookies.get("token") && <SpecialCourseModal />}
        <button
          id="openSuccessRegister"
          style={{ visibility: "hidden" }}
          data-bs-toggle="modal"
          data-bs-target="#successRegister"
        ></button>

        <div className="plane" ref={backToTopRef}>
          <button className="scroll-btn--up">
            <FaLocationArrow />
          </button>
        </div>
      </article>
    </>
  );
};

export default Landing;
