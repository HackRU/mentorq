import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { request } from "../.././util";

import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { TicketButton } from './TicketButton';
import { Notification } from '.././Notification';
import { ClaimNote } from './ClaimNote';
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
  const [openClaimNote, setClaimNoteOpen] = useState(false);
  const classes = useStyles();

  let button, dialog, claimnote;

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
    handleClaimNoteOpen()
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

  // open ClaimNote
  const handleClaimNoteOpen = () => {
    setClaimNoteOpen(true);
  };

  // close ClaimNote
  const handleClaimNoteClose = (event) => {
    setClaimNoteOpen(false);
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

  //Alert to User that their ticket has been claimed
  //TODO: Check if User associated with ticket matches current email, Change in useState
  //If above conditions met -> return Alert of ticket claimed

  //Notification to mentor that they have successfully claimed a ticket
  if (openClaimNote){
    claimnote = <ClaimNote message="Ticket Claimed!"
                    open={ true }
                    handleClose={ handleClaimNoteClose }
                    />
  }
  //FEEDBACK DIALOG BOX
  dialog = <DialogBox id={id} feedback={feedback}
            feedbackURL={feedbackURL} setFeedbackURL={setFeedbackURL}
            openFeedback={openFeedback} handleClose={handleClose}/>

  //FIELD OF A TICKET
  function TicketField(props){
    return (
    <Grid item xs={props.size}>
      <Label
        className={
          currStatus === "CLAIMED"
            ? classes.claimedLabel
            : classes.openClosedLabel
        }
      >
        {props.name}
      </Label>
      <Typography variant="body1" gutterBottom>
        {props.value}
      </Typography>
    </Grid>
  )
  }

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
            <TicketField size={3} name="Contact" value={ contact } />
            <TicketField size={3} name="Location" value={ location }/>
            <TicketField size={3} name="Status" value={ currStatus }/>
            <TicketField size={12} name="Mentor" value={ mentorEmail }/>
            <TicketField size={12} name="Comment" value={ comment }/>
            <TicketField size={12}
                          name="Time Open"
                          value={getTimeDifference(date, new Date(created_datetime))}
                            />
          </Grid>
          { currStatus === "CLOSED" && !isDirector && !isMentor ? feedbackButton: "" }
          { button }
          { dialog }
          { claimnote }
        </Grid>
      </CardContent>
    </Card>
  );
};

export { Ticket };
