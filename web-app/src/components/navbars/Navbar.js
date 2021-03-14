import React from "react";
// react-router-dom
import { Link } from "react-router-dom";

// Material UI
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, IconButton } from "@material-ui/core";
import { MoneySharp as MoneySharpIcon } from "@material-ui/icons";

// Components
import UserProfile from "./UserProfile";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));
const Navbar = () => {
  const classes = useStyles();

  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
        >
          <Link to="/cards">
            <MoneySharpIcon />
          </Link>
        </IconButton>

        <Typography variant="h6" className={classes.title}>
          Paper Trading
        </Typography>

        <UserProfile />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
