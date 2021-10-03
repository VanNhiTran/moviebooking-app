import _ from "lodash";
import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import logo from "../../../../assets/img/logo.png";
import {
  HomeOutlined,
  HomeTwoTone,
  DownOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { TOKEN, USER_LOGIN } from "../../../../util/settings/config";
import { Dropdown, Menu } from "antd";

export default function Header(props) {
  const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);

  const menu = (
    <Menu>
      <Menu.Item key="1">
        {_.isEmpty(userLogin) ? (
          <button>
            <NavLink to="/login">
              <UserOutlined />
              Đăng nhập
            </NavLink>
          </button>
        ) : (
          ""
        )}
      </Menu.Item>
      <Menu.Item key="2">
        {_.isEmpty(userLogin) ? (
          <button>
            <NavLink to="/signup">
              <UserOutlined />
              Đăng kí
            </NavLink>
          </button>
        ) : (
          <button
            onClick={() => {
              localStorage.removeItem(USER_LOGIN);
              localStorage.removeItem(TOKEN);
              window.location.reload();
            }}
            style={{ alignItems: "center" }}
            className={_.isEmpty(userLogin) ? "hidden" : ""}
          >
            <NavLink to="/">
              <UserOutlined />
              Đăng xuất
            </NavLink>
          </button>
        )}
      </Menu.Item>
    </Menu>
  );

  const renderBtnLogin = () => {
    if (_.isEmpty(userLogin)) {
      return (
        <Fragment>
          <button className="self-center px-8 py-3 rounded">
            <NavLink to="/login">Login</NavLink>
          </button>

          <button className="self-center px-8 py-3 font-semibold rounded dark:bg-violet-400 dark:text-coolGray-900">
            <NavLink to="/signup">Sign up </NavLink>
          </button>
        </Fragment>
      );
    }
    return (
      <Fragment>
        <button className="self-center px-8 py-3 rounded">
          Hi {userLogin.taiKhoan}!
        </button>
        <button
          onClick={() => {
            localStorage.removeItem(USER_LOGIN);
            localStorage.removeItem(TOKEN);
            window.location.reload();
          }}
          style={{ alignItems: "center" }}
          className="self-center px-8 py-3 rounded"
        >
          <NavLink to="/">Đăng xuất</NavLink>
        </button>
      </Fragment>
    );
  };
  return (
    <header
      className="p-4 text-coolGray-100 fixed w-full z-10"
      style={{ backgroundColor: "rgba(255,255,255,.6)" }}
    >
      <div className="container flex justify-between h-16 mx-auto">
        <NavLink
          to="/"
          aria-label="Back to homepage"
          className="flex items-center p-2"
        >
          <img src={logo} className="w-32 h-30" alt="" />
        </NavLink>
        <ul className="items-stretch hidden space-x-3 md:flex">
          <li className="flex">
            <NavLink
              to="/home"
              className="flex items-center -mb-0.5  px-4 dark:border-transparent dark:text-violet-400 dark:border-violet-400 text-white"
              activeClassName="border-b-2"
            >
              <HomeTwoTone
                style={{ fontSize: "20px" }}
                twoToneColor="rgb(177, 45, 45)"
              />
            </NavLink>
          </li>
          <li className="flex">
            <a
              href="#contact"
              className="flex items-center -mb-0.5 px-4 dark:border-transparent text-white"
              activeClassName="border-b-2"
            >
              Liên hệ
            </a>
          </li>
          <li className="flex">
            <a
              href="#news"
              className="flex items-center -mb-0.5  px-4 dark:border-transparent text-white"
              activeClassName="border-b-2"
            >
              Tin tức
            </a>
          </li>
        </ul>
        <div className="items-center flex-shrink-0 hidden md:flex">
          {renderBtnLogin()}

          {/* <button className="p-4 lg:hidden">
             {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6 dark:text-coolGray-100"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg> 
          </button> */}
        </div>
        <div className="items-center flex-shrink-0 md:hidden sm:flex">
          <Dropdown overlay={menu} icon={<UserOutlined />}>
            <button className="self-center px-8 py-3 rounded">
              <UserOutlined style={{ fontSize: "20px", marginRight: "5px" }} />{" "}
              <DownOutlined />
            </button>
          </Dropdown>
        </div>
      </div>
    </header>
  );
}
