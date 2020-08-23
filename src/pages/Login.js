import React, { useState } from "react";
import { loginUser } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import {
  TextField,
  Box,
  Button,
  Container,
  Typography,
  makeStyles,
  Avatar,
  CircularProgress,
  Paper,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

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
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
      </Typography>

        <form className={classes.form}>
          <Input
            label={"Email"}
            type="email"
            value={email}
            onChange={({ target }) => setEmail(target.value)}
          />

          <Input
            label="Password"
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />

          <Button
            variant="contained"
            fullWidth
            color="primary"
            onClick={onSubmit}
          >
            Log In
        </Button>
        </form>
        <div>
          <b>{!failedLoginUser ? "" : "Invalid credentials provided."}</b>
        </div>
      </Paper>
    </Container>

  );
};

export default Login;
