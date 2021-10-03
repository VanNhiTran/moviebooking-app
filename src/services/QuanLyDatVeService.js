import BaseService from "./baseService";

export class QuanLyDatVeService extends BaseService {
  constructor() {
    super();
  }
  getCinemaRoomDetail = (id) => {
    return this.get(`api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${id}`);
  };
  bookTicketInfo = (info) => {
    return this.post(`api/QuanLyDatVe/DatVe`, info);
  };
  addShowtimes = (values) => {
    return this.post(`api/QuanLyDatVe/TaoLichChieu`, values);
  };
}
export const quanLyDatVeService = new QuanLyDatVeService();
