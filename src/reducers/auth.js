import {
  REQUEST_LOGIN,
  RECEIVED_LOGIN,
  FAILED_LOGIN,
  LOGOUT,
  REFRESH_TOKEN_RECEIVED
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
  loadingLogin: false
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
    name
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
    default:
      return state;
  }
};

export { auth };