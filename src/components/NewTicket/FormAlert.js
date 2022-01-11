import React from "react";
import {
  IconButton,
  Collapse
} from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';


const FormAlert = ({
  open, setOpen, message
}) => {
  return <Collapse in={open}>
    <Alert
      severity="error"
      action={
        <IconButton
          aria-label="close"
          color="inherit"
          size="small"
          onClick={() => {
            setOpen(false);
          }}
        >
          <CloseIcon fontSize="inherit" />
        </IconButton>
      }
    >
      {message}
    </Alert>
  </Collapse>
}

export { FormAlert };
