import React from "react";

// Themer wrapper && Material UI
import Themer from "./theme";
import { CssBaseline } from "@material-ui/core"; // Material-UI provides a CssBaseline component to kickstart an elegant, consistent, and simple baseline to build upon.

// React Helmets
import { Helmet, HelmetProvider } from "react-helmet-async";
// Components
import MultipleCards from "./MultipleCards";

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
        <MultipleCards />
      </Themer>
    </HelmetProvider>
  );
}

export default App;
