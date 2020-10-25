import React from "react";
import { Route, Switch, Redirect, useLocation } from "react-router";

import Admin from "./components/admin";
import App from "./components/app";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./components/auth/login";
import Register from "./components/auth/register";
import MiniView from "./components/miniview";

const Routes = (props) => {
  const { pathname } = useLocation();
  return (
    <App>
      <Switch>
        <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} />
        <PrivateRoute exact path={"/"} component={MiniView} />
        <PrivateRoute path="/admin" component={Admin} />
        <Route path={"/login"} component={Login} />
        <Route path={"/register"} component={Register} />
        <Redirect from="*" to="/" />
      </Switch>
    </App>
  );
};

export default Routes;
