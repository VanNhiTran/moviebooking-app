import { GROUPID } from "../util/settings/config";
import BaseService from "./baseService";

export default class QuanLyRapService extends BaseService {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
  }
  getCinemaSystemList() {
    return this.get(
      `api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=${GROUPID}`
    );
  }
  getCinemaInfo() {
    return this.get(`api/QuanLyRap/LayThongTinHeThongRap`);
  }
  getFilmDetail = (id) => {
    return this.get(`api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${id}`);
  };
  getCinemaSystemInfo = (maHeThongRap) => {
    return this.get(
      `api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThongRap}`
    );
  };
}

export const quanLyRapService = new QuanLyRapService();
