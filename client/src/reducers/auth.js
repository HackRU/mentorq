import {
  AUTH_REQUEST_LOGIN,
  AUTH_RECEIVED_LOGIN,
  AUTH_FAILED_LOGIN,
  LOGOUT,
  REFRESH_TOKEN_REQUEST,
  REFRESH_TOKEN_RECEIVED
} from "../constants";

const auth = (
  state = {
    isLoggedIn: false,
    requestedLogin: false,
    hasErrors: false,
    email: "",
    refreshToken: "",
    accessToken: "",
    lcsToken: "",
    validUntil: ""
  },
  { type, email, lcsToken, accessToken, refreshToken, validUntil }
) => {
  switch (type) {
    case REFRESH_TOKEN_RECEIVED:
      return {
        ...state,
        accessToken
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false
      };
    case AUTH_REQUEST_LOGIN:
      return {
        ...state,
        requestedLogin: true
      };
    case AUTH_RECEIVED_LOGIN:
      return {
        ...state,
        isLoggedIn: true,
        requestedLogin: false,
        lcsToken,
        refreshToken,
        accessToken,
        email,
        validUntil
      };
    case AUTH_FAILED_LOGIN:
      return {
        ...state,
        requestedLogin: false,
        hasErrors: true
      };
    default:
      return state;
  }
};

export { auth };
