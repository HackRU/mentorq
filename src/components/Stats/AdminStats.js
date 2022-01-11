import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Card, FormLabel as Label } from "@material-ui/core";
import { request } from "../../util";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import Rating from "@material-ui/lab/Rating";

const Text = styled.text`
  color: grey;
`;

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: "5px 5px 5px 5px",
  },
  stat: {
    padding: "0 15px",
    color: "black",
  },
  title: {
    padding: "0 15px",
    backgroundColor: theme.palette.secondary.main,
    color: "white",
    width: "100%",
  },
}));

const AdminStats = () => {
  const token = useSelector(({ auth: { accessToken } }) => accessToken);
  const [stats, setStats] = useState({
    averageClaimed: -1,
    averageClosed: -1,
    averageRating: -1,
    totalTickets: -1,
    numOpen: -1,
    numClaimed: -1,
    numClosed: -1,
    numCancelled: -1,
    numMentors: -1,
    numUsers: -1,
  });
  var response;
  const classes = useStyles();

  useEffect(() => {
    if (token) {
      (async () => {
        // console.log(token)
        response = await request({
          path: "/tickets/stats/",
        });
        console.log(response)
        setStats({
          averageClaimed: response.average_claimed_datetime_seconds,
          averageClosed: response.average_closed_datetime_seconds,
          averageRating: response["Average Rating"].rating__avg,
          totalTickets: response["Total tickets"],
          numOpen: response["Open tickets"],
          numClaimed: response["Claimed tickets"],
          numClosed: response["Closed Tickets"],
          numCancelled: response["Cancelled Tickets"],
          numMentors: response["Number of mentors"],
          numUsers: response["Number of users"],
        });
      })();
    }
  }, [token]);

  if (stats.averageClaimed === undefined) {
    console.log("Invalid credentials for stats.");
    return null;
  }

  function format(time) {
    // console.log(time);
    let hours = "";
    let minutes = "";
    let seconds = "";
    let final = "";
    if (time > 3600) { // time greater than 1 hr
      hours = Math.round(time / 3600);
      final = hours + " hours ";
      if (Math.round(time % 60) > 0) {
        minutes = Math.round(time % 60);
        final = final + minutes + " minutes";
      }
      return final;
    } else if (time > 60) { // time greater than 1 minute
      minutes = Math.round(time / 60);
      final = minutes + " minutes";
      return final;
    }
    else if (time > 1) { // time greater than 1 second
      seconds = Math.round(time);
      final = seconds + " seconds";
      return final;
    }
    else { // time less than 1 minute
      seconds = Math.round((time + Number.EPSILON) * 100) / 100;
      final = seconds + " seconds";
      return final;
    }
  }

  return (
    <div style={{ position: "relative", zIndex: "1" }}>
      <div className={classes.root}>
        <Card className={classes.card}>
          <Typography variant="h6" className={classes.title}>
            Ticket Stats
          </Typography>
          <div>
            <br />
            <Label className={classes.stat}>
              <Text>Average Claim Time </Text>
              <Typography variant="h4" className={classes.stat}>
                {stats.averageClaimed < 0 ? "Loading..." : format(stats.averageClaimed)}
              </Typography>
            </Label>
          </div>
          <div>
            <Label className={classes.stat}>
              <Text>Average Close Time </Text>
              <Typography variant="h4" className={classes.stat}>
                {stats.averageClosed < 0 ? "Loading..." : format(stats.averageClosed)}
              </Typography>
            </Label>
          </div>
          <div>
            <Label className={classes.stat}>
              <Text>Average Rating</Text>
              <Typography variant="h4" className={classes.stat}>
                {stats.averageRating < 0 ?
                  "Loading..." :
                  <Rating name="read-only" value={stats.averageRating} size="large" precision={0.5} readOnly />}
              </Typography>
            </Label>
          </div>
          <div>
            <Label className={classes.stat}>
              <Text>Number of Tickets </Text>
              {stats.totalTickets < 0 ?
                <Typography variant="h4" className={classes.stat}>
                  {"Loading..."}
                </Typography> :
                <div>
                  <Typography variant="h4" className={classes.stat}>
                    {stats.numOpen + " Open"}
                  </Typography>
                  <Typography variant="h4" className={classes.stat}>
                    {stats.numClaimed + " Claimed"}
                  </Typography>
                  <Typography variant="h4" className={classes.stat}>
                    {stats.numClosed + " Closed"}
                  </Typography>
                  <Typography variant="h4" className={classes.stat}>
                    {stats.numCancelled + " Cancelled"}
                  </Typography>
                  <br />
                  <Typography variant="h4" className={classes.stat}>
                    {stats.totalTickets + " Total"}
                  </Typography>
                </div>}
            </Label>
          </div>
        </Card>
      </div>
      <br />
      <div className={classes.root}>
        <Card className={classes.card}>
          <Typography variant="h6" className={classes.title}>
            User Stats
          </Typography>
          <div>
            <br />
            <Label className={classes.stat}>
              <Text>Number of Mentors </Text>
              <Typography variant="h4" className={classes.stat}>
                {stats.numMentors < 0 ? "Loading..." :
                  stats.numMentors === 1 ? stats.numMentors + " Mentor" :
                    stats.numMentors + " Mentors"}
              </Typography>
            </Label>
          </div>
          <div>
            <Label className={classes.stat}>
              <Text>Number of Hackers </Text>
              <Typography variant="h4" className={classes.stat}>
                {stats.numUsers < 0 ? "Loading..." :
                  stats.numUsers === 1 ? stats.numUsers + " Hacker" :
                    stats.numUsers + " Hackers"}
              </Typography>
            </Label>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminStats;