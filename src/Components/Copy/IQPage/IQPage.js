import { Col, Container, Row } from "react-bootstrap";
import { useState, useEffect, props } from "react";
import axios from "axios";
import { baseUrl } from "../../../Utils/base";


const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
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
let totalAnswers = 0;
let correctAnswers = 0;

const Iq_page = () => {
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const [iqdata, setIqData] = useState([]);
  const [processedIQ, setProcessedIQ] = useState(0);
  const [selectedAns, setSelectedAns] = useState("");
  const [showquestion, setshowquestion] = useState(true);

  useEffect(() => {
    axios
      .get(baseUrl() + "/homePageData/IQ")
      .then((response) => {
        setIqData(response.data.data);
        totalAnswers = response.data.data.length;
      })
      .catch((error) => {
        console.error("Error fetching IQ data:", error);
      });
  }, []);

  const IQProcess = async (ans) => {
    if (selectedAns === ans) {
      correctAnswers = correctAnswers + 1;
    }
    var sectionDividers = Array.from(
      document.getElementsByClassName("iQ_button")
    );
    sectionDividers.map((element) => {
      element.classList.remove("selected");
    });
    setProcessedIQ(processedIQ + 1);
    setshowquestion(processedIQ < iqdata.length - 1);
  };

  const selectedOption = (event) => {
    var sectionDividers = Array.from(
      document.getElementsByClassName("iQ_button")
    );
    sectionDividers.map((element) => {
      element.classList.remove("selected");
    });
    event.target.classList.add("selected");
    setSelectedAns(event.target.value);
  };

  return (
    <div>
      <Container responsive={responsive} fluid className="bg_iq">
        <p className="iq_head">Check your IQ level</p>
        <div className="in_iq_bg">
          {showquestion ? (
            <>
              <p className="iq_p_head">
                <span className="span_head">Question {processedIQ + 1}</span>:{" "}
                {iqdata[processedIQ]?.question}
              </p>
              <Row>
                {iqdata[processedIQ]?.options.map((options, optionkey) => {
                  return (
                    <Col sm={6} md={6} xs={12}>
                      {" "}
                      <button
                        type="button"
                        onClick={(event) => selectedOption(event)}
                        className="iQ_button"
                        value={options["option" + (optionkey + 1)]}
                      >
                        {options["option" + (optionkey + 1)]}
                      </button>
                    </Col>
                  );
                })}
                <div className="btn-sub-btn text-center">
                  <button
                    type="button"
                    className="sub_button btn btn-lg"
                    onClick={(event) => IQProcess(iqdata[processedIQ]?.answer)}
                  >
                    Submit
                  </button>
                </div>
              </Row>
            </>
          ) : (
            <>
              <p className="iq_p_head">
                <span className="span_head">You're a Genius!</span>
              </p>
              <p className="iq_p_head">
                Your score : {(correctAnswers / totalAnswers) * 100}
              </p>
              <p className="iq_p_head">
                Try more free mock test and increase your grades. Take free mock
                test here.
              </p>

              <Col sm={4} md={3} xs={12} className="btn-sub-btn text-center">
                <button type="button" className="sub_button1 btn btn_res">
                  Take Free Test
                </button>
              </Col>
            </>
          )}
        </div>
      </Container>
      <scetion className="box">
        <Container className="absolute_box">
          <Row>
            <Col sm={8} md={9} xs={12} className="abso_col">
              <p className="abso_p">
                Don't miss this opportunity to enhance your skills and
                confidence, take free mock tests now!
              </p>
            </Col>
            <Col sm={4} md={3} xs={12} className="btn-sub-btn text-center">
              <button type="button" className="sub_button1 btn btn_res">
                Take Free Test
              </button>
            </Col>
          </Row>
        </Container>
      </scetion>
    </div>
  );
};
export default Iq_page;
