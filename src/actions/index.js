import {
  AUTH_REQUEST_LOGIN,
  AUTH_RECEIVED_LOGIN,
  AUTH_FAILED_LOGIN,
  CREATE_TICKET_REQUEST,
  LOGOUT,
  URL,
  REFRESH_TOKEN_RECEIVED,
  REFRESH_TOKEN_REQUEST,
  CREATE_TICKET_RECEIVED,
  HACKRU_URL
} from "../constants";

export const requestLogin = ({ email, password }) => ({
  type: AUTH_REQUEST_LOGIN,
  email,
  password
});

export const refreshTokenRequest = () => ({
  type: REFRESH_TOKEN_REQUEST
});

export const refreshTokenReceived = ({ accessToken }) => ({
  type: REFRESH_TOKEN_RECEIVED,
  accessToken
});

export const refreshTokens = () => {
  return (dispatch, getState) => {
    dispatch(refreshTokenRequest());

    return (async () => {
      try {
        const {
          auth: { refreshToken }
        } = getState();

        const data = await fetch(`${URL}/api/auth/refresh/`, {
          method: "POST",
          headers: new Headers({ "content-type": "application/json" }),
          body: JSON.stringify({
            refresh: refreshToken
          })
        });

        let { access: accessToken } = await data.json();

        dispatch(
          refreshTokenReceived({
            accessToken
          })
        );
      } catch (e) {
        console.log("Failed to fetch token");
        // dispatch(refreshTokenFi());
      }
    })();
  };
};
export const requestTicket = ({
  status = "",
  title = "",
  comment = "",
  contact = "",
  location = ""
}) => ({
  type: CREATE_TICKET_REQUEST,
  status,
  title,
  comment,
  contact,
  location
});

export const createTicketRequest = ({
  status,
  title,
  comment,
  contact,
  location
}) => ({
  type: CREATE_TICKET_REQUEST,
  status,
  title,
  comment,
  contact,
  location
});

export const createTicketReceived = () => ({
  type: CREATE_TICKET_RECEIVED
});

export const createTicket = ({ title, comment, contact, location }) => {
  return (dispatch, getState) => {
    dispatch(
      createTicketRequest({
        title,
        comment,
        contact,
        location
      })
    );

    return (async () => {
      try {
        const {
          auth: { email, accessToken }
        } = getState();

        const data = await fetch(`${URL}/api/tickets/`, {
          method: "POST",
          headers: new Headers({
            "content-type": "application/json",
            Authorization: `Bearer ${accessToken}`
          }),
          body: JSON.stringify({
            status: "OPEN",
            owner_email: email,
            title,
            comment,
            contact,
            location
          })
        });

        let body = await data.json();

        console.log(body);

        // dispatch(
        //   recievedLogin({
        //     email,
        //     validUntil,
        //     lcsToken,
        //     refreshToken,
        //     accessToken
        //   })
        // );
      } catch (e) {
        dispatch(failedLogin());
      }
    })();
  };
};

export const logout = () => ({
  type: LOGOUT
});

export const recievedLogin = ({
  email,
  lcsToken,
  refreshToken,
  accessToken,
  validUntil
}) => ({
  type: AUTH_RECEIVED_LOGIN,
  email,
  lcsToken,
  refreshToken,
  accessToken,
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
        let data;

        data = await fetch(`${HACKRU_URL}/authorize`, {
          method: "POST",
          headers: new Headers({ "content-type": "application/json" }),
          body: JSON.stringify({
            email,
            password
          })
        });

        let {
          body: {
            auth: { token: lcsToken, valid_until: validUntil }
          }
        } = await data.json();

        data = await fetch(`${URL}/api/auth/token/`, {
          method: "POST",
          headers: new Headers({ "content-type": "application/json" }),
          body: JSON.stringify({
            email,
            lcs_token: lcsToken
          })
        });

        let { refresh: refreshToken, access: accessToken } = await data.json();

        dispatch(
          recievedLogin({
            email,
            validUntil,
            lcsToken,
            refreshToken,
            accessToken
          })
        );
      } catch (e) {
        dispatch(failedLogin());
      }
    })();
  };
};

// Start of a function to find out an account version via LCS -> may not be necessary
// export const  identifyAction = ({email, lcsToken}) => {
//   return (async () =>{
//       let token = lcsToken
//       let query = {"role": "their roles"}
//       let data = await fetch(`${URL}/read`, {
//         method: "POST",
//         headers: new Headers({ "content-type": "application/json" }),
//         body: JSON.stringify({
//           email,
//           token,
//           query
//         })
//       });
//     })
// }
