import React, { useState } from "react";

// Material UI
import clsx from "clsx";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  makeStyles,
} from "@material-ui/core";
import { Menu as MenuIcon } from "@material-ui/icons";

// Constants
import uiConfigs from "../configs/uiConfigs";

// Components
import NavbarDrawer from "./NavbarDrawer";
import UserMenu from "./UserMenu";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: uiConfigs.drawerWidth,
    width: `calc(100% - ${uiConfigs.drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  return (
    <>
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={() => setOpen(!open)}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            Dashboard
          </Typography>

          <UserMenu setOpen={setOpen} />
        </Toolbar>
      </AppBar>
      <NavbarDrawer open={open} setOpen={setOpen} />
    </>
  );
};

export default Navbar;
