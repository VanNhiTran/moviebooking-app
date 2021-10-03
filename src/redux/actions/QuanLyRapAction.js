import { quanLyRapService } from "../../services/QuanLyRapService";
import {
  RENDER_CINEMA_LOGO,
  RENDER_CINEMA_SYSTEM_LIST,
  RENDER_FILM_DETAIL,
} from "./types/QuanLyRapTypes";

export const getCinemaSystemListAction = () => {
  return async (dispatch) => {
    try {
      const res = await quanLyRapService.getCinemaSystemList();
      dispatch({
        type: RENDER_CINEMA_SYSTEM_LIST,
        arrCinemaSystemList: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getCinameInfoAction = () => {
  return async (dispatch) => {
    try {
      const res = await quanLyRapService.getCinemaInfo();
      dispatch({
        type: RENDER_CINEMA_LOGO,
        arrCinemaInfo: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
export const getFilmDetailAction = (id) => {
  return async (dispatch) => {
    try {
      const res = await quanLyRapService.getFilmDetail(id);
      dispatch({
        type: RENDER_FILM_DETAIL,
        arrFilmDetail: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
};
