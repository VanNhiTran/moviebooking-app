import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router";
import { TOKEN, USER_LOGIN } from "../../util/settings/config";
import { Layout, Menu, Breadcrumb } from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import _ from "lodash";
import { history } from "../../App";
import logo from "../../assets/img/logo.png";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const AdminTemplate = (props) => {
  const { Component, ...restProps } = props;
  const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);

  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  if (!localStorage.getItem(USER_LOGIN)) {
    alert("Bạn không có quyền truy cập vào trang này !");
    return <Redirect to="/" />;
  }

  if (userLogin.maLoaiNguoiDung !== "QuanTri") {
    alert("Bạn không có quyền truy cập vào trang này !");
    return <Redirect to="/" />;
  }

  const operations = (
    <Fragment>
      {!_.isEmpty(userLogin) ? (
        <Fragment>
          <button className="flex " style={{ alignItems: "center" }}>
            <div
              style={{
                width: 50,
                height: 50,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              className="text-l rounded-full bg-red-200 mr-3"
            >
              {userLogin.taiKhoan.substr(0, 1)}
            </div>
            <span>Hello ! {userLogin.taiKhoan}</span>
          </button>
          <button
            onClick={() => {
              localStorage.removeItem(USER_LOGIN);
              localStorage.removeItem(TOKEN);
              history.push("/home");
              window.location.reload();
            }}
            style={{ alignItems: "center" }}
            className="text-blue-800 mx-5"
          >
            Đăng xuất
          </button>{" "}
        </Fragment>
      ) : (
        ""
      )}
    </Fragment>
  );

  return (
    <Route
      {...restProps}
      render={(propsRoute) => {
        return (
          <Fragment>
            <Layout style={{ minHeight: "100vh" }}>
              <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
                <NavLink to="/" className="logo p-5">
                  <img src={logo} alt="..." />
                </NavLink>
                <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
                  <SubMenu key="1" icon={<UserOutlined />} title="Users">
                    <Menu.Item>
                      <NavLink to="/admin/user">Users</NavLink>
                    </Menu.Item>
                    <Menu.Item>
                      <NavLink to="/admin/user/adduser">Add User</NavLink>
                    </Menu.Item>
                  </SubMenu>
                  <SubMenu
                    key="sub1"
                    title={<i className="fa fa-film"> Films</i>}
                  >
                    <Menu.Item key="2">
                      <NavLink to="/admin/film">
                        <i className="fa fa-film pr-3" /> Films
                      </NavLink>
                    </Menu.Item>
                    <Menu.Item key="3" icon={<FileOutlined />}>
                      <NavLink to="/admin/film/addfilm">Add Film</NavLink>
                    </Menu.Item>
                    <Menu.Item key="4" icon={<DesktopOutlined />}>
                      <NavLink to="/admin/showtimes">Showtime</NavLink>
                    </Menu.Item>
                  </SubMenu>
                </Menu>
              </Sider>
              <Layout className="site-layout">
                <Header
                  className="site-layout-background"
                  style={{
                    padding: 0,
                    height: "fit-content",
                  }}
                >
                  <div
                    className="flex py-1"
                    style={{ justifyContent: "right" }}
                  >
                    {operations}
                  </div>
                </Header>
                <Content style={{ margin: "0 16px" }}>
                  <Breadcrumb style={{ margin: "16px 0" }}></Breadcrumb>
                  <div
                    className="site-layout-background"
                    style={{ padding: 24, minHeight: "85vh" }}
                  >
                    <Component {...propsRoute} />
                  </div>
                </Content>
                <Footer style={{ textAlign: "center" }}></Footer>
              </Layout>
            </Layout>
          </Fragment>
        );
      }}
    />
  );
};

export default AdminTemplate;
