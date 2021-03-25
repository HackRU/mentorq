import React, { useState, useEffect } from "react";
import DashboardContainer from "../DashboardContainer";
import { FeedbackContainer } from "./FeedbackContainer";
import { request } from "../../util";
import { Grid } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
}));

export default function Feedback() {
    const [feedbackList, setFeedbackList] = useState([]);
    const classes = useStyles();
    const isLoggedIn = useSelector((store) => store.auth.isLoggedIn);

    useEffect(() => {
        const update = async () => {
            setFeedbackList(await request({ path: "/feedback/" }));
        };

        const interval = setInterval(update, 30000);
        update();
        return () => {
            clearInterval(interval);
        };

    }, []);

    return (
        <FeedbackContainer feedbackList={feedbackList} />
    );
}
