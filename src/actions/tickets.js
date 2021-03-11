import {
    UPDATE_OPEN,
    UPDATE_CLAIMED
} from "../constants";

const updateOpen = ({ numOpen }) => ({
    type: UPDATE_OPEN,
    numOpen
});

const updateClaimed = ({ numClaimed }) => ({
    type: UPDATE_OPEN,
    numClaimed
});

export { updateOpen, updateClaimed };
