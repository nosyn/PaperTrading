import React from "react";

// React Router
import { Route, Switch } from "react-router-dom";

// Components
import MultipleCards from "../MultipleCards";
import NotFound from "../pages/NotFound";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={() => <LoginPage />} />
      <Route exact path="/register" component={() => <RegisterPage />} />
      <Route
        exact
        path="/cards"
        component={(props) => <MultipleCards {...props} />}
      />
      <Route component={() => <NotFound />} />
    </Switch>
  );
};

export default Routes;
