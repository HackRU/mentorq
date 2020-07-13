import { URL, REFRESH_TOKEN_RECEIVED } from "./constants";
import { store } from "./store";
import { refreshTokens } from "./actions";

const request = async ({ type: reqType, path: url, body = null }) => {
  const {
    auth: { accessToken: token },
  } = store.getState();

  const type = reqType ? reqType : body ? "POST" : "GET";
  let opts = { method: type };

  if (body) {
    opts.body = JSON.stringify(body);
  }

  const data = await fetch(`${URL}/api${url}`, {
    ...opts,
    headers: new Headers({
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    }),
  });

  const response = await data.json();
  const { code = "" } = response;

  switch (code) {
    case "token_not_valid":
      store.dispatch(refreshTokens());

      return new Promise((resolve) => {
        const unsubscribe = store.subscribe(async (type) => {
          switch (type) {
            case REFRESH_TOKEN_RECEIVED:
              resolve(await request({ type, url, body }));
              unsubscribe();
              break;
            default:
              return;
          }
        });
      });

    default:
      return response;
  }
};

export { request };
