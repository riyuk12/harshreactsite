import React, { useEffect, useState } from "react";
import { Container, Row, Col, Image, Accordion, Button } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import { baseUrl } from "../../../Utils/base";


const responsive = {
  superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 5 },
  desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
  tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
  mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
};

function FAQ() {
  const [faqQuestions, setFaqQuestions] = useState({ Data: [] });

  useEffect(() => {
    fetch(`${baseUrl()}/df/getFaqs`, {
      method: "GET",
      headers: {
        "Acces-Control-Allow-Origin": "*",
        Client_ID: "MVOZ7rblFHsvdzk25vsQpQ==",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.ResultCode === "200") {
          setFaqQuestions(result);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div className="">
      <Container fluid className="faq_background">
        <Row>
          <Col md={4} sm={12} xs={12} className="faq_lay2">
            <div>
              <div className="faq_head">Have any doubt?</div>
              <div className="faq_para">
                For more general questions about BESST, check out our dedicated
                FAQs.
              </div>
              <a
                className="reg_btn margin_0_auto"
                // href="http://localhost:8000/faq"s
                target="_blank"
                rel="noopener noreferrer"
              >
                <b>Check FAQs</b>
              </a>
            </div>
          </Col>

          <Col md={8} sm={12} xs={12} className="faq_margin">
            {faqQuestions.Data?.slice(0, 5).map((item) => (
              <Accordion
                data-responsive-accordion-tabs="-medium-tabs large-tabs"
                defaultActiveKey={item.id === 1 ? "0" : "1"}
                key={item.id}
              >
                <Accordion.Item eventKey="0" style={{ margin: "1em" }}>
                  <Accordion.Header className="accordion_header">
                    {item.id}. {item.faq}
                  </Accordion.Header>
                  <Accordion.Body>
                    <p>{item.answer}</p>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            ))}
          </Col>
        </Row>
      </Container>

      <section className="faq__box">
        <Container className="faq_box">
          <Row>
            <Col sm={12} md={6} xs={12} className="abso_col">
              <div className="faq_p">
                Start a conversation
                <p className="faq__p">
                  Our help and support teams are available to talk with you
                </p>
              </div>
            </Col>
            <Col sm={12} md={3} xs={12} className="pt-4">
              <Button className="whatsapp btn btn-lg">
                <Image
                  src={`${process.env.PUBLIC_URL}/assets/caroselimg/Frame (1).png`}
                  alt="icon"
                  fluid
                />{" "}
                Send us a Message
              </Button>
            </Col>
            <Col sm={12} md={3} xs={12} className="pt-4">
              <Button type="button" className="primary btn btn-lg">
                Email Us
              </Button>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
}

export default FAQ;
