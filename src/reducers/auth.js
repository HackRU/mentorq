import { Satellite } from "@material-ui/icons";
import {
  REQUEST_LOGIN,
  RECEIVED_LOGIN,
  FAILED_LOGIN,
  LOGOUT,
  REFRESH_TOKEN_RECEIVED,
  UPDATE_OPEN,
  UPDATE_CLAIMED
} from "../constants";

const defaultState = {
  isLoggedIn: false,
  hasErrors: false,
  email: "",
  refreshToken: "",
  accessToken: "",
  lcsToken: "",
  // validUntil: "",
  director: false,
  mentor: false,
  name: "",
  loadingLogin: false,
  numOpen: 0,
  numClaimed: 0
};

const auth = (state = defaultState, action) => {
  const {
    type,
    email,
    lcsToken,
    accessToken,
    refreshToken,
    // validUntil,
    director,
    mentor,
    name,
    numOpen,
    numClaimed
  } = action;

  // I was playing with this to see how i could manipulate the loading screen  
  switch (type) {
    case REFRESH_TOKEN_RECEIVED:
      return { ...state, accessToken };
    case LOGOUT:
      return defaultState;
    case REQUEST_LOGIN:
      // If you change this to false it will not load at all 
      return { ...state, hasErrors: false, loadingLogin: true };
    case RECEIVED_LOGIN:
      return {
        ...state,
        isLoggedIn: true,
        loadingLogin: false,
        lcsToken: lcsToken,
        hasErrors: false,
        refreshToken,
        accessToken,
        email,
        // validUntil,
        director,
        mentor,
        name,
      };
    case FAILED_LOGIN:
      return { ...state, loadingLogin: false, hasErrors: true };
    case UPDATE_OPEN:
      return {
        ...state,
        numOpen: numOpen
      }
    case UPDATE_CLAIMED:
      return {
        ...state,
        numClaimed: numClaimed
      }
    default:
      return state;
  }
};

export { auth };