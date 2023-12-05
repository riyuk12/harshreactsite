import { Container, Row, Col, Image, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGreaterThan, faLessThan } from "@fortawesome/free-solid-svg-icons";
import React from "react";

function OfferingPage() {
  return (
    <section>
      <Container fluid className="padding_b_15px we-offer">
        <div className="offering_container">
          
            <Col >
              <h3 className="h3_head">We Offer You</h3>
              <p className="lorem_1">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt.
              </p>
            </Col>
        
          <div className="card-container">
            <Card className="p-2 Course_card mb-3">
              <div className="card_body align_center">
                <Image
                 src={`${process.env.PUBLIC_URL}/assets/cardimg/4478ff9024b692b860004cb7aaa1f43f.png`}
                 alt="frame"
                  className="img-course"
                  fluid
                />
                <div className="card-title">
                  <h5 className="card-university-title">Online Counseling</h5>
                  <h5 className="card-university-title">
                    Counseling For Admission
                  </h5>
                </div>
              </div>
            </Card>
            <Card className="p-2 Course_card mb-3">
              <div className="card_body align_center">
                <Image
                src={`${process.env.PUBLIC_URL}/assets/cardimg/432d9280b2bd93e065bf1dcd14dfc11d.png`}
                  alt="frame"
                  className="img-course"
                  fluid
                />
                <div className="card-title">
                  <h5 className="card-university-title">Online Classes</h5>
                  <h5 className="card-university-title">
                    Classes for General Test paper for CUET
                  </h5>
                </div>
              </div>
            </Card>
            <Card className="p-2 Course_card mb-3">
              <div className="card_body align_center">
                <Image
                 src={`${process.env.PUBLIC_URL}/assets/cardimg/c962f8f3520869897b37998bf3560539.png`}
                  alt="frame"
                  className="img-course"
                  fluid
                />
                <div className="card-title">
                  <h5 className="card-university-title">
                    Other Competitive Exams
                  </h5>
                  <h5 className="card-university-title">Competitive Exams</h5>
                </div>
              </div>
            </Card>
            </div>
            
          
        </div>
      </Container>
    </section>
  );
}

export default OfferingPage;
