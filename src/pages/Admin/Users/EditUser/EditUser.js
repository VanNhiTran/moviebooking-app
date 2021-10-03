import React, { useEffect } from "react";
import { Form, Input } from "antd";

import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Select } from "antd";
import {
  getUserInfoAction,
  updateUserAction,
} from "../../../../redux/actions/QuanLyNguoiDungAction";
import { GROUPID } from "../../../../util/settings/config";

const { Option } = Select;

function EditUser(props) {
  const { userInfo } = useSelector((state) => state.QuanLyNguoiDungReducer);
  console.log(`userInfo`, userInfo);

  const dispatch = useDispatch();

  useEffect(() => {
    let { id } = props.match.params;
    dispatch(getUserInfoAction(id));
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      taiKhoan: userInfo.taiKhoan,
      matKhau: userInfo.matKhau,
      email: userInfo.email,
      soDt: userInfo.soDt,
      maNhom: GROUPID,
      maLoaiNguoiDung: userInfo.maLoaiNguoiDung,
      hoTen: userInfo.hoTen,
    },
    onSubmit: (values) => {
      console.log(`user`, values);
      dispatch(updateUserAction(values));
    },
  });

  const handleChangeSelect = (value) => {
    console.log(`selected ${value}`);
    formik.setFieldValue("maLoaiNguoiDung", value);
  };

  return (
    <Form
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 14,
      }}
      layout="horizontal"
      onSubmitCapture={formik.handleSubmit}
    >
      <h1 style={{ fontSize: "30px", fontWeight: 600, textAlign: "center" }}>
        CẬP NHẬT NGƯỜI DÙNG
      </h1>
      <Form.Item label="Tài khoản">
        <Input
          name="taiKhoan"
          value={formik.values.taiKhoan}
          onChange={formik.handleChange}
        />
      </Form.Item>
      <Form.Item label="Mật khẩu">
        <Input
          name="matKhau"
          onChange={formik.handleChange}
          value={formik.values.matKhau}
        />
      </Form.Item>
      <Form.Item label="Họ và tên">
        <Input
          name="hoTen"
          onChange={formik.handleChange}
          value={formik.values.hoTen}
        />
      </Form.Item>
      <Form.Item label="Email">
        <Input
          name="email"
          type="email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
      </Form.Item>
      <Form.Item label="Số ĐT">
        <Input
          name="soDt"
          onChange={formik.handleChange}
          value={formik.values.soDt}
        />
      </Form.Item>

      <Form.Item label="Mã loại người dùng">
        <Select
          style={{ width: 120 }}
          onChange={handleChangeSelect}
          value={formik.values.maLoaiNguoiDung}
        >
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
        <button type="submit">Cập nhật</button>
      </Form.Item>
    </Form>
  );
}

export default EditUser;
