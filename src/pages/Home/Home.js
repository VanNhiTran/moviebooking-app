import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MultipleRows from "../../components/react-slick/MultipleRow";
import { getMovieListAction } from "../../redux/actions/QuanLyPhimAction";
import HomeMenu from "./HomeMenu/HomeMenu";

export default function Home(props) {
  const { arrMovieList } = useSelector((state) => state.MovieListReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    const action = getMovieListAction();
    dispatch(action); //dispatch function từ thunk
  }, []);

  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <MultipleRows arrMovieList={arrMovieList} />
        </div>
      </section>
      <div className="mx-32">
        <HomeMenu />
      </div>
    </div>
  );
}
