import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import bg from "../../assets/img/BG.png";
import hinh1 from "../../assets/img/popcorn.jpeg";
// import "../css/DetailFilm.css";
import { Rate, Tabs } from "antd";
import { getFilmDetailAction } from "../../redux/actions/QuanLyRapAction";
import moment from "moment";
import "./css/circle.css";

import { CustomCard } from "@tsamantanis/react-glassmorphism";
import "@tsamantanis/react-glassmorphism/dist/index.css";
import { NavLink } from "react-router-dom";

function FilmDetail(props) {
  const { TabPane } = Tabs;
  const { arrFilmDetail } = useSelector((state) => state.QuanLyRapReducer);
  console.log(arrFilmDetail);
  const dispatch = useDispatch();

  useEffect(() => {
    let { id } = props.match.params;
    dispatch(getFilmDetailAction(id));
  }, []);

  const renderFilmInfo = () => {
    return (
      <div>
        <div className=" flex justify-between pt-24 space-x-8 mx-auto w-11/12 lg:w-8/12">
          <div className="flex-none">
            <div className="container">
              <a href={arrFilmDetail.trailer} target="_blank">
                <img
                  src={arrFilmDetail.hinhAnh}
                  alt=""
                  className="lg:h-72 lg:w-52 md:h-52 md:w-44 h-28 w-20"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://picsum.photos/seed/picsum/50/50`;
                  }}
                />
              </a>
            </div>
          </div>
          <div className="md:flex-1 ">
            <h1 className="md:text-2xl text-large" style={{ color: "white" }}>
              {arrFilmDetail.tenPhim?.toUpperCase()}
            </h1>
            <h2
              style={{ color: "#8f8f8f" }}
              className="md:text-large md:leading-8 my-3 leading-5 text-sm"
            >
              {arrFilmDetail.moTa}{" "}
            </h2>
            <h3 style={{ color: "white" }}>
              {" "}
              Ngày khởi chiếu:{" "}
              {moment(arrFilmDetail.ngayKhoiChieu).format("DD-MM-YYYY")}
            </h3>
            <button className="px-4 py-1 self-center md:px-8 md:py-3 rounded">
              {" "}
              <a href={arrFilmDetail.trailer} target="_blank">
                TRAILER
              </a>
            </button>
            <button className="px-4 py-1 mt-12 self-center md:px-8 md:py-3 rounded">
              {" "}
              <a href="#tabPhim">MUA VÉ NGAY</a>
            </button>
          </div>
          {/* <div>
            <div
              className={`flex-none  c100 p${
                arrFilmDetail.danhGia * 10
              } medium`}
            >
              <span>{arrFilmDetail.danhGia}</span>
              <div className="slice">
                <div className="bar"></div>
                <div className="fill"></div>
              </div>
            </div>
            <div className="text text-center">
              <Rate
                allowHalf
                value={arrFilmDetail.danhGia / 2}
                style={{ color: "#EF4444" }}
              />
            </div>
            <div className="text text-center">
              <h1>Đánh giá</h1>
            </div>
          </div>
         */}
        </div>
      </div>
    );
  };
  const renderShowtimes = () => {
    return arrFilmDetail.heThongRapChieu?.map((cinemaSystem, index) => {
      return (
        <TabPane
          tab={
            <div className="text text-center">
              <img
                src={cinemaSystem.logo}
                alt=""
                className="rounded-full sm:w-12 w-8 m-auto"
              />
              {cinemaSystem.tenHeThongRap}
            </div>
          }
          key={index}
        >
          <Tabs tabPosition="left">
            {cinemaSystem.cumRapChieu.map((cinema, index) => {
              return (
                <TabPane
                  tab={
                    <div
                      className="lg:w-44 md:w-36 sm-24 w-16"
                      style={{ whiteSpace: "normal" }}
                    >
                      <h1
                        className="lg:text-base text-xs"
                        style={{ color: "wheat" }}
                      >
                        {cinema.tenCumRap}
                      </h1>
                    </div>
                  }
                  key={index}
                >
                  <div className="grid md:grid-cols-5 lg:grid-cols-7 sm:grid-cols-4 grid-cols-3 gap-4 mb-10">
                    {cinema.lichChieuPhim.map((time, index) => {
                      return (
                        <NavLink
                          to={`/checkout/${time.maLichChieu}`}
                          style={{ fontWeight: "500", color: "#00600f" }}
                          key={index}
                        >
                          {moment(time.ngayChieuGioChieu).format("HH:mm")}
                        </NavLink>
                      );
                    })}
                  </div>
                </TabPane>
              );
            })}
          </Tabs>
        </TabPane>
      );
    });
  };

  return (
    <section
      style={{
        background: `url(${bg})`,
        backgroundPosition: "center",
        backgroundSize: "contain",
        height: "100%",
        width: "100%",
      }}
    >
      {renderFilmInfo()}
      <div className="lg:w-4/5 w-11/12 mx-auto mt-12">
        <Tabs
          id="tabPhim"
          centered
          style={{ margin: "auto" }}
          tabPosition="top"
        >
          {renderShowtimes()}
        </Tabs>
      </div>
      {/* <CustomCard
        effectColor=""
        // required
        color="#14AEFF"
        blur={20}
        borderRadius={0}
      >
        {renderFilmInfo()}
        <div className="lg:w-4/5 w-11/12 mx-auto">
          <Tabs
            id="tabPhim"
            centered
            style={{ margin: "auto" }}
            tabPosition="top"
          >
            {renderShowtimes()}
          </Tabs>
        </div>
      </CustomCard>
    */}
    </section>
  );
}

export default FilmDetail;
