import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { request } from "../.././util";
import { logoutUser } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { recievedLoginUser } from "../../actions";
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
  ticket: { id, title, comment, contact, location, status, feedback, mentor_email},
}) => {
  const [mentorEmail,setMentorEmail] = useState(mentor_email);
  const [currStatus, setCurrStatus] = useState(status);
  const [feedbackURL, setFeedbackURL] = useState(feedback); // feedback url on ticket
  const [existingFeedback, setExistingFeedback] = useState([]); // retrieve from feedback endpoint allowing users to edit feedback
  const email = useSelector((store) => store.auth.email);
  const isDirector = useSelector((store => store.auth.director));
  const isMentor = useSelector((store => store.auth.mentor));
  const [value, setValue] = useState(0); // value of star rating
  const [hover, setHover] = useState(-1); // allows changing value of star rating while hovering
  const [openFeedback, setFeedbackOpen] = React.useState(false); // determines whether dialogue box for feedback should be opened
  const [writtenFeedback, setWrittenFeedback] = useState(""); // feedback entered into dialogue box

  // update status of ticket
  useEffect(() => {
    setCurrStatus(status);
    setMentorEmail(mentor_email);

  }, [status,mentor_email]);

  // check if ticket already has feedback allowing for edits to existing feedback
  useEffect(() => {
    const update = async () => {
      setExistingFeedback(await request({ path: `/feedback/${id}` }));
      setValue(existingFeedback.rating);
      setWrittenFeedback(existingFeedback.comments);
    };
    if (feedbackURL != "" && openFeedback == false) {
      const interval = setInterval(update, 3000);
      update();
      return () => {
        clearInterval(interval);
      };
    }
  }, [existingFeedback]);

  const claimTicket = async () => {
    setCurrStatus("CLAIMED");
    setMentorEmail(email);
    await request({
      path: `/tickets/${id}/`,
      type: "PATCH",
      body: {
        status: "CLAIMED",
        mentor_email: email
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

  const reOpen = async () => {
    setCurrStatus("OPEN");

    await request({
      path: `/tickets/${id}/`,
      type: "PATCH",
      body: {
        status: "OPEN",
        mentor_email: "",
        mentor: "",


      },
    });
  };


  let button;
  //IF Else for Buttons
    if (isMentor || isDirector === true){
      //console.log("SHOW BUTTONS");
      if (currStatus === "OPEN" ){
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
            <Button variant="contained" onClick={reOpen}>
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
          <Button variant="contained" onClick={reOpen}>
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

    if (feedbackURL == "") {
      await request({
        path: `/feedback/`,
        type: "POST",
        body: {
          ticket: id,
          rating: value,
          comments: writtenFeedback
        },
      });
    }
    else {
      await request({
        path: `/feedback/${id}`,
        type: "PATCH",
        body: {
          rating: value,
          comments: writtenFeedback
        },
      });
    }

    setFeedbackURL("temp URL");
  };

  let dialog;
  dialog = <Dialog open={openFeedback} onClose={handleClose} aria-labelledby="form-dialog-title">
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
  </Dialog>;

  return (
    <Card>
      <CardContent>
        <Grid item>
          <Link to={`/ticket/${id}`}>
            <Typography variant="h5" gutterBottom>{title}</Typography>
          </Link>

          <Grid container spacing={1}>
            <Grid item xs={3}>
              <Label>Contact</Label>
              <Typography variant="body1" gutterBottom>
              {contact}
              </Typography>
              <Label> Mentor </Label>
              <Typography variant="body1" gutterBottom>
              {currStatus ==="CLAIMED" && mentorEmail}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Label>Location</Label>
              <Typography variant="body1" gutterBottom>{location}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Label>Status</Label>
              <Typography variant="body1" gutterBottom>{currStatus}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Label>Comment</Label>
              <Typography variant="body1" gutterBottom>{comment}</Typography>
            </Grid>
          </Grid>
          {currStatus == "CLOSED" && feedbackURL == "" && !isDirector && !isMentor ?
            <ButtonGroup color="secondary">
              <Button variant="contained" onClick={handleClickOpen} >
                Feedback
                </Button>
            </ButtonGroup> :
            ""}
          {currStatus == "CLOSED" && feedbackURL != "" && !isDirector && !isMentor ?
            <ButtonGroup color="secondary">
              <Button variant="contained" onClick={handleClickOpen} >
                Edit Feedback
              </Button>
            </ButtonGroup> :
            ""}
          { button }
          { dialog }
        </Grid>
      </CardContent>
    </Card>
  );
};

export { Ticket };