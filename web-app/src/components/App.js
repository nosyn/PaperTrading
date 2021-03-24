import React from "react";

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

function App() {
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
