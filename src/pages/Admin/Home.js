import React, { useState, useEffect } from "react";
import DashboardContainer from "../../components/DashboardContainer";
import { request } from "../../util";
import { Grid } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import MenuListComposition from '../../components/AdminView/Menu';
import VirtualizedList from '../../components/AdminView/MentorList';
import { Stats } from '../../components/AdminView/StatsView';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
}));

const AdminHome = () => {
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
        <DashboardContainer>
            <div className={classes.root}>
                <Grid container spacing={2}>
                    <Grid item xs>
                        <MenuListComposition />
                    </Grid>
                    <Grid item xs={6}>
                        <Stats />
                    </Grid>
                    <Grid item xs>
                        <VirtualizedList />
                    </Grid>
                </Grid>
            </div>
        </DashboardContainer>
    );
};

export { AdminHome };
