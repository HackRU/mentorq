import React, { useState } from "react";
import { loginUser } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Hidden,
  Typography,
  makeStyles,
  CircularProgress,
  Paper,
} from "@material-ui/core";
import { Input } from '../components/Input';
import { SignInButton } from '../components/Login/SignInButton';
import { ErrorMessage } from '../components/Login/ErrorMessage';
import MetaDecorator from "../components/MetaDecorator";
import { CoreModule } from '@hackru/frontend-core';

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
    [theme.breakpoints.down('sm')]: {
      width: "70vw",
    },
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
    [theme.breakpoints.down('sm')]: {
      fontSize: "30px",
    },
    [theme.breakpoints.only('md')]: {
      fontSize: "50px",
    }
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

const Login = CoreModule(({ text, profile, children }) => {
  console.log(profile);
  const classes = useStyles();

  const isLoggingIn = useSelector((store) => store.auth.isLoggedIn)
  const failedLoginUser = useSelector((store) => store.auth.hasErrors);
  const isLoading = useSelector((store) => store.auth.loadingLogin);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("Profile: " + profile);
    await profile.Login(email, password);
    dispatch(loginUser({ profile }));
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
          <div className={classes.headertexts} align="center">
            <Hidden smUp>
              Have a question?<br />Get matched with a mentor for help!
            </Hidden>
            <Hidden xsDown>
              Have a question? Get matched with a mentor for help!
            </Hidden>
          </div>
        </Typography>
        <br />
        <Typography variant="h5">
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
  )
}, ["text", "profile"])

export default Login;
