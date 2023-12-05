import React, { useState, useEffect } from "react";
import { Col, Row, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGreaterThan } from "@fortawesome/free-solid-svg-icons";

import axios from "axios";
import parse from "html-react-parser";
import { baseUrl } from "../../../Utils/base";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4, // Adjusted to four columns
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

function CurrentAffair() {
  const [currentAffair, setCurrentAffair] = useState([]);

  const callGetAPI = async () => {
    try {
      const response = await axios.get(baseUrl() + "/df/findCurrentAffairs");
      setCurrentAffair(response.data.result);
    } catch (error) {
      console.error("Error fetching current affairs:", error);
    }
  };

  useEffect(() => {
    callGetAPI();
  }, []);

  return (
    <Container className="margin-top-97 margin-top-97_res">
      <Row>
        <Col md={8} sm={12} xs={12} className="float-md-left gap-10">
          <div className="curr_left">
            <div className="curr_head mb-4">Latest Current Affairs</div>
            <div className="curr_head_lay mb-4"></div>
            {currentAffair.slice(0, 2).map((r, index) => (
              <div key={index} className="curr_head_lay mb-4">
                <div className="curr_head_2 mb-4">
                  {r.affairsBeans[0].currentAffairsHead}:{" "}
                  {r.affairsBeans[0].title}
                </div>
                <p className="curr_para">
                  {parse(
                    r.affairsBeans[0].currentAffairsContent
                      .replaceAll("<p>", "")
                      .replaceAll("</p>", "")
                  )}
                </p>
                <div className="curr_rm mb-4">Read More</div>
              </div>
            ))}
          </div>
        </Col>
        <Col md={4} sm={12} xs={12} className="float-md-right">
          <div>
            <div className="curr_right">
              <p className="right_head">Monthly Current Affairs</p>
              {currentAffair.slice(0, 4).map((values, idx) => (
                <p key={idx} className="right_p">
                  {values.dateRangeText}
                </p>
              ))}
              <div className="right_rm mb-4">
                View All
                <FontAwesomeIcon icon={faGreaterThan} className="Grater_then" />
              </div>
              <p className="right_head2">Categories</p>
              <p className="right_p2">Polity</p>
              <p className="right_p2">Science & Technology</p>
              <p className="right_p2">General Knowledge</p>
              <div className="right_rm">
                View All
                <FontAwesomeIcon icon={faGreaterThan} className="Grater_then" />
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default CurrentAffair;
