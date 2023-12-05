import axios from "axios";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import { ThreeDots } from "react-loader-spinner";
import { Tabs, Tab } from "react-bootstrap";
import OneLinerFooter from "../../Components/Global/Footers/OneLinerFooter";
import Header from "../../Components/Global/Navigation/Header";
import useRemoveModal from "../../Components/useRemoveModal";
import useCouponSelect from "./PaymentComponent/CouponSelect";

import AddressModal from "../../Components/Payment/Modal/AddressModal";
import paymentHandler from "./pay";
import baseUrl from "../../Components/baseUrl";

import DomainSubjectsModal from "../../Components/Payment/Modal/DomainSubjectsModal";
import SubscriptionCard from "../../Components/Payment/SubscriptionCard";
import { FaChevronLeft } from "react-icons/fa";
import { GetCoursesThunk } from "../../Redux/Thunks/Get/GetCoursesThunk";
import { useDispatch, useSelector } from "react-redux";
import OrderSummary from "../../Components/Payment/Modal/OrderSummary";

const breakpoints = {
  375: {
    slidesPerView: 1,
  },
  790: {
    slidesPerView: 2,
    spaceBetweenSlides: 20,
  },
  1150: {
    slidesPerView: 3,
    spaceBetweenSlides: 30,
  },
  1550: {
    slidesPerView: 4,
    spaceBetweenSlides: 40,
  },
  1900: {
    slidesPerView: 5,
    spaceBetweenSlides: 50,
  },
};

const fallbackMessage = "Currently, no subscription pack is available. ";

const Payment = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [profileData, setProfileData] = useState([]);
  const [pack, setPack] = useState([]);
  const [couponDetails, setCouponDetails] = useState([]);
  const [show, setShow] = useState(false);
  const [loader, setLoader] = useState(false);
  const [mid, setMid] = useState("");
  const [orderId, setOrderId] = useState("");
  const [txnToken, setTxnToken] = useState("");
  const [page, setPage] = useState(0);
  const [isPrimium, setIsPrimium] = useState({ msg: "", status: 400 });
  const [billingDetails, setBillingDetails] = useState({
    stateName: null,
    stateCode: "",
    address: "",
    city: "",
    pincode: "",
    gstNo: "",
  });
  const [updateBillingDetails, setUpdateBillingDetails] = useState({
    stateName: null,
    stateCode: "",
    address: "",
    city: "",
    pincode: "",
    gstNo: "",
  });
  const [stateList, setStateList] = useState({});
  const [checkout, setCheckout] = useState({});
  const [packInc, setPackInc] = useState([]);
  const [packTemp, setPackTemp] = useState([]);
  const [boolaen, setBoolaen] = useState({
    alertTxt: false,
    modalValid: false,
    disDomain: false,
    showDomain: false,
    showLang: false,
    packAlrt: false,
  });
  const [title, setTitle] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedCourseId, setSelectedCourseId] = useState(0);
  const { render, totalPrice, couponCode } = useCouponSelect(
    couponDetails,
    profileData,
    setShow,
    checkout
  );
  const { courses } = useSelector((state) => state.response);
  const { activeSubscriptionTab } = useSelector((state) => state.utils);

  useRemoveModal();

  useEffect(() => {
    document.body.style.overflow = "visible";
  }, []);

  const FormTitles = [
    "Change Billing Address",
    "Payment Summary",
    "Review Your Payment",
  ];

  const onModalClose = () => {
    // window.location.reload();
  };

  const PageDisplay = () => {
    if (page === 0) {
      const obj = {
        profileData,
        updateBillingDetails,
        setUpdateBillingDetails,
        stateList,
      };
      return <AddressModal {...obj} />;
    } else if (page === 1) {
      return show && <>{render}</>;
    } else {
      return (
        <OrderSummary
          billingDetails={billingDetails}
          profileData={profileData}
          setShow={setShow}
          checkout={checkout}
          couponDetails={couponDetails}
        />
      );
    }
  };
  const [key, setKey] = useState("tab1");
  // useEffect(() => {
  //   fetch(`${baseUrl()}/pg/getSubsPackCouponsTaxes/`, {
  //     method: "GET",
  //     headers: {
  //       "Acces-Control-Allow-Origin": "*",
  //       Client_ID: "MVOZ7rblFHsvdzk25vsQpQ==",
  //       Authorization: `${Cookies.get("token")}`,
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setCheckout(data.Data);
  //       setCouponDetails(data.Data.avlCouponsList)
  //       // console.log(couponDetails);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  useEffect(() => {
    if (Cookies.get("token")) {
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
            let val = response.data.Data?.stateList.filter(
              (e) => e.stateName === response.data.Data.state
            );
            setProfileData((prev) => ({
              ...prev,
              ...response.data.Data,
              stateCode: val[0]?.stateCode,
            }));
            setStateList(response?.data?.Data.stateList);

            setUpdateBillingDetails((prev) => ({
              ...prev,
              stateName: val[0]?.stateName || "",
              stateCode: val[0]?.stateCode || "",
              pincode: response.data?.Data?.pincode,
              city: response.data?.Data?.city,
              address: response.data?.Data?.address,
            }));
          }
        })
        .catch((e) => {
          console.log(e);
        });
      if (courses?.length === 0) {
        dispatch(GetCoursesThunk({ token: Cookies.get("token") }));
      }
    }
  }, []);

  const handleSaveBillingAddr = (e) => {
    // /|| !updateBillingDetails.stateCode || !updateBillingDetails.stateName
    if (
      !updateBillingDetails.address ||
      !updateBillingDetails.city ||
      !updateBillingDetails.stateCode
    ) {
      alert("All field must be completed");
      return;
    }
    setShow(true);

    // return;
    axios
      .post(
        `${baseUrl()}/pg/saveUserBillingAddr`,
        {
          email: profileData.email,
          address: updateBillingDetails.address,
          city: updateBillingDetails.city,
          state: updateBillingDetails.stateCode,
          pincode: updateBillingDetails.pincode,
          // gstNo: updateBillingDetails.gstNo,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Acces-Control-Allow-Origin": "*",
            Client_ID: "MVOZ7rblFHsvdzk25vsQpQ==",
            Authorization: `${Cookies.get("token")}`,
          },
        }
      )
      .then((result) => {
        setBillingDetails((prev) => ({
          ...prev,
          ...updateBillingDetails,
        }));
        setUpdateBillingDetails((prev) => ({ ...prev, gstNo: "" }));
        setPage((currPage) => currPage + 1);
      })
      .catch((err) => console.log("handle billing address in payment", err));
  };

  useEffect(() => {
    if (Cookies.get("token")) {
      fetch(`${baseUrl()}/pg/getUserBillingAddr`, {
        method: "GET",
        headers: {
          "Acces-Control-Allow-Origin": "*",
          Client_ID: "MVOZ7rblFHsvdzk25vsQpQ==",
          Authorization: `${Cookies.get("token")}`,
        },
      })
        .then((response) => response.json())
        .then((result) => {
          if (result.Data?.state) {
            setBillingDetails((prev) => ({
              ...prev,
              stateName: result.Data.stateName,
              stateCode: result.Data.state,
              pincode: result.Data.pincode,
              city: result.Data.city,
              address: result.Data.address,
              gstNo: result.Data.gstNo,
            }));
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [Cookies.get("token")]);

  const handleSubscriptionChange = (id) => {
    setSelectedCourseId(id);
    fetch(`${baseUrl()}/df/getAllSubscriptionPacks/${id}`, {
      method: "GET",
      headers: {
        "Acces-Control-Allow-Origin": "*",
        Client_ID: "MVOZ7rblFHsvdzk25vsQpQ==",
        Authorization: `${Cookies.get("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setPack(data.Data);
        setIsPrimium((prev) => ({
          ...prev,
          msg: data.message,
          status: data.status,
        }));
        // const payBtn = document.querySelector(".payBtn");
        // payBtn.style.pointerEvents = "none";
        // payBtn.innerText = "Free";
      })
      .catch((e) => console.log("subscription 01 CUET", e));
  };

  useEffect(() => {
    handleSubscriptionChange(activeSubscriptionTab);
  }, [activeSubscriptionTab]);

  const handleNextClick = () => {
    if (page === FormTitles.length - 1) {
      setLoader(true);
      paymentHandler({
        couponCode,
        profileData,
        totalPrice,
        setLoader,
        checkout,
        setOrderId,
        setTxnToken,
        setMid,
      });
    } else if (page === 0) {
      handleSaveBillingAddr();
    } else {
      setPage((currPage) => currPage + 1);
    }
  };

  const closeModal = () => {
    setPackInc([]);
    setBoolaen((prev) => ({
      ...prev,
      showDomain: false,
      showLang: false,
      modalValid: false,
    }));
  };

  const submitModal = (obj, checkVal, tempArr) => {
    tempArr = tempArr ? tempArr : packTemp;
    let countspecialInstruction = tempArr[0][obj].filter(
      (sub) => sub.specialInstruction === true
    ).length;
    if (countspecialInstruction >= tempArr[0][checkVal]) {
      setBoolaen((prev) => ({
        ...prev,
        alertTxt: false,
        modalValid: true,
      }));
    } else {
      setBoolaen((prev) => ({
        ...prev,
        alertTxt: true,
        modalValid: false,
      }));
    }
  };

  const [packTitle, setPackTitle] = useState("");

  //follwing implimentation is very close but getting 404 without -stage in front of securegw in the action link
  useEffect(() => {
    if (mid && orderId && txnToken) {
      console.log(document.getElementById("paytm-form"));
      document.getElementById("paytm-form").submit();
    }
  }, [mid, orderId, txnToken]);

  // let activeElement;
  // useEffect(() => {
  // 	activeElement = document.querySelector(".subscription-tab-item-active");

  // 	activeElement.scrollIntoView({
  // 		behavior: "smooth",
  // 		block: "nearest",
  // 		inline: "center",
  // 	});

  // 	console.log("getttet");
  // }, [activeElement]);
  const Tabdata = [
    {
      id:1,
      title: "Common University Entrance Test (UG)",
    },
    {
      id:2,

      title: "National Talent Search Examination(NTSE)",
    },
    {
      id:3,

      title: "GENERAL APTITUDE TEST",
    },
    {
      id:4,

      title: "NCERT (Plus 2)",
    },
    {
      id:5,

      title: "CLASS 10(SEBA)",
    },
    {
      id:6,

      title: "Online Classes",
    },
  ];
  return (
    <>
      {/* <Header profileData={profileData} /> */}
      <form
        id="paytm-form"
        method="post"
        action={`https://securegw.paytm.in/theia/api/v1/showPaymentPage?mid=${mid}&orderId=${orderId}`}
      >
        <table border="1">
          <tbody>
            <input type="hidden" name="mid" value={mid} />
            <input type="hidden" name="orderId" value={orderId} />
            <input type="hidden" name="txnToken" value={txnToken} />
          </tbody>
        </table>
      </form>
      <article id="generic_price_table">
        <section className="p-4">
          <section className="d-flex gap-3 flex-column">
            <div>
              <button onClick={() => navigate(-1)} className="back-btn">
                <span style={{ fontSize: "12px" }}>
                  <FaChevronLeft />
                </span>
                Back
              </button>

              <h3 className="text-center">Subscription Packs</h3>
              <p className="text-center">
                View our range of Packs available with different features
              </p>
            </div>
            {/* <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3 d-flex justify-content-center"
    >
      {Tabdata.map((tab, idx) => (
        <Tab
          eventKey={`tab${idx}`}
          title={tab.title}
          key={tab.id}
          className="custom-tab"
        >
        </Tab>
      ))}
    </Tabs> */}
            <div className="courses-tab-container">
              {courses?.map(({ courseId, courseName }) => (
                <p
                  className={`${
                    selectedCourseId === courseId &&
                    "subscription-tab-item-active"
                  } subscription-tab-item`}
                  key={courseId}
                  onClick={() => handleSubscriptionChange(courseId)}
                >
                  {courseName}
                </p>
              ))}
            </div>
            {pack && pack.length !== 0 ? (
              <Swiper
                allowTouchMove={false}
                spaceBetween={10}
                breakpoints={breakpoints}
                navigation={true}
                modules={[Navigation]}
                onSlideChange={() => {
                  setSlideIndex(slideIndex + 1);
                }}
                className="custom-slider"
              >
                {pack?.map((item, index) => {
                  let domainCount1 = item.avlDomainSubjects?.filter(
                    (x) => x.specialInstruction === true
                  ).length;
                  let langCount1 = item.avlLangSubjects?.filter(
                    (x) => x.specialInstruction === true
                  ).length;
                  let selLang = item.avlLangSubjects?.filter(
                    (x) => x.selection === true
                  ).length;
                  let selDomain = item.avlDomainSubjects?.filter(
                    (x) => x.selection === true
                  ).length;

                  let domainSub1 = [];
                  item.avlDomainSubjects?.filter((x) => {
                    if (x.specialInstruction || x.selection) {
                      domainSub1.push(x.topicName);
                      return x.topicName;
                    }
                  });

                  return (
                    <SwiperSlide key={index}>
                      <SubscriptionCard
                        item={item}
                        domainCount1={domainCount1}
                        langCount1={langCount1}
                        selLang={selLang}
                        selDomain={selDomain}
                        domainSub1={domainSub1}
                        setPackTitle={setPackTitle}
                        setTitle={setTitle}
                        setPackInc={setPackInc}
                        setPage={setPage}
                        setBoolaen={setBoolaen}
                        submitModal={submitModal}
                        setCheckout={setCheckout}
                        setCouponDetails={setCouponDetails}
                        setShow={setShow}
                        closeModal={closeModal}
                        pack={pack}
                        setPackTemp={setPackTemp}
                      />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            ) : (
              <div className="fallback-message-subscriptions-container">
                <p>{fallbackMessage}</p>
              </div>
            )}
          </section>
        </section>
      </article>

      {/* Modal */}
      <div
        className="modal fade"
        id="PaymentModal"
        data-bs-backdrop="static"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="PaymentModalLabel"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-lg modal-dialog-scrollable"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="PaymentModalLabel">
                {FormTitles[page]}
              </h5>
              <button
                type="button"
                className="close"
                onClick={() => onModalClose()}
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <ThreeDots
              height="80"
              width="80"
              color="#4fa94d"
              ariaLabel="three-dots-loading"
              wrapperStyle={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: "999",
              }}
              visible={loader}
            />

            <div className="modal-body overflow-x-hidden">{PageDisplay()}</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                disabled={page === 0}
                onClick={() => {
                  setPage((currPage) => currPage - 1);
                }}
              >
                Back
              </button>
              <button
                type="button"
                className="btn main-btn"
                onClick={handleNextClick}
              >
                {page === FormTitles.length - 1 ? "Confirm" : "Next"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <DomainSubjectsModal
        submitModal={submitModal}
        boolaen={boolaen}
        setBoolaen={setBoolaen}
        packInc={packInc}
        closeModal={closeModal}
        packTemp={packTemp}
        packTitle={packTitle}
        title={title}
        setPackTemp={setPackTemp}
      />
      <OneLinerFooter />
    </>
  );
};
export default Payment;
