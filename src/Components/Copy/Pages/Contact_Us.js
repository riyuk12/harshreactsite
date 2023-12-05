import React from "react";
import { Container, Row, Col, Form, Button, Image } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Contact = () => {
  return (
    <div className="">
      <div className="Contact_heading container-fluid mb-5">
        <div className="Contact_content">Contact</div>
        <div className="Contact_slashContent">Home / Contact</div>
      </div>

      <Container className="mt-5">
        <Row>
          <Col lg={6} className="mb-4">
            <div className="Row_heading">
              Contact Info
              <div className="heading_bar"></div>
              <div className="contact_para">
                We're here to assist you on your educational journey. Have
                questions, feedback, or need support? Feel free to reach out to
                us. Our dedicated team is ready to help.
              </div>
              <div className="contact_location">
                <div className="contact_location_para">
                  <Image
                     src={`${process.env.PUBLIC_URL}/assets/caroselimg/Vector (5).png`}

                    alt="locationLogo"
                    className="contact_location_logo"
                  />
                  <address>
                    Brahmaputra Exam Success Support Team <br></br>Private
                    Limited, 37, 2nd by-lane, B. R. <br></br>Mazumdar Path,
                    Baghorbori, Panjabari,<br></br>
                    Guwahati-781037, Assam
                  </address>
                </div>
              </div>
              <div className="whatsApp_content">
                <Image
                     src={`${process.env.PUBLIC_URL}/assets/caroselimg/Clip path group.png`}
                  alt="locationLogo"
                  className="contact_location_logo"
                />
                8822403212
              </div>
              <div className="whatsApp_content">
                <Image
                     src={`${process.env.PUBLIC_URL}/assets/caroselimg/Vector (3).png`}

                  alt="locationLogo"
                  className="contact_location_logo"
                />
                info@besst.in
              </div>
              <div className="whatsApp_content">
                <Image
                     src={`${process.env.PUBLIC_URL}/assets/caroselimg/phone-call-svgrepo-com 1.png`}

                  alt="locationLogo"
                  className="contact_location_logo"
                />
                8811963303
              </div>
            </div>
          </Col>
          <Col lg={6}>
            <div className="Row_heading">
              Get In Touch
              <div className="heading_bar"></div>
              <Form>
                <Row className="mb-3">
                  <Col>
                    <Form.Control
                      type="text"
                      placeholder="Full Name"
                      className="placeHolederName"
                    />
                  </Col>
                  <Col>
                    <Form.Control
                      type="email"
                      placeholder="Email"
                      className="placeHolederName"
                    />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col>
                    <Form.Control
                      type="text"
                      placeholder="Subject"
                      className="placeHolederName"
                    />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Message"
                      className="placeHolederName"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Button type="button" className="send_msg_btn">
                      Send Message
                    </Button>
                  </Col>
                </Row>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
      <div className="contact_location_map container-fluid p-0 mt-5"></div>
    </div>
  );
};

export default Contact;
