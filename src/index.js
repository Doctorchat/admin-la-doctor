import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ConfigProvider } from "antd";
import { setUserToAuthorized } from "./store/actions/userAction";
import store from "./store";
import history from "./utils/history";

import App from "./App";

import "./index.scss";
import "./antd.less";

if (localStorage.getItem("isAuthorized") === "true") store.dispatch(setUserToAuthorized());

const queryClient = new QueryClient();

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <Router history={history}>
        <ConfigProvider form={{ validateMessages: { required: "Acest câmp este obligatoriu" } }}>
          <App />
        </ConfigProvider>
      </Router>
    </Provider>
  </QueryClientProvider>,
  document.getElementById("root")
);
