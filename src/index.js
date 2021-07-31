/* eslint-disable import/no-unresolved */
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { GlobalStyle } from "@styles/GlobalStyle";
import { BrowserRouter } from "react-router-dom";
import "antd/dist/antd.less";

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root"),
);
