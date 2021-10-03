import {
  RENDER_CINEMA_LOGO,
  RENDER_CINEMA_SYSTEM_LIST,
  RENDER_FILM_DETAIL,
  RENDER_MOVIE_SHOWTIMES,
} from "../actions/types/QuanLyRapTypes";

const stateDefault = {
  arrCinemaSystemList: [],
  arrCinemaInfo: [],
  arrFilmDetail: [],
};
export const QuanLyRapReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case RENDER_CINEMA_SYSTEM_LIST: {
      state.arrCinemaSystemList = action.arrCinemaSystemList;
      return { ...state };
    }

    case RENDER_CINEMA_LOGO: {
      state.arrCinemaInfo = action.arrCinemaInfo;
      return { ...state };
    }

    case RENDER_FILM_DETAIL: {
      state.arrFilmDetail = action.arrFilmDetail;
      return { ...state };
    }

    default:
      return { ...state };
  }
};
