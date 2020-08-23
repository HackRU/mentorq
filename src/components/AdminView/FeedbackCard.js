import React, { useState, useEffect } from "react";
import { request } from "../.././util";
import {
  CardContent,
  Card,
  FormLabel as Label,
  Grid,
  Typography,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    borderLeftWidth: 4,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderStyle: "solid",
    borderColor: theme.palette.secondary.main,
  },
  rating: {
    position: "absolute",
    top: "5px",
    right: "5px",
  },
}));

const FeedbackCard = ({ feedback: { ticket, comments, rating } }) => {
  const [origTicket, setOrigTicket] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    const update = async () => {
      setOrigTicket(await request({ path: `/tickets/${ticket}` }));
    };
    const interval = setInterval(update, 3000);
    update();
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Card
      className={classes.root}
      style={{ position: "relative", zIndex: "1" }}
    >
      <CardContent>
        <Grid container spacing={1}>
          <Grid item xs={9}>
            <Typography variant="h5" gutterBottom>
              Feedback for {origTicket.title}
            </Typography>
          </Grid>
          <Grid item xs={1} justify="space-between">
            <Typography variant="h5" gutterBottom>
              <Rating name="read-only" value={rating} readOnly />
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Label>Comments</Label>
            <Typography variant="body1" gutterBottom>
              {comments}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Label>User</Label>
            <Typography variant="body1" gutterBottom>
              {origTicket.owner_email}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Label>Mentor</Label>
            <Typography variant="body1" gutterBottom>
              {origTicket.mentor_email}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export { FeedbackCard };
