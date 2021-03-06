import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../actions";
import {
  AppBar,
  Hidden,
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
  },
  button: {
    color: theme.palette.textPrimary.main,
  },
  yellowFont: {
    color: theme.palette.tertiary.main,
  },
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
              <b>MENTOR</b>
              <b className={classes.yellowFont}>Q</b>
            </Link>
          </Typography>

          <Typography className={classes.email}>{email}</Typography>
          <Link to="/login" style={{ textDecoration: "none" }}>
            <Hidden xsDown>
              <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                onClick={() => {
                  dispatch(logoutUser());
                }}
              >
                Logout
            </Button>
            </Hidden>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
};
