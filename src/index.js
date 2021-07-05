import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { localStore } from "./localStore";
import { CoreProvider } from "@hackru/frontend-core";
import LINKER from "./Linker";
import CONFIG from "./Config";

ReactDOM.render(
  <Provider store={localStore}>
    <App />
  </Provider>,
  document.getElementById("root")
);
