import { RENDER_FILM_CARD } from "../actions/types/QuanLyPhimTypes";

const stateDefault = {
  arrMovieList: [
    {
      maPhim: 1284,
      tenPhim: "Cuoc chien sinh tu",
      biDanh: "cuoc-chien-sinh-tu",
      trailer: "https://www.youtube.com/embed/_rUC3-pNLyc",
      hinhAnh: "http://movie0706.cybersoft.edu.vn/hinhanh/insideout.jpg",
      moTa: "After young Riley is uprooted from her Midwest life and moved to San Francisco, her emotions - Joy, Fear, Anger, Disgust and Sadness - conflict on how best to navigate a new city, house, and school.",
      maNhom: "GP00",
      ngayKhoiChieu: "2019-07-29T00:00:00",
      danhGia: 5,
    },
  ],
};
export const MovieListReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case RENDER_FILM_CARD: {
      state.arrMovieList = action.arrMovieList;
      return { ...state };
    }
    default:
      return { ...state };
  }
};
