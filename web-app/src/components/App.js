import React from "react";
import { useHistory } from "react-router-dom";

// Themer wrapper && Material UI
import Themer from "./theme";
import { CssBaseline } from "@material-ui/core"; // Material-UI provides a CssBaseline component to kickstart an elegant, consistent, and simple baseline to build upon.

// Routes
import InternalApp from "./InternalApp";

// React Helmets
import { Helmet, HelmetProvider } from "react-helmet-async";

// Apollo
import GET_USER from "../graphql/queries/GET_USER";
import { useQuery } from "@apollo/client";

// Redux
import { getUserSuccess, getUserFailure } from "../state/slices/userSlice";
import { useDispatch } from "react-redux";

// JWT decode
import jwt_decode from "jwt-decode";

function App() {
  const dispatch = useDispatch();
  const history = useHistory();

  const { loading } = useQuery(GET_USER, {
    onCompleted: (data) => {
      // TODO: update to new method or decode from jwt_decode
      const decoded = jwt_decode(data?.getUser?.jwtToken);
      dispatch(getUserSuccess(decoded));
      history.push("/");
    },
    onError: () => {
      console.error("Redirect to login page ^_^ Please login again!");
      dispatch(getUserFailure());
    },
  });

  if (loading) return <div>Initializing the App</div>;

  return (
    <HelmetProvider>
      <Helmet>
        <title>Paper Trading</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
      </Helmet>
      <Themer>
        <CssBaseline />
        <InternalApp />
      </Themer>
    </HelmetProvider>
  );
}

export default App;
