import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { request } from "../.././util";
import {
  CardContent,
  Card,
  FormLabel as Label,
  Grid,
  Typography,
  Button,
  ButtonGroup,
} from "@material-ui/core";

const Ticket = ({
  ticket: { id, title, comment, contact, location, status },
}) => {
  const [currStatus, setCurrStatus] = useState(status);

  useEffect(() => {
    setCurrStatus(status);
  }, [status]);

  const claimTicket = async () => {
    setCurrStatus("CLAIMED");

    await request({
      path: `/tickets/${id}/`,
      type: "PATCH",
      body: {
        status: "CLAIMED",
      },
    });
  };

  const closeTicket = async () => {
    setCurrStatus("CLOSED");

    await request({
      path: `/tickets/${id}/`,
      type: "PATCH",
      body: {
        status: "CLOSED",
      },
    });
  };

  return (
    <Card>
      <CardContent>
        <Grid item>
          <Link to={`/ticket/${id}`}>
            <Typography variant="h5" gutterBottom>
              {title}
            </Typography>
          </Link>

          <Grid container spacing={3}>
            <Grid item xs={3}>
              <Label>Comment</Label>
              <Typography variant="body1" gutterBottom>
                {comment}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Label>Contact</Label>
              <Typography variant="body1" gutterBottom>
                {contact}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Label>Location</Label>
              <Typography variant="body1" gutterBottom>
                {location}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Label>Status</Label>
              <Typography variant="body1" gutterBottom>
                {currStatus}
              </Typography>
            </Grid>
          </Grid>

          <ButtonGroup color="secondary">
            <Button variant="contained" onClick={claimTicket}>
              Claim
            </Button>
            <Button variant="contained" onClick={closeTicket}>
              Close
            </Button>
          </ButtonGroup>
        </Grid>
      </CardContent>
    </Card>
  );
};

export { Ticket };
