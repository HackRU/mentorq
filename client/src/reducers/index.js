import { combineReducers } from "redux";
import { auth } from "./auth";
import { tickets } from "./tickets";

const rootReducer = combineReducers({
  auth,
  tickets
});

export default rootReducer;
