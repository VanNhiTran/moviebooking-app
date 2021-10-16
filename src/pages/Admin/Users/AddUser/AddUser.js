import React from "react";
import { Form, Input } from "antd";

import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { Select } from "antd";
import { addUserAction } from "../../../../redux/actions/QuanLyNguoiDungAction";
import { GROUPID } from "../../../../util/settings/config";
import { useSelector } from "react-redux";
import "./adduser.css";

const { Option } = Select;

function AddUser() {
  //   const { userInfo } = useSelector((state) => state.QuanLyNguoiDungReducer);
  //   console.log(`userInfo`, userInfo)

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDt: "",
      maNhom: GROUPID,
      maLoaiNguoiDung: "",
      hoTen: "",
    },
    onSubmit: (user) => {
      console.log(`user`, user);
      dispatch(addUserAction(user));
    },
  });

  const handleChangeSelect = (value) => {
    console.log(`selected ${value}`);
    formik.setFieldValue("maLoaiNguoiDung", value);
  };

  return (
    <Form
      className="text-white"
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 14,
      }}
      layout="horizontal"
      onSubmitCapture={formik.handleSubmit}
    >
      <h1
        style={{
          fontSize: "30px",
          fontWeight: 600,
          textAlign: "center",
          color: "white",
        }}
      >
        THÊM NGƯỜI DÙNG
      </h1>
      <Form.Item label="Tài khoản">
        <Input name="taiKhoan" onChange={formik.handleChange} />
      </Form.Item>
      <Form.Item label="Mật khẩu">
        <Input name="matKhau" onChange={formik.handleChange} />
      </Form.Item>
      <Form.Item label="Họ và tên">
        <Input name="hoTen" onChange={formik.handleChange} />
      </Form.Item>
      <Form.Item label="Email">
        <Input name="email" type="email" onChange={formik.handleChange} />
      </Form.Item>
      <Form.Item label="Số ĐT">
        <Input name="soDt" onChange={formik.handleChange} />
      </Form.Item>

      <Form.Item label="Mã loại người dùng">
        <Select style={{ width: 120 }} onChange={handleChangeSelect}>
          <Option value="QuanTri">Quản trị</Option>
          <Option value="KhachHang">Khách hàng</Option>
        </Select>
      </Form.Item>

      <Form.Item
        style={{
          justifyContent: "space-around",
          width: "300px",
          margin: "auto",
        }}
      >
        <button type="submit">Thêm người dùng</button>
      </Form.Item>
    </Form>
  );
}

export default AddUser;
