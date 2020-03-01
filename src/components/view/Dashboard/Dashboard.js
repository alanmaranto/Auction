import React, { Component } from "react";
import Sidebar from "../../../core/Sidebar/Sidebar";
import Navbar from "../../../core/Navbar/Navbar";
import Buyer from "./BuyerDashboard";
import "../../../App.css";
import './style.css';

class Dashboard extends Component {
  render() {
    return (
      <div className="app">
        <div>
          <Navbar />
        </div>
        <div className="generalContainer">
          <Sidebar />
          <Buyer />
        </div>
      </div>
    );
  }
}

export default Dashboard;
