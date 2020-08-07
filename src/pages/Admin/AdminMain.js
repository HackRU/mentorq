import React, { useState, useEffect } from "react";
import { request } from "../../util";
import { makeStyles } from '@material-ui/core/styles';
import { AdminHome } from './Home';
import { AllTickets } from './Tickets';
import Feedback from './Feedback';

import {
    Route,
    BrowserRouter as Router,
    Switch,
    Redirect,
} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
}));

const AdminMain = () => {
    const [tickets, setTickets] = useState([]);
    const classes = useStyles();

    useEffect(() => {
        const update = async () => {
            setTickets(await request({ path: "/tickets/" }));
        };

        const interval = setInterval(update, 3000);
        update();
        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <div>
            <Switch>
                <Route path="/" component={AdminHome} />
                <Route path="/admin/home" component={AdminHome} />
                <Route path="/admin/alltickets" component={AllTickets} />
                <Route path="/admin/feedback" component={Feedback} />
            </Switch>
        </div>
    );
};

export { AdminMain };
