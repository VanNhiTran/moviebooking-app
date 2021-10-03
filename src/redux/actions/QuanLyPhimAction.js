import { quanLyPhimService } from "../../services/QuanLyPhimService";
import { RENDER_FILM_CARD, RENDER_FILM_INFO } from "./types/QuanLyPhimTypes";

export const getMovieListAction = (tenPhim = "") => {
  return async (dispatch) => {
    try {
      const res = await quanLyPhimService.getMovieList(tenPhim);
      dispatch({
        type: RENDER_FILM_CARD,
        arrFilm: res.data,
      });
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };
};

export const addFilmAction = (formData) => {
  return async (dispatch) => {
    try {
      const res = await quanLyPhimService.addFilm(formData);
      alert("Thêm phim thành công!!!");
      console.log(`res`, res.data);
    } catch (error) {
      console.log(error.response?.data);
    }
  };
};

export const getFilmInfoAction = (id) => {
  return async (dispatch) => {
    try {
      const res = await quanLyPhimService.getFilmInfo(id);
      dispatch({
        type: RENDER_FILM_INFO,
        filmInfo: res.data,
      });
    } catch (error) {
      console.log(error.response?.data);
    }
  };
};

export const updateFilmAction = (formData) => {
  return async (dispatch) => {
    try {
      const res = await quanLyPhimService.updateFilm(formData);
      alert("Cập nhật phim thành công");
      console.log(`res`, res.data);
    } catch (error) {
      console.log(error.response?.data);
    }
  };
};

export const deleteFilmAction = (id) => {
  return async (dispatch) => {
    try {
      const res = await quanLyPhimService.deleteFilm(id);
      alert("Xoá phim thành công!!!");
      dispatch(getFilmInfoAction());
    } catch (error) {
      console.log(`err`, error.response?.data);
    }
  };
};
