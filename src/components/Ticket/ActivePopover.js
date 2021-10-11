import React from 'react';
import { request } from "../.././util";
import { makeStyles } from '@material-ui/core/styles';
import {
    Button,
    ButtonGroup,
    Popover,
    IconButton
} from '@material-ui/core/';
import ActiveIcon from '@material-ui/icons/Lens';
import InactiveIcon from '@material-ui/icons/TripOrigin';

const useStyles = makeStyles((theme) => ({
    button: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        justifyContent: "flex-start"
    },
    icon: {
        width: '15px',
    }
}));

export default function ActivePopover(props) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [active, setActive] = React.useState(props.isActive);

    const toggleActive = async (isActive) => {
        await request({
            path: `/tickets/${props.id}/`,
            type: "PATCH",
            body: {
                active: isActive,
            },
        });
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const markActive = () => {
        setActive(true);
        console.log("active: true");
        toggleActive(true);
    }

    const markInactive = () => {
        setActive(false);
        console.log("active: false");
        toggleActive(false);
    }

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <div>
            <IconButton aria-label={id} onClick={handleClick} disabled={!props.editable}>
                {active ?
                    <ActiveIcon className={classes.icon} color="secondary" /> :
                    <InactiveIcon className={classes.icon} />}
            </IconButton>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <ButtonGroup
                    orientation="vertical"
                    aria-label="vertical contained primary button group"
                    variant="text"
                    align="left"
                >
                    <Button
                        onClick={markActive}
                        className={classes.button}
                        startIcon={<ActiveIcon className={classes.icon} color="secondary" />}>
                        Mark Active
                    </Button>
                    <Button
                        onClick={markInactive}
                        className={classes.button}
                        startIcon={<InactiveIcon className={classes.icon} />}>
                        Mark Inactive
                    </Button>
                </ButtonGroup>
            </Popover>
        </div>
    );
}