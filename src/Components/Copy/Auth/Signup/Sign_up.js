import React, { useState } from "react";
import { Card, Button, Form } from "react-bootstrap";
import { FaGoogle, FaFacebook, FaApple, FaCheck } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";

function Sign_up() {
  const [step, setStep] = useState(1);
  const [emailOrMobile, setEmailOrMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const handleNext = () => {
    if (step === 1) {
      if (!emailOrMobile) {
        alert("Please enter email or mobile number.");
        return;
      }
    } else if (step === 2) {
      if (otp == "") {
        alert("Invalid OTP. Please enter the correct OTP.");
        return;
      }
    } else if (step === 3) {
      if (!password || password.length < 6) {
        alert("Password should be at least 6 characters.");
        return;
      }
    } else if (step === 4) {
      if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
      }
    } else if (step === 5) {
      console.log("Form submitted");

      axios
        .post("YOUR_API_ENDPOINT", {
          emailOrMobile,
          password,
          selectedCourse,
        })
        .then((response) => {})
        .catch((error) => {
          console.error("Axios error:", error);
        });
    }

    if (step < 5) {
      setStep(step + 1);
    }
  };

  const handleCancel = () => {
    setStep(1);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  return (
    <div
   
    style={{
      backgroundColor: "rgba(123, 31, 162, 0.5) !important", // Try adding !important
      backgroundImage: ` url("${process.env.PUBLIC_URL}/assets/cardimg/7a4c0d6ee7cceed8cf02a566d9596667.png")`,
      WebkitBackdropFilter: "blur(8px)",  // For WebKit-based browsers
      backdropFilter: "blur(8px)",        // Standard property
      backgroundSize: "cover",
      height: "100vh",
      display: "flex",
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
    }}
    >
      <Card style={{ width: "700px", padding: "30px", height: "500px" }}  className="cards-container">
        <h4 className="sign_in_head text-center">Sign Up to your account</h4>

        <div className="text-center mb-3">
          {Array.from({ length: 5 }).map((_, index) => (
            <React.Fragment key={index}>
              {index > 0 && (
                <span
                  style={{
                    height: "2px",
                    width: "30px",
                    background: step > index ? "#71269C" : "gray",
                    display: "inline-block",
                    margin: "0 5px",
                  }}
                />
              )}
              <span
                style={{
                  borderRadius: "50%",
                  width: "30px",
                  height: "30px",
                  background: step > index ? "#71269C" : "white",
                  border: `2px solid ${step > index ? "#71269C" : "gray"}`,
                  color: step > index ? "#71269C" : "gray",
                  display: "inline-block",
                  textAlign: "center",
                  lineHeight: "30px",
                  fontSize: "16px",
                }}
              >
                {step > index + 1 && <FaCheck style={{ color: "white" }} />}
              </span>
            </React.Fragment>
          ))}
        </div>

        <Form>
          <Form.Group className="mb-3">
            <Form.Label>
              {step === 1 ? "Enter Email / Mobile Number" : ""}
              {step === 2 ? "Enter Six Digit OTP" : ""}
              {step === 3 ? "Enter Password" : ""}
              {step === 4 ? "Confirm Password" : ""}
              {step === 5 ? "Select Courses" : ""}
            </Form.Label>
            {step === 2 ? (
              <div className="d-flex justify-content-center">
                {[1, 2, 3, 4, 5, 6].map((_, index) => (
                  <input
                    className="otpsize"
                    key={index}
                    type="text"
                    maxLength="1"
                    style={{
                      width: "90px",
                      height: "60px",
                      marginRight: "10px",
                      textAlign: "center",
                      fontSize: "18px",
                      border: "2px solid #71269C",
                      borderRadius: "5px",
                    }}
                    value={otp[index] || ""}
                    onChange={(e) => {
                      const newOtp = [...otp];
                      newOtp[index] = e.target.value;
                      setOtp(newOtp);
                    }}
                  />
                ))}
              </div>
            ) : step === 5 ? (
              <Form.Control
                as="select"
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
              >
                <option>Select Course</option>
                <option>Course 1</option>
                <option>Course 2</option>
                <option>Course 3</option>
              </Form.Control>
            ) : step === 3 || step === 4 ? (
              <Form.Control
                type="password"
                placeholder={step === 3 ? "Enter Password" : "Confirm Password"}
                value={step === 3 ? password : confirmPassword}
                onChange={
                  step === 3
                    ? handlePasswordChange
                    : handleConfirmPasswordChange
                }
                style={{
                  height: "50px",
                  borderRadius: "0",
                }}
              />
            ) : (
              <Form.Control
                type="text"
                placeholder={
                  (step === 1 && "Enter Email / Mobile Number") ||
                  (step === 4 && "Confirm Password")
                }
                value={step === 1 ? emailOrMobile : ""}
                onChange={(e) => setEmailOrMobile(e.target.value)}
                style={{
                  height: "50px",
                  borderRadius: "0",
                }}
              />
            )}
          </Form.Group>

          <div className="text-center mt-3">
            <Button
              variant=""
              size="lg"
              style={{
                width: "48%",
                background: "#8C94A3",
                color: "rgba(0, 0, 0, 0.70)",
                opacity: 0.2,
                display: "block",
                margin: "auto",
              }}
              onClick={handleNext}
            >
              {step === 5 ? "Sign Up" : "Next"}
            </Button>
          </div>

          <div className="d-flex justify-content-center mt-3">
            <Button
              variant="outline-primary"
              className="me-3"
              size="lg"
              onClick={() => console.log("Google button clicked")}
            >
              <FaGoogle size={30} />
              Google
            </Button>
            <Button
              variant="outline-primary"
              className="me-3"
              size="lg"
              onClick={() => console.log("Facebook button clicked")}
            >
              <FaFacebook size={30} />
              Facebook
            </Button>
            <Button
              variant="outline-primary"
              size="lg"
              onClick={() => console.log("Apple button clicked")}
            >
              <FaApple size={30} />
              Apple
            </Button>
          </div>
        </Form>

        <div className="span_login_msg mt-2 text-center">
          <span className="span_msg">
            Already have an account?{" "}
            <Link to="/signin">
              <span className="span_login">Log in</span>
            </Link>
          </span>
        </div>
      </Card>
    </div>
  );
}

export default Sign_up;
