import React from "react";

// React Router
import { Route, Switch } from "react-router-dom";

// Routes
import ROUTES from "../../constants/Routes";

// Components
import MultipleCards from "../MultipleCards";
import NotFound from "../pages/NotFound";

// Pages
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import Dashboard from "../pages/Dashboard";

// Private Routes
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

const Routes = () => {
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
      <Route component={NotFound} />
    </Switch>
  );
};

export default Routes;
