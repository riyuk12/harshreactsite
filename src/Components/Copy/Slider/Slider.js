import { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import axios from "axios";
export function baseUrl() {
	const url = "http://68.178.172.171:8282/besstMainApi";
	return url;
}

function ControlledCarosel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const [slider, setSlider] = useState([]);

  const sliderGetAPI = async () => {
    const response = await axios.get(baseUrl() + "/homePageData/Banner");
    setSlider(response.data.data);
  };

  useEffect(() => {
    sliderGetAPI();
  }, []);

  return (
    <section fluid>
      <Carousel
        activeIndex={index}
        onSelect={handleSelect}
        className="banner-slider"
      >
        {slider?.map((value) => {
            console.log(value.imagename)
          return (
            <Carousel.Item>
              <img
                src={`${process.env.PUBLIC_URL}/assets/caroselimg/${value.imagename}`}
                alt="image"
                style={{ width: "100%", minHeight: "100vh", objectFit: "fill" }}
              />
            </Carousel.Item>
          );
        })}
      </Carousel>
    </section>
  );
}

const Slider = () => {
  return (
    <section className="Slider">
      <ControlledCarosel />
    </section>
  );
};
export default Slider;
