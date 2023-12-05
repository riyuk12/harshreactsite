import React, { useState, useEffect } from "react";
import { Container, Row, Col, Image, Card } from "react-bootstrap";
import axios from "axios";

import "./Intro.css";
export  function baseUrl() {
	const url = "http://68.178.172.171:8282/besstMainApi";
	return url;
}
const IntroPlatform = () => {
  const [introplatform, setIntroPlatform] = useState({});

  const fetchPost = async () => {
    try {
      const response = await axios.post(
        `${baseUrl()}/df/statistics`,
        {},
        { headers: { Client_ID: "MVOZ7rblFHsvdzk25vsQpQ==" } }
      );
      setIntroPlatform(response.data.Data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  const { totalUser, totalStudent, totalMCQ, totalSubject } = introplatform;

  return (
    <section className="intro_plat">
      
    
    <Container fluid className="intro_panel">
      <Row className="align_center">
        <Col md={11} sm={11} xs={11} class="paraContainer" >
          <div className="inrto_p">
            Our platform boasts top-notch educators, efficient processes, and
            cutting-edge technology, all aimed at guiding our students on a
            personalized and exceptional learning journey across various
            platforms. Our goal is to empower them to achieve their best
            performance.
          </div>
          <Row>
            <Col md={3} sm={6} xs={12} class="card_ctn">
              <Card className="intro_card">
                <Row>
                  <Col xs={5}>
                    <div className="intro_images">
                      <Image
                        src={`${process.env.PUBLIC_URL}/assets/svg/students.png`}
                        alt="frame"
                        className="img-intro"
                        fluid
                      />
                    </div>
                  </Col>
                  <Col xs={6} className="text-center">
                    <h2 className="user_1">{totalUser}+</h2>
                    <p className="user_name">USERS</p>
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col md={3} sm={6} xs={12} class="card_ctn">
              <Card className="intro_card">
                <Row>
                  <Col xs={5}>
                    <div className="intro_images">
                      <Image
                      src={`${process.env.PUBLIC_URL}/assets/svg/students.png`}
                        alt="frame"
                        className="img-intro"
                        fluid
                      />
                    </div>
                  </Col>
                  <Col xs={6} className="text-center">
                    <h2 className="user_1">{totalStudent}</h2>
                    <p className="user_name">STUDENTS</p>
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col md={3} sm={6} xs={12} class="card_ctn">
              <Card className="intro_card">
                <Row>
                  <Col xs={5}>
                    <div className="intro_images">
                      <Image
                        src={`${process.env.PUBLIC_URL}/assets/svg/Group 13834 (1).png`}
                        alt="frame"
                        className="img-intro"
                        fluid
                      />
                    </div>
                  </Col>
                  <Col xs={6} className="text-center">
                    <h2 className="user_1">{totalMCQ}</h2>
                    <p className="user_name">MCQ'S</p>
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col md={3} sm={6} xs={12} class="card_ctn">
              <Card className="intro_card">
                <Row>
                  <Col xs={5}>
                    <div className="intro_images">
                      <Image
                       src={`${process.env.PUBLIC_URL}/assets/svg/students.png`}
                        alt="frame"
                        className="img-intro"
                        fluid
                      />
                    </div>
                  </Col>
                  <Col xs={6} className="text-center">
                    <h2 className="user_1">{totalSubject}</h2>
                    <p className="user_name">SUBJECT</p>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
    
  </section>
  );
};

export default IntroPlatform;
