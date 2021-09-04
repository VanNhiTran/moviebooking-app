import banner1 from "../../assets/img/posteravenger.jpeg";
import banner2 from "../../assets/img/jw2.jpeg";
import banner3 from "../../assets/img/spectre.jpeg";
import banner4 from "../../assets/img/twd.png";
const stateDefault = {
  arrCarousel: [
    {
      hinhAnh: banner1,
    },
    {
      hinhAnh: banner2,
    },
    {
      hinhAnh: banner3,
    },
    {
      hinhAnh: banner4,
    },
  ],
};

export const CarouselReducer = (state = stateDefault, action) => {
  switch (action.type) {
    default:
      return { ...state };
  }
};
