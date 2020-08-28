import React, { useState } from "react";
import { loginUser } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import {
  TextField,
  Box,
  Button,
  Palette, 
  Container,
  Typography,
  makeStyles,
  Avatar,
  CircularProgress,
  Paper,
  createMuiTheme,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { Link } from "react-router-dom";

const Input = ({ label, value, type, onChange }) => (
  <Box my={2}>
    <TextField
      fullWidth
      variant="outlined"
      label={label}
      type={type}
      value={value}
      onChange={onChange}
      margin="normal"
    />
  </Box>
);

const useStyles = makeStyles((theme) => ({
  paper: {
    zIndex: 1,
    width: "40vw",
    height: "80vh",
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
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
}));

const Login = () => {
  const classes = useStyles();

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
      <Paper className={classes.paper}>
        <Typography 
        variant="h1" 
        className={classes.title}>
              <b style = {{color: "white"}} >MENTOR</b>
              <b style= {{color: '#f3bb44'}}>Q</b>
        </Typography>
        <Typography 
        variant="h6" 
        className={classes.subheading}
        style = {{color: 'white'}}
        >
            <div>Have a question? Get matched with a mentor for help!</div>
        </Typography>
        <form className={classes.form}>
          <Input
            label={"email"}
            type="email"
            value={email}
            onChange={({ target }) => setEmail(target.value)}
          />

          <Input
            label="password"
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
          <Link to="/Dashboard" style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              color="secondary"
              onClick={onSubmit}
            >
          <div style= {{color: 'white'}}> {">"} </div>
        </Button>
        </Link>
        </form> 
          <div style = {{color: "#ededed"}}> Not a member? Create an Account! </div>
          <div style = {{color: "#ededed"}}> Forgot your password? </div>
          <Link to="/Home" style={{ textDecoration: "none" }}>
            <div style = {{color: "#ededed"}}> Return Home </div>
          </Link>
          
          <b>{!failedLoginUser ? "" : "Invalid credentials provided."}</b>
      </Paper>
    </Container>

  );
};

export default Login;
