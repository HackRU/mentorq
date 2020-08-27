import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { request } from "../.././util";

import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { TicketButton } from './TicketButton';
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
  const [existingFeedback, setExistingFeedback] = useState([]); // retrieve from feedback endpoint allowing users to edit feedback
  const email = useSelector((store) => store.auth.email);
  const isDirector = useSelector((store) => store.auth.director);
  const isMentor = useSelector((store) => store.auth.mentor);
  const [value, setValue] = useState(0); // value of star rating
  const [hover, setHover] = useState(-1); // allows changing value of star rating while hovering
  const [openFeedback, setFeedbackOpen] = React.useState(false); // determines whether dialogue box for feedback should be opened
  const [writtenFeedback, setWrittenFeedback] = useState(""); // feedback entered into dialogue box
  
  // Going to change into a component 
  const [modal,isModalOpen] = useState(false);
 

  const classes = useStyles();

  const getTimeDifference = (timeA, timeB) => {
    const timeInMilliseconds = timeA.valueOf() - timeB.valueOf();
    const timeInHours = Math.round((timeInMilliseconds / 1000) / 60 / 60);
    return `${timeInHours} hour${timeInHours > 1 ? "s" : ""}`
  }

  useEffect (() => {
    const timeout = setTimeout(() => setDate(new Date()), 1000);
    return () => clearTimeout(timeout);
  }, [date])



  console.log(isDirector);
  console.log(isMentor);
  // update status of ticket
  useEffect(() => {
    setCurrStatus(status);
    setMentorEmail(mentor_email);
  }, [status, mentor_email]);

  // check if ticket already has feedback allowing for edits to existing feedback
  useEffect(() => {
    const update = async () => {
      setExistingFeedback(await request({ path: `/feedback/${id}` }));
      setValue(existingFeedback.rating);
      setWrittenFeedback(existingFeedback.comments);
    };
    if (feedbackURL !== "" && openFeedback === false) {
      const interval = setInterval(update, 3000);
      update();
      return () => {
        clearInterval(interval);
      };
    }
  }, [existingFeedback]);

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
  };

  const closeTicket = async () => {
    setCurrStatus("CLOSED");
    getResponse("CLOSED", email)
  };

  const reopenTicket = async () => {
    setCurrStatus("OPEN");
    getResponse("OPEN", "")
  };


  //new "CANCLED" state 
  const cancel = async () => {
    setCurrStatus("CANCEL");

    await request({
      path: `/tickets/${id}/`,
      type: "PATCH",
      body: {
        status: "CANCEL",
        mentor_email: "",
        mentor: "",

      },
    });
  };

  
  //new "DELETED" state 
  const deleted = async () => {
    setCurrStatus("DELETED");

    await request({
      path: `/tickets/${id}/`,
      type: "PATCH",
      body: {
        status: "CANCEL",
        mentor_email: "",
        mentor: "",

      },
    });
  };
  
  let button;
  //IF Else for Buttons
    if (isMentor || isDirector === true){
      //console.log("SHOW BUTTONS");
      if (currStatus === "OPEN"){
        button =
        <div>
          <ButtonGroup color="secondary">
            <Button variant="contained" onClick={claimTicket}>
              Claim
            </Button>
          </ButtonGroup>
        </div>;
      }
      else if (currStatus === "CLAIMED") {
        button =
        <div>
          <ButtonGroup color="secondary">
            <Button variant="contained" onClick={reopenTicket}>
              Reopen
            </Button>

            <Button variant="contained" onClick={closeTicket}>
            Close
            </Button>
          </ButtonGroup>
        </div>;
      }
      else if (currStatus === "CLOSED" && isDirector === true){
        button =
        <div>
        <ButtonGroup color="secondary">
          <Button variant="contained" onClick={reopenTicket}>
            Reopen
          </Button>
        </ButtonGroup>
      </div>;
      }
    }
    else {
      button = null;
      //console.log("NULL");
    }

    if (isDirector === false && isMentor === false ){
      if (currStatus === "OPEN"){
        button =
        <div>
        <ButtonGroup color="secondary">
          <Button variant="contained" onClick={cancel}>
            CANCEL
          </Button>
        </ButtonGroup>
      </div>;
      }
    }
    

  const checkFeedback = () => {
    return feedbackURL === "" ? "feedback" : "edit feedback"
  }


    if (isDirector === true && isMentor === false){
      
    }
  // open dialogue box
  const handleClickOpen = () => {
    setFeedbackOpen(true);
  };

  // close dialogue box
  const handleClose = () => {
    setFeedbackOpen(false);
  };

  const submitFeedback = async () => {
    handleClose();
    console.log(id, value, writtenFeedback);

    if (feedbackURL === "") {
      await request({
        path: `/feedback/`,
        type: "POST",
        body: {
          ticket: id,
          rating: value,
          comments: writtenFeedback,
        },
      });
    } else {
      await request({
        path: `/feedback/${id}`,
        type: "PATCH",
        body: {
          rating: value,
          comments: writtenFeedback,
        },
      });
    }

    setFeedbackURL("temp URL");
  };

  const claimButton = <TicketButton type="claim" handleClick= {claimTicket}/>
  const reopenButton = <TicketButton type="reopen" handleClick= {reopenTicket}/>
  const closeButton = <TicketButton type="close" handleClick= {closeTicket}/>
  const feedbackButton = <TicketButton type= {checkFeedback()} handleClick= {handleClickOpen}/>

  //let button;
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


    let xButton;
    if (isDirector === true || isMentor === false){
      if (isDirector === true){
        xButton = 
          <div>
          <Grid item xs={2}>
            <ButtonGroup color="secondary">
              <Button variant="contained" onClick={deleted} >
                X
                </Button>
            </ButtonGroup>
            </Grid>
            </div>;
      }
      else if (isMentor === false && isDirector === false && currStatus == "OPEN"){
        xButton = 
          <div>
          <Grid item xs={2}>
            <ButtonGroup color="secondary">
              <Button variant="contained" onClick={cancel} >
                Cancel
                </Button>
            </ButtonGroup>
            </Grid>
            </div>;
      }
    }

  let dialog;
  dialog = (
    <Dialog
      open={openFeedback}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Mentor Feedback</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please rate the help you received from your mentor.
        </DialogContentText>
        <Rating
          name="hover-feedback"
          value={value || -1}
          precision={0.5}
          onChange={(event, newValue) => {
            console.log(openFeedback);
            setValue(newValue);
          }}
          onChangeActive={(event, newHover) => {
            setHover(newHover);
          }}
        />
        <br />
        <br />
        <br />
        <DialogContentText>How was your Mentorq experience?</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Feedback"
          multiline
          rows={4}
          variant="outlined"
          fullWidth
          defaultValue={writtenFeedback}
          onChange={(event) => {
            setWrittenFeedback(event.target.value);
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={submitFeedback} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );

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
            {xButton}
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
              <Label>Time Open</Label>
              <Typography variant="body1" gutterBottom>{getTimeDifference(date, new Date(created_datetime))}</Typography>
            </Grid>
          </Grid>
          { currStatus === "CLOSED" && !isDirector && !isMentor ? feedbackButton: "" }
          { button }
          { dialog }
        </Grid>
      </CardContent>
    </Card>
  );
};

export { Ticket };