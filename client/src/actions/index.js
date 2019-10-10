import {
  AUTH_REQUEST_LOGIN,
  AUTH_RECEIVED_LOGIN,
  AUTH_FAILED_LOGIN
} from "../constants";

export const requestLogin = ({ email, password }) => ({
  type: AUTH_REQUEST_LOGIN,
  email,
  password
});

export const recievedLogin = ({ token, email, validUntil }) => ({
  type: AUTH_RECEIVED_LOGIN,
  email,
  token,
  validUntil
});

export const failedLogin = () => ({
  type: AUTH_FAILED_LOGIN
});

export const loginAction = ({ email, password }) => {
  return dispatch => {
    dispatch(requestLogin({ email, password }));

    return (async () => {
      try {
        const body = JSON.stringify({
          email,
          password
        });

        const data = await fetch("https://api.hackru.org/prod/authorize", {
          method: "POST",
          body
        });

        const {
          body: {
            auth: { token, valid_until: validUntil }
          }
        } = await data.json();

        dispatch(recievedLogin({ token, email, validUntil }));
      } catch (e) {
        dispatch(failedLogin());
      }
    })();
  };
};
