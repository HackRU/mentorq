import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { FixedSizeList } from 'react-window';
import Typography from '@material-ui/core/Typography';
import StarIcon from '@material-ui/icons/Star';


const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: '0 2px 1px 0px #ababab',
        borderRadius: '5px 5px 5px 5px',
    },
    title: {
        padding: '0 15px',
        backgroundColor: '#e91e63',
        color: 'white',
        borderRadius: '5px 5px 0px 0px',
    },
    icon: {
        color: '#fcba03',
    }
}));

function renderRow(props) {
    const { index, style } = props;
    const classes = useStyles();

    return (
        <ListItem button style={style} key={index}>
            <ListItemText primary={`Mentor ${index + 1}`} />
            <StarIcon className={classes.icon} />
        </ListItem>
    );
}

renderRow.propTypes = {
    index: PropTypes.number.isRequired,
    style: PropTypes.object.isRequired,
};

export default function VirtualizedList() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Typography variant="h6" className={classes.title}>
                Mentor Leaderboard
            </Typography>
            <FixedSizeList height={230} itemSize={46} itemCount={5}>
                {renderRow}
            </FixedSizeList>
        </div>
    );
}