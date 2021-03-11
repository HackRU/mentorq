import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import { Typography } from '@material-ui/core';
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
        position: "fixed",
        bottom: "10px",
        right: "10px",
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
        '&:hover': {
            backgroundColor: theme.palette.secondary.main,
        }
    },
}));

export default function TicketNumbers({ numOpen, numClaimed }) {
    const classes = useStyles();
    const isDirector = useSelector((store) => store.auth.director);
    const isMentor = useSelector((store) => store.auth.mentor);
    if (isDirector) {
        return (
            <div className={classes.root}>
                <Fab variant="extended" className={classes.extendedIcon} href="">
                    Total Open Tickets: {numOpen} <br />
                    Total Claimed Tickets: {numClaimed}
                </Fab>
            </div >
        );
    }
    else if (isMentor) {
        return (
            <div className={classes.root}>
                <Fab variant="extended" className={classes.extendedIcon} href="">
                    Open Tickets: {numOpen} <br />
                    My Claimed Tickets: {numClaimed}
                </Fab>
            </div >
        );
    }
    else {
        return (
            <div className={classes.root}>
                <Fab variant="extended" className={classes.extendedIcon} href="">
                    Open Tickets: {numOpen} <br />
                    Claimed Tickets: {numClaimed}
                </Fab>
            </div >
        );
    }

}