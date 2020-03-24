import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import history from './modules/history/history';
import Routes from "./routes/index";

ReactDOM.render(
  <Router history={history}>
    <Routes />
  </Router>,
  document.getElementById("root")
);
