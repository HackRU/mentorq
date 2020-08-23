import React, { useState } from "react";

import {
  TextField,
  Box,
  Button,
  Card,
  FormLabel,
  CardContent,
  makeStyles,
} from "@material-ui/core";

const Input = ({ value, type, onChange }) => (
  <Box my={2}>
    <TextField
      fullWidth
      variant="outlined"
      type={type}
      value={value}
      onChange={onChange}
    />
  </Box>
);

const useStyles = makeStyles((theme) => ({
  root: {
    height: "fit-content",
    position: "sticky",
    top: 0,
  },
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
        <form onSubmit={onSubmit}>
          <FormLabel>Title</FormLabel>
          <Input
            onChange={(e) => setTicket({ ...ticket, title: e.target.value })}
            value={ticket.title}
          />
          <FormLabel>Contact</FormLabel>
          <Input
            onChange={(e) => setTicket({ ...ticket, contact: e.target.value })}
            value={ticket.contact}
          />
          <FormLabel>Comment</FormLabel>
          <Input
            onChange={(e) => setTicket({ ...ticket, comment: e.target.value })}
            value={ticket.comment}
          />

          <FormLabel>Location</FormLabel>
          <Input
            onChange={(e) => setTicket({ ...ticket, location: e.target.value })}
            value={ticket.location}
          />

          <Button type="submit" variant="contained">
            Create Ticket
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export { NewTicket };
