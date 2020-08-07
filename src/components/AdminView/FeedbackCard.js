import React, { useState, useEffect } from "react";
import { request } from "../.././util";
import {
    CardContent,
    Card,
    FormLabel as Label,
    Grid,
    Typography,
} from "@material-ui/core";
import Rating from '@material-ui/lab/Rating';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
    },
    rating: {
        position: "absolute",
        top: "5px",
        right: "5px",
    }
}));

const FeedbackCard = ({
    feedback: { id, comments, rating },
}) => {
    const [ticket, setTicket] = useState([]);
    const classes = useStyles();

    useEffect(() => {
        const update = async () => {
            setTicket(await request({ path: `/tickets/${id}` }));
        };
        const interval = setInterval(update, 3000);
        update();
        return () => {
            clearInterval(interval);
        };

    }, []);


    return (
        <Card className={classes.root} >
            <CardContent>
                <Grid container spacing={1}>
                    <Grid item xs={9}>
                        <Typography variant="h5" gutterBottom >
                            Feedback for {ticket.title}
                        </Typography>
                    </Grid>
                    <Grid item xs={1} justify="space-between">
                        <Typography variant="h5" gutterBottom >
                            <Rating name="read-only" value={rating} readOnly />
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Label>Comments</Label>
                        <Typography variant="body1" gutterBottom>
                            {comments}
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Label>User</Label>
                        <Typography variant="body1" gutterBottom>
                            {ticket.owner_email}
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Label>Mentor</Label>
                        <Typography variant="body1" gutterBottom>
                            {ticket.mentor}
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card >
    );

};

export { FeedbackCard };