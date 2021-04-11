import React from 'react';
import {
    Fab,
    Hidden,
    makeStyles
} from '@material-ui/core/';
import MetaDecorator from "../MetaDecorator";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
        position: "fixed",
        bottom: "10px",
        right: "10px",
        zIndex: "2000"
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
        color: "#ffffff",
        '&:hover': {
            backgroundColor: theme.palette.secondary.main,
        }
    },
}));

export default function TicketNumbers({ numOpen, numClaimed }) {
    const classes = useStyles();
    const isDirector = useSelector((store) => store.auth.director);
    const isMentor = useSelector((store) => store.auth.mentor);
    if (numOpen == 0 && numClaimed == 0) {
        return (
            <div>
                <MetaDecorator
                    description={"MentorQ is a ticket queue to connect users to mentors at Rutgers Universit's HackRU."}
                    title={"MentorQ"}
                    notif={false}
                    imageAlt={"HackRU Logo"} />
            </div>);
    }
    else if (isDirector && !isMentor) {
        return (
            <div>
                <MetaDecorator
                    description={"MentorQ is a ticket queue to connect users to mentors at Rutgers Universit's HackRU."}
                    title={"MentorQ Director Dashboard"}
                    notif={false}
                    imageAlt={"HackRU Logo"} />
                <Hidden xsDown>
                    <div className={classes.root}>
                        <Fab variant="extended" className={classes.extendedIcon} href="">
                            Total Open Tickets: {numOpen} <br />
                            Total Claimed Tickets: {numClaimed}
                        </Fab>
                    </div >
                </Hidden>
            </div>
        );
    }
    else if (isMentor) {
        return (
            <div>
                <MetaDecorator
                    description={"MentorQ is a ticket queue to connect users to mentors at Rutgers Universit's HackRU."}
                    title={numOpen > 0 ?
                        (numOpen == 1 ? "MentorQ (" + numOpen + " Open Ticket)" : "MentorQ (" + numOpen + " Open Tickets)")
                        : "MentorQ"}
                    notif={numOpen > 0 ? true : false}
                    imageAlt={"HackRU Logo"} />
                <Hidden xsDown>
                    <div className={classes.root}>
                        <Fab variant="extended" className={classes.extendedIcon} href="">
                            Open Tickets: {numOpen} <br />
                            My Claimed Tickets: {numClaimed}
                        </Fab>
                    </div >
                </Hidden>
            </div>
        );
    }
    else {
        return (
            <div><MetaDecorator
                description={"MentorQ is a ticket queue to connect users to mentors at Rutgers Universit's HackRU."}
                title={numClaimed > 0 ?
                    (numClaimed == 1 ? "MentorQ (" + numClaimed + " Claimed Ticket)" : "MentorQ (" + numClaimed + " Claimed Tickets)")
                    : "MentorQ"}
                notif={numClaimed > 0 ? true : false}
                imageAlt={"HackRU Logo"} />
                <Hidden xsDown>
                    <div className={classes.root}>
                        <Fab variant="extended" className={classes.extendedIcon} href="">
                            Open Tickets: {numOpen} <br />
                            Claimed Tickets: {numClaimed}
                        </Fab>
                    </div >
                </Hidden>
            </div>
        );
    }

}