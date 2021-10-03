import { history } from "../../App";
import { quanLyDatVeService } from "../../services/QuanLyDatVeService";
import {
  BOOK_TICKET,
  RENDER_CINEMAROOM_DETAIL,
} from "./types/QuanLyDatVeTypes";

export const getCinemaRoomDetailAction = (id) => {
  return async (dispatch) => {
    try {
      const res = await quanLyDatVeService.getCinemaRoomDetail(id);
      dispatch({
        type: RENDER_CINEMAROOM_DETAIL,
        cinemaRoomDetail: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const bookTicketInfoAction = (info) => {
  return async (dispatch) => {
    try {
      const res = await quanLyDatVeService.bookTicketInfo(info);
      dispatch({
        type: BOOK_TICKET,
        ticketInfo: res.data,
      });
      alert("Bạn đã đặt vé thành công!");
      history.push("/");
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
};

// export const creatShowtimesAction = (info) => {
//   return async (dispatch) => {
//     try {
//       const res = await quanLyDatVeService.createShowtimes(info);
//       alert("Tạo lịch chiếu thành công!!!");
//       console.log(res.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };
// };
