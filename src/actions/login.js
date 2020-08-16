import {
  REQUEST_LOGIN,
  RECEIVED_LOGIN,
  FAILED_LOGIN,
  LOGOUT,
  URL,
  HACKRU_URL,
} from "../constants";

const logoutUser = () => ({
  type: LOGOUT,
});

const requestLoginUser = ({ email, password }) => ({
  type: REQUEST_LOGIN,
  email,
  password,
});

const recievedLoginUser = ({ ...values }) => ({
  type: RECEIVED_LOGIN,
  ...values,
});

const failedLoginUser = () => ({ type: FAILED_LOGIN });

const loginUser = ({ email, password }) => {
  return async (dispatch) => {
    dispatch(requestLoginUser({ email, password }));

    try {
      const lcsRequest = await fetch(`${HACKRU_URL}/authorize`, {
        method: "POST",
        headers: new Headers({ "content-type": "application/json" }),
        body: JSON.stringify({ email, password }),
      });
      const lcsJson = await lcsRequest.json();
      if (lcsJson.statusCode != 200) {
        dispatch(failedLoginUser());
        return;
      }
      const lcsToken = lcsJson.body.token;
      // const lcsValidUntil = lcsJson.body.auth.validUntil;

      const mentorQRequest = await fetch(`${URL}/api/auth/token/`, {
        method: "POST",
        headers: new Headers({ "content-type": "application/json" }),
        body: JSON.stringify({ email, lcs_token: lcsToken }),
      });
      const mentorQJson = await mentorQRequest.json();

      dispatch(
        recievedLoginUser({
          email,
          // validUntil: lcsValidUntil,
          lcsToken: lcsToken,
          refreshToken: mentorQJson.refresh,
          accessToken: mentorQJson.access,
          director: mentorQJson.director,
          mentor: mentorQJson.mentor,
        })
      );
    } catch (e) {
      dispatch(failedLoginUser());
    }
  };
};

export {
  loginUser,
  failedLoginUser,
  requestLoginUser,
  recievedLoginUser,
  logoutUser,
};
