import React, { Component } from "react";
import Slider from "react-slick";
import styleSlick from "./MultipleRows.module.css";
import Film from "../films/Film";
import "./MultipleRows.module.css";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "red" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "green" }}
      onClick={onClick}
    />
  );
}
export default class MultipleRows extends Component {
  render() {
    const settings = {
      className: "center variable-width",
      centerMode: true,
      infinite: true,
      centerPadding: "60px",
      slidesToShow: 3,
      speed: 500,
      rows: 1,
      slidesPerRow: 2,
      variableWidth: true,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
    };
    // const settings = {
    //   className: "center",
    //   centerMode: true,
    //   infinite: true,
    //   centerPadding: "60px",
    //   slidesToShow: 3,
    //   speed: 500,
    //   rows: 2,
    //   slidesPerRow: 2,
    // };
    const { arrMovieList } = this.props;
    const renderMovieCard = () => {
      return arrMovieList.map((film, index) => {
        return (
          <div key={index} className={`${styleSlick["width-item"]}`}>
            <Film film={film} />
          </div>
        );
      });
    };
    return (
      <div>
        <Slider {...settings}>
          {renderMovieCard()}
          {renderMovieCard()}
          {renderMovieCard()}
          {renderMovieCard()}
          {renderMovieCard()}
          {renderMovieCard()}
          {renderMovieCard()}
          {renderMovieCard()}
          {renderMovieCard()}
          {renderMovieCard()}
        </Slider>
      </div>
    );
  }
}
