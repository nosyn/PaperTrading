import React from "react";

// Themer wrapper && Material UI
import Themer from "./theme";
import { CssBaseline } from "@material-ui/core"; // Material-UI provides a CssBaseline component to kickstart an elegant, consistent, and simple baseline to build upon.

// Routes
import InternalApp from "./InternalApp";

// React Helmets
import { Helmet, HelmetProvider } from "react-helmet-async";

function App() {
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
