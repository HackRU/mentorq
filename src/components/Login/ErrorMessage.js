import React from "react";
import { Typography } from "@material-ui/core";

// Error Message if you provide the wrong credentials to log in 
const ErrorMessage = () => {
    return (<Typography variant="h6">
        <div style={{ color: "white" }}> Invalid Credentials Provided  </div>
    </Typography>)
}

export { ErrorMessage }