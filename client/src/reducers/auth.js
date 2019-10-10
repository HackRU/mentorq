import {
  AUTH_REQUEST_LOGIN,
  AUTH_RECEIVED_LOGIN,
  AUTH_FAILED_LOGIN
} from "../constants";

const auth = (
  state = {
    isLoggedIn: false,
    requestedLogin: false,
    hasErrors: false,
    email: "",
    token: "",
    validUntil: ""
  },
  { type, email, token, validUntil }
) => {
  switch (type) {
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
        token,
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
