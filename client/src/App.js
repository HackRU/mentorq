import React, { Component } from 'react';
import {
    MentorqClient,
    getToken, tokenStillValid, BadLogin,
    getStoredToken, setStoredToken,
    clientOptions
} from "./config.js";
import {horizJuxt} from "./alignment.js";
import {Login} from "./Login.js";
import {Queue} from "./Queue.js";

import {BrowserRouter as Router, Redirect, Route, Link} from "react-router-dom";

import './App.css';

import firebase from "firebase";

class App extends Component {
    constructor() {
        super();
        const token = getStoredToken();
        if (token !== null && tokenStillValid(token)) {
            this.state = {
                loggedIn: true,
                client: new MentorqClient(token, clientOptions)
            };
        } else {
            this.state = {
                loggedIn: false,
                client: null
            };
        }
        window.client = this.state.client;
    }

    login = (username, pass) => {
        getToken(username, pass)
            .then((hash) => new MentorqClient(hash, clientOptions))
            .then((client) => {
                this.setState({
                    client,
                    loggedIn: true
                });
            })
            .catch(alert);
    }

    logout = () => {
        this.setState({loggedIn: false});
        setStoredToken(null);
    }

    render() {
        const loggedIn = this.state.loggedIn;
        const client = this.state.client;
        const ifLoggedIn = (component) =>
              loggedIn ? component: <Redirect to="/"/>;
        return (
            <div className="App">
              <div style={horizJuxt}>
                <h1>MentorQ</h1>
                <Login loggedIn={loggedIn}
                          onLogin={this.login}
                          onLogout={this.logout} />
              </div>
              <Router>
                <Route exact path="/queue"
                       component={
                           () => ifLoggedIn(<Queue client={client}/>)
                       }/>
                <Route exact path="/"
                       component={() => <Index loggedIn={loggedIn}/>}/>
              </Router>
            </div>
        );
    }
}

const Index = ({loggedIn}) => {
    if (loggedIn) {
        return <Redirect to="/queue"/>;
    }
    return <p>please login</p>;
};

export default App;
