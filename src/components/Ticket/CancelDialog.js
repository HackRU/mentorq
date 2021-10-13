import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
} from "@material-ui/core";


const CancelDialog = ({
  open, handleClose, handleCancel
}) => {
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        PaperProps={{
          style: {
            backgroundColor: "#c85151",
          },
        }}
      >
        <DialogTitle id="form-dialog-title"> Cancel Ticket? </DialogTitle>

        <DialogActions>
          <Button onClick={handleCancel}>
            Yes
          </Button>
          <Button onClick={handleClose}>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export { CancelDialog };
