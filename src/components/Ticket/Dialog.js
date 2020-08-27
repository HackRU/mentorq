import React, { useState, useEffect } from "react";
import { request } from "../.././util";
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

const DialogBox = ({
  id, feedback, feedbackURL, setFeedbackURL, openFeedback, handleClose
}) =>  {
  const [existingFeedback, setExistingFeedback] = useState([]); // retrieve from feedback endpoint allowing users to edit feedback
  const [value, setValue] = useState(0); // value of star rating
  const [hover, setHover] = useState(-1); // allows changing value of star rating while hovering
  const [writtenFeedback, setWrittenFeedback] = useState(""); // feedback entered into dialogue box

  useEffect(() => {
    const update = async () => {
      setExistingFeedback(await request({ path: `/feedback/${id}` }));
      setValue(existingFeedback.rating);
      setWrittenFeedback(existingFeedback.comments);
    };
    if (feedbackURL !== "" && openFeedback === false) {
      const interval = setInterval(update, 3000);
      update();
      return () => {
        clearInterval(interval);
      };
    }
  }, [existingFeedback]);

  const submitFeedback = async () => {
    handleClose();
    console.log(id, value, writtenFeedback);

    if (feedbackURL === "") {
      await request({
        path: `/feedback/`,
        type: "POST",
        body: {
          ticket: id,
          rating: value,
          comments: writtenFeedback,
        },
      });
    } else {
      await request({
        path: `/feedback/${id}`,
        type: "PATCH",
        body: {
          rating: value,
          comments: writtenFeedback,
        },
      });
    }
    setFeedbackURL("temp URL");
  };

  return <Dialog
    open={openFeedback}
    onClose={handleClose}
    aria-labelledby="form-dialog-title"
  >
    <DialogTitle id="form-dialog-title">Mentor Feedback</DialogTitle>
    <DialogContent>
      <DialogContentText>
        Please rate the help you received from your mentor.
      </DialogContentText>
      <Rating
        name="hover-feedback"
        value={value || -1}
        precision={0.5}
        onChange={(event, newValue) => {
          console.log(openFeedback);
          setValue(newValue);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
      />
      <br />
      <br />
      <br />
      <DialogContentText>How was your Mentorq experience?</DialogContentText>
      <TextField
        autoFocus
        margin="dense"
        id="name"
        label="Feedback"
        multiline
        rows={4}
        variant="outlined"
        fullWidth
        defaultValue={writtenFeedback}
        onChange={(event) => {
          setWrittenFeedback(event.target.value);
        }}
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose} color="primary">
        Cancel
      </Button>
      <Button onClick={submitFeedback} color="primary">
        Submit
      </Button>
    </DialogActions>
  </Dialog>
}

export { DialogBox };
