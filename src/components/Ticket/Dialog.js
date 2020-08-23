import React, { Component } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import Rating from '@material-ui/lab/Rating';

class DialogBox extends Component {
  constructor(props) {
    super(props);
    this.open = props.open
  }
  // close dialogue box
  handleClose = () => {
    //setFeedbackOpen(false);
  };
  render() {
    return
  }
}

export { DialogBox };
