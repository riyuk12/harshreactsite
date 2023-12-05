import axios from "axios";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineCheckCircle } from "react-icons/md";
import { ImWarning } from "react-icons/im";
import { FiEdit2 } from "react-icons/fi";
import baseUrl from "../../../src/Components/baseUrl";

import ProfilePic from "../../Assets/images/profilePic.jpg";
import Header from "../../Components/Global/Navigation/Header";
import OneLinerFooter from "../../Components/Global/Footers/OneLinerFooter";
import SuccessModal from "../../Components/Profile/Modal/SuccessModal";
import SwitchCourseModal from "../../Components/StudentDashboard/Modals/SwitchCourseModal";
import SubjectSide from "../../Components/Profile/SubjectSide";
import { utilitySliceActions } from "../../Redux/Slice/UtilitySlice";
import { subscriptions } from "../../RouteConstants";
import "./profile.css";
import Swal from "sweetalert2";

const errorMessageStyle = {
  color: "red",
  fontSize: "13px",
  fontWeight: 500,
  userSelect: "none",
};

const errorInputfieldStyle = { border: "1px solid red" };

function Profile() {
  const [profileData, setProfileData] = useState([]);
  const [img, setImg] = useState("");
  const [loading, setLoading] = useState(false);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [city, setCity] = useState("");
  const [selectEvent, setSelectEvent] = useState(false);
  const [showUpdateBtn, setShowUpdateBtn] = useState(false);
  const [isEditable, setIsEditable] = useState({
    isWhatsappMobEditable: false,
    isMobEditable: false,
    isEmailEditable: false,
  });
  const [billingDetails, setBillingDetails] = useState({
    stateName: null,
    stateCode: undefined,
    address: "",
    city: "",
    pincode: "",
    gstNo: "",
  });
  const [profileDetails, setProfileDetails] = useState({
    firstName: "",
    email: "",
    whatsappMob: "",
    mobile: "",
    schoolName: "",
    qualification: "",
    state: "",
    address: "",
    pincode: "",
    profileImg: "",
  });
  const [error, setError] = useState({});
  const { userProfileData } = useSelector((state) => state.postResp);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleChange = (e) => {
    setShowUpdateBtn(true);
    const { name, value } = e.target;
    setProfileDetails({ ...profileDetails, [name]: value });
  };

  // for frontend validation purpose
  const validation = () => {
    let tempError = {};
    const pincodeRegEpx = /\b\d{6}\b/;
    const isEmailVaild = profileDetails.email.match(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    );

    if (!profileDetails.firstName) {
      tempError.firstName = "please enter name";
    }

    if (!isEmailVaild) {
      tempError.email = "please enter a valid email";
    }

    if (!profileDetails.whatsappMob && profileData.whatsappMob) {
      tempError.whatsappMob = "mobile number is required";
    } else if (profileDetails.whatsappMob < 6000000000) {
      tempError.whatsappMob = "please enter a valid mobile number";
    } else if (profileDetails.whatsappMob.length !== 10) {
      tempError.whatsappMob = "please enter a valid mobile number";
    }

    if (!profileDetails.mobile && profileData.mobile) {
      tempError.mobile = "mobile number is required";
    } else if (profileDetails.mobile < 6000000000) {
      tempError.mobile = "please enter a valid mobile number";
    } else if (profileDetails.mobile.length !== 10) {
      tempError.mobile = "please enter a valid mobile number";
    }

    if (!profileDetails.schoolName && profileData.schoolName) {
      tempError.schoolName = "please enter schoolName name";
    }

    if (!profileDetails.address && profileData.address) {
      tempError.address = "please enter address";
    }

    if (!profileDetails.pincode && profileData.pincode) {
      tempError.pincode = "please enter a pincode";
    } else if (
      String(profileDetails.pincode) === "111111" ||
      String(profileDetails.pincode) === "000000"
    ) {
      tempError.pincode = "please enter a valid pincode";
    } else if (
      !pincodeRegEpx.test(profileDetails.pincode) &&
      profileData.pincode
    ) {
      tempError.pincode = "please enter a valid pincode";
    }

    setError(tempError);
    return Object.keys(tempError).length <= 0;
  };

  const getStateCode = (statename) => {
    const data = profileData.stateList.filter(
      (item) => item.stateName == statename
    );
    return data[0]?.stateCode;
  };

  useEffect(() => {
    let data = null;
    if (profileDetails.state) {
      data = getStateCode(profileDetails.state);
    }
    if (billingDetails.stateCode || profileDetails.state || profileData.state) {
      const state_code = billingDetails.stateCode
        ? billingDetails.stateCode
        : data;
      axios
        .get(
          baseUrl() +
            "/df/getDistrictsForState/" +
            state_code,
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              Client_ID: "MVOZ7rblFHsvdzk25vsQpQ==",
              Authorization: `${Cookies.get("token")}`,
            },
            data: {},
          }
        )
        .then((res) => res.data)
        .then((data) => {
          setCityList(data.Data);
        });
    }
  }, [billingDetails.stateCode, profileDetails.state, profileData.state]);

  const getProfileData = () => {
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
          if (response.data.Data.pincode === 0) {
            response.data.Data.pincode = "";
          }

          setProfileData(response.data.Data);
          setCity(response.data.Data.city);
          setStateList(response.data.Data.stateList);
          setImg(response.data.Data.image);
          setProfileDetails({
            firstName: response.data.Data.firstName,
            whatsappMob: response.data.Data.whatsappMob,
            mobile: response.data.Data.mobile,
            email: response.data.Data.email,
            qualification: response.data.Data.qualification,
            schoolName: response.data.Data.schoolName,
            state: response.data.Data.state,
            address: response.data.Data.address,
            pincode: response.data.Data.pincode,
            profileImg: `${baseUrl()}/df/showProfilePic/${response.data.Data.image}`,
          });
        }
      })
      .catch((e) => {
        navigate("/");
        console.log("profileData from profile page", e);
      });
  };

  useEffect(() => {
    document.body.style.overflow = "visible";
    getProfileData();
  }, []);

  const handleFileInput = (e) => {
    e.preventDefault();
    if (e.target.files[0].size < 1000000) {
      if (error.imgError) {
        setError({});
      }
      setLoading(true);
      let formData = new FormData();
      formData.append("uploadPhotoImage", e.target.files[0]);
      axios
        .post(
          `${baseUrl()}/uploadPhoto?userName=${Cookies.get(
            "email"
          )}`,
          formData,
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
            setLoading(false);
            getProfileData();
          }
        })
        .catch((e) => {
          setLoading(false);
        });
    } else {
      setError({
        imgError: "please select image less than 1MB",
      });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (validation()) {
      setLoading(true);
      axios
        .post(
          `${baseUrl()}/userUpdateProfileDetails`,
          {
            ...profileData,
            ...profileDetails,
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
          if (response.status == 200) {
            document.querySelector("#openSuccessModal").click();
            setLoading(false);
            setShowUpdateBtn(false);
            getProfileData();
            setIsEditable({
              isWhatsappMobEditable: false,
              isMobEditable: false,
              isEmailEditable: false,
            });
          }
        })
        .catch((e) => console.log("error in profile update", e));
    } else {
      //inline toast message
      Swal.fire({
        icon: "error",
        toast: true,
        title: "please fill the required values",
        position: "bottom-right",
        showConfirmButton: false,
        timer: 6000,
        timerProgressBar: true,
      });
    }
  };

  useEffect(() => {
    if (city) {
      setBillingDetails((prev) => ({
        ...prev,
        city: city,
      }));
    }
  }, [city]);

  const onHandleChange = (e) => {
    setShowUpdateBtn(true);
    const { name, value } = e.target;
    setBillingDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
    setProfileData({ ...profileData, city: value });
    if (name === "city") setSelectEvent(true);
    else setSelectEvent(false);
  };

  useEffect(() => {
    const preferedCourseId = userProfileData.preferredCourseId;
    const courseDetails = userProfileData?.courseBeans?.filter(
      (course) => course.courseId === preferedCourseId
    );
    dispatch(utilitySliceActions.setPreferredCourseDetails(courseDetails));
  }, [userProfileData]);

  return (
    <>
      <Header />
      <form className="main-form-container">
        <article className="profile-form-container">
          <section className="form-heading-container">
            <div className="img-upload-container">
              <div style={{ position: "relative" }}>
                <img
                  id="displayData"
                  className="profile-image"
                  src={img ? profileDetails.profileImg : ProfilePic}
                />
                {error.imgError && (
                  <p className={error.imgError && "profile-image-error"}>
                    {error.imgError}
                  </p>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                name="image"
                id="file"
                style={{ display: "none" }}
                onChange={(e) => handleFileInput(e)}
              />
              <div className="d-flex flex-column gap-2">
                <label className="upload-img mb-0" htmlFor="file">
                  Change/Upload Image
                </label>
                {/* <p className="m-0">Remove</p> */}
              </div>
            </div>
            <Link className="subscription-btn" to={subscriptions}>
              SUBSCRIBE NOW
            </Link>
          </section>
          <section>
            <div>
              <label className="profile-label">Name</label>
              <input
                type="text"
                className="form-control profile-fields"
                style={error.name && errorInputfieldStyle}
                id="nameProfile"
                name="firstName"
                value={profileDetails.firstName}
                onChange={(e) => handleChange(e)}
              />
            </div>
            {error.firstName && (
              <span style={errorMessageStyle}>{error.firstName}</span>
            )}
          </section>
          <section className="side-by-side-fields">
            <div className="profile-fields-container">
              <label className="profile-label">Class</label>
              <select
                className="form-select profile-fields"
                aria-label="Default select example"
                value={profileDetails.qualification}
                onChange={(e) => {
                  setShowUpdateBtn(true);
                  setProfileDetails({
                    ...profileDetails,
                    qualification: parseInt(e.target.value),
                  });
                }}
              >
                <option value="" disabled>
                  Select qualification
                </option>
                {[10, 11, 12, 13].map((item) => (
                  <option value={item} key={item}>
                    {item}th
                  </option>
                ))}
              </select>
            </div>
            <div className="profile-fields-container">
              <div>
                <label className="profile-label">School Name</label>{" "}
                <input
                  type="text"
                  className="form-control profile-fields"
                  id="schoolProfile"
                  name="schoolName"
                  style={error.schoolName && errorInputfieldStyle}
                  value={profileDetails.schoolName}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              {error.schoolName && (
                <span style={errorMessageStyle}>{error.schoolName}</span>
              )}
            </div>
          </section>
          <section className="side-by-side-fields">
            <div className="profile-fields-container">
              <div>
                <div className="d-flex gap-2">
                  <label className="profile-label">WhatsApp Number</label>
                  <span
                    onClick={() => {
                      setIsEditable({
                        ...isEditable,
                        isWhatsappMobEditable: true,
                      });
                    }}
                    title="Edit"
                  >
                    <FiEdit2 />
                  </span>
                </div>
                <div className="position-relative">
                  <input
                    type="text"
                    className="form-control profile-fields"
                    id="profile-whatsapp-num"
                    name="whatsappMob"
                    value={profileDetails.whatsappMob}
                    style={error.whatsappMob && errorInputfieldStyle}
                    disabled={!isEditable.isWhatsappMobEditable}
                    onChange={(e) => handleChange(e)}
                  />
                  {profileData.whatsAppVerifiedFlag ? (
                   <div
                   className="non-verified-status"
                   title="number is not verified"
                 >
                   <ImWarning />
                   <span className="status">Verify</span>
                 </div>
                  ) : (
                    
                     <div
                     className="verification-status"
                     title="number is verified"
                   >
                     <MdOutlineCheckCircle />
                     <span className="status">Verified</span>
                   </div>
                  )}
                </div>
              </div>
              {error.whatsappMob && (
                <span style={errorMessageStyle}>{error.whatsappMob}</span>
              )}
            </div>
            <div className="profile-fields-container">
              <div>
                <div className="d-flex gap-2">
                  <label className="profile-label">Mobile Number</label>
                  <span
                    onClick={() => {
                      setIsEditable({
                        ...isEditable,
                        isMobEditable: true,
                      });
                    }}
                    title="Edit"
                  >
                    <FiEdit2 />
                  </span>
                </div>
                <div className="position-relative">
                  <input
                    type="text"
                    className="form-control profile-fields"
                    id="profile-whatsapp-num"
                    name="mobile"
                    value={profileDetails.mobile}
                    style={error.mobile && errorInputfieldStyle}
                    disabled={!isEditable.isMobEditable}
                    onChange={(e) => handleChange(e)}
                  />
                  {profileData.mobVerifiedFlag ? (
                    <div
                    className="non-verified-status"
                    title="number is not verified"
                  >
                    <ImWarning />
                    <span className="status">Verify</span>
                  </div>
                  ) : (
                    
                    <div
                    className="verification-status"
                    title="number is verified"
                  >
                    <MdOutlineCheckCircle />
                    <span className="status">Verified</span>
                  </div>
                  )}
                </div>
              </div>
              {error.mobile && (
                <span style={errorMessageStyle}>{error.mobile}</span>
              )}
            </div>
          </section>
          <section>
            <div className="profile-fields-container">
              <div>
                <div className="d-flex gap-2">
                  <label className="profile-label">Email</label>
                  <span
                    onClick={() => {
                      setIsEditable({
                        ...isEditable,
                        isEmailEditable: true,
                      });
                    }}
                    title="Edit"
                  >
                    <FiEdit2 />
                  </span>
                </div>
                <div className="position-relative">
                  <input
                    type="text"
                    className="form-control profile-fields"
                    id="profile-email"
                    name="email"
                    value={profileDetails.email}
                    style={error.email && errorInputfieldStyle}
                    onChange={(e) => handleChange(e)}
                    disabled={!isEditable.isEmailEditable}
                  />
                  {profileData.emailVerifiedFlag ? (
                    <div
                      className="verification-status"
                      title="email is verified"
                    >
                      <MdOutlineCheckCircle />
                      <span className="status">Verified</span>
                    </div>
                  ) : (
                    <div
                      className="non-verified-status"
                      title="email is not verified"
                    >
                      <ImWarning />
                      <span className="status">Verify</span>
                    </div>
                  )}
                </div>
              </div>
              {error.email && (
                <span style={errorMessageStyle}>{error.email}</span>
              )}
            </div>
          </section>
          <section>
            <div>
              <label className="profile-label">Address</label>
              <textarea
                type="Text"
                rows="4"
                cols="50"
                className="form-control profile-fields"
                id="addressProfile"
                name="address"
                value={profileDetails.address}
                onChange={(e) => handleChange(e)}
                style={error.address && errorInputfieldStyle}
              />
            </div>
            {error.address && (
              <span style={errorMessageStyle}>{error.address}</span>
            )}
          </section>
          <section className="side-by-side-fields">
            <div className="profile-fields-container">
              <label className="profile-label">State</label>
              <select
                className="form-select profile-fields"
                aria-label="Default select example"
                value={profileDetails.state}
                style={{ minHeight: "50px" }}
                onChange={(e) => {
                  let index = e.target.selectedIndex;
                  let optionElement = e.target.childNodes[index];
                  let option = optionElement.getAttribute("state");
                  setProfileData({
                    ...profileData,
                    state: e.target.value,
                  });
                  setProfileDetails({
                    ...profileDetails,
                    state: e.target.value,
                  });
                  setBillingDetails((prev) => ({
                    ...prev,
                    stateCode: option,
                  }));
                  setShowUpdateBtn(true);
                }}
              >
                <option value="" disabled>
                  Select State
                </option>
                {stateList.length > 0
                  ? stateList.map((item, index) => (
                      <option
                        key={index}
                        value={item.stateName}
                        state={item.stateCode}
                        style={{
                          fontSize: "14px",
                        }}
                      >
                        {item.stateName}
                      </option>
                    ))
                  : ""}
              </select>
            </div>
            <div className="profile-fields-container position-relative">
              <label className="profile-label">District</label>
              <input
                type="text"
                className="form-control profile-fields"
                autoComplete="off"
                list="datalistOptions"
                id="dist"
                value={billingDetails.city}
                name="city"
                onChange={onHandleChange}
                placeholder="District"
              />
              <div
                className={`position-absolute bg-white ${
                  selectEvent && billingDetails.city ? "city-field" : "d-none"
                }`}
              >
                {cityList
                  .filter(
                    ({ districtName }) =>
                      districtName.indexOf(
                        billingDetails.city.toUpperCase()
                      ) !== -1
                  )
                  .map((city, index) => (
                    <option
                      rows="4"
                      cols="50"
                      key={index}
                      style={{ cursor: "pointer" }}
                      value={city.districtName}
                      onClick={(e) => {
                        setBillingDetails((prev) => ({
                          ...prev,
                          city: e.target.value,
                        }));
                        setProfileData({
                          ...profileData,
                          city: e.target.value,
                        });
                        setSelectEvent(false);
                        setShowUpdateBtn(true);
                      }}
                      className="border p-3 bg-light"
                    >
                      {city.districtName}
                    </option>
                  ))}
              </div>
            </div>
          </section>
          <section className="side-by-side-fields">
            <div className="profile-fields-container">
              <div>
                <label className="profile-label">Pincode</label>
                <input
                  type="number"
                  className="form-control profile-fields"
                  id="pin"
                  style={error.pincode && errorInputfieldStyle}
                  name="pincode"
                  value={profileDetails.pincode}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
                {error.pincode && (
                  <span style={errorMessageStyle}>{error.pincode}</span>
                )}
              </div>
            </div>
            <div className="profile-fields-container"></div>
          </section>
          {showUpdateBtn && (
            <section className="update-submit-btn-container">
              <button
                className="btn main-btn px-5"
                onClick={(e) => onSubmit(e)}
              > 
                {loading ? "Please wait.. " : "Update"}
              </button>
            </section>
          )}
        
        </article>
        
        <article className="d-flex flex-column justify-content-between max-width-sub-container">
          <SubjectSide />
        </article>
      </form>
      <button
        className="d-none"
        data-bs-toggle="modal"
        data-bs-target="#updateProfileModal"
        id="openSuccessModal"
      ></button>
      <SwitchCourseModal />
      <SuccessModal />
      <OneLinerFooter />
    </>
  );
}

export default Profile;
