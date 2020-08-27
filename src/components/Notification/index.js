import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Snackbar,
  IconButton,
  Collapse
} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import { Alert } from '@material-ui/lab';

const Notification = ({
  message, open, handleClose
}) =>  {
  {console.log(open)}
  return (
    <div className="name">
      <Collapse in={open}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                {
                  //setOpen(false);
                }
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          A Ticket has Been Claimed!
        </Alert>
      </Collapse>
    </div>
  );
}

export { Notification };
