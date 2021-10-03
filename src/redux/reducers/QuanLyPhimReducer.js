import {
  RENDER_COMINGSOON_FILM,
  RENDER_FILM_CARD,
  RENDER_FILM_INFO,
  RENDER_NOWSHOWING_FILM,
} from "../actions/types/QuanLyPhimTypes";

const stateDefault = {
  arrFilm: [
    {
      maPhim: 5029,
      tenPhim: "Wonder Woman 1985",
      biDanh: "wonder-woman-1985",
      trailer: "https://youtu.be/XLJN4JfniH4",
      hinhAnh:
        "http://movie0706.cybersoft.edu.vn/hinhanh/wonder-woman-1985_gp01.jpg",
      moTa: "Lấy bối cảnh thời kỳ Chiến tranh Lạnh, Wonder Woman 1984 sẽ xoay quanh cuộc đối đầu giữa Nữ thần Chiến binh và Yêu nữ Báo đố",
      maNhom: "GP01",
      ngayKhoiChieu: "2021-09-05T22:17:47.713",
      danhGia: 10,
    },
  ],
  arrFilmDefault: [],
  filmInfo: {},
};
export const QuanLyPhimReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case RENDER_FILM_CARD: {
      state.arrFilm = action.arrFilm;
      state.arrFilmDefault = state.arrFilm;
      return { ...state };
    }
    case RENDER_NOWSHOWING_FILM: {
      state.arrFilm = state.arrFilmDefault.filter(
        (film) =>
          (new Date(film.ngayKhoiChieu) <= new Date()) &
          (new Date(film.ngayKhoiChieu) > new Date("2021-08-01T00:00:00.713"))
      );
      return { ...state };
    }
    case RENDER_COMINGSOON_FILM: {
      state.arrFilm = state.arrFilmDefault.filter(
        (film) => new Date(film.ngayKhoiChieu) > new Date()
      );
      return { ...state };
    }
    case RENDER_FILM_INFO: {
      state.filmInfo = action.filmInfo;
      return { ...state };
    }
    default:
      return { ...state };
  }
};
