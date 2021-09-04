import { Fragment } from "react";
import { Route } from "react-router-dom";
import Footer from "./Layout/Footer/Footer";
import Header from "./Layout/Header/Header";
import HomeCarousel from "./Layout/HomeCarousel/HomeCarousel";

export const HomeTemplate = (props) => {
  const { Component, ...restProps } = props;
  return (
    <Route
      {...restProps}
      render={(propsRouter) => {
        return (
          <Fragment>
            <Header {...propsRouter} />
            <HomeCarousel {...propsRouter} />
            <Component {...propsRouter} />
            <Footer {...propsRouter} />
          </Fragment>
        );
      }}
    />
  );
};
