import React, { useEffect, useState } from "react";
import {
    Button,
    Card,
    CardContent,
    Switch,
} from "@material-ui/core";
import OneSignal from 'react-onesignal';

const Settings = () => {
    const [checked, setChecked] = useState(isAllowingNotifs);

    let tagResults = "";

    useEffect(() => {
        OneSignal.init({
            appId: "9857924c-89c4-4d05-80f5-a8422c67e85a"
        });
    }, []);

    const handleClick = (event) => {
        console.log("clicked");

        if (event.target.checked) {
            OneSignal.sendTag("notifications", "mentor").then(() => {
                console.log("Sent Tag: (notifications, mentor)");
            })
            setChecked(true);
        }
        else {
            OneSignal.deleteTag("notifications").then(() => {
                console.log("Deleted Tag: (notifications, mentor)");
            })
            OneSignal.deleteTag("tech");
            setChecked(false);
        }
    }

    const isAllowingNotifs = () => {
        //check if the tag (notifications, mentor) exists, if it does, then this mentor is allowing notifications

        OneSignal.getTags(function (tags) {
            console.log("This user has tags: " + JSON.stringify(tags));
            tagResults = tags;
        })

        for (var key in JSON.parse(JSON.stringify(tagResults))) {
            if (key === "notifications" && tagResults[key] === "mentor") {
                console.log("true");
                return true;
            }
        }

        console.log("false");
        return false;
    }

    return (

        <Card>
            <CardContent>
                <Switch title="Push Notifications" onChange={handleClick} checked={checked} />
                <text>Push Notifications</text>
                {/* <br /> <br />
          <Button variant="contained" onClick={isAllowingNotifs} title="Send an alert when a new ticket is posted.">Check allowing notifs</Button> */}
            </CardContent>
        </Card >
    );

}

export { Settings };