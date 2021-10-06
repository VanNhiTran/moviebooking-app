import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
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
        <div className=" flex justify-between pt-24 space-x-8 mx-auto items-center w-11/12 lg:w-8/12">
          <div className="flex-none">
            <div className="container">
              <a href={arrFilmDetail.trailer} target="_blank">
                <img
                  src={arrFilmDetail.hinhAnh}
                  alt=""
                  className="lg:h-72 lg:w-52 md:h-52 md:w-44 h-28 w-20"
                />
              </a>
            </div>
          </div>
          <div className="flex-1">
            <h1>{arrFilmDetail.tenPhim}</h1>
            <h3>
              {" "}
              Ngày khởi chiếu:{" "}
              {moment(arrFilmDetail.ngayKhoiChieu).format("DD-MM-YYYY")}
            </h3>
            <button className="w-26">
              {" "}
              <a href="#tabPhim">MUA VÉ NGAY</a>
            </button>
          </div>
          <div>
            <div
              className={`flex-none w-36 c100 p${
                arrFilmDetail.danhGia * 10
              } small md:medium`}
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
        </div>
        <div className="md:w-1/2 w-11/12 mx-auto my-20">
          <h1
            style={{
              textAlign: "center",
              fontWeight: "700",
              fontSize: "22px",
            }}
          >
            THÔNG TIN
          </h1>
          <div className="flex">
            <div className="flex-none w-14 md:mr-20 mr-0" style={{}}>
              <h2>Nội dung:</h2>
            </div>
            <div
              className="flex-auto"
              style={{
                lineHeight: "25px",
                textAlign: "justify",
                color: "white",
              }}
            >
              {arrFilmDetail.moTa}
            </div>
          </div>
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
                      <h1 className="lg:text-base text-xs">
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
        background: `url(${hinh1})`,
        backgroundPosition: "center",
        backgroundSize: "contain",
        height: "100%",
        width: "100%",
      }}
    >
      <CustomCard
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
    </section>
  );
}

export default FilmDetail;
