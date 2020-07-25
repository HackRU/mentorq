import React from 'react';
import Paper from '@material-ui/core/Paper';
import { Link } from "react-router-dom";
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';

import HomeIcon from '@material-ui/icons/Home';
import PeopleIcon from '@material-ui/icons/People';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';
import FeedbackIcon from '@material-ui/icons/Feedback';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    paper: {
        borderRadius: '5px',
        width: '100%',
    },
    list: {
        padding: '0px',
    },
    item: {
        borderBottom: '1px solid #d3d4d5',
        color: 'black',
    },
    icon: {
        paddingRight: '10px',
        paddingLeft: '0px',
    }
}));

export default function MenuListComposition() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <MenuList className={classes.list} >
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <MenuItem to="/admin/alltickets" className={classes.item}>
                            <HomeIcon className={classes.icon} color="action" /> Home
                        </MenuItem>
                    </Link>
                    <MenuItem className={classes.item}><PeopleIcon className={classes.icon} color="action" />Users</MenuItem>
                    <MenuItem className={classes.item}><PersonAddIcon className={classes.icon} color="action" />User Creation</MenuItem>
                    <Link to="/admin/alltickets" style={{ textDecoration: 'none' }}>
                        <MenuItem to="/admin/alltickets" className={classes.item}>
                            <ConfirmationNumberIcon className={classes.icon} color="action" />Tickets
                        </MenuItem>
                    </Link>
                    <MenuItem className={classes.item}><FeedbackIcon className={classes.icon} color="action" />Feedback</MenuItem>
                </MenuList>
            </Paper>
        </div>
    );
}