import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  Typography,
  Button,
  CardActions,
  CardContent,
} from "@material-ui/core";

const useStyles = makeStyles({
  card: {
    minWidth: 275,
    maxWidth: 350,
    minHeight: 150,
    margin: 30,
    borderLeft: "6px solid red",
    backgroundColor: "lightgrey",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const SingleCard = ({ currency, rate }) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          USD
        </Typography>
        <Typography variant="body2" component="p">
          {currency}: {rate}
          <br />
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};

export default SingleCard;
