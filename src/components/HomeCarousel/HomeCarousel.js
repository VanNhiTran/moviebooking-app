import React from "react";

import { Carousel } from "antd";
import { useSelector } from "react-redux";
import "./HomeCarousel.css";

export default function HomeCarousel() {
  const contentStyle = {
    height: "550px",
    textAlign: "center",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };
  const { arrCarousel } = useSelector((state) => state.CarouselReducer);
  const renderCarousel = () => {
    return arrCarousel.map((item, index) => {
      return (
        <div key={index}>
          <div
            style={{ ...contentStyle, backgroundImage: `url(${item.hinhAnh})` }}
          >
            <img src={item.hinhAnh} className="opacity-0" alt="" />
          </div>
        </div>
      );
    });
  };
  return (
    <Carousel effect="fade" autoplay={false}>
      {renderCarousel()}
    </Carousel>
  );
}
