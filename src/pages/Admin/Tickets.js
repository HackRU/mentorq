import React, { useState, useEffect } from "react";
import { TicketContainer } from "../../components/TicketContainer";
import DashboardContainer from "../../components/DashboardContainer";
import { request } from "../../util";
import { Grid } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import MenuListComposition from '../../components/AdminView/Menu';
import { useSelector } from "react-redux";
import { AdminMain } from "./AdminMain";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
}));


const AllTickets = () => {
    const [tickets, setTickets] = useState([]);
    const classes = useStyles();
    const isLoggedIn = useSelector((store) => store.auth.isLoggedIn);

    useEffect(() => {
        if (isLoggedIn) {
            const update = async () => {
                setTickets(await request({ path: "/tickets/" }));
            };

            const interval = setInterval(update, 3000);
            update();
            return () => {
                clearInterval(interval);
            };
        }
    }, []);

    console.log("tickets")

    return (
        < DashboardContainer >
            <div className={classes.root}>
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <MenuListComposition />
                    </Grid>
                    <Grid item xs={8}>
                        <TicketContainer tickets={tickets} />
                    </Grid>
                </Grid>
            </div>
        </DashboardContainer >
    );
};

export { AllTickets };
