import React, { Fragment, useEffect } from "react";
import { Table } from "antd";
import "./Film.css";
import { Input } from "antd";
import { EditFilled, DeleteFilled, CalendarFilled } from "@ant-design/icons";

import { useDispatch, useSelector } from "react-redux";
import {
  deleteFilmAction,
  getMovieListAction,
} from "../../../redux/actions/QuanLyPhimAction";
import { NavLink } from "react-router-dom";
const { Search } = Input;

function Film() {
  const { arrFilmDefault } = useSelector((state) => state.QuanLyPhimReducer);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMovieListAction());
  }, []);
  const columns = [
    {
      title: "Mã phim",
      dataIndex: "maPhim",
      sorter: (a, b) => a.maPhim - b.maPhim,
      sortDirections: ["descend"],
      width: "100px",
    },
    {
      title: "Tên phim",
      dataIndex: "tenPhim",
      sorter: (a, b) => {
        if (a.tenPhim.toLowerCase().trim() > b.tenPhim.toLowerCase().trim()) {
          return 1;
        }
        return -1;
      },
      sortDirections: ["descend", "ascend"],
      width: "250px",
    },
    {
      title: "Hình ảnh",
      dataIndex: "hinhAnh",
      render: (text, film, index) => {
        return (
          <Fragment key={index}>
            <img
              src={film.hinhAnh}
              alt=""
              width={50}
              height={50}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `https://picsum.photos/seed/picsum/50/50`;
              }}
            />
          </Fragment>
        );
      },
      width: "100px",
    },
    {
      title: "Mô tả",
      dataIndex: "moTa",
      render: (text, film) => {
        return (
          <Fragment>
            {film.moTa.length > 50
              ? film.moTa.substr(0, 50) + "..."
              : film.moTa}
          </Fragment>
        );
      },
      width: "400px",
    },
    {
      title: "Option",
      dataIndex: "option",
      render: (text, film) => {
        return (
          <div className="flex">
            <NavLink key={1} to={`/admin/film/editfilm/${film.maPhim}`}>
              <EditFilled
                className=" ml-5"
                style={{ color: "rgb(177, 45, 45)", fontSize: "25px" }}
              />
            </NavLink>
            <div
              style={{ cursor: "pointer" }}
              key={2}
              onClick={() => {
                if (window.confirm("Bạn có muốn xoá phim?")) {
                  dispatch(deleteFilmAction(film.maPhim));
                  window.location.reload();
                }
              }}
            >
              <DeleteFilled
                className="mx-7"
                style={{ color: "rgb(177, 45, 45)", fontSize: "25px" }}
              />
            </div>
            <NavLink
              to={`/admin/film/showtime/${film.maPhim}`}
              style={{ cursor: "pointer" }}
              key={3}
            >
              <CalendarFilled
                style={{ color: "rgb(177, 45, 45)", fontSize: "25px" }}
              />
            </NavLink>
          </div>
        );
      },
    },
  ];

  const data = arrFilmDefault;

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  const onSearch = (value) => {
    console.log(`value`, value);
    dispatch(getMovieListAction(value));
  };

  return (
    <div className="m-8">
      <h1
        style={{
          fontSize: "30px",
          fontWeight: 600,
          textAlign: "center",
          color: "white",
        }}
      >
        QUẢN LÝ PHIM
      </h1>
      <button className="mb-7 self-center px-8 py-3 rounded">
        <NavLink to="/admin/film/addfilm">Thêm phim mới</NavLink>
      </button>
      <Search
        className="mb-7"
        placeholder="Nhập mã phim, tên phim, từ khoá phim muốn tìm"
        allowClear
        enterButton
        size="large"
        onSearch={onSearch}
      />
      <Table columns={columns} dataSource={data} onChange={onChange} />
    </div>
  );
}

export default Film;
