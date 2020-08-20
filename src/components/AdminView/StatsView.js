import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Card, FormLabel as Label } from "@material-ui/core";
import { request } from "../../util";
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import styled from "styled-components";

const Text = styled.text`
  color: grey;
`

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
    },
    stat: {
        padding: '0 15px',
        color: 'black',
    },
    title: {
        padding: '0 15px',
        backgroundColor: '#e91e63',
        color: 'white',
        width: '100%',
    }
}));

const Stats = () => {
    const token = useSelector(({ auth: { accessToken } }) => accessToken);
    const [stats, setStats] = useState({
        averageClaimed: 0,
        averageClosed: 0,
    });
    var response;
    const classes = useStyles();

    useEffect(() => {
        if (token) {
            (async () => {
                // console.log(token)
                response = await request({
                    path: "/tickets/stats/",
                });
                // console.log(response)
                setStats({
                    averageClaimed: response.average_claimed_datetime_seconds,
                    averageClosed: response.average_closed_datetime_seconds,
                });
            })();
        }
    }, [token]);

    if (stats.averageClaimed === undefined) {
        console.log("Invalid credentials for stats.");
        return null;
    }

    function format(time) {
        let hours = "";
        let minutes = "";
        let final = ""
        if (time > 60) {
            hours = Math.round(time / 60);
            final = hours + " hours ";
            if (Math.round(time % 60) > 0) {
                minutes = Math.round(time % 60);
                final = final + minutes + " minutes";
            }
            return final;
        }
        else if (time > 1) {
            minutes = Math.round(time);
            final = minutes + " minutes";
            return final;
        }
        else {
            minutes = Math.round((time + Number.EPSILON) * 100) / 100
            final = minutes + " minute";
            return final;
        }
    }

    return (
        <div>
            <div className={classes.root}>
                <Card className={classes.card}>
                    <Typography variant="h6" className={classes.title}>Ticket Stats</Typography>
                    <div>
                        <br />
                        <Label className={classes.stat}>
                            <Text>Average Claim Time </Text>
                            <Typography variant="h4" className={classes.stat}>
                                {format(stats.averageClaimed)}
                            </Typography>
                        </Label>
                    </div>
                    <div>
                        <Label className={classes.stat}>
                            <Text>Average Close Time </Text>
                            <Typography variant="h4" className={classes.stat}>
                                {format(stats.averageClosed)}
                            </Typography>
                        </Label>
                    </div>
                </Card >
            </div>
            <br />
            <div className={classes.root}>
                <Card className={classes.card}>
                    <Typography variant="h6" className={classes.title}>User Stats</Typography>
                    <div>
                        <br />
                        <Label className={classes.stat}>
                            <Text>Number of Mentors </Text>
                            <Typography variant="h4" className={classes.stat}>
                                0
                            </Typography>
                        </Label>
                    </div>
                    <div>
                        <Label className={classes.stat}>
                            <Text>Number of Hackers </Text>
                            <Typography variant="h4" className={classes.stat}>
                                0
                            </Typography>
                        </Label>
                    </div>
                </Card >
            </div >
        </div>
    );
};

export { Stats };
