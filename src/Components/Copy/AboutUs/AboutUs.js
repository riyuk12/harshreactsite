import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import {
  faXTwitter,
  faYoutube,
  faInstagram,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Footer() {
  return (
    <Container fluid className="footer_bak">
      <Container className="footer_con text-center">
        <Row>
          <Col>
            <div>
              <h6 class="footer_heading text-center text-uppercase fw-bold mb-4 ">
                Got Questions?
              </h6>
              {/* mobile */}
              <span className="bg_color">Mobile</span>
              <p>
                <a
                  href="#!"
                  class="bg_color "
                  style={{ textDecorationLine: "underline" }}
                >
                  +91 8811963303
                </a>
              </p>
              {/* whatsapp */}
              <span className="bg_color">Whatsapp</span>
              <p>
                <a
                  href="#!"
                  class="bg_color"
                  style={{ textDecorationLine: "underline" }}
                >
                  +91 8822403212
                </a>
              </p>
              <span className="bg_color">Email</span>
              <p>
                <a
                  href="#!"
                  class="bg_color"
                  style={{ textDecorationLine: "underline" }}
                >
                  {" "}
                  info@besst.in{" "}
                </a>
              </p>
            </div>
          </Col>
          <Col>
            <div>
              <h6 class=" footer_heading  text-uppercase fw-bold mb-4">
                About Us
              </h6>
              <p>
                <a href="about" class=" bg_color">
                  {" "}
                  About us
                </a>
              </p>
              <p>
                <a href="#!" class="bg_color">
                  Life@BESST
                </a>
              </p>
              <p>
                <a href="#!" class="bg_color">
                  Privacy Policy
                </a>
              </p>
              <p>
                <a href="#!" class="bg_color">
                  Terms of Service
                </a>
              </p>
              <p>
                <a href="#!" class="bg_color">
                  Cookie Policy
                </a>
              </p>
              <p>
                <a href="#!" class="bg_color">
                  Accessibility Statement
                </a>
              </p>
            </div>
          </Col>
          <Col>
            <div>
              <h6 class=" footer_heading text-uppercase fw-bold mb-4">
                Courses
              </h6>
              <p>
                <a href="#!" class="bg_color">
                  {" "}
                  Top Courses
                </a>
              </p>
              <p>
                <a href="#!" class="bg_color">
                  Success Stories
                </a>
              </p>
              <p>
                <a href="#!" class="bg_color">
                  News
                </a>
              </p>
              <p>
                <a href="#!" class="bg_color">
                  Blogs & Articles
                </a>
              </p>
              <p>
                <a href="#!" class="bg_color">
                  FAQ’s
                </a>
              </p>
              <p>
                <a href="/contact" class="bg_color">
                  Contact
                </a>
              </p>
            </div>
          </Col>
          <Col>
            <div>
              <h6 class=" footer_heading text-uppercase fw-bold mb-4">
                Services
              </h6>
              <p>
                <a href="#!" class="bg_color">
                  CUET Entrance
                </a>
              </p>
              <p>
                <a href="#!" class="bg_color">
                  Online Classes
                </a>
              </p>
              <p>
                <a href="#!" class="bg_color">
                  Other Competitive Exams{" "}
                </a>
              </p>
            </div>
          </Col>
        </Row>
        <Row>
          <Col sm={12} md={5} className="location bg_color">
            <span>Location</span>
            <p>
              Brahmaputra Exam Success Support Team Private Limited 37, 2nd bye
              lane B.R.Mazumdar Path Baghorbori, Panjabari Guwahati-781037 Assam
            </p>
          </Col>
          <Col sm={12} md={3}>
            <div>
              <span className="bg_color">Follow Our Social</span>
              <p className="icon_foot">
                <a href="#!" className="bg_color">
                  <FontAwesomeIcon icon={faFacebook} />
                </a>
                <a href="#!" className="bg_color">
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
                <a href="#!" className="bg_color">
                  <FontAwesomeIcon icon={faYoutube} />
                </a>
                <a href="#!" className="bg_color">
                  <FontAwesomeIcon icon={faXTwitter} />
                </a>
              </p>
            </div>
          </Col>
        </Row>
        <Row>
          <Col sm={12} md={12}>
            <div className="text-center bg_color padding_tb_5_px">
              Copyright © 2023 BESST (Brahmaputra Exam Success Support Team)
            </div>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Footer;
