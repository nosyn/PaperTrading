import React from "react";
import { BrowserRouter } from "react-router-dom";

// Themer wrapper && Material UI
import Themer from "./theme";
import { Container, CssBaseline } from "@material-ui/core"; // Material-UI provides a CssBaseline component to kickstart an elegant, consistent, and simple baseline to build upon.
import { makeStyles } from "@material-ui/core/styles"; // Material-UI provides a CssBaseline component to kickstart an elegant, consistent, and simple baseline to build upon.

// Layout
import Layout from "./layouts/Layout";

// Routes
import Routes from "./routes/Routes";

// React Helmets
import { Helmet, HelmetProvider } from "react-helmet-async";

const useStyles = makeStyles({
  container: {
    marginTop: 10,
  },
});

function App() {
  const classes = useStyles();

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
        <Container maxWidth="xl" className={classes.container}>
          <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Layout>
              <Routes />
            </Layout>
          </BrowserRouter>
        </Container>
      </Themer>
    </HelmetProvider>
  );
}

export default App;
