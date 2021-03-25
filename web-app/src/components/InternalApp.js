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
      <Redirect to={ROUTES.ROOT} />
    </Switch>
  );
};

export default Routes;
