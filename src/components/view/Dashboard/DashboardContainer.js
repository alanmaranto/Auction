import React, { Component } from "react";
import Sidebar from "../../../core/Sidebar/Sidebar";
import Navbar from "../../../core/Navbar/Navbar";
import Dashboard from './Dashboard'
import "../../../App.css";

class DashboardContainer extends Component {
  render() {
    return (
      <div className="app">
        <div className="generalContainer">
          <Sidebar />
          <div className="content-components">
            <Navbar />
            <div className="content-dynamic">
              <Dashboard />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DashboardContainer