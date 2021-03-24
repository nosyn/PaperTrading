import React from "react";
import PropTypes from "prop-types";

// Router
import { Route, Redirect } from "react-router-dom";

//Redux
import { userSelector } from "../../state/slices/userSlice";
import { useSelector } from "react-redux";

// A wrapper for <Route> that redirects to the dashboard
// screen if you're authenticated.
const PublicRoute = ({ component: Component, ...rest }) => {
  const userState = useSelector(userSelector);

  // !TODO: Maybe redirect to errors page if userState.hasErrors is true
  // !TODO: Right now just move back to login page
  return (
    <Route
      {...rest}
      render={({ location, props }) =>
        !userState.user || !userState.hasErrors ? (
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

PublicRoute.propTypes = {
  // must be a react component
  component: PropTypes.elementType,
};

export default PublicRoute;
