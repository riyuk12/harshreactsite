import React from "react";
import { Container, Col, Row, Card, Button, Tabs, Tab } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const CUETCourse = () => {
  return (
    <div className="mt-40">
      <Container fluid>
        {/* Row 1 - Left Side */}
        <Row>
          <Col lg={8} className="mb-4">
            <div className="Row_heading">
              <h1>Cuet UG Course</h1>
              <img
                src="./assets/caroselimg/abt1.jpeg"
                alt="Course Image"
                style={{ width: "100%", height: "auto" }}
              />
              <div className="contact_para">
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
              </div>
              <p className="text-lg-end">
                <span className="stat1">50K</span> Students
              </p>
              <p className="text-lg-start">
                <span className="stat1">70+</span> Courses
              </p>
            </div>
          </Col>

          {/* Row 1 - Right Side */}
          <Col lg={4} className="mb-4">
            <div className="Row_heading">
              <Card>
                <Card.Img
                  variant="top"
                  src="./assets/caroselimg/abt1.jpeg"
                  alt="Card Image"
                />
                <Card.Body>
                  <Card.Title>Product Name</Card.Title>
                  <Card.Text>
                    Product details and description go here.
                  </Card.Text>
                  <div className="d-flex justify-content-between align-items-center">
                    <Button variant="primary">Add to Cart</Button>
                    <Button variant="success">Buy Now</Button>
                  </div>
                </Card.Body>
              </Card>
            </div>
          </Col>
        </Row>

        {/* Row 2 - Content */}
        <Row>
          <Col lg={6} className="mb-4">
            <div className="Row_heading">
              <h2>Course Details</h2>
              <p>Content 1</p>
              <p>Content 2</p>
            </div>
          </Col>

          <Col lg={6} className="mb-4">
            <Tabs defaultActiveKey="tab1" id="course-tabs" className="mb-3">
              <Tab eventKey="tab1" title="Tab 1">
                <p>Tab 1 content goes here</p>
              </Tab>
              <Tab eventKey="tab2" title="Tab 2">
                <p>Tab 2 content goes here</p>
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CUETCourse;
