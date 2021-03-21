import React from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  mainContent: {
    objectFit: "contain",
    height: "100vh",
    flexGrow: 1,
  },
}));

const Layout = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
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
