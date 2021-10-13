import React, { useState, useEffect } from "react";
import { request } from "../.././util";
import clsx from 'clsx';
import { useSelector } from "react-redux";
import { TicketButton } from './TicketButton';
import { ClaimNote } from './ClaimNote';
import { FeedbackDialog } from './FeedbackDialog';
import { CancelDialog } from './CancelDialog';
import ActivePopover from "./ActivePopover";
import FeedbackIcon from "../../design/media/feedbackIcon.png";
import {
  Avatar,
  Card,
  CardContent,
  CardActions,
  CardHeader,
  Collapse,
  Fab,
  Grid,
  IconButton,
  Link,
  makeStyles,
  Tooltip,
  Typography,
} from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


const useStyles = makeStyles((theme) => ({
  openticket: {
    borderLeftWidth: 6,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderStyle: "solid",
    borderColor: theme.palette.secondary.light,
    color: theme.palette.textPrimary.dark,
  },
  claimedticket: {
    borderLeftWidth: 6,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderStyle: "solid",
    borderColor: theme.palette.secondary.main,
    color: theme.palette.textPrimary.dark,
  },
  closedticket: {
    borderLeftWidth: 6,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderStyle: "solid",
    borderColor: theme.palette.secondary.dark,
    color: theme.palette.textPrimary.dark,
    position: "relative",
  },
  cancelledticket: {
    color: theme.palette.textPrimary.dark,
    backgroundColor: "#dedede",
  },
  button: {
    backgroundColor: theme.palette.tertiary.main,
    "&:hover": {
      backgroundColor: theme.palette.tertiary.dark,
    },
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  cardheader: {
    color: theme.palette.textPrimary.main,
    fontWeight: "fontWeightBold",
    paddingBottom: 0,
  },
  cardcontent: {
    paddingTop: 0
  },
  cardsubheader: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap"
  },
  gridmargin: {
    paddingLeft: 0
  },
  feedbackIcon: {
    position: "absolute",
    right: "10px",
    top: "10px",
    backgroundColor: theme.palette.secondary.dark,
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
    }
  }
}));

const Ticket = ({
  ticket: { id, created_datetime, title, comment, contact, location, slack, status, feedback, mentor_email, owner, active },
  initFeedback
}) => {
  const [date, setDate] = useState(new Date());
  const [mentorEmail, setMentorEmail] = useState(mentor_email);
  const [isActive, setActive] = useState(active);
  const [currStatus, setCurrStatus] = useState(status);
  const [feedbackURL, setFeedbackURL] = useState(feedback); // feedback url on ticket
  const email = useSelector((store) => store.auth.email);
  const isDirector = useSelector((store) => store.auth.director);
  const isMentor = useSelector((store) => store.auth.mentor);
  const [openFeedback, setFeedbackOpen] = useState(false); // determines whether dialogue box for feedback should be opened
  const [openClaimNote, setClaimNoteOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [existingFeedback, setExistingFeedback] = useState([]);
  const [openCancelNote, setCancelNoteOpen] = useState(false);

  const classes = useStyles();

  let button, dialog, claimnote, canceldialog, slacklink;

  const getTimeDifference = (timeA, timeB) => {
    let timeInMilliseconds = timeA.valueOf() - timeB.valueOf();
    let timeInSecs = Math.round(timeInMilliseconds / 1000);
    let finaltime = "";
    let timeInHours = "";
    let timeInMinutes = "";

    if (timeInSecs > 3600) {
      timeInHours = Math.round((timeInSecs / 3600));
      if (timeInHours === 1) {
        finaltime = timeInHours + " hour ";
        return finaltime;
      }
      finaltime = timeInHours + " hours ";
      return finaltime;
    }
    else if (timeInSecs > 60) {
      timeInMinutes = Math.round(timeInSecs / 60);
      if (timeInMinutes === 1) {
        finaltime = timeInMinutes + " minute ";
        return finaltime;
      }
      finaltime = timeInMinutes + " minutes ";
      return finaltime;
    }
    else if (timeInSecs > 1) {
      if (timeInSecs === 1) {
        finaltime = timeInSecs + " second ";
        return finaltime;
      }
      finaltime = timeInSecs + " seconds ";
      return finaltime;
    }
    else if (timeInSecs <= 0) {
      timeInSecs = 0;
      finaltime = timeInSecs + " seconds";
      return finaltime;
    }
    else {
      timeInSecs = Math.round(timeInSecs);
      finaltime = timeInSecs + " second";
      return finaltime;
    }
  }

  useEffect(() => {
    const timeout = setTimeout(() => setDate(new Date()), 10000);
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
  const cancelTicket = async () => {
    handleCancelNoteOpen();

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

  const handleCancelNoteOpen = () => {
    setCancelNoteOpen(true);
  }

  const handleCancelNoteClose = (event) => {
    setCancelNoteOpen(false);
  }

  const handleCancelTicket = (event) => {
    setCurrStatus("CANCELLED");
    getResponse("CANCELLED", "");
    setCancelNoteOpen(false);

  }
  // const handleDeleteTicket = (event) => {
  //   setCurrStatus("DELETED");
  //   getResponse("DELETED", "");
  //   setCancelNoteOpen(false);
  // }
  const handleClickOpen = () => {
    console.log(id, feedbackURL)
    setFeedbackOpen(true);
  };

  // close dialogue box
  const handleClose = () => {
    setFeedbackOpen(false);
  };

  // Open or Close Collapse for more info
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };


  const claimButton = <TicketButton type="claim" handleClick={claimTicket} />
  const reopenButton = <TicketButton type="reopen" handleClick={reopenTicket} />
  const closeButton = <TicketButton type="close" handleClick={closeTicket} />
  const feedbackButton = <TicketButton type={checkFeedback()} handleClick={handleClickOpen} />
  const cancelButton = <TicketButton type="cancel" handleClick={cancelTicket} />

  //IF Else for Buttons
  if (isMentor || isDirector) {
    if (currStatus === "OPEN") {
      button =
        <div>
          {claimButton}
        </div>;
    }
    else if (currStatus === "CLAIMED" && (isDirector || (isMentor && email === mentorEmail))) {
      button =
        <div>
          {reopenButton} <br />
          {closeButton}
        </div>;
    }
    else if (currStatus === "CLOSED" && isDirector) {
      button =
        <div>
          {reopenButton}
        </div>;
    }
  }
  else {
    button = null;
  }

  if (!isDirector && !isMentor) {
    if (!isDirector && !isMentor && currStatus === "OPEN") {
      button =
        <div>
          {cancelButton}
        </div>;
    }
  }

  //SLACK
  if (currStatus !== "OPEN" && currStatus !== "CANCELLED" && slack !== null && slack !== "N/A" && slack !== "[object Object]" && slack !== undefined && !slack.includes("There was an error with the user id's provided:")) {
    //slacklink = <TicketField size={12} name="Slack-Link" value={slack} />
    slacklink = <Link href={slack} target="_blank" color='tertiary'>
      Connect through Slack
      {console.log("SLACK: " + slack)}
    </Link>
  }
  else {
    slacklink = null;
  }
  //Alert to User that their ticket has been claimed
  //TODO: Check if User associated with ticket matches current email, Change in useState
  //If above conditions met -> return Alert of ticket claimed
  //Notification to mentor that they have successfully claimed a ticket
  if (openClaimNote) {
    claimnote = <ClaimNote message="Ticket Claimed!"
      open={true}
      handleClose={handleClaimNoteClose}
    />
  }

  //FEEDBACK DIALOG BOX
  if (feedbackURL !== "" && existingFeedback.length === 0) {
    for (var i = 0; i < initFeedback.length; i++) {
      if (initFeedback[i].ticket === id) {
        setExistingFeedback(initFeedback[i]);
      }
    }
  }

  const setFeedback = () => {
    dialog = <FeedbackDialog id={id} title={title}
      feedbackURL={feedbackURL} setFeedbackURL={setFeedbackURL}
      openFeedback={openFeedback} handleClose={handleClose}
      initFeedback={existingFeedback} />
    return dialog;
  }

  if (openCancelNote) {
    canceldialog = <CancelDialog
      open={true}
      handleClose={handleCancelNoteClose}
      handleCancel={handleCancelTicket}
    />
  }

  if (openCancelNote && isDirector) {
    canceldialog = <CancelDialog
      open={true}
      handleClose={handleCancelNoteClose}
      handleCancel={handleCancelTicket}
    />
  }

  //FIELD OF A TICKET
  function TicketField(props) {
    return (
      <Grid item xs={props.size}>
        <Typography variant="body2" color="theme.palette.textPrimary.dark" gutterBottom>
          {props.name !== "" ? props.name + ": " : ""} {props.value}
        </Typography>
      </Grid>
    )
  }

  return (
    <Card className={status === "OPEN" ? classes.openticket :
      status === "CLAIMED" ? classes.claimedticket :
        status === "CLOSED" ? classes.closedticket :
          classes.cancelledticket}>
      <CardHeader
        className={classes.cardheader}
        title={title}
        titleTypographyProps={{ variant: "h5", color: "theme.palette.textPrimary.main" }}
        subheaderTypographyProps={{ variant: "overline" }}
        subheader={
          <div className={classes.cardsubheader}>
            {status === "OPEN" ? "Open for " + getTimeDifference(date, new Date(created_datetime)) : status}
            <ActivePopover
              isActive={!isActive | status === "CLOSED" | status === "CANCELLED" ? false : true}
              editable={(!isDirector && !isMentor && isActive) || status === "CLOSED" || status === "CANCELLED" ? false : true}
              id={id} />
          </div>}>
      </CardHeader>
      <CardContent className={classes.cardcontent}>
        {currStatus === "CLOSED" && !isDirector && !isMentor ?
          <Tooltip title="Submit Feedback">
            <Fab className={classes.feedbackIcon} size="medium" onClick={handleClickOpen}>
              <Avatar elevation={2} src={FeedbackIcon} />
            </Fab>
          </Tooltip> : ""}
        <CardActions className={classes.gridmargin}>
          <TicketField size={11} name="" value={comment} />
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
            spacing={0}
            paddingBottom={0}
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent className={classes.gridmargin}>
            <Grid container spacing={5} >
              <Grid item xs={12} sm={isDirector ? 6 : 7} md={8}>
                <TicketField size={12} name="Owner" value={owner} />
                <TicketField size={12} name="Contact" value={contact} />
                {currStatus !== "OPEN" && currStatus !== "CANCELLED" ? <TicketField size={12} name="Mentor" value={mentorEmail} /> : ""}
                {slacklink}
              </Grid>
              <Grid item xs={12} sm={isDirector ? 6 : 5} md={4} alignItems="stretch" >
                {currStatus === "CLOSED" && !isDirector && !isMentor ? feedbackButton : ""}
                {button}
                {isDirector && currStatus !== "CANCELLED" && cancelButton}
              </Grid>
            </Grid>
          </CardContent>
        </Collapse>
        {setFeedback()} {claimnote} {canceldialog}
      </CardContent >
    </Card >
  );
};

export { Ticket };
