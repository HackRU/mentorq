import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
    Button,
    Card,
    CardContent,
    CardActions,
    CardHeader,
    Checkbox,
    Collapse,
    Fab,
    Grid,
    IconButton,
    Link,
    makeStyles,
    Tooltip,
    Typography
  } from "@material-ui/core";
import OneSignal from 'react-onesignal';

const Settings = () => {

    const isEngaged = () => {
        console.log("This user has tags: " + JSON.stringify(OneSignal.getTags()));
    }

    useEffect(() => {
        OneSignal.init({
          appId: "45002a2d-fe85-4da1-8076-3a9a779af843"
        });
      }, []);
    
    const handleClick = () => {
        console.log("clicked");

        OneSignal.sendTag("role", "mentor").then(() => {
            console.log("Sent Tag: (role, mentor)");
        })
    }

    return (
    <Card>
      <CardContent>
          <Button variant="contained" onClick={handleClick} title="Send an alert when a new ticket is posted.">Allow push notifications</Button>
          <Button variant="contained" onClick={isEngaged} title="Send an alert when a new ticket is posted.">Check tags</Button>
      </CardContent>
    </Card >
    );
    
}

export { Settings };