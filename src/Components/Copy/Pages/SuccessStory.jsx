import React from "react";
import { Button, Row, Col, Card, Image } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaQuoteLeft, FaQuoteRight, FaRegAddressBook } from "react-icons/fa";

const SuccessStory = () => {
  const data = [
    {
      icon: "/assets/Iconss/1.svg",
      number: "67.1k",
      name: "Students",
    },
    {
      icon: "/assets/Iconss/2.svg",
      number: "26k",
      name: "Certified Instructor",
    },
    {
      icon: "/assets/Iconss/3.svg",
      number: 72,
      name: "Country Language",
    },
    {
      icon: "/assets/Iconss/4.svg",
      number: "99.9%",
      name: "Success Rate",
    },
    {
      icon: "/assets/Iconss/5.svg",
      number: 57,
      name: "Trusted Comapnies",
    },
  ];
  return (
    <div className="">
      <div className="Contact_heading container-fluid mb-5">
        <div className="Contact_content">Success Stories</div>
        <div className="Contact_slashContent">Home / Success Stories</div>
      </div>
      <Row className="m-5">
        <Col md={6}>
          <div className="heading-content">
            <h2>We have Stories to inspire you</h2>
            <p>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas
              sit.
            </p>
            <button
              className="btn btn-primary"
              style={{ background: "#71269C", borderRadius: "4px" }}
            >
              Get in Touch
            </button>
          </div>
        </Col>
        <Col md={6}>
          <div className="video-container" style={{ borderRadius: "10px" }}>
            {/* Your video component goes here */}
            <iframe
              width="100%"
              height="315"
              src="https://www.youtube.com/embed/your-video-id"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </Col>
      </Row>

      {/* Second Row */}
      <Row className="m-5">
        {[1, 2, 3].map((index) => (
          <Col md={4} key={index}>
            <Card className="text-center">
              {/* Top image */}
              <Card.Img
                variant="top"
                src={`${process.env.PUBLIC_URL}/assets/caroselimg/user${index}.png`}
              />

              {/* Bottom content */}
              <Card.Body>
                <FaQuoteLeft className="quote-icon" />

                <blockquote className="blockquote mb-0">
                  <p>
                    {" "}
                    During my CUET exam preparations, I took live classes on
                    General Test papers provided by www.besst.in.I also
                    practised their mock tests.{" "}
                  </p>
                  {/* <p>Tonmoy Kashyap</p>
                  <p>Course:CUET (UG) Live</p> */}
                </blockquote>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Third Row */}
      <Row
        className="p-5 align-items-center"
        style={{ backgroundColor: "rgba(123, 31, 162, 0.05)" }}
      >
        <Col md={12} className="text-center">
          <div className="user-info">
            <h3>Hear from happy customers</h3>
            <Image
             src={`${process.env.PUBLIC_URL}/assets/caroselimg/user.png`}
              roundedCircle
              className="user-image"
            />
            <div className="user-content text-center mt-4 px-5 py3">
              <p className="text-justify">
                I have taken online classes with Kaushik Sir; he was the perfect
                trainer for me I could have imagined. He has been very patient
                with me and always very supportive. He starts from basics and
                gradually gets into advanced topics. The study material that sir
                provided was very useful; students with any level of knowledge
                can start, learn, and excel. Its practice papers and mock test
                papers helped me a lot, and the materials of Cuet and UG are
                very informative. Thank you sir for your support 😎
              </p>
              <p>Parashmoni Boruah - Course: CUET (UG) Live</p>
            </div>
          </div>
        </Col>
      </Row>
      <Row className="p-5 justify-content-center">
        {data.map((item, index) => (
          <Col key={index} lg={2} md={6} className="text-center mb-4">
            <div className="icon-container">
              <Image 
              // src={item.icon} 
               src={`${process.env.PUBLIC_URL}${item.icon}`}
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
    </div>
  );
};

export default SuccessStory;
