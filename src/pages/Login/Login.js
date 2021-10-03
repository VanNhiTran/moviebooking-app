import React from "react";
// import "./Login.css";
import BGimg from "../../assets/img/BG.png";
import logo from "../../assets/img/logo.png";
import { NavLink } from "react-router-dom";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { LoginAction } from "../../redux/actions/QuanLyNguoiDungAction";
import { useSelector } from "react-redux";

export default function Login() {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
    },
    onSubmit: (values) => {
      dispatch(LoginAction(values));
    },
  });
  const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);
  console.log("user", userLogin);

  return (
    <section
      style={{
        backgroundImage: `url(${BGimg})`,
        height: "",
        backgroundSize: "cover",
        backgroundPosition: "center",
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
      <div className="heading text text-center">
        <h2
          style={{
            fontSize: "3em",
            fontWeight: "600",
            color: "rgba(255, 255, 255, 0.7)",
            display: "inline-block",
            padding: "30px 0 0",
            textShadow: "1px 1px 3px #23203b",
          }}
        >
          ĐĂNG NHẬP
        </h2>
      </div>
      <div className="min-h-screen flex justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              formik.handleSubmit(e);
            }}
            className="mt-8 space-y-6"
            action="#"
            method="POST"
          >
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  taiKhoan
                </label>
                <input
                  id="taiKhoanh"
                  name="taiKhoan"
                  onChange={formik.handleChange}
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email hoặc số điện thoại"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="matKhau"
                  onChange={formik.handleChange}
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Mật khẩu"
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center text-indigo-600">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-white-900"
                >
                  Ghi nhớ đăng nhập
                </label>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  {/* Heroicon name: solid/lock-closed */}
                  {/* <svg
                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg> */}
                </span>
                Đăng nhập
              </button>
            </div>
            <div className="text-sm text text-center">
              <p className="font-medium text-indigo-600 ">
                Bạn chưa có tài khoản tại Merci?
                <NavLink to="/signup" className="font-medium text-indigo-600">
                  Đăng kí
                </NavLink>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
