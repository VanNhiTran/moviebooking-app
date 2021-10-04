import { GROUPID } from "../util/settings/config";
import BaseService from "./baseService";

export class QuanLyNguoiDungService extends BaseService {
  constructor() {
    super();
  }
  login = (loginInfo) => {
    return this.post(`api/QuanLyNguoiDung/DangNhap`, loginInfo);
  };
  getUserList = () => {
    return this.get(
      `api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUPID}`
    );
  };
  signUp = (user) => {
    return this.post(`api/QuanLyNguoiDung/DangKy`, user);
  };
  addUser = (user) => {
    return this.post(`api/QuanLyNguoiDung/ThemNguoiDung`, user);
  };
  getUserInfo = (taiKhoan) => {
    return this.get(
      `api/QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=${GROUPID}&tuKhoa=${taiKhoan}`
    );
  };
  updateUser = (user) => {
    return this.put(`api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`, user);
  };
  deleteUser = (taiKhoan) => {
    return this.delete(`api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`);
  };
  getFullUserInfo = (taiKhoan) => {
    return this.post(`api/QuanLyNguoiDung/ThongTinTaiKhoan`, taiKhoan);
  };
}

export const quanLyNguoiDungService = new QuanLyNguoiDungService();
