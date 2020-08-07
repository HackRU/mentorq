import React, { useState, useEffect } from "react";
import { request } from "../.././util";
import { logoutUser } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import {
    CardContent,
    Card,
    FormLabel as Label,
    Grid,
    Typography,
    Button,
    ButtonGroup,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@material-ui/core";
import Rating from '@material-ui/lab/Rating';



const FeedbackCard = ({
    feedback: { id, comments, rating },
}) => {
    const [ticket, setTicket] = useState([]);

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
        <Card>
            <CardContent>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Typography variant="h5" gutterBottom>
                            Feedback for {ticket.title}
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Label>Rating</Label>
                        <Typography variant="body1" gutterBottom>
                            {rating} stars
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
                    <Grid item xs={12}>
                        <Label>Comments</Label>
                        <Typography variant="body1" gutterBottom>
                            {comments}
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card >
    );

};

export { FeedbackCard };