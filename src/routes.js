import React from "react";
import { Route, Switch } from "react-router";

import Home from "./components/home";
import App from "./components/app";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./components/auth/login";
import Register from "./components/auth/register";

const Routes = (props) => {
  return (
    <App>
      <Switch>
        <PrivateRoute exact path={"/"} component={Home} />
        <Route path={"/login"} component={Login} />
        <Route path={"/register"} component={Register} />
        <Route
          render={(props) => <div>{console.log(props)}404 - Not Found</div>}
        />
      </Switch>
    </App>
  );
};

export default Routes;
