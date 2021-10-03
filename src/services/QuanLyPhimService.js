import { GROUPID } from "../util/settings/config";
import BaseService from "./baseService";

export default class QuanLyPhimService extends BaseService {
  constructor() {
    super();
  }
  getMovieList(tenPhim = "") {
    if (tenPhim.trim() != "") {
      return this.get(
        `api/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUPID}&tenPhim=${tenPhim}`
      );
    }
    return this.get(`api/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUPID}`);
  }
  addFilm(formData) {
    return this.post(`api/QuanLyPhim/ThemPhimUploadHinh`, formData);
  }
  getFilmInfo(id) {
    return this.get(`api/QuanLyPhim/LayThongTinPhim?MaPhim=${id}`);
  }
  updateFilm(formData) {
    return this.post(`api/QuanLyPhim/CapNhatPhimUpload`, formData);
  }
  deleteFilm(id) {
    return this.delete(`api/QuanLyPhim/XoaPhim?MaPhim=${id}`);
  }
}
export const quanLyPhimService = new QuanLyPhimService();
