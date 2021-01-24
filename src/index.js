import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import { ToastProvider } from "react-toast-notifications";
import history from "./modules/history/history";
import Routes from "./routes/index";


import "./App.scss";

ReactDOM.render(
  <Router history={history}>
    <ToastProvider>
      <Routes history={history} />
    </ToastProvider>
  </Router>,
  document.getElementById("root")
);
