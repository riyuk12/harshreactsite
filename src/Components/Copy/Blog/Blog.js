import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Card } from "react-bootstrap";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLessThan, faGreaterThan } from '@fortawesome/free-solid-svg-icons';
import { baseUrl } from "../../../Utils/base";


const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 3000 },
        items: 5
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};

const ButtonGroup = ({ next, previous, goToSlide, ...rest }) => {
    const { carouselState: { currentSlide } } = rest;
    return (
        <div className="carousel-button-group_blog">
            <button className={currentSlide === 0 ? 'disable' : ''} onClick={() => previous()} ><FontAwesomeIcon icon={faLessThan} /></button>
            <button onClick={() => next()} > <FontAwesomeIcon icon={faGreaterThan} /> </button>
        </div>
    );
};

function Blog() {
    const [blogs, setBlogs] = useState([]);

    const getBlogs = async () => {
        try {
            const result = await axios.get(baseUrl() + '/homePageData/Blogs');
            setBlogs(result.data.data);
            console.log("blogs", result.data.data);
        } catch (error) {
            console.log("blogs error", error);
        }
    }

    useEffect(() => {
        getBlogs();
    }, []);

    return (
        <Container fluid className="bg-light padding_b_15px section bg-white magin_top_113px">
            <Col md={11} sm={11} xs={11} className="align_center">
                <p className='blog_head padding_t_25px padding_b_15px'>Blog</p>

                <Carousel
                    responsive={responsive}
                    className='row'
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
                    {blogs?.map((item) => (
                        <Card key={item.id} className='p-2 blog_card'>
                            <div className="card_body align_center">
                                <img  src={`${process.env.PUBLIC_URL}/assets/caroselimg/a15b1a303b3f952504925c02f3604e4c .jpg`} alt='frame' className="img-course" fluid />
                                <div>
                                    <h5 className="blog_card_title ">{item.name}</h5>
                                </div>
                                <Col className=''>
                                    <p>{item.shortContent.substring(0, 150)}...</p>
                                </Col>
                                <Row>
                                    <Col md={9} sm={9} xs={12}>
                                        <button className='button_blog'>
                                            Read More <FontAwesomeIcon icon={faGreaterThan} className='Grater_then' />
                                        </button>
                                    </Col>
                                </Row>
                            </div>
                        </Card>
                    ))}
                </Carousel>
            </Col>
        </Container>
    );
}

export default Blog;
