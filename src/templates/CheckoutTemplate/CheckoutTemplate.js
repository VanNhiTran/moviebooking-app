import { Fragment, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import Checkout from "../../pages/Checkout/Checkout";
import { USER_LOGIN } from "../../util/settings/config";
// import Footer from "./Layout/Footer/Footer";
// import Header from "./Layout/Header/Header";

export const CheckoutTemplate = (props) => {
  const { Component, ...restProps } = props;
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  if (!localStorage.getItem(USER_LOGIN)) {
    return <Redirect to="/login" />;
  }

  return (
    <Route
      {...restProps}
      render={(propsRouter) => {
        return (
          <Fragment>
            <Component {...propsRouter} />
          </Fragment>
        );
      }}
    />
  );
};
