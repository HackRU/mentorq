import React from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect
} from "react-router-dom";
import Login from "./pages/Login";
import { useSelector } from "react-redux";

const App = () => {
  const { isLoggedIn, email } = useSelector(
    ({ auth: { isLoggedIn, email } }) => ({
      isLoggedIn,
      email
    })
  );

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {isLoggedIn ? <div>{email}</div> : <Redirect to="/login" />}
        </Route>

        <Route path="/login">
          {isLoggedIn ? <Redirect to="/" /> : <Login />}
        </Route>
      </Switch>
    </Router>
  );
};

export { App };
