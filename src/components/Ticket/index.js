import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { request } from "../.././util";
import { logoutUser } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import {
  CardContent,
  Card,
  FormLabel as Label,
  Grid,
  Typography,
  Button,
  ButtonGroup,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import Rating from '@material-ui/lab/Rating';


const Ticket = ({
  ticket: { id, title, comment, contact, location, status },
}) => {
  const [currStatus, setCurrStatus] = useState(status);
  const email = useSelector((store) => store.auth.email);


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

  // Dialogue Box Feedback Form
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Rating
  const [value, setValue] = React.useState(0);
  const [hover, setHover] = React.useState(-1);

  if (currStatus == "CLOSED") {
    return (
      // displaying the ticket with feedback option if closed
      <Card>
        <CardContent>
          <Grid item>
            <Link to={`/ticket/${id}`}>
              <Typography variant="h5" gutterBottom>
                {title}
              </Typography>
            </Link>

            <Grid container spacing={1}>
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
              <Grid item xs={12}>
                <Label>Comment</Label>
                <Typography variant="body1" gutterBottom>
                  {comment}
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Label> Mentor </Label>
              <Typography variant="body1" gutterBottom>
                {currStatus === "CLAIMED" && email}
              </Typography>
            </Grid>

            <ButtonGroup color="secondary">
              <Button variant="contained" onClick={handleClickOpen}>
                Feedback
            </Button>
            </ButtonGroup>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">Mentor Feedback</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Please rate the help you received from your mentor.
                </DialogContentText>
                <Rating
                  name="hover-feedback"
                  value={value}
                  precision={0.5}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                  onChangeActive={(event, newHover) => {
                    setHover(newHover);
                  }}
                /><br /><br /><br />
                <DialogContentText>
                  How was your Mentorq experience?
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Feedback"
                  multiline
                  rows={4}
                  variant="outlined"
                  fullWidth
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancel
          </Button>
                <Button onClick={handleClose} color="primary">
                  Submit
          </Button>
              </DialogActions>
            </Dialog>
          </Grid>
        </CardContent>
      </Card>
    );
  }
  else {
    return (
      // displaying the ticket to the mentor 
      <Card>
        <CardContent>
          <Grid item>
            <Link to={`/ticket/${id}`}>
              <Typography variant="h5" gutterBottom>
                {title}
              </Typography>
            </Link>

            <Grid container spacing={1}>
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
              <Grid item xs={12}>
                <Label>Comment</Label>
                <Typography variant="body1" gutterBottom>
                  {comment}
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Label> Mentor </Label>
              <Typography variant="body1" gutterBottom>
                {currStatus === "CLAIMED" && email}
              </Typography>
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
  }
};

export { Ticket };