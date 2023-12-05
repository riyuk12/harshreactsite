import React, { useState, props } from "react";
import Card from "react-bootstrap/Card";
import { Container, Row, Col, Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGreaterThan, faLessThan } from "@fortawesome/free-solid-svg-icons";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

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

const ButtonGroup = ({ next, previous, goToSlide, ...rest }) => {
  const {
    carouselState: { currentSlide },
  } = rest;
  return (
    <div className="carousel-button-group">
      <button
        className={currentSlide === 0 ? "disable" : ""}
        onClick={() => previous()}
      >
        <FontAwesomeIcon icon={faLessThan} />
      </button>
      <button onClick={() => next()}>
        {" "}
        <FontAwesomeIcon icon={faGreaterThan} />{" "}
      </button>
    </div>
  );
};

const Courses_Search = (props) => {
  const [index, setIndex] = useState(0);
  const CourseData = props.CourseData;

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Container fluid className="padding_b_15px">
      <Col md={11} sm={11} xs={11} className="align_center">
        <p className="Search_head padding_t_25px padding_b_15px">
          Search Results{" "}
          <span className="Search_head_dark">
            “{CourseData.length} Courses”
          </span>{" "}
          Found
        </p>

        {CourseData.length > 0 ? (
          <Carousel
            responsive={responsive}
            className="row"
            arrows={false}
            renderButtonGroupOutside={true}
            customButtonGroup={<ButtonGroup />}
            swipeable={true}
            draggable={true}
            scrollable={true}
            ssr={true}
            infinite={false}
            keyBoardControl={true}
            itemClass="carousel-item-padding-40-px"
            containerClass="carousel-container"
          >
            {CourseData?.map((item) => {
              return item.courses?.map((courseItem) => {
                return (
                  <Card className="p-2 Course_card" key={courseItem.id}>
                    <div className="card_body align_center">
                      <img
                        src={`${process.env.PUBLIC_URL}/assets/caroselimg/a15b1a303b3f952504925c02f3604e4c .jpg`}
                        alt="frame"
                        className="img-course"
                        fluid
                      />
                      <div class="card-title">
                        <h5 class="card-university-title">
                          {courseItem.degree}
                        </h5>
                        <h5 class="card-university-title">
                          {item.university.name}
                        </h5>
                      </div>
                      <Row>
                        <Col xs={9}>
                          <button className="button">
                            Start Course{" "}
                            <FontAwesomeIcon
                              icon={faGreaterThan}
                              className="Grater_then"
                            ></FontAwesomeIcon>
                          </button>
                        </Col>
                        <Col xs={3}>
                          <Image
                            src="./assets/elips/Score.png"
                            alt=""
                            className="padding_t_10px"
                          />
                        </Col>
                      </Row>
                    </div>
                  </Card>
                );
              });
            })}
          </Carousel>
        ) : (
          <></>
        )}
      </Col>
    </Container>
  );
};

export default Courses_Search;
