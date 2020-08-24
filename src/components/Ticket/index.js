import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { request } from "../.././util";

import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { TicketButton } from './TicketButton';
import { Notification } from '.././Notification';
import { DialogBox } from './Dialog';

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
import Rating from "@material-ui/lab/Rating";

const useStyles = makeStyles((theme) => ({
  open: {
    backgroundColor: theme.palette.secondary.main,
    color: "white",
    position: "relative",
    zIndex: "2",
    borderLeftWidth: 4,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderStyle: "solid",
    borderColor: theme.palette.tertiary.main,
  },
  claimed: {
    backgroundColor: theme.palette.secondary.light,
    color: "black",
    position: "relative",
    zIndex: "2",
    borderLeftWidth: 4,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderStyle: "solid",
    borderColor: theme.palette.tertiary.main,
  },
  closed: {
    backgroundColor: theme.palette.secondary.dark,
    color: "white",
    position: "relative",
    zIndex: "2",
    borderLeftWidth: 4,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderStyle: "solid",
    borderColor: theme.palette.tertiary.main,
  },
  openClosedLabel: {
    color: theme.palette.textSecondary.main,
  },
  claimedLabel: {
    color: theme.palette.textPrimary.dark,
  },
  button: {
    backgroundColor: theme.palette.tertiary.main,
    "&:hover": {
      backgroundColor: theme.palette.tertiary.dark,
    },
  },
  title: {
    color: "white",
    textDecoration: "none",
  },
}));

const Ticket = ({
  ticket: { id, created_datetime, title, comment, contact, location, status, feedback, mentor_email},
}) => {
  const [date, setDate] = useState(new Date());
  const [mentorEmail,setMentorEmail] = useState(mentor_email);
  const [currStatus, setCurrStatus] = useState(status);
  const [feedbackURL, setFeedbackURL] = useState(feedback); // feedback url on ticket
  const email = useSelector((store) => store.auth.email);
  const isDirector = useSelector((store) => store.auth.director);
  const isMentor = useSelector((store) => store.auth.mentor);
  const [openFeedback, setFeedbackOpen] = React.useState(false); // determines whether dialogue box for feedback should be opened
  const [openNotification, setNotificationOpen] = useState(false);
  const classes = useStyles();

  let button, dialog, notification;

  const getTimeDifference = (timeA, timeB) => {
    const timeInMilliseconds = timeA.valueOf() - timeB.valueOf();
    const timeInHours = Math.round((timeInMilliseconds / 1000) / 60 / 60);
    return `${timeInHours} hour${timeInHours > 1 ? "s" : ""}`
  }

  useEffect (() => {
    const timeout = setTimeout(() => setDate(new Date()), 1000);
    return () => clearTimeout(timeout);
  }, [date])

  // update status of ticket
  useEffect(() => {
    setCurrStatus(status);
    setMentorEmail(mentor_email);
  }, [status, mentor_email]);


  const getResponse = async (type, m_email) => {
    await request({
      path: `/tickets/${id}/`,
      type: "PATCH",
      body: {
        status: type,
        mentor_email: m_email
      },
    });
  }

  const claimTicket = async () => {
    setCurrStatus("CLAIMED");
    setMentorEmail(email);
    getResponse("CLAIMED", email)
    handleNotificationOpen()
  };

  const closeTicket = async () => {
    setCurrStatus("CLOSED");
    getResponse("CLOSED", email)
  };

  const reopenTicket = async () => {
    setCurrStatus("OPEN");
    getResponse("OPEN", "")
  };

  const checkFeedback = () => {
    return feedbackURL === "" ? "feedback" : "edit feedback"
  }

  // open notification
  const handleNotificationOpen = () => {
    setNotificationOpen(true);
  };

  // close notification
  const handleNotificationClose = (event) => {
    setNotificationOpen(false);
  };

  // open dialogue box
  const handleClickOpen = () => {
    console.log(id, feedbackURL)
    setFeedbackOpen(true);
  };

  // close dialogue box
  const handleClose = () => {
    setFeedbackOpen(false);
  };

  const claimButton = <TicketButton type="claim" handleClick= {claimTicket}/>
  const reopenButton = <TicketButton type="reopen" handleClick= {reopenTicket}/>
  const closeButton = <TicketButton type="close" handleClick= {closeTicket}/>
  const feedbackButton = <TicketButton type= {checkFeedback()} handleClick= {handleClickOpen}/>

  //IF Else for Buttons
    if (isMentor || isDirector){
      if (currStatus === "OPEN" ){
        button =
        <div>
            { claimButton }
        </div>;
      }
      else if (currStatus === "CLAIMED") {
        button =
        <div>
          <ButtonGroup>
            { reopenButton }
            { closeButton }
          </ButtonGroup>
        </div>;
      }
      else if (currStatus === "CLOSED" && isDirector){
        button =
        <div>
        <ButtonGroup color="secondary">
          { reopenButton }
        </ButtonGroup>
      </div>;
      }
    }
    else {
      button = null;
    }

  if (openNotification){
    notification = <Notification message="Ticket Claimed!"
                    open={ true }
                    handleClose={ handleNotificationClose }
                    />
  }

  dialog = <DialogBox id={id} feedback={feedback}
            feedbackURL={feedbackURL} setFeedbackURL={setFeedbackURL}
            openFeedback={openFeedback} handleClose={handleClose}/>

  return (
    <Card
      className={
        currStatus === "OPEN"
          ? classes.open
          : currStatus === "CLAIMED"
          ? classes.claimed
          : currStatus === "CLOSED"
          ? classes.closed
          : null
      }
    >
      <CardContent>
        <Grid item>
          <Link to={`/ticket/${id}`} className={classes.title}>
            <Typography variant="h5" gutterBottom className={classes.title}>
              <u>
                <b>{title}</b>
              </u>
            </Typography>
          </Link>

          <Grid container spacing={1}>
            <Grid item xs={3}>
              <Label
                className={
                  currStatus === "CLAIMED"
                    ? classes.claimedLabel
                    : classes.openClosedLabel
                }
              >
                Contact
              </Label>
              <Typography variant="body1" gutterBottom>
                {contact}
              </Typography>
              <Label
                className={
                  currStatus === "CLAIMED"
                    ? classes.claimedLabel
                    : classes.openClosedLabel
                }
              >
                {" "}
                Mentor{" "}
              </Label>
              <Typography variant="body1" gutterBottom>
                {currStatus === "CLAIMED" && mentorEmail}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Label
                className={
                  currStatus === "CLAIMED"
                    ? classes.claimedLabel
                    : classes.openClosedLabel
                }
              >
                Location
              </Label>
              <Typography variant="body1" gutterBottom>
                {location}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Label
                className={
                  currStatus === "CLAIMED"
                    ? classes.claimedLabel
                    : classes.openClosedLabel
                }
              >
                Status
              </Label>
              <Typography variant="body1" gutterBottom>
                {currStatus}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Label
                className={
                  currStatus === "CLAIMED"
                    ? classes.claimedLabel
                    : classes.openClosedLabel
                }
              >
                Comment
              </Label>
              <Typography variant="body1" gutterBottom>
                {comment}
              </Typography>
            </Grid>
            <Grid item xs={12}>
            <Label
              className={
                currStatus === "CLAIMED"
                  ? classes.claimedLabel
                  : classes.openClosedLabel
              }
            >
              Time Open
            </Label>
              <Typography variant="body1" gutterBottom>{getTimeDifference(date, new Date(created_datetime))}</Typography>
            </Grid>
          </Grid>
          { currStatus === "CLOSED" && !isDirector && !isMentor ? feedbackButton: "" }
          { button }
          { dialog }
          { notification }
        </Grid>
      </CardContent>
    </Card>
  );
};

export { Ticket };
