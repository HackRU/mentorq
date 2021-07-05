import React from "react";
import {
    Route,
    BrowserRouter as Router,
    Switch,
    Redirect,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { ThemeProvider } from '@material-ui/core/styles';
import Background from "../design/Background.jsx"
import theme from "../design/theme.js"
import Login from "./Login";
import Dashboard from "./Dashboard";
import { CoreModule } from "@hackru/frontend-core";

export default CoreModule(({ profile, children }) => {
    const isLoggedIn = useSelector((store) => store.auth.isLoggedIn);
    console.log(profile);
    return (
        <div>
            <ThemeProvider theme={theme}>
                <Background style={{ position: 'relative', zIndex: '0' }} />
                <Router >
                    <Switch>
                        <Route exact path="/">
                            {isLoggedIn ? <Dashboard /> : <Redirect to="/login" />}
                        </Route>

                        <Route path="/login">
                            {isLoggedIn ? <Redirect to="/" /> : <Login />}
                        </Route>
                    </Switch>
                </Router>
            </ThemeProvider>
        </div>
    );
}, ["profile"])
