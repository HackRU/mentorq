import { URL, REFRESH_TOKEN_RECEIVED } from "./constants";
import { store } from "./store";
import { refreshTokens } from "./actions";

const request = async (url, body = null) => {
  const {
    auth: { accessToken: token }
  } = store.getState();

  let opts = { method: "GET" };

  if (body) {
    opts.method = "POST";
    opts.body = JSON.stringify(body);
  }

  const data = await fetch(`${URL}/api${url}`, {
    ...opts,
    headers: new Headers({ Authorization: `Bearer ${token}` })
  });

  const response = await data.json();
  const { code = "" } = response;

  switch (code) {
    case "token_not_valid":
      store.dispatch(refreshTokens());

      return new Promise((resolve, reject) => {
        const unsubscribe = store.subscribe(async type => {
          switch (type) {
            case REFRESH_TOKEN_RECEIVED:
              resolve(await request(url, body));
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
