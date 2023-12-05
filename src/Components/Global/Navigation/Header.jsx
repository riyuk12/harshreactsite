import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { MdOutlinePayments } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { AiFillNotification } from "react-icons/ai";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Logo from "../../../Assets/images/logo.png";
import { utilitySliceActions } from "../../../Redux/Slice/UtilitySlice";
import NavSubscription from "../../NavSubscription";
import { subscriptions } from "../../../RouteConstants";
import AuthComponent from "../AuthModals/AuthComponent";
import AuthButtons from "./Header/AuthButtons";
import AuthMenu from "./Header/AuthMenu";
import "./Header.css";
import usePreferredCourseId from "../../../Utils/usePreferredCourseId";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [width, setWidth] = useState(window.innerWidth);
  const [showNotification, setShowNotification] = useState(false);
  const { isNewsBlinking, tipDate, isCurrentAffairBlinking } = useSelector(
    (state) => state.response
  );
  const preferredCourseId = usePreferredCourseId();
  const { isNavBarExpanded } = useSelector((state) => state.utils);

  //links data
  const navLinks = [
    { name: "Home", id: "home" },
    {
      name: isNewsBlinking ? (
        <>
          <span className="rec-animation btn-blink mr-2"></span>
          News
        </>
      ) : (
        "News"
      ),
      id: "news",
    },
    {
      name: isCurrentAffairBlinking ? (
        <>
          <span className="rec-animation btn-blink mr-2"></span>
          Current Affairs
        </>
      ) : (
        <span>Current Affairs</span>
      ),
      id: "current-affairs",
    },
    { name: "Courses", id: "courseUpdate" },
    { name: "Reviews", id: "reviews" },
    { name: "Services", id: "services" },
    { name: "Strength", id: "statistics" },
    { name: "About us", id: "about" },
    { name: "FAQ", id: "FAQ" },
    { name: "Contact us", id: "contact" },
  ];

  //handles internal routing / routing on same page
  const handleClick = () => {
    document.getElementById("navbarNav").classList.remove("show");
  };

  //to stop scroll when navbar is expanded
  useEffect(() => {
    if (isNavBarExpanded) {
      document.querySelector("body").style.overflow = "hidden";
    } else {
      document.querySelector("body").style.overflow = "visible";
    }
  }, [isNavBarExpanded]);

  useEffect(() => {
    const handleWindowSizeChange = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  //to find the difference between tipDate and todays date andremove the notification based on the value
  useEffect(() => {
    const date1 = new Date(tipDate);
    const date2 = new Date();
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDate = Math.ceil(timeDiff / (1000 * 3600 * 24));
    diffDate <= 10 && setShowNotification(true);
  }, [tipDate]);

  return (
    <>
      {location.pathname === "/" || location.pathname === "/page" ? (
        <nav className="navbar navbar-expand-xl navbar-expand-md navbar-light px-4 py-1 sticky-top white-bg nav-pills">
          <Link className="navbar-brand" to="/">
            <img
              src={Logo}
              alt="logo"
              width="60"
              height="auto"
              className="d-inline-block align-text-top"
            />
          </Link>
          <button
            className="navbar-toggler"
            id="nav-bar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => dispatch(utilitySliceActions.toggleNavExpansion())}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse align-items-center"
            id="navbarNav"
          >
            <ul className="navbar-nav mr-2 text-center mx-auto align-items-center nav-menu-items ">
              {width >= 1300
                ? navLinks.map(({ name, id }) => (
                    <li className="nav-item px-2" key={id}>
                      <a
                        className="nav-link"
                        href={`#${id}`}
                        id={`${id}-link`}
                        onClick={handleClick}
                        style={
                          location.hash === `#${id}`
                            ? { color: "black" }
                            : {
                                color: "#00000077",
                              }
                        }
                      >
                        {name}
                      </a>
                    </li>
                  ))
                : navLinks.slice(0, navLinks.length - 5).map(({ name, id }) => (
                    <li className="nav-item px-2" key={id}>
                      <a
                        className="nav-link"
                        href={`#${id}`}
                        id={`${id}-link`}
                        onClick={handleClick}
                        style={
                          location.hash === `#${id}`
                            ? {
                                color: "black",
                              }
                            : {
                                color: "#00000077",
                              }
                        }
                      >
                        {name}
                      </a>
                    </li>
                  ))}

              {width < 1300 && (
                <div className="dropdown">
                  <button
                    style={{
                      backgroundColor: "inherit",
                      border: "none",
                    }}
                    className="dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                  ></button>
                  <ul
                    className="dropdown-menu"
                    style={{ marginBottom: "15px" }}
                    aria-labelledby="dropdownMenuButton1"
                  >
                    {navLinks.slice(-5).map(({ name, id }) => (
                      <li className="nav-item px-2" key={id}>
                        <a
                          className="nav-link header-item"
                          href={`#${id}`}
                          id={`${id}-link`}
                          onClick={handleClick}
                          style={
                            location.hash === `#${id}`
                              ? {
                                  color: "black",
                                }
                              : {
                                  color: "#00000077",
                                }
                          }
                        >
                          {name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </ul>
            <section className="navbar-nav text-center align-items-center">
              {!Cookies.get("token") ? <AuthButtons /> : <AuthMenu />}
            </section>
          </div>
        </nav>
      ) : (
        <>
          <nav className="navbar navbar-expand-lg navbar-light px-5 py-1 sticky-top white-bg">
            <Link className="navbar-brand" to="/">
              <img
                src={Logo}
                alt="logo"
                width="60"
                height="auto"
                className="d-inline-block align-text-top"
              />
            </Link>
            <button
              className="navbar-toggler"
              id="nav-bar-toggler-2"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
              onClick={() => dispatch(utilitySliceActions.toggleNavExpansion())}
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse justify-content-end"
              id="navbarNav"
            >
              <div className="navbar-nav">
                {!Cookies.get("token") ? (
                  <AuthButtons />
                ) : (
                  <ul className="nav-btns-container">
                    {isNewsBlinking === "Y" && (
                      <li
                        className="nav-item position-relative"
                        style={{
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          setShowNotification(false);
                        }}
                      >
                        <AiFillNotification
                          style={{
                            fontSize: "50px",
                            color: "#7B1FA2",
                          }}
                        />
                        {showNotification && (
                          <span className="notification">1</span>
                        )}
                      </li>
                    )}
                    <li className="nav-item px-2 landing-payment">
                      <button
                        type="button"
                        className="btn main-btn px-4 d-block d-md-none"
                        data-toggle="modal"
                        data-target={
                          location.pathname !== "/subscription" &&
                          "#StateCheckModal"
                        }
                        onClick={() => {
                          navigate(subscriptions);
                        }}
                      >
                        Subscribe
                      </button>
                      <button
                        type="button"
                        className="btn main-btn px-4  d-none d-md-block"
                        data-toggle="modal"
                        data-target={
                          location.pathname !== "/subscription" &&
                          "#StateCheckModal"
                        }
                        onClick={() => {
                          dispatch(
                            utilitySliceActions.setActiveSubscriptionTab(
                              preferredCourseId
                            )
                          );
                          navigate(subscriptions);
                        }}
                      >
                        <MdOutlinePayments style={{ fontSize: "25px" }} />
                        <span
                          style={{
                            marginLeft: "7px",
                          }}
                        >
                          Subscription
                        </span>
                      </button>
                    </li>
                    <AuthMenu />
                  </ul>
                )}
              </div>
            </div>
          </nav>
          {/* DONE: popup Subscriptions menu */}
          {/* <NavSubscription /> */}
        </>
      )}
      <AuthComponent />
    </>
  );
};

export default Header;

// useEffect(() => {
// 	const url = window.location.href;
// 	const urldata = url.split("#");
// 	const data = document.getElementsByTagName("a");

// 	if (urldata[1] == "reviews") {
// 		for (var i = 0; i < data?.length; i++) {
// 			if (data[i].getAttribute("data") == "reviews") {
// 				data[i].click();
// 			}
// 		}
// 	}
// 	if (urldata[1] == "about") {
// 		for (var i = 0; i < data?.length; i++) {
// 			if (data[i].getAttribute("data") == "about") {
// 				data[i].click();
// 			}
// 		}
// 	}
// }, []);
