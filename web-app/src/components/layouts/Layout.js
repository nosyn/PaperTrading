import React from "react";
import PropTypes from "prop-types";
import Navbar from "../navbars/Navbar";

import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "block flow",
    height: "100%",
  },
  mainContent: {
    marginTop: theme.mixins.toolbar.minHeight,
    objectFit: "contain",
    height: "100%",
    flexGrow: 1,
  },
}));

const Layout = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Navbar />
      <main className={classes.mainContent}>{children}</main>
    </div>
  );
};

Layout.propTypes = {
  // must have a child
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default Layout;
