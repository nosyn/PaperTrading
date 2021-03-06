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

const Layout = ({ children, noNavbar }) => {
  const classes = useStyles();

  // only render MainNavBar and NavDrawer if the noNavbar was not set (used on login)
  const nav = !noNavbar && (
    <>
      <Navbar />
    </>
  );

  return (
    <div className={classes.root}>
      {nav}
      <main className={classes.mainContent}>{children}</main>
    </div>
  );
};

Layout.propTypes = {
  // Allows for the nav bar to not be rendered
  noNavbar: PropTypes.bool,

  // must have a child
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

Layout.defaultProps = {
  noNavbar: false,
};

export default Layout;
