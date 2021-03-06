import React from "react";

// React Router
import { Route, Switch } from "react-router-dom";

// Components
import MultipleCards from "../MultipleCards";
import NotFound from "../pages/NotFound";

const Routes = () => {
  return (
    <Switch>
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
