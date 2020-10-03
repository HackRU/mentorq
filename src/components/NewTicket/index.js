import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  TextField,
  Box,
  Button,
  Card,
  FormLabel,
  CardContent,
  makeStyles,
  Typography,
  IconButton,
  Collapse
} from "@material-ui/core";
import { Input } from '.././Input';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  root: {
    height: "fit-content",
    position: "sticky",
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
  }
}));

const defaultState = {
  title: "",
  titleError: "",
  comment: "",
  commentError: "",
  contact: "",
  contactError: "",
  location: "",
  locationError: "",
};

const NewTicket = ({ onAddTicket, numTickets }) => {
  const [ticket, setTicket] = useState(defaultState);
  const name = useSelector((store) => store.auth.name);
  const isDirector = useSelector((store) => store.auth.director);
  const [nameToSubmit, setNameToSubmit] = useState(name);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [open, setOpen] = useState(false); // max number of tickest reached alert

  console.log(numTickets);

  // Detect change in checkbox
  const handleChange = (event) => {
    setIsAnonymous(event.target.checked);

    if (event.target.checked == true) {
      setNameToSubmit("Anonymous");
    }
    else {
      setNameToSubmit(name);
    }
  };


  const onSubmit = (e) => {
    e.preventDefault();
    if (numTickets >= 5) {
      setOpen(true);
      setTicket(defaultState);
      setIsAnonymous(false);
      setNameToSubmit(name);
    }

    if (ticket.title && ticket.comment && ticket.contact && ticket.location && numTickets < 5) {
      console.log(nameToSubmit);
      setOpen(false);
      onAddTicket({
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

  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h6" className={classes.greeting}>
          <Box fontWeight="fontWeightBold">
            Hey {name != undefined ? name.toUpperCase() : ""}!
          </Box>
        </Typography>
        <Typography variant="subtitle1" className={classes.greeting} >
          <div>How can we help you?</div>
        </Typography>
        <form onSubmit={onSubmit}>
          <Input
            onChange={(e) => setTicket({ ...ticket, title: e.target.value })}
            value={ticket.title}
            label="Title"
          />
          <Input
            onChange={(e) => setTicket({ ...ticket, contact: e.target.value })}
            value={ticket.contact}
            label="Contact"
          />
          <Input
            onChange={(e) => setTicket({ ...ticket, comment: e.target.value })}
            value={ticket.comment}
            label="Comment"
          />
          <Input
            onChange={(e) => setTicket({ ...ticket, location: e.target.value })}
            value={ticket.location}
            label="Location"
          />
          <FormControlLabel control={<Checkbox
            checked={isAnonymous}
            onChange={handleChange}
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />} label="Anonymous" />
          <br /><br />
          <div align="center">
            <Button type="submit" variant="contained" className={classes.button} >
              Help Me!
          </Button>
          </div>
        </form>
      </CardContent>
      <Collapse in={open}>
        <Alert
          severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                {
                  setOpen(false);
                }
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          Maximum number of open tickets reached. Please wait or cancel an open ticket and reload page.
        </Alert>
      </Collapse>
    </Card >
  );
};

export { NewTicket };
