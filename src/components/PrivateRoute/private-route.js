import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router";

const PrivateRoute = ({
  component: Component,
  isAuthenticated,
  isInitialized,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) => {
      if (isInitialized && !isAuthenticated) {
        // not logged in so redirect to login page with the return url
        return (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        );
      }

      // check if loading before(new account needed)
      if (!isInitialized) {
        // no account before so redirect to register page
        return (
          <Redirect
            to={{ pathname: "/register", state: { from: props.location } }}
          />
        );
      }
      // authorised so return component
      return <Component {...props} />;
    }}
  />
);

PrivateRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  isInitialized: PropTypes.bool.isRequired,
};

export default PrivateRoute;
