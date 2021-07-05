import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducer from "./reducers";

const localStorageMiddleware = ({ getState }) => {
  return (next) => (action) => {
    const result = next(action);
    localStorage.setItem("redux-state", JSON.stringify(getState()));
    return result;
  };
};

const hydrateStore = () => {
  if (localStorage.getItem("redux-state") !== null) {
    return JSON.parse(localStorage.getItem("redux-state"));
  }
};

const localStore = createStore(
  reducer,
  hydrateStore(),
  applyMiddleware(thunk, localStorageMiddleware)
);

export { localStore };
