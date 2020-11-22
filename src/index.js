import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import { ToastProvider } from "react-toast-notifications";
import history from "./modules/history/history";
import Routes from "./routes/index";
import Sidebar from "./core/Sidebar";
import Navbar from "./core/Navbar";

import "./App.css";

ReactDOM.render(
  <Router history={history}>
    <ToastProvider>
      <div className="app">
        <div className="generalContainer">
          <Sidebar />
          <div className="content-components">
            <Navbar />
            <div className="content-dynamic">
              <Routes />
            </div>
          </div>
        </div>
      </div>
    </ToastProvider>
  </Router>,
  document.getElementById("root")
);
