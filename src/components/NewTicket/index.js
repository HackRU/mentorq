import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FormAlert } from "./FormAlert";
import {
  TextField,
  Box,
  Button,
  Card,
  CardContent,
  makeStyles,
  Typography
} from "@material-ui/core";
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const useStyles = makeStyles((theme) => ({
  root: {
    height: "fit-content",
    position: "static",
    top: 0,
  },
  button: {
    backgroundColor: theme.palette.tertiary.main,
    "&:hover": {
      backgroundColor: theme.palette.tertiary.dark,
    },
  },
  greeting: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  subtitle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: "15px",
  },
  input: {
    marginBottom: "15px",
  }
}));

const defaultState = {
  title: "",
  titleError: "",
  comment: "",
  commentError: "",
  contact: "",
  contactError: "",
  location: "N/A",
  locationError: "",
};

const NewTicket = ({ onAddTicket, numTickets }) => {
  const [ticket, setTicket] = useState(defaultState);
  const name = useSelector((store) => store.auth.name);
  const [nameToSubmit, setNameToSubmit] = useState(name);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [open, setOpen] = useState(false); // max number of tickest reached alert
  const [alertMessage, setAlertMessage] = useState("");
  const [commentLength, setCommentLength] = useState(0);

  //console.log(numTickets);

  // Detect change in checkbox
  const handleChange = (event) => {
    setIsAnonymous(event.target.checked);

    if (event.target.checked === true) {
      setNameToSubmit("Anonymous");
    }
    else {
      setNameToSubmit(name);
    }
  };


  const onSubmit = (e) => {
    e.preventDefault();
    console.log(commentLength);
    if (numTickets >= 5) {
      setAlertMessage("Maximum number of open tickets reached. Please wait or cancel an open ticket and reload page.");
      setOpen(true);
      setTicket(defaultState);
      setIsAnonymous(false);
      setNameToSubmit(name);
    }
    else if (commentLength > 255) {
      setAlertMessage("Comment exceeds 255 characters.");
      setOpen(true);
    }

    if (ticket.title && ticket.comment && ticket.contact && ticket.location && numTickets < 5 && commentLength <= 255) {
      console.log(nameToSubmit);
      setOpen(false);
      onAddTicket({
        active: ticket.active,
        status: ticket.status,
        title: ticket.title,
        comment: ticket.comment,
        contact: ticket.contact,
        location: ticket.location,
        feedback: "",
        owner: nameToSubmit,
      });

      setTicket(defaultState);
      setIsAnonymous(false);
      setNameToSubmit(name);
    }
  };

  const isEnabled = ticket.contact.length && ticket.title.length && ticket.comment.length && ticket.location.length > 0


  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h6" className={classes.greeting}>
          <Box fontWeight="fontWeightBold">
            Hey {name !== undefined ? name.toUpperCase() : ""}!
          </Box>
        </Typography>
        <Typography variant="subtitle1" className={classes.subtitle} >
          <div>How can we help you?</div>
        </Typography>
        <form onSubmit={onSubmit}>

          <TextField
            id="standard-textarea"
            label="Title"
            placeholder="Name of Issue"
            fullWidth
            className={classes.input}
            value={ticket.title}
            onChange={(e) => setTicket({ ...ticket, title: e.target.value })}
          />

          <TextField
            id="standard-textarea"
            label="Contact"
            placeholder="Email, Cell Phone # etc."
            fullWidth
            value={ticket.contact}
            className={classes.input}
            onChange={(e) => setTicket({ ...ticket, contact: e.target.value })}
          />

          <TextField
            id="standard-textarea"
            label="Comments"
            placeholder="Describe Your Issue"
            multiline
            fullWidth
            value={ticket.comment}
            className={classes.input}
            onChange={(e) => { setTicket({ ...ticket, comment: e.target.value }); setCommentLength(e.target.value.length) }}
          />
          { /*
           <TextField
            id="standard-textarea"
            label="Location"
            placeholder="Campus Location"
            fullWidth
            value={ticket.location}
            className={classes.input}
            onChange={(e) => setTicket({ ...ticket, location: e.target.value })}
          /> */
          }
          <FormControlLabel control={<Checkbox
            checked={isAnonymous}
            onChange={handleChange}
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />} label="Anonymous" />
          <br /><br />
          <div align="center">
            <Button disabled={!isEnabled} type="submit" variant="contained" className={classes.button}>
              Help Me!
            </Button>
          </div>
        </form>
      </CardContent>
      <FormAlert open={open} setOpen={setOpen} message={alertMessage} />
    </Card >
  );
};

export { NewTicket };
