import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import { ToastProvider } from "react-toast-notifications";
import history from "./modules/history/history";
import Routes from "./routes/index";
import { SocketProvider } from "./context/socket/SocketContext";
import moment from "moment";
import "moment/locale/es";

import "./App.scss";

moment.locale("es");

ReactDOM.render(
  <Router history={history}>
    <SocketProvider>
      <ToastProvider>
        <Routes history={history} />
      </ToastProvider>
    </SocketProvider>
  </Router>,
  document.getElementById("root")
);
