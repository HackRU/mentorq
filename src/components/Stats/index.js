import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Card, FormLabel as Label } from "@material-ui/core";
import { request } from "../../util";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";

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

// Stats for users and mentors
const Stats = () => {
  const token = useSelector(({ auth: { accessToken } }) => accessToken);
  const [stats, setStats] = useState({
    averageClaimed: -1,
    averageClosed: -1,
    totalTickets: -1,
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
          totalTickets: response["Total tickets"],
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
              <Text>Total Number of Tickets </Text>
              <Typography variant="h4" className={classes.stat}>
                {stats.totalTickets < 0 ? "Loading..." : stats.totalTickets}
              </Typography>
            </Label>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Stats;