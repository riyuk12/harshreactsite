// Signin_OTP.js
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { Card, Button, Form } from "react-bootstrap";
import { FaGoogle, FaFacebook, FaApple, FaCheck } from "react-icons/fa";
import { Link } from "react-router-dom";

import axios from "axios";

function Signin_OTP() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpResent, setOtpResent] = useState(false);

  const handleNext = async () => {
    if (step === 1) {
      try {
        setStep(2);
        const response = await axios.post("http://68.178.172.171:8282/besstMainApi/wl/sendOTP", {
          email,
        });

        if (response.data.success) {
          setStep(2);
        } else {
          console.error("Failed to send email/OTP");
        }
      } catch (error) {
        console.error("Error during email/OTP request", error);
      }
    } else if (step === 2) {
      try {
        const response = await axios.post("http://68.178.172.171:8282/besstMainApi/wl/verifyOTP", {
          email,
          otp,
        });

        if (response.data.success) {
        } else {
          console.error("OTP verification failed");
        }
      } catch (error) {
        console.error("Error during OTP verification request", error);
      }
    }
  };

  const handleResendOtp = async () => {
    try {
      const response = await axios.post("http://68.178.172.171:8282/besstMainApi/wl/sendOTP", {
        email,
      });

      if (response.data.success) {
        setOtpResent(true);
      } else {
        console.error("Failed to resend OTP");
      }
    } catch (error) {
      console.error("Error during OTP resend request", error);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url("${process.env.PUBLIC_URL}/assets/cardimg/7a4c0d6ee7cceed8cf02a566d9596667.png")`,
        backgroundSize: "cover",
        height: "100vh",
        display: "flex",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(123, 31, 162, 0.5)",
      }}
    >
      <Card style={{ width: "700px", padding: "30px", height: "500px" }} className="cards-container">
        <h4 className="sign_in_head text-center">Sign In to your account</h4>

        <div className="text-center mb-3">
          {Array.from({ length: 2 }).map((_, index) => (
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
          {step === 1 && (
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Email / Mobile Number"
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  height: "50px",
                  borderRadius: "0",
                }}
              />
            </Form.Group>
          )}

          {step === 2 && (
            <Form.Group className="mb-3 text-center">
              <Form.Label>Enter OTP</Form.Label>
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
              <div className="mt-2">
                <Button
                  variant="link"
                  onClick={handleResendOtp}
                  disabled={otpResent}
                >
                  {otpResent ? "OTP Resent" : "Did not receive OTP? Resend"}
                </Button>
              </div>
            </Form.Group>
          )}

          <div className="d-flex justify-content-center mt-3">
            <Button
              variant="secondary"
              size="lg"
              style={{
                width: "48%",
                background: step === 1 ? "#8C94A3" : "#7B1FA2",
                color: step === 1 ? "rgba(0, 0, 0, 0.70)" : "#FFF",
                opacity: step === 1 ? 0.2 : 1,
              }}
              onClick={handleNext}
            >
              {step === 1 ? "Get OTP" : "Sign In"}
            </Button>
          </div>
        </Form>

        <div className="span_login_msg mt-3 text-center">
          <span className="span_msg">
            Remember your password?{" "}
            <Link to="/signin">
              <span className="span_login">Sign In</span>
            </Link>
          </span>
        </div>
      </Card>
    </div>
  );
}

export default Signin_OTP;
