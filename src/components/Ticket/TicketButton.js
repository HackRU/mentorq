import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: theme.palette.tertiary.main,
    margin: 3,
    width: 150,
    "&:hover": {
      backgroundColor: theme.palette.tertiary.dark,
    },
    position: "static",
  },
}));

const TicketButton = ({
  type, handleClick
}) => {
  const classes = useStyles();
  return <Button variant="contained" className={classes.button} onClick={handleClick}>
    {type}
  </Button>
}

export { TicketButton };
