import { Tabs } from "antd";
import { RightOutlined } from "@ant-design/icons";

import React from "react";
import { NavLink } from "react-router-dom";
import moment from "moment";
const { TabPane } = Tabs;

export default function HomeMenu(props) {
  const { arrCinemaSystemList } = props;
  const renderCinema = () => {
    return arrCinemaSystemList.map((cinemaSystem, index) => {
      return (
        <TabPane
          tab={
            <img
              src={cinemaSystem.logo}
              className="rounded-full w-8 sm:w-12 "
            />
          }
          key={index}
        >
          <Tabs tabPosition="left">
            {cinemaSystem.lstCumRap.map((cumRap, index) => {
              return (
                <TabPane
                  tab={
                    <div
                      className="lg:w-44 sm:w-24 w-16"
                      style={{
                        display: "flex flex-wrap",
                        alignItems: "center",
                        textAlign: "left",
                        // maxWidth: "200px",
                        whiteSpace: "normal",
                      }}
                    >
                      <img
                        className="rounded-full sm:w-8 w-4  mr-4"
                        src={cinemaSystem.logo}
                      />
                      <div>
                        <h2
                          className="text-xs sm:text-base"
                          style={{ color: "white" }}
                        >
                          {cumRap.tenCumRap}
                        </h2>
                        <p
                          className="text-xs sm:text-base"
                          style={{
                            whiteSpace: "normal",
                            display: "flex flex-wrap",
                            color: "wheat",
                          }}
                        >
                          {cumRap.diaChi}
                        </p>
                      </div>
                    </div>
                  }
                  key={index}
                >
                  {cumRap.danhSachPhim.slice(0, 15).map((film, index) => {
                    return (
                      <div
                        className="tabGioChieu mb-14"
                        key={index}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <div>
                          <img
                            className="w-12 sm:h-24 sm:w-20 h-14 -ml-3 sm:ml-5"
                            src={film.hinhAnh}
                            style={
                              {
                                // width: "80px",
                                // height: "100px",
                                // margin: "0 5px",
                              }
                            }
                          />
                        </div>
                        <div className="">
                          <NavLink to={`/detail/${film.maPhim}`}>
                            <h3 style={{ color: "wheat" }}>
                              {film.tenPhim}
                              <span style={{ textDecorationLine: "underline" }}>
                                <RightOutlined className="text-xs px-2" />
                                chi tiết phim
                              </span>
                            </h3>
                          </NavLink>

                          <div className=" grid lg:grid-cols-8 md:grid-cols-6 sm:grid-cols-3 grid-cols-2 gap-3 sm:gap-5">
                            {film.lstLichChieuTheoPhim.map(
                              (schedule, index) => {
                                return (
                                  <NavLink
                                    style={{ color: "white" }}
                                    to={`/checkout/${schedule.maLichChieu}`}
                                    key={index}
                                  >
                                    {moment(schedule.ngayChieuGioChieu).format(
                                      "HH:mm"
                                    )}
                                  </NavLink>
                                );
                              }
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </TabPane>
              );
            })}
          </Tabs>
        </TabPane>
      );
    });
  };
  return (
    <div
      className="xl:w-9/12 lg:w-11/12 w-full mx-2 lg:mx-32 mt-16"
      style={{ margin: " 40px auto" }}
    >
      <Tabs tabPosition="left">{renderCinema()}</Tabs>
    </div>
  );
}
