import React, { useState, useEffect } from "react";
import { FeedbackContainer } from "./FeedbackContainer";
import { request } from "../../util";

export default function Feedback() {
    const [feedbackList, setFeedbackList] = useState([]);

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
