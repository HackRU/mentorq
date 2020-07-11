import React from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect
} from "react-router-dom";
import Login from "./pages/Login";
import { useSelector } from "react-redux";
import Dashboard from "./pages/Dashboard";
import Ticket from "./pages/TIcket";

const App = () => {
  const isLoggedIn = useSelector(({ auth: { isLoggedIn} }) => isLoggedIn);
  // Potential way to get the LCS token if ever necessary to switch views
  // const lcsToken = useSelector(({auth: {lcsToken}}) => lcsToken)
  // console.log("hello world")
  // if(isLoggedIn){
  //   console.log("This is the lcs token:", lcsToken)
  // }

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

export { App };
