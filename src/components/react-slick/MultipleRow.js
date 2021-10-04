import React, { Component } from "react";
import Slider from "react-slick";
import styleSlick from "./MultipleRows.module.css";
import "./MultipleRows.module.css";
// import "./multicss2.css";
import CardFilm from "../films/CardFilm";
import { useDispatch } from "react-redux";
import {
  RENDER_COMINGSOON_FILM,
  RENDER_NOWSHOWING_FILM,
} from "../../redux/actions/types/QuanLyPhimTypes";

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
      style={{ ...style, display: "block", background: "red" }}
      onClick={onClick}
    ></div>
  );
}
const MultipleRows = (props) => {
  const arrFilmFilter = props.arrFilm.filter(
    (film) => new Date(film.ngayKhoiChieu) > new Date("2021-08-01T00:00:00.713")
  );

  const dispatch = useDispatch();
  const renderMovieCard = () => {
    return props.arrFilm.map((film, index) => {
      return (
        <div key={index} className={`${styleSlick["width-item"]}`}>
          <CardFilm film={film} />
        </div>
      );
    });
  };

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    margin: "0px",
    slidesToShow: 2,
    speed: 500,
    rows: 1,
    slidesPerRow: 2,
    slidesToScroll: 1,
    variableWidth: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 668,
        settings: {
          rows: 1,
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="">
      <div className="m-auto w-2/3 text text-center">
        <button
          className="mx-5"
          onClick={() => {
            const action = {
              type: RENDER_NOWSHOWING_FILM,
            };

            dispatch(action);
          }}
        >
          ĐANG CHIẾU
        </button>
        <button
          onClick={() => {
            const action = {
              type: RENDER_COMINGSOON_FILM,
            };
            dispatch(action);
          }}
        >
          SẮP CHIẾU
        </button>
      </div>

      <Slider {...settings}>{renderMovieCard()}</Slider>
    </div>
  );
};

export default MultipleRows;
