import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import reducer from "./reducers";

const localStorageMiddleware = ({ getState }) => {
  return next => action => {
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

const store = createStore(
  reducer,
  hydrateStore(),
  applyMiddleware(thunk, localStorageMiddleware)
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
