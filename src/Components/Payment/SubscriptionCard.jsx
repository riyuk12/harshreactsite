import { BiRupee } from "react-icons/bi";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import axios from "axios";
import parse from "html-react-parser";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSwiper } from "swiper/react";
import { utilitySliceActions } from "../../Redux/Slice/UtilitySlice";
import baseUrl from "../../Components/baseUrl";
import arrow from "../../Assets/Arrow.svg";
const SubscriptionCard = ({
  item,
  domainCount1,
  langCount1,
  selLang,
  selDomain,
  domainSub1,
  setPackInc,
  setPackTitle,
  setTitle,
  submitModal,
  setBoolaen,
  setPage,
  setCheckout,
  setCouponDetails,
  setShow,
  closeModal,
  pack,
  setPackTemp,
}) => {
  const { highlightIndex } = useSelector((state) => state.utils);
  const swiper = useSwiper();
  const dispatch = useDispatch();

  useEffect(() => {
    ///static
    if (highlightIndex === 8) {
      swiper.slideTo(highlightIndex);
    }

    setTimeout(() => {
      dispatch(utilitySliceActions.setHighlightIndex(0));
    }, 200);
  }, [highlightIndex]);

  const subCouponpack = async (packs, domain, lang) => {
    let obj;
    if (domain?.length && lang?.length) {
      obj = {
        chosenDomainSubjects: domain,
        chosenLangSubjects: lang,
      };
    } else if (domain) {
      obj = {
        chosenDomainSubjects: domain,
      };
    } else {
      obj = {};
    }
    const { data } = await axios.post(
      `${baseUrl()}/pg/getSubsPackCouponsTaxes/${packs.subscriptionId}`,
      obj,
      {
        headers: {
          "Acces-Control-Allow-Origin": "*",
          Client_ID: "MVOZ7rblFHsvdzk25vsQpQ==",
          Authorization: `${Cookies.get("token")}`,
        },
      }
    );
    setCheckout(data.Data);
    setCouponDetails(data.Data.avlCouponsList);
    setShow(true);
  };

  const showModal = (id, label, showPopup) => {
    closeModal();
    setTitle(label);
    let temPack = pack.filter((x) => x.subscriptionId === id);
    setPackTemp(temPack);
    submitModal("avlDomainSubjects", "defaultDomainSubjCount", temPack);
    setBoolaen((prev) => ({ ...prev, disDomain: false, alertTxt: false }));
    setBoolaen((prev) => ({ ...prev, [showPopup]: true }));
  };

  const handlePayment = async (subPack) => {
    setPage(0);
    let selectDomain1 = subPack.avlDomainSubjects?.filter(
      (x) => x.specialInstruction === true
    );
    let selectLang1 = subPack.avlLangSubjects?.filter(
      (x) => x.specialInstruction === true
    );

    if (subPack.avlDomainSubjectsLbl && subPack.avlLangSubjectsLbl) {
      if (
        selectDomain1?.length >= subPack?.defaultDomainSubjCount &&
        selectLang1?.length >= subPack?.defaultLangSubjCount
      ) {
        subCouponpack(subPack, selectDomain1, selectLang1);
      } else {
        //inline toast message
        Swal.fire({
          icon: "warning",
          html: `<h5>${subPack.subscriptionName}</h5>Please select ${
            subPack.defaultDomainSubjCount < 4
              ? "atleast " + subPack.defaultDomainSubjCount
              : subPack.defaultDomainSubjCount
          }  domain subject(s) and ${
            subPack.defaultLangSubjCount > 0
              ? subPack.defaultLangSubjCount
              : "non-mandatory"
          } language to proceed.`,
          toast: true,
          customClass: {
            popup: "colored-toast",
          },
          text: ``,
          position: "bottom-right",
          showConfirmButton: false,
          timer: 6000,
          timerProgressBar: true,
        });
      }
    } else {
      if (subPack.avlDomainSubjectsLbl) {
        if (selectDomain1.length >= subPack.defaultDomainSubjCount) {
          subCouponpack(subPack, selectDomain1);
        } else {
          alert(
            `please select ${subPack.defaultDomainSubjCount} domain subject`
          );
        }
      } else {
        subCouponpack(subPack);
      }
    }
  };

  const handleViewMore = (
    packInclusions,
    packInclusionLbl,
    subscriptionName
  ) => {
    setPackInc(packInclusions);
    setTitle(packInclusionLbl);
    setPackTitle(subscriptionName);
  };
  const getColorForSubscription = (subscriptionName) => {
    const colorMapping = {
      SubscriptionName1: "#ADD8E6",
      SubscriptionName2: "#FFA07A",
      SubscriptionName3: "#98FB98",
      SubscriptionName4: "#98FB98",
      SubscriptionName4: "#98FB98",
      SubscriptionName5: "#98FB98",
      SubscriptionName6: "#98FB98",
      SubscriptionName7: "#98FB98",
    };

    return colorMapping[subscriptionName] || "#ADD8E6";
  };

  return (
    <section className="subscription-card">
      <div
        style={{
          backgroundColor: getColorForSubscription(item.subscriptionName),
          padding: "30px",
          borderRadius: "5px 0px 0px 0px",
          marginBottom: "50px",
          // width: "100%",
          height: "30%",
        }}
      >
        {/* {item.tagLine && <span className="ribbon-pop">{item.tagLine}</span>} */}
        <p className="mb-2 subscription-card-title">{item.subscriptionName}</p>
        {/* <img
                src={arrow}
                alt="Down Arrow"
                className="down-arrow"
              /> */}
      </div>
      <article
        className="card_body  flex-grow-1 d-flex flex-column justify-content-between"
        style={{ width: "100%" }}
      >
        <section style={{ marginBottom: "20px" }}>
          <span style={{ marginTop: "50px" }}>
            <span style={{ fontSize: "1.5em" }}> Rs. </span>
            <span
              style={{ fontSize: "2em", color: "#007BFF", fontWeight: "bold" }}
            >
              {item.discountedPrice}
            </span>{" "}
            / {parse(String(item.packValidity))}
          </span>

          <div className="pack_inclusion" style={{ marginTop: "20px" }}>
            <ul
              style={{ listStyleType: "none", padding: "0", marginTop: "10px" }}
            >
              {item.packInclusions.map((pack, index) => {
                if (index < 2) {
                  return (
                    <li key={index} style={{ marginBottom: "8px" }}>
                      {parse(String(pack))}
                    </li>
                  );
                } else if (index === 2) {
                  return (
                    <span
                      className="features"
                      onClick={() =>
                        handleViewMore(
                          item.packInclusions,
                          item.packInclusionLbl,
                          item.subscriptionName
                        )
                      }
                      data-bs-toggle="modal"
                      data-bs-target="#subModal"
                      style={{ cursor: "pointer", color: "#007BFF" }}
                    >
                      View More
                    </span>
                  );
                }
              })}
              <div className="d-flex flex-column gap-2 mt-4">
                {item.avlDomainSubjectsLbl && (
                  <li>
                    <a
                      href="#"
                      className="fw-bold"
                      onClick={() =>
                        showModal(
                          item.subscriptionId,
                          item.avlDomainSubjectsLbl,
                          "showDomain"
                        )
                      }
                      data-bs-toggle="modal"
                      data-bs-target="#subModal"
                      style={{ marginBottom: "8px" }}
                    >
                      Select Domain Subjects
                    </a>
                  </li>
                )}
                {item.avlLangSubjects?.length && (
                  <li>
                    <a
                      href="#"
                      className="fw-bold"
                      onClick={() =>
                        showModal(
                          item.subscriptionId,
                          item.avlLangSubjectsLbl,
                          "showLang"
                        )
                      }
                      data-bs-toggle="modal"
                      data-bs-target="#subModal"
                      style={{ marginBottom: "8px" }}
                    >
                      Select Languages
                    </a>
                  </li>
                )}
              </div>
            </ul>
          </div>
        </section>

        {item.avlDomainSubjectsLbl && (
          <>
            <p className="mb-0">
              <strong>Domain Subjects Opted:</strong>
            </p>
            {domainCount1 || (selDomain && item.subscribedFlag) ? (
              <p className="m-2">{domainSub1.join(", ")}</p>
            ) : (
              <span></span>
            )}
          </>
        )}

        {/* {item.avlLangSubjects?.length && (
			<>
			  <p className="m-0">
				<strong>Language Opted:</strong>
			  </p>
			  {langCount1 || (selLang && item.subscribedFlag) ? (
				<p className="m-2">
				  {item.avlLangSubjects.map((domain) => (
					<span>
					  {domain.specialInstruction || domain.selection
						? domain.topicName
						: " "}
					</span>
				  ))}
				</p>
			  ) : (
				<span>-</span>
			  )}
			</>
		  )} */}
      </article>

      <div
        className="card_footer justify-content-between"
        style={{ marginTop: "20px" }}
      >
        <button
          className="btn main-btn"
          style={{ width: "200px" }} // Adjust the width as needed
          data-bs-toggle="modal"
          data-bs-target={
            Cookies.get("token")
              ? item.avlDomainSubjectsLbl && item.avlLangSubjectsLbl
                ? domainCount1 >= item.defaultDomainSubjCount &&
                  langCount1 >= item.defaultLangSubjCount
                  ? "#PaymentModal"
                  : ""
                : item.avlDomainSubjectsLbl
                ? domainCount1 >= item.defaultDomainSubjCount
                  ? "#PaymentModal"
                  : ""
                : "#PaymentModal"
              : "#login"
          }
          onClick={() => {
            handlePayment(item);
          }}
          disabled={item.allowSubscription ? false : true}
        >
          Choose Plan
        </button>
      </div>
    </section>
  );
};

export default SubscriptionCard;
