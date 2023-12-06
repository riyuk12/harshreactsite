import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { Card, Button, Form } from "react-bootstrap";
import { FaGoogle, FaFacebook, FaApple, FaCheck } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";

function Sign_In() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleNext = async () => {
    if (step === 2) {
      try {
        const response = await axios.post("https://www.besst.in/besstMainApi/wl/loginDtls", {
          email,
          password,
        });

        if (response.data.success) {
          navigate("/dashboard");
        } else {
          console.error("Authentication failed");
        }
      } catch (error) {
        console.error("Error during login request", error);
      }
    }

    setStep(step + 1);
  };
  const loginOtp = () => {
    navigate("/SignInOtp");
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
              <Form.Label>Email / Mobile Number</Form.Label>
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
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password"
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  height: "50px",
                  borderRadius: "0",
                }}
              />
              <div className="d-flex justify-content-between mt-2">
                <Form.Check
                  type="checkbox"
                  label="Remember me"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                <Link
                  to="/forgot-password"
                  className=""
                  style={{ color: "blue", textDecoration: "underline" }}
                >
                  Forgot Password?
                </Link>
              </div>
            </Form.Group>
          )}

          <div className="d-flex justify-content-between align-items-center">
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
              {step === 1 ? "Next" : "Sign In"}
            </Button>

            <Button
              variant="primary"
              size="lg"
              style={{
                width: "48%",
                background: "#FFFFFF",
                border: "2px solid #71269C",
                color: "#71269C",
              }}
              onClick={loginOtp}
            >
              <span className="loginotpbutton">Login With OTP</span>
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
            Not registered yet?{" "}
            <Link to="/signup">
              <span className="span_login">Register Here</span>
            </Link>
          </span>
        </div>
      </Card>
    </div>
  );
}

export default Sign_In;
