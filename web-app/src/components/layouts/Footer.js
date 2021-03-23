import React from "react";

// Material UI
import { Link, Typography, makeStyles } from "@material-ui/core";
import { FavoriteOutlined as FavoriteOutlinedIcon } from "@material-ui/icons/";

const useStyles = makeStyles((theme) => ({
  type: {
    marginTop: theme.spacing(2),
  },
  heart: {
    color: theme.palette.colors.red,
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <Typography
      className={classes.typo}
      variant="body2"
      color="textPrimary"
      align="center"
    >
      {"Made with  "}
      <FavoriteOutlinedIcon className={classes.heart} />
      {" by "}
      <Link color="inherit" href="https://github.com/biem97">
        Son Nguyen
      </Link>
      {` © ${new Date().getFullYear()}.`}
    </Typography>
  );
};

export default Footer;
