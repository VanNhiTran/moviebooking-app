import React from "react";
import { NavLink } from "react-router-dom";
import { GROUPID } from "../../util/settings/config";
import "./CardFilm.css";

// import "./CardFilm.module.css";

function CardFilm(props) {
  const { film } = props;

  return (
    <div className="wrapper">
      <div className="main_card">
        <div className="card_left">
          <div className="card_datails">
            <h1>{film.tenPhim}</h1>
            <div className="card_cat">
              <p className="PG">PG - 13</p>
              <p className="year">2018</p>
              <p className="genre">Action | Adventure </p>
              <p className="time">2h 28m</p>
            </div>
            <p className="disc">
              {film.moTa.length > 100 ? (
                <NavLink to={`/detail/${film.maPhim}`}>
                  {film.moTa.slice(0, 80)}
                  ...xem tiếp
                </NavLink>
              ) : (
                <span>
                  <NavLink to={`/detail/${film.maPhim}`}>{film.moTa}</NavLink>
                </span>
              )}
            </p>

            <div className="social-btn">
              <button>
                <a href={film.trailer} target="_blank">
                  <i className="fas fa-play" /> SEE TRAILER
                </a>
              </button>

              <button>
                <i className="fas fa-star unactive" />
              </button>
              <button>
                <NavLink to={`/detail/${film.maPhim}`}>
                  <i className="fa fa-ticket-alt" /> ĐẶT VÉ
                </NavLink>
              </button>
            </div>
          </div>
        </div>
        <div className="card_right">
          <div className="img_container">
            <img
              src={film.hinhAnh}
              alt=""
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `https://picsum.photos/seed/picsum/300/300`;
              }}
            />
          </div>
          <div className="play_btn">
            <a href={film.trailer} target="_blank">
              <i className="fas fa-play-circle" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardFilm;
