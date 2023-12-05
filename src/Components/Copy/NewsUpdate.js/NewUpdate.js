import { Row, Col, Card, Image } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import axios from "axios";
import parse from "html-react-parser";

const NewsUpdte = () => {
  const [newsholders, setNewsHolders] = useState([]);

  const newsGetApi = async () => {
    try {
      const response = await axios.get(
        "https://www.besst.in/besstMainApi/df/findNewsEventDtls/1"
      );
      setNewsHolders(response.data.result);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return d.toLocaleDateString("en-US", options);
  };

  useEffect(() => {
    newsGetApi();
  }, []);

  return (
    <section className="back_ground gray_bg">
      <Row>
        <Col md={6} sm={12} xs={12} className="mb-4">
          <Card className="report_img1">
            <Image
             src={`${process.env.PUBLIC_URL}/assets/cardimg/4debf7567473808f02f905a4a642fb82.png`}
              alt="frame"
              className="report_img"
              fluid
            />
            <Card.Body className="card-back">
              <Card.Title className="card_title">
                {parse(String(newsholders[0]?.title).substring(0, 100))}...s
              </Card.Title>
              <Card.Text className="card-text mt-2">
                {parse(String(newsholders[0]?.description).substring(0, 300))}
                ...
              </Card.Text>
              <div className="auther-name" style={{ display: "flex", gap: 15 }}>
                <span>{newsholders[0]?.createdBy}</span>
                <span>
                  {newsholders[0] ? formatDate(newsholders[0].newsBlinkTs) : ""}
                </span>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} sm={12} xs={12} className="news_upd">
          <Row className="news-heading">News & Updates</Row>
          <Row className="news-content">
            {newsholders.slice(0, 5).map((values, idx) => (
              <React.Fragment key={idx}>
                <a href={values.link} target="_blank" className="news_a">
                  <p>{parse(String(values.title).substring(0, 200))}...</p>
                </a>
                <div
                  className="auther_name"
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span>{values.createdBy}</span>
                  <span>{formatDate(values.newsBlinkTs)}</span>
                </div>
              </React.Fragment>
            ))}
          </Row>
        </Col>
      </Row>
    </section>
  );
};

export default NewsUpdte;
