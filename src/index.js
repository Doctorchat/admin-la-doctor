import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import { setUserToAuthorized } from "./store/actions/userAction";
import { Router } from "react-router-dom";
import history from "./utils/history";
import { ConfigProvider } from "antd";

import App from "./App";

import "./index.scss";
import "./antd.less";

if (localStorage.getItem("isAuthorized") === "true") store.dispatch(setUserToAuthorized());

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <ConfigProvider form={{ validateMessages: { required: "Acest câmp este obligatoriu" } }}>
        <App />
      </ConfigProvider>
    </Router>
  </Provider>,
  document.getElementById("root")
);
