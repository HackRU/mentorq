import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../actions";
import {
  AppBar,
  Typography,
  Toolbar,
  Button,
  makeStyles,
} from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  email: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    fontColor: "white",
  },
  link: {
    textDecoration: "none",
    color: "white",
  }
}));

export default () => {
  const dispatch = useDispatch();
  const email = useSelector((store) => store.auth.email);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link to="/" className={classes.link}>
              MentorQ
            </Link>
          </Typography>

          <Typography className={classes.email}>{email}</Typography>
          <Link to="/login" style={{ textDecoration: 'none' }} >
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                dispatch(logoutUser());
              }}
            >
              Logout
          </Button>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
};
