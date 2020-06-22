import React, { useEffect, useState } from "react";
import Sidebar from "../../../core/Sidebar/Sidebar";
import Navbar from "../../../core/Navbar/Navbar";
import Dashboard from "./Dashboard";
import history from "../../../modules/history/history";
import { isAuthenticated } from "../../../helpers/authenticate";

import { getActiveAuctionsByUser } from "../../../api";
import { showAuctions } from "./helpers";

import "../../../App.css";

const DashboardContainer = () => {
  const [auctions, setAuctions] = useState([]);

  const { user } = isAuthenticated();

  const fetchActiveAuctions = async () => {
    const {
      user: { _id },
      token,
    } = isAuthenticated();
    const response = await getActiveAuctionsByUser(token, _id);

    if (response && response.status === 200) {
      setAuctions(response.data.body);
    }
  };

  useEffect(() => {
    fetchActiveAuctions();
  }, []);

  const sendToAuctionView = (redirect) => {
    history.push(`${redirect}`);
  };

  const activeAuctions = showAuctions(
    auctions,
    "activeAuction",
    sendToAuctionView
  );

  return (
    <div className="app">
      <div className="generalContainer">
        <Sidebar />
        <div className="content-components">
          <Navbar />
          <div className="content-dynamic">
            <Dashboard
              activeAuctions={activeAuctions}
              user={user}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardContainer;
