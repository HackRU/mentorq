import {
  REQUEST_LOGIN,
  RECEIVED_LOGIN,
  FAILED_LOGIN,
  LOGOUT,
  REFRESH_TOKEN_RECEIVED,
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
  } = action;

  switch (type) {
    case REFRESH_TOKEN_RECEIVED:
      return { ...state, accessToken };
    case LOGOUT:
      return defaultState;
    case REQUEST_LOGIN:
      return { ...state, hasErrors: false, loadingLogin: true };
    case RECEIVED_LOGIN:
      return {
        ...state,
        isLoggedIn: true,
        loadingLogin: true,
        lcsToken: lcsToken,
        hasErrors: false,
        refreshToken,
        accessToken,
        email,
        // validUntil,
        director,
        mentor,
      };
    case FAILED_LOGIN:
      return { ...state, hasErrors: true };
    default:
      return state;
  }
};

export { auth };
