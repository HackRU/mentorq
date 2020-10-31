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
import { Input } from '../components/Input';

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
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },  
  form: {
    width: "100%",
    textEmphasisColor:'white',
    marginTop: theme.spacing(1),
    backgroundColor:'secondary',
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

  // Error Message if you provide the wrong credentials to log in 
  const errorMessage = (<Typography
        variant="h6"
        >
          <div style = {{color:"white"}}> Invalid Credentials Provided  </div>
        </Typography>)

    
    
  if (isLoading) {
    return (
      <Container component="main" maxWidth="xs" className={classes.loading}>
        <CircularProgress color="secondary" />
      </Container>
      
    );
  }

  return (

    <Container component="main" maxWidth="xs" className={classes.root} >
      <Paper className={classes.paper} elevation={10}>
        <Typography
        variant="h1"
        className={classes.title}>
              <b style = {{color: "white"}} >MENTOR</b>
              <b style= {{color: '#f3bb44'}}>Q</b>
        </Typography>
        <Typography
        variant="h6"
        className={classes.subheading}
        style = {{color: 'white '}}
        >
            <div>Have a question? Get matched with a mentor for help!</div>
        </Typography>
        
        <Typography
        variant="h6"
        >
          <div style = {{color:"white"}}> Sign In </div>
        </Typography>

        <form className={classes.form}>
          
          <Input className={classes.form} 
            label="email"
            type="email"
            inputProps= {{ style: {color:'white'}}}
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            error={failedLoginUser && errorMessage}
          />

          <Input className={classes.form}
            label="password"
            type="password"
            inputProps= {{ style: {color:'white'}}}
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            error={failedLoginUser && errorMessage}
          />

          <Button 
            
            type="submit"
            variant="contained"
            color="secondary"
            onClick={onSubmit}
          >
          <div style= {{color: 'white'}}> {">"} </div>
        </Button>

        </form>

          <b>{!failedLoginUser ? "" : errorMessage}</b>
      </Paper>
    </Container>

  );
};

export default Login;
