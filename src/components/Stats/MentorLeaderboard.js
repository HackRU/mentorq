import React, { useState, useEffect } from "react";
import Rating from "@material-ui/lab/Rating";
import { request } from "../../util";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { FixedSizeList } from "react-window";
import Typography from "@material-ui/core/Typography";
import StarIcon from "@material-ui/icons/Star";

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: "0 2px 1px 0px #ababab",
        borderRadius: "5px 5px 5px 5px",
    },
    title: {
        padding: "0 15px",
        backgroundColor: theme.palette.secondary.main,
        color: "white",
        borderRadius: "5px 5px 0px 0px",
    },
    icon: {
        color: "#fcba03",
    },
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

export default function MentorLeaderboard() {
    const classes = useStyles();
    const [leaderList, setLeaderList] = useState(undefined);

    useEffect(() => {
        const update = async () => {
            setLeaderList(await request({ path: "/feedback/leaderboard?limit=5" }));
        };
        const interval = setInterval(update, 30000);
        update();
        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <div className={classes.root} style={{ position: "relative", zIndex: "1" }}>
            <Typography variant="h6" className={classes.title}>
                Mentor Leaderboard
      </Typography>

            {typeof leaderList !== "undefined" && leaderList.length >= 1 ? (
                <ListItem button key={0}>
                    <ListItemText primary={"1. " + leaderList[0].mentor} />
                    <Rating
                        name="read-only"
                        value={leaderList[0].average_rating}
                        readOnly
                        precision={0.1}
                    />
                </ListItem>
            ) : (
                    <ListItem button key={0}>
                        <ListItemText primary={"Loading..."} />
                    </ListItem>
                )}
            {typeof leaderList !== "undefined" && leaderList.length >= 2 ? (
                <ListItem button key={1}>
                    <ListItemText primary={"2. " + leaderList[1].mentor} />
                    <Rating
                        name="read-only"
                        value={leaderList[1].average_rating}
                        readOnly
                        precision={0.1}
                    />
                </ListItem>
            ) : null}
            {typeof leaderList !== "undefined" && leaderList.length >= 3 ? (
                <ListItem button key={2}>
                    <ListItemText primary={"3. " + leaderList[2].mentor} />
                    <Rating
                        name="read-only"
                        value={leaderList[2].average_rating}
                        readOnly
                        precision={0.1}
                    />
                </ListItem>
            ) : null}
            {typeof leaderList !== "undefined" && leaderList.length >= 4 ? (
                <ListItem button key={3}>
                    <ListItemText primary={"4. " + leaderList[3].mentor} />
                    <Rating
                        name="read-only"
                        value={leaderList[3].average_rating}
                        readOnly
                        precision={0.1}
                    />
                </ListItem>
            ) : null}
            {typeof leaderList !== "undefined" && leaderList.length == 5 ? (
                <ListItem button key={4}>
                    <ListItemText primary={"5. " + leaderList[4].mentor} />
                    <Rating
                        name="read-only"
                        value={leaderList[4].average_rating}
                        readOnly
                        precision={0.1}
                    />
                </ListItem>
            ) : null}
        </div>
    );
}
