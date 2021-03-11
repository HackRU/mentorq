import React, { useState } from "react";
import { loginUser } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import {
  TextField,
  Box,
  Button,
  Palette,
  Container,
  flexbox,
  Typography,
  makeStyles,
  Avatar,
  CircularProgress,
  Paper,
  createMuiTheme,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { Link } from "react-router-dom";
import { Input } from '../components/Input';
import { SignInButton } from '../components/Login/SignInButton';
import { ErrorMessage } from '../components/Login/ErrorMessage';
import MetaDecorator from "../components/MetaDecorator";

const useStyles = makeStyles((theme) => ({
  paper: {
    zIndex: 1,
    width: "40vw",
    height: "50vh",
    padding: theme.spacing(4),
    backgroundColor: "#c85151",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  loading: {
    width: "100vw",
    height: "100vh",
    display: "grid",
    placeContent: "center",
  },
  root: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",

  },
  title: {
    [theme.breakpoints.down('xs')]: {
      fontSize: "20px",
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: "30px",
    },
  },
  text: {
    [theme.breakpoints.down('xs')]: {
      fontSize: "5px",
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: "13px",
    },
  },
  headertexts: {
    [theme.breakpoints.down('xs')]: {
      fontSize: "5px",
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: "12px",
    },
    [theme.breakpoints.down('md')]: {
      fontSize: "16px",
    },
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    textEmphasisColor: 'white',
    marginTop: theme.spacing(1),
    backgroundColor: 'secondary',
  },

}));

const Login = () => {
  const classes = useStyles();

  const isLoggingIn = useSelector((store) => store.auth.isLoggedIn)
  const failedLoginUser = useSelector((store) => store.auth.hasErrors);
  const isLoading = useSelector((store) => store.auth.loadingLogin);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  if (isLoading) {
    return (
      <Container component="main" maxWidth="xs" className={classes.loading}>
        <CircularProgress color="secondary" />
      </Container>
    );
  }

  return (
    <Container component="main" maxWidth="xs" className={classes.root} >
      <MetaDecorator
        description={"MentorQ is a ticket queue to connect users to mentors at Rutgers Universit's HackRU."}
        title={"MentorQ"}
        notif={false}
        imageAlt={"HackRU Logo"} />
      <Paper className={classes.paper} elevation={10}>
        <Typography
          variant="h1"
          className={classes.title}>
          <b style={{ color: "white" }} >MENTOR</b>
          <b style={{ color: '#f3bb44' }}>Q</b>
        </Typography>
        <Typography
          variant="h6"
          className={classes.subheading}
          style={{ color: 'white ' }}
        >
          <div className={classes.headertexts} align="center"> Have a question? Get matched with a mentor for help! </div>
        </Typography>

        <Typography
          variant="h6"
        >
          <div style={{ color: "white" }}> Sign In </div>
        </Typography>

        <form className={classes.form}>

          <Input className={classes.form}
            label="email"
            type="email"
            inputProps={{ style: { color: 'white' } }}
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            error={failedLoginUser && ErrorMessage}
          />

          <Input className={classes.form}
            label="password"
            type="password"
            inputProps={{ style: { color: 'white' } }}
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            error={failedLoginUser && ErrorMessage}
          />

          <SignInButton onSubmit={onSubmit} />
        </form>
        <b>{!failedLoginUser ? "" : <ErrorMessage />}</b>
      </Paper>
    </Container>

  );
};

export default Login;
