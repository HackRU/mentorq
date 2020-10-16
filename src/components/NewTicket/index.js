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
} from "@material-ui/core";
import { Input } from '.././Input';

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

const NewTicket = ({ onAddTicket }) => {
  const [ticket, setTicket] = useState(defaultState);
  const name = useSelector((store) => store.auth.name);
  const isDirector = useSelector((store) => store.auth.director);

  const onSubmit = (e) => {
    e.preventDefault();

    if (ticket.title && ticket.comment && ticket.contact && ticket.location) {
      onAddTicket({
        status: ticket.status,
        title: ticket.title,
        comment: ticket.comment,
        contact: ticket.contact,
        location: ticket.location,
        feedback: "",
      });

      setTicket(defaultState);
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

          <Button type="submit" variant="contained" className={classes.button}>
            Help Me!
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export { NewTicket };
