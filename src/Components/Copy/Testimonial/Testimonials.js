import { CarouselItem, Container, Button } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import React, { useEffect, useState } from "react";
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

function Testimonials() {
  // const [Testinomials, setTestinoMials] = useState([]);

  // const newTestinomialsApi = async () => {
  //     const response = await axios.get(`${baseUrl()}/homePageData/Testinomials`)
  //     // setTestinoMials(response.data);
  //     console.log(response.data);
  //     // console.log("success");

  // };

  // useEffect(() => {
  //     newTestinomialsApi();
  // }, []);

  const [Testinomials, setTestinoMials] = useState([]);
  useEffect(() => {
    axios
      .get(
        `${baseUrl()}/homePageData/Testinomials`,
        {},
        {
          headers: {
            "Acces-Control-Allow-Origin": "*",
            Client_ID: "MVOZ7rblFHsvdzk25vsQpQ==",
          },
        }
      )
      .then((result) => {
        setTestinoMials(result.data.data);
        console.log("Testinomials", Testinomials);
      })
      .catch((err) => {
        console.log(err);
        console.log("i am executing");
      });
  }, []);

  return (
    <Container fluid>
      <Row className="intro_panel_l1">
        <Col md={10} className="align_center testimonials  ">
          <Carousel responsive={responsive}>
            {Testinomials?.map((item) => {
              return (
                <Carousel.Item className="">
                  <h3 className="sec_caro_h3 ">
                    Success Stories & Tesimonials
                  </h3>
                  <Row className=" bg_radious">
                    <Col md={6} sm={12} xs={12}>
                      <Image
                        src={`${process.env.PUBLIC_URL}/assets/testimonials/testimonial.png`}
                        alt="frame"
                        className="Caor_img"
                        fluid
                      />
                    </Col>
                    <Col
                      md={6}
                      sm={12}
                      xs={12}
                      className="sec_caro_part margin-l-15px border-right-radius-20px"
                    >
                      <h3 className="Caro_head">{item.name}</h3>
                      <p className="Caor_para">{item.content}</p>
                      <Button type="button" className="caro_btn">
                        View Full Story
                        <Image
                          src={`${process.env.PUBLIC_URL}/assets/caroselimg/Frame 185460.png`}
                          alt="icon"
                          className="ms-2" 
                          style={{ width: "20px", height: "20px" }} 
                        />
                      </Button>
                    </Col>
                  </Row>
                </Carousel.Item>
              );
            })}
          </Carousel>
        </Col>
      </Row>
    </Container>
  );
}
export default Testimonials;
