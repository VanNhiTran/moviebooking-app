import React from "react";
import logo from "../../assets/img/logo.png";
import { Form, Input } from "antd";
import "./SignUp.css";
import BGimg from "../../assets/img/BG.png";
import { useFormik } from "formik";
import { GROUPID } from "../../util/settings/config";
import { useDispatch } from "react-redux";
import { signUpAction } from "../../redux/actions/QuanLyNguoiDungAction";
import { NavLink } from "react-router-dom";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

function SignUp() {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDt: "",
      maNhom: GROUPID,
      maLoaiNguoiDung: "KhachHang",
      hoTen: "",
    },
    onSubmit: (user) => {
      console.log(`user`, user);
      dispatch(signUpAction(user));
    },
  });
  return (
    <section
      style={{
        backgroundImage: `url(${BGimg})`,
        height: "800px",
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "white",
        textAlign: "center",
      }}
    >
      <div className="pt-6 pl-6">
        <NavLink to="/">
          <img
            className="img_logo"
            src={logo}
            alt=""
            height={200}
            width={150}
          />
        </NavLink>
      </div>
      <h1
        style={{
          paddingBottom: "20px",
          fontSize: "3em",
          fontWeight: "600",
          color: "rgba(255, 255, 255, 0.7)",
          display: "inline-block",
          padding: "30px 0 0",
          textShadow: "1px 1px 3px #23203b",
        }}
      >
        Đăng ký
      </h1>
      <div className="px-12 lg:px-8 mb-64 w-full ">
        <Form
          className="mt-8 px-12"
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 12 }}
          onSubmitCapture={formik.handleSubmit}
        >
          <Form.Item label="Tài khoản">
            <Input name="taiKhoan" onChange={formik.handleChange} />
          </Form.Item>
          <Form.Item label="Mật khẩu">
            <Input.Password
              name="matKhau"
              onChange={formik.handleChange}
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>

          {/* <Form.Item label="Mật khẩu">
            <Input name="matKhau" onChange={formik.handleChange} />
          </Form.Item> */}
          <Form.Item label="Họ và tên">
            <Input name="hoTen" onChange={formik.handleChange} />
          </Form.Item>
          <Form.Item label="Email">
            <Input name="email" type="email" onChange={formik.handleChange} />
          </Form.Item>
          <Form.Item label="Số ĐT">
            <Input name="soDt" onChange={formik.handleChange} />
          </Form.Item>

          <button
            type="submit"
            htmlType="submit"
            className=" w-40 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 m-auto"
          >
            <NavLink to="/">
              <span className="absolute left-0 inset-y-0 flex items-center pl-3"></span>
              Đăng kí tài khoản
            </NavLink>
          </button>
        </Form>
      </div>
    </section>
  );
}

export default SignUp;
