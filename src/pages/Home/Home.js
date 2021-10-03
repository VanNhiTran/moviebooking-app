import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MultipleRows from "../../components/react-slick/MultipleRow";
import { getMovieListAction } from "../../redux/actions/QuanLyPhimAction";
import HomeMenu from "../../components/HomeMenu/HomeMenu";
import BackGround from "../../assets/img/BG.png";
import { getCinemaSystemListAction } from "../../redux/actions/QuanLyRapAction";
import HomeCarousel from "../../components/HomeCarousel/HomeCarousel";
import News from "../../components/News/News";

export default function Home(props) {
  const { arrFilm } = useSelector((state) => state.QuanLyPhimReducer);
  console.log(`arrFilm`, arrFilm);
  const { arrCinemaSystemList } = useSelector(
    (state) => state.QuanLyRapReducer
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMovieListAction()); //dispatch function từ thunk
    dispatch(getCinemaSystemListAction());
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url(${BackGround})`,
        height: "100%",
        color: "white",
      }}
    >
      <HomeCarousel />
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <MultipleRows arrFilm={arrFilm} />
        </div>
      </section>
      <HomeMenu arrCinemaSystemList={arrCinemaSystemList} />
      <div id="news">
        <News />
      </div>
    </div>
  );
}
