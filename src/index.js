import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import { ToastProvider } from 'react-toast-notifications'
import history from './modules/history/history';
import Routes from "./routes/index";

ReactDOM.render(
  <Router history={history}>
    <ToastProvider>
      <Routes />
    </ToastProvider>
  </Router>,
  document.getElementById("root")
);
