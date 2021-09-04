import { baseService } from "./baseService";

export class QuanLyPhimService extends baseService {
  constructor() {
    super();
  }
  getMovieList = () => {
    return this.get(`api/QuanLyPhim/LayDanhSachPhim?maNhom=GP01`);
  };
}
