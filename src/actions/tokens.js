import { URL, REFRESH_TOKEN_RECEIVED } from "../constants";
import { logoutUser } from "./login";

const refreshTokenReceived = ({ accessToken }) => ({
  type: REFRESH_TOKEN_RECEIVED,
  accessToken,
});

const refreshTokens = () => {
  return async (dispatch, getState) => {
    try {
      const refreshRequest = await fetch(`${URL}/api/auth/refresh/`, {
        method: "POST",
        headers: new Headers({ "content-type": "application/json" }),
        body: JSON.stringify({ refresh: getState().auth.refreshToken }),
      });
      const refreshJson = await refreshRequest.json();

      dispatch(refreshTokenReceived({ accessToken: refreshJson.access }));
    } catch (e) {
      dispatch(logoutUser());
    }
  };
};

export { refreshTokens, refreshTokenReceived };
