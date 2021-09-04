import { QuanLyPhimService } from "../../services/QuanLyPhimService";
import { RENDER_FILM_CARD } from "./types/QuanLyPhimTypes";

export const getMovieListAction = () => {
  return async (dispatch) => {
    try {
      const res = await QuanLyPhimService.getMovieList();
      dispatch({
        type: RENDER_FILM_CARD,
        arrMovieList: res.data.content,
      });
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };
};
