import React from "react";
import { Button, } from "@material-ui/core";

const SignInButton = ({ onSubmit }) => {
    return (
        <Button
            id="button"
            type="submit"
            variant="contained"
            color="secondary"
            onClick={onSubmit}
        >
            <div style={{ color: 'white' }}> {">"} </div>
        </Button>)
}

export { SignInButton };