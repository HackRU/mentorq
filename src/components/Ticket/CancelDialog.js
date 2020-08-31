import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';


const CancelDialog = ({
    open, handleClose, handleCancel
}) =>  {
  {console.log(open)}
  return (
    <div>
      <Dialog
    open={open}
    onClose={handleClose}
    aria-labelledby="form-dialog-title"
  >
    <DialogTitle id="form-dialog-title"> Cancel Ticket? </DialogTitle>
    
    <DialogActions>
      <Button onClick={handleCancel} color="primary">
        Yes
      </Button>
      <Button onClick={handleClose} color="primary">
        No
      </Button>
    </DialogActions>
  </Dialog>
    </div>
  );
}

export { CancelDialog };