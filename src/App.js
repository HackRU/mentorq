import React from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import { useSelector } from "react-redux";
import "./App.css";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
// Had to change to TIcket said that was the name of the component
import Ticket from "./pages/TIcket";

export default () => {
  const isLoggedIn = useSelector((store) => store.auth.isLoggedIn);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {isLoggedIn ? <Dashboard /> : <Redirect to="/login" />}
        </Route>

        <Route path="/login">
          {isLoggedIn ? <Redirect to="/" /> : <Login />}
        </Route>

        <Route path="/ticket/:id" component={Ticket} />
      </Switch>
    </Router>
  );
};
