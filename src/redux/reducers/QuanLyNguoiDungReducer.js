import { TOKEN, USER_LOGIN } from "../../util/settings/config";
import {
  LOGIN_ACTION,
  RENDER_USER_INFO,
  RENDER_USER_LIST,
} from "../actions/types/QuanLyNguoiDungTypes";

let user = {};
if (localStorage.getItem(USER_LOGIN)) {
  user = JSON.parse(localStorage.getItem(USER_LOGIN));
}

const stateDefault = {
  userLogin: user,
  userList: [],
  userInfo: [],
};

export const QuanLyNguoiDungReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case LOGIN_ACTION: {
      const { loginInfo } = action;
      localStorage.setItem(USER_LOGIN, JSON.stringify(loginInfo));
      localStorage.setItem(TOKEN, loginInfo.accessToken);
      return { ...state, userLogin: loginInfo };
    }
    case RENDER_USER_LIST: {
      state.userList = action.userList;
      return { ...state };
    }
    case RENDER_USER_INFO:
      state.userInfo = action.userInfo;
      return { ...state };
    default:
      return { ...state };
  }
};
