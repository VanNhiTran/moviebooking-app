import React, { Fragment, useEffect } from "react";
import { Table } from "antd";
// import "./Film.css";
import { Input } from "antd";
import { EditFilled, DeleteFilled } from "@ant-design/icons";

import { useDispatch, useSelector } from "react-redux";

import { NavLink } from "react-router-dom";
import {
  deleteUserAction,
  getUserListAction,
} from "../../../redux/actions/QuanLyNguoiDungAction";
const { Search } = Input;

function User() {
  const dispatch = useDispatch();

  const { userList } = useSelector((state) => state.QuanLyNguoiDungReducer);
  console.log(`userList`, userList);
  useEffect(() => {
    dispatch(getUserListAction());
  }, []);

  const columns = [
    {
      title: "Tài khoản",
      dataIndex: "taiKhoan",
      sorter: (a, b) => {
        if (a.taiKhoan.toLowerCase().trim() > b.taiKhoan.toLowerCase().trim()) {
          return 1;
        }
        return -1;
      },
      sortDirections: ["descend", "ascend"],
      width: "15%",
    },
    {
      title: "Họ tên",
      dataIndex: "hoTen",
      sorter: (a, b) => {
        if (a.hoTen.toLowerCase().trim() > b.hoTen.toLowerCase().trim()) {
          return 1;
        }
        return -1;
      },
      sortDirections: ["descend", "ascend"],
      width: "20%",
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: (a, b) => {
        if (a.email.toLowerCase().trim() > b.email.toLowerCase().trim()) {
          return 1;
        }
        return -1;
      },
      sortDirections: ["descend", "ascend"],
      width: "20%",
    },
    {
      title: "Số điện thoại",
      dataIndex: "soDt",
      width: "15%",
    },
    {
      title: "Loại người dùng",
      dataIndex: "maLoaiNguoiDung",
      sorter: (a, b) => {
        if (
          a.maLoaiNguoiDung.toLowerCase().trim() >
          b.maLoaiNguoiDung.toLowerCase().trim()
        ) {
          return 1;
        }
        return -1;
      },
      sortDirections: ["descend", "ascend"],
      width: "15%",
    },
    {
      title: "Option",
      dataIndex: "option",
      render: (text, user) => {
        return (
          <div className="flex">
            <NavLink key={1} to={`/admin/user/edit/${user.taiKhoan}`}>
              <EditFilled
                className=" ml-5"
                style={{ color: "rgb(177, 45, 45)", fontSize: "25px" }}
              />
            </NavLink>
            <div
              style={{ cursor: "pointer" }}
              key={2}
              onClick={() => {
                if (
                  window.confirm("Bạn có muốn xoá tài khoản người dùng này?")
                ) {
                  dispatch(deleteUserAction(user.taiKhoan));
                }
              }}
            >
              <DeleteFilled
                className="ml-10"
                style={{ color: "rgb(177, 45, 45)", fontSize: "25px" }}
              />
            </div>
          </div>
        );
      },
    },
  ];

  const data = userList;

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  const onSearch = (value) => {
    console.log(`value`, value);
    dispatch(getUserListAction(value));
  };

  return (
    <div className="m-8">
      <h1 style={{ fontSize: "30px", fontWeight: 600, textAlign: "center" }}>
        QUẢN LÝ NGƯỜI DÙNG
      </h1>
      <button className="mb-7">
        <NavLink to="/admin/film/addfilm">Thêm người dùng</NavLink>
      </button>
      <Search
        placeholder="Nhập tên người dùng muốn tìm"
        allowClear
        enterButton
        size="large"
        onSearch={onSearch}
      />
      <Table columns={columns} dataSource={data} onChange={onChange} />
    </div>
  );
}

export default User;
