import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: theme.palette.tertiary.main,
    "&:hover": {
      backgroundColor: theme.palette.tertiary.dark,
    },
  },
}));


const TicketButton = ({
  type, handleClick
}) =>  {
  const classes = useStyles();
  return <Button className={classes.button} onClick={handleClick}>
            {type}
          </Button>
}

export { TicketButton };
