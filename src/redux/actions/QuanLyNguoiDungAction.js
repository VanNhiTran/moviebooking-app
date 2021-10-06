import { history } from "../../App";
import { quanLyNguoiDungService } from "../../services/QuanLyNguoiDungService";
import {
  LOGIN_ACTION,
  RENDER_USER_INFO,
  RENDER_USER_LIST,
  SET_BOOKING_HISTORY,
} from "./types/QuanLyNguoiDungTypes";

export const LoginAction = (loginInfo) => {
  return async (dispatch) => {
    try {
      const res = await quanLyNguoiDungService.login(loginInfo);
      dispatch({
        type: LOGIN_ACTION,
        loginInfo: res.data,
      });
      history.goBack();
    } catch (error) {
      console.log(error);
    }
  };
};

export const getFullUserInfoAction = (taiKhoan) => {
  return async (dispatch) => {
    try {
      const res = await quanLyNguoiDungService.getFullUserInfo(taiKhoan);
      dispatch({
        type: SET_BOOKING_HISTORY,
        fullUserInfo: res.data,
      });
      console.log(`res.data`, res.data);
    } catch (error) {
      console.log(`error`, error);
    }
  };
};
export const getUserListAction = (taiKhoan = "") => {
  return async (dispatch) => {
    try {
      const res = await quanLyNguoiDungService.getUserList(taiKhoan);
      dispatch({
        type: RENDER_USER_LIST,
        userList: res.data,
      });
    } catch (error) {
      console.log(`error`, error);
    }
  };
};

export const signUpAction = (user) => {
  return async (dispatch) => {
    try {
      const res = await quanLyNguoiDungService.signUp(user);
      alert("Bạn đã đăng kí tài khoản tại Meci thành công");
      history.push("/login");
    } catch (error) {
      console.log(`error`, error.response?.data);
    }
  };
};

export const addUserAction = (user) => {
  return async (dispatch) => {
    try {
      const res = await quanLyNguoiDungService.addUser(user);
      alert("Thêm người dùng thành công!!!");
    } catch (error) {
      console.log(`error`, error.response?.data);
    }
  };
};

export const getUserInfoAction = (taiKhoan) => {
  return async (dispatch) => {
    try {
      const res = await quanLyNguoiDungService.getUserInfo(taiKhoan);
      dispatch({
        type: RENDER_USER_INFO,
        userInfo: res.data[0],
      });

      console.log(`res1`, res.data);
    } catch (error) {
      console.log(`error`, error.response?.data);
    }
  };
};

export const updateUserAction = (user) => {
  return async (dispatch) => {
    try {
      const res = await quanLyNguoiDungService.updateUser(user);
      alert("Cập nhật người dùng thành công!!!");
    } catch (error) {
      console.log(`error`, error.response?.data);
    }
  };
};

export const deleteUserAction = (taiKhoan) => {
  return async (dispatch) => {
    try {
      const res = await quanLyNguoiDungService.deleteUser(taiKhoan);
    } catch (error) {
      console.log(`error`, error.response?.data);
    }
  };
};
