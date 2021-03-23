import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";

import store from "./store";

const animateBg = (i) => {
  document.body.style.backgroundColor = "hsl(" + i + ", 100%, 50%)";
  setTimeout(() => animateBg(++i), 100);
};
animateBg(0);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
