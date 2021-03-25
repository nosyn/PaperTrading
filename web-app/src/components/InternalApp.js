import React from "react";

// React Router
import { Switch, Redirect } from "react-router-dom";

// Routes
import ROUTES from "./routes/Routes";

// Components
import MultipleCards from "./MultipleCards";

// Pages
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";

// Private & Public Routes
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";

// Apollo
import GET_USER from "../graphql/queries/GET_USER";
import { useQuery } from "@apollo/client";

// Redux
import { getUserSuccess, getUserFailure } from "../state/slices/userSlice";
import { useDispatch } from "react-redux";

const Routes = () => {
  const dispatch = useDispatch();

  const { loading } = useQuery(GET_USER, {
    onCompleted: ({ name, email }) => {
      // TODO: update to new method or decode from jwt_decode
      const userInfo = { name, email };
      dispatch(getUserSuccess(userInfo));
    },
    onError: (err) => {
      console.log(err);
      dispatch(getUserFailure());
    },
    fetchPolicy: "network-only",
  });

  if (loading) return <div>Loading</div>;

  return (
    <Switch>
      <PublicRoute
        exact
        path={[ROUTES.LOGIN, ROUTES.ROOT]}
        component={LoginPage}
      />
      <PublicRoute exact path={ROUTES.REGISTER} component={RegisterPage} />

      <PrivateRoute
        exact
        path={[ROUTES.DASH_BOARD, ROUTES.ROOT]}
        component={Dashboard}
      />
      <PrivateRoute exact path={ROUTES.CARDS} component={MultipleCards} />
      <Redirect to={ROUTES.ROOT} />
    </Switch>
  );
};

export default Routes;
