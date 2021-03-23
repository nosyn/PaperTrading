import React from "react";

// Router
import { Route, Redirect } from "react-router-dom";

//Redux
import { userSelector } from "../../state/slices/userSlice";
import { useSelector } from "react-redux";

// Layout
import Layout from "../layouts/Layout";

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
const PrivateRoute = ({ component: Component, routes, ...rest }) => {
  const userState = useSelector(userSelector);

  // !TODO: Maybe redirect to errors page if userState.hasErrors is true
  // !TODO: Right now just move back to login page
  return (
    <Route
      {...rest}
      render={({ location, props }) =>
        userState.user && !userState.hasErrors ? (
          <Layout>
            <Component {...props} routes={routes} />
          </Layout>
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
