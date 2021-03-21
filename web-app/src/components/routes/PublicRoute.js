import React from "react";

// Router
import { Route, Redirect } from "react-router-dom";

//Redux
import { userSelector } from "../../state/slices/userSlice";
import { useSelector } from "react-redux";

// A wrapper for <Route> that redirects to the dashboard
// screen if you're authenticated.
const PublicRoute = ({ component: Component, ...rest }) => {
  const userState = useSelector(userSelector);

  return (
    <Route
      {...rest}
      render={({ location, props }) =>
        !userState.user ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/dashboard",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default PublicRoute;
