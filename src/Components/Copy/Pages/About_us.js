import React from "react";
import { Container, Col, Row, Card, Image } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaQuoteLeft, FaQuoteRight, FaRegAddressBook } from "react-icons/fa";
const About = () => {
  const data = [
    {
      icon: "./assets/Iconss/1.svg",
      number: "67.1k",
      name: "Students",
    },
    {
      icon: "./assets/Iconss/2.svg",
      number: "26k",
      name: "Certified Instructor",
    },
    {
      icon: "./assets/Iconss/3.svg",
      number: 72,
      name: "Country Language",
    },
    {
      icon: "./assets/Iconss/4.svg",
      number: "99.9%",
      name: "Success Rate",
    },
    {
      icon: "./assets/Iconss/5.svg",
      number: 57,
      name: "Trusted Comapnies",
    },
  ];
  return (
    <div className="">
      <div className="Contact_heading container-fluid mb-5">
        <div className="Contact_content">About</div>
        <div className="Contact_slashContent">Home / About</div>
      </div>
      <div>
        <Row className="justify-content-center p-5">
          <Col lg={6} md={12} className="mb-4 p-4">
            <div>
              <p className="about_heading">
                What makes BESST unique as a CUET coaching platform?
              </p>
              <p style={{ color: "#7B1FA2" }}>
                BESST: Your Gateway to Expert CUET Coaching
              </p>
              <p>
                BESST (BRAHMAPUTRA EXAM SUCCESS SUPPORT TEAM) stands as your
                premier destination for expert CUET coaching, specializing in
                both CUET(UG) and CUET(PG) preparation. Our seasoned CUET
                educators, strategically positioned nationwide, provide
                personalized guidance through meticulously crafted online
                courses. Tailored for the unique demands of CUET(UG) and
                CUET(PG), our programs offer flexibility, personalized
                attention, and a commitment to your academic success. Choose
                BESST to embark on a CUET preparation journey that goes beyond
                coaching—it's a partnership for excellence.
              </p>
              <p>Recent engagement</p>
              <div className="d-flex justify-content-between">
                <p className="text-end m-0">
                  <span className="stat1">50K</span> Students
                </p>
                <p className="text-start m-0">
                  <span className="stat1">70+</span> Courses
                </p>
              </div>
            </div>
          </Col>

          <Col lg={6} md={12} className="mb-4 ">
            <div
              className="image-container"
              style={{ borderRadius: "20px", overflow: "hidden", width: "80%" }}
            >
              <img
                src={`${process.env.PUBLIC_URL}/assets/caroselimg/abt1.jpeg`}
                alt="Image"
                className="img-fluid"
                style={{ width: "100%", height: "auto" }}
              />
            </div>
          </Col>
        </Row>

        <Row
          className="justify-content-center"
          style={{ padding: "0 10% 0 10%" }}
        >
          <Col lg={12} className="mb-4 text-center">
            <h2 className="mb-2 font-weight-bold" style={{ fontSize: "2rem" }}>
              How does BESST CUET Coaching serve as your roadmap to success?
            </h2>
            <p className="text-center mb-4">
              At BESST (BRAHMAPUTRA EXAM SUCCESS SUPPORT TEAM), our seasoned
              CUET mentors, strategically located nationwide, bring a wealth of
              expertise to your CUET (UG) and CUET(PG) preparation journey.
              Dedicated to fostering an environment where students not only
              learn but thrive, as we go beyond traditional coaching. With BESST
              CUET coaching, your preparation transcends routine studying; it
              becomes a dynamic exploration, empowering you for success in both
              CUET (UG) and CUET(PG). Trust us to be more than just educators –
              we're your dedicated partners, committed to guiding you towards
              excellence in the challenging landscape of CUET.
            </p>
            <div className="image-container d-flex justify-content-center">
              <div className="image-wrapper">
                <img
                  src={`${process.env.PUBLIC_URL}/assets/caroselimg/abt1.jpeg`}
                  alt="Image 1"
                  className="custom-image"
                  style={{ opacity: 0.6, fill: "rgba(23, 27, 65, 0.70)" }}
                />
                <button className="abt_button btn btn-primary">
                  Start A class
                </button>
              </div>
              <div className="image-wrapper">
                <img
                  src={`${process.env.PUBLIC_URL}/assets/caroselimg/abt1.jpeg`}
                  alt="Image 2"
                  className="custom-image"
                  style={{ opacity: 0.6, fill: "rgba(23, 27, 65, 0.70)" }}
                />
                <button
                  className="abt_button btn btn-primary"
                  style={{ background: "#71269C" }}
                >
                  Start Course
                </button>
              </div>
            </div>
          </Col>
        </Row>

        <Row
          className="justify-content-center p-5"
          style={{ backgroundColor: "rgba(123, 31, 162, 0.05)" }}
        >
          <Col lg={6} md={12} className="mb-4">
            <div className="Row_heading">
              <img
                src={`${process.env.PUBLIC_URL}/assets/caroselimg/left-1.png`}
                alt="Left Image"
                className="img-fluid mx-auto"
              />
            </div>
          </Col>

          <Col lg={6} md={12} className="mb-4 d-flex align-items-center">
            <div className="text-center px-3">
              <h2 className="mb-3">
                <span style={{ color: "#7B1FA2" }}> Our Mission:</span>{" "}
                Empowering <br></br>Students for CUET Success
              </h2>
              <p>
                Our mission is crystal clear: to equip students with the
                knowledge and skills required to excel in both CUET (UG) and
                CUET(PG). Whether you're gearing up for CUET or similar
                challenging examinations, BESST CUET coaching is your go-to
                platform for the resources and guidance needed to achieve your
                academic goals
              </p>
            </div>
          </Col>
        </Row>

        <Row className="justify-content-center p-5">
          <Col lg={4} md={8} sm={10} className="mb-4">
            <div>
              <h2>Your Success, Our Commitment</h2>
              <p>
                At BESST CUET coaching, your success is our primary focus. We
                understand the challenges posed by the competitive CUET exam
                landscape, and we are dedicated to equipping you with the skills
                and knowledge required to overcome them.
                <br />
                <br />
                Join us at BESST CUET coaching, and let's embark on this
                educational journey together. Your CUET success dreams are
                within reach, and we are here to help you turn them into
                reality.
              </p>
            </div>
          </Col>

          <Col lg={8} md={12} sm={12} className="mb-4">
            <Row className="justify-content-center" style={{ height: "200px" }}>
              {[...Array(12)].map((_, index) => (
                <Col key={index} sm={6} md={4} lg={3} className="mb-3">
                  <div className="company-container">
                    <img
                      src={`${process.env.PUBLIC_URL}/assets/CompanyLogo/${
                        index + 1
                      }.svg`}
                      alt={`Company ${index + 1} Logo`}
                      className="company-logo"
                    />
                  </div>
                </Col>
              ))}
            </Row>
          </Col>

          {/* <Col lg={12} md={12} sm={12} className="mb-4">
    <Row className="justify-content-center">
      {[...Array(5)].map((_, index) => (
        <Col key={index} sm={6} md={4} lg={3} className="mb-3">
          <div className="data-container">
            <FaRegAddressBook className="data-icon" />
            <p className="data-number">123</p>
            <button className="btn btn-primary data-button">Name</button>
          </div>
        </Col>
      ))}
    </Row>
  </Col> */}
        </Row>
        <Row className="p-5 justify-content-center">
          {data.map((item, index) => (
            <Col key={index} lg={2} md={6} className="text-center mb-4">
              <div className="icon-container">
                <Image 
                src={`${process.env.PUBLIC_URL}/${item.icon} `}
                
                roundedCircle className="user-image" />
                <div className="number-and-name">
                  <p
                    className="number"
                    style={{ fontSize: "26px", fontWeight: "bold", margin: 0 }}
                  >
                    {item.number}
                  </p>
                  <p className="name" style={{ margin: 0 }}>
                    {item.name}
                  </p>
                </div>
              </div>
            </Col>
          ))}
        </Row>

        <Row
          className="justify-content-center p-5"
          style={{ backgroundColor: "rgba(123, 31, 162, 0.05)" }}
        >
          <Col lg={3} md={6} className="mb-5">
            <div className="quote-container">
              <FaQuoteLeft className="quote-icon top-left" />
              <p>
                Eduguard fit us like a glove. Their team curates fresh,
                up-to-date courses from their marketplace and makes them
                available to customers.
              </p>
              <FaQuoteRight className="quote-icon bottom-right" />

              <img
                src={`${process.env.PUBLIC_URL}/assets/caroselimg/Arrow.svg`}
                alt="Down Arrow"
                className="down-arrow"
              />
              <div className="name-role">
                <p>Sundar Pichai</p>
                <p>Chief Chairman of Google</p>
              </div>
            </div>
          </Col>
          <Col lg={3} md={6} className="mb-5">
            <div className="quote-container">
              <FaQuoteLeft className="quote-icon top-left" />
              <p>
                Eduguard fit us like a glove. Their team curates fresh,
                up-to-date courses from their marketplace and makes them
                available to customers.
              </p>
              <FaQuoteRight className="quote-icon bottom-right" />
              <img
                src={`${process.env.PUBLIC_URL}/assets/caroselimg/Arrow.svg`}
                alt="Down Arrow"
                className="down-arrow"
              />
              <div className="name-role">
                <p>Sundar Pichai</p>
                <p>Chief Chairman of Google</p>
              </div>
            </div>
          </Col>
          <Col lg={3} md={6} className="mb-5">
            <div className="quote-container">
              <p>
                Eduguard fit us like a glove. Their team curates fresh,
                up-to-date courses from their marketplace and makes them
                available to customers.
              </p>
              <FaQuoteRight className="quote-icon bottom-right" />
              <img
                src={`${process.env.PUBLIC_URL}/assets/caroselimg/Arrow.svg`}
                alt="Down Arrow"
                className="down-arrow"
              />
              <div className="name-role">
                <p>Sundar Pichai</p>
                <p>Chief Chairman of Google</p>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default About;
