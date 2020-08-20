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
import Ticket from "./pages/Tickets";
import { AllTickets } from "./pages/Admin/Tickets";
import Feedback from "./pages/Admin/Feedback";

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

        <Route path="/admin/alltickets">
          {isLoggedIn ? <AllTickets /> : <Redirect to="/login" />}
        </Route>

        <Route path="/admin/feedback">
          {isLoggedIn ? <Feedback /> : <Redirect to="/login" />}
        </Route>

      </Switch>
    </Router>
  );
};
