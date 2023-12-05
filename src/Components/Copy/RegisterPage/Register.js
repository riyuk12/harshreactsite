import { useState, props, useEffect } from "react";
import Card from "react-bootstrap/Card";
import { Container, Row } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import Col from "react-bootstrap/Col";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileArrowUp,
  faUser,
  faStar,
  faTrophy,
  faGreaterThan,
  faLessThan,
} from "@fortawesome/free-solid-svg-icons";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import axios from "axios";
import { baseUrl } from "../../../Utils/base";


const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
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
        className={currentSlide === 0 ? "disable prevBtn" : "prevBtn"}
        onClick={() => previous()}
      >
        <FontAwesomeIcon icon={faLessThan} />
      </button>
      <button className=" nextBtn" onClick={() => next()}>
        {" "}
        <FontAwesomeIcon icon={faGreaterThan} />{" "}
      </button>
    </div>
  );
};

function CourseCarousel() {
  const [index, setIndex] = useState(0);
  const [courses, setCourses] = useState([]);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const getCourses = async () => {
    var resultSet = "";
    await axios
      .get(baseUrl() + "/homePageData/Courses")
      .then((result) => {
        // console.log("getCourses", result.data.data)
        resultSet = result.data.data;
        // setCourses(resultSet)
      })
      .catch((e) => {
        console.log("getCourses Error ", e);
      });

    return resultSet;
  };

  useEffect(async () => {
    var result = await getCourses();
    console.log("getCourses result", result);
    // getCourses();
    setCourses(result);
  }, []);

  return (
    <Container
      fluid
      className="bg-light padding_b_15px section"
      id="joinbesst_media"
    >
      <section className="register-section">
      <div class="reg_layout_2">
        <div class="reg_head">Join BESST today</div>
        <div class="reg_para text_align">
          Register for a BESST account to get personalised course
          recommendations and offers
          <br />
          straight to your inbox, Lorem ipsum dolor sit amet, consectetur
          adipiscing elit,
        </div>
        <button className="reg_btn" type="button">
          Register Now
        </button>
      </div>
      <Col md={11} sm={11} xs={11} className="align_center">
        <p className="Course_head padding_t_25px padding_b_15px"></p>
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
          {/* <Card className='Course_card' >
                                <div className="card_body align_center">
                                    <img src="./assets/caroselimg/a15b1a303b3f952504925c02f3604e4c .jpg" alt='frame' className="img-course" fluid />
                                    <div>
                                        <h5 class="card-title" >{item.Name}</h5>
                                    </div>
                                    <Col className='icon_col'>
                                        <img src='./assets/icons/book-icon.png' /> <h6 className='course_heading margin_r_30px'>Lesson:{item.lessonsCount}</h6>
                                        <img src='./assets/icons/user-icon.png' /> <h6 className='course_heading margin_r_30px'>student:{item.StudentsCount}</h6>
                                        <img src='./assets/icons/cup-icon.png' /> <h6 className='course_heading'>{item.Status} </h6>
                                    </Col>
                                    <Row>
                                        <Col md={9} sm={9} xs={12}><button className='button'>Start Course <FontAwesomeIcon icon={faGreaterThan} className='Grater_then' ></FontAwesomeIcon></button></Col>
                                        <Col md={3} sm={3} xs={12}><Image src='./assets/elips/Score.png' alt='' className='padding_t_10px' /></Col>
                                    </Row>
                                </div>

                            </Card> */}

          <Card className="reg_img_card">
            <div>
              <img
                 src={`${process.env.PUBLIC_URL}/assets/logo 2/048b0a350d211144e407a76d2219d86b.png`}
                alt="image1"
                width="150.207px"
                height="160.111px"
              />
            </div>
          </Card>
          <Card className="reg_img_card">
            <div>
              <img
              src={`${process.env.PUBLIC_URL}/assets/logo 2/86e4b3abbdf5cf899952c5d39ab4e42e.png`}
                alt="image2"
                width="150.207px"
                height="160.111px"
              />
            </div>
          </Card>
          <Card className="reg_img_card">
            <div>
              <img
                 src={`${process.env.PUBLIC_URL}/assets/logo 2/310f946ad5cf558b778f3ddd73a0722b.png`}
                alt="image3"
                width="150.207px"
                height="160.111px"
              />
            </div>
          </Card>
          <Card className="reg_img_card">
            <div>
              <img
              src={`${process.env.PUBLIC_URL}/assets/logo 2/97414ed0a242f09762fbfca9f4dc0e4e.png`}
                alt="image4"
                width="150.207px"
                height="160.111px"
              />
            </div>
          </Card>
          <Card className="reg_img_card">
            <div>
              <img
                 src={`${process.env.PUBLIC_URL}/assets/logo 2/310f946ad5cf558b778f3ddd73a0722b.png`}
                alt="image4"
                width="150.207px"
                height="160.111px"
              />
            </div>
          </Card>
          <Card className="reg_img_card">
            <div>
              <img
              src={`${process.env.PUBLIC_URL}/assets/logo 2/86e4b3abbdf5cf899952c5d39ab4e42e.png`}
                alt="image4"
                width="150.207px"
                height="160.111px"
              />
            </div>
          </Card>
        </Carousel>
      </Col>
      </section>
    </Container>
  );
}

const Register = () => {
  return <CourseCarousel />;
};
export default Register;
