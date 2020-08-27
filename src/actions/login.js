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

function parseJwt(token){
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(atob(base64).split("").map(function (c) {
      return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(""));
  return JSON.parse(jsonPayload);
}

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

      if (lcsJson.statusCode !== 200) {
        console.log("FAILED!")
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
      const requestJSON = await mentorQRequest.json();
      const mentorQJson = parseJwt(requestJSON.access)
      //console.log(mentorQJson)

      dispatch(
        recievedLoginUser({
          email,
          // validUntil: lcsValidUntil,
          lcsToken: lcsToken,
          refreshToken: requestJSON.refresh,
          accessToken: requestJSON.access,
          director: mentorQJson.director,
          mentor: mentorQJson.mentor,
          name: mentorQJson.name,
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
