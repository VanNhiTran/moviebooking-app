import "./App.css";

import { createBrowserHistory } from "history";
import { Route, Router, Switch } from "react-router-dom";
import { HomeTemplate } from "./templates/HomeTemplate/HomeTemplate";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import SignUp from "./pages/Sign-up/SignUp";
import DetailFilm from "./pages/FilmDetail/FilmDetail";
import { CheckoutTemplate } from "./templates/CheckoutTemplate/CheckoutTemplate";
import Checkout from "./pages/Checkout/Checkout";
import AdminTemplate from "./templates/AdminTemplate/AdminTemplate";
import Film from "./pages/Admin/Film/Film";
import AddFilm from "./pages/Admin/Film/Addfilm/AddFilm";
import User from "./pages/Admin/Users/User";
import Showtime from "./pages/Admin/Film/Showtimes/Showtime";
import AddUser from "./pages/Admin/Users/AddUser/AddUser";
import EditFilm from "./pages/Admin/Film/Edit/EditFilm";
import EditUser from "./pages/Admin/Users/EditUser/EditUser";
export const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      <Switch>
        <HomeTemplate path="/home" exact Component={Home} />
        <HomeTemplate path="/" exact Component={Home} />
        {/* <HomeTemplate path="/news" exact Component={News} /> */}
        <HomeTemplate path="/detail/:id" exact Component={DetailFilm} />
        <CheckoutTemplate path="/checkout/:id" exact Component={Checkout} />
        <AdminTemplate path="/admin" exact Component={User} />
        <AdminTemplate path="/admin/user" exact Component={User} />
        <AdminTemplate path="/admin/user/adduser" exact Component={AddUser} />
        <AdminTemplate path="/admin/user/edit/:id" exact Component={EditUser} />
        <AdminTemplate path="/admin/film" exact Component={Film} />
        <AdminTemplate path="/admin/film/addfilm" exact Component={AddFilm} />
        <AdminTemplate
          path="/admin/film/editfilm/:id"
          exact
          Component={EditFilm}
        />
        <AdminTemplate
          path="/admin/film/showtime/:id"
          exact
          Component={Showtime}
        />
        <Route path="/login" exact component={Login} />
        <Route path="/signup" exact component={SignUp} />
      </Switch>
    </Router>
  );
}

export default App;
