import React, { useEffect, useState } from "react";
import Sidebar from "../../../core/Sidebar/Sidebar";
import Navbar from "../../../core/Navbar/Navbar";
import Dashboard from "./Dashboard";
import history from "../../../modules/history/history";
import { isAuthenticated } from "../../../helpers/authenticate";

import { getAuctions } from "../../../api";
import { showAuctions } from "./helpers";

import "../../../App.css";

const DashboardContainer = () => {
  const [error, setError] = useState(false);
  const [auctions, setAuctions] = useState([]);

  const { user } = isAuthenticated();

  const fetchProducts = async () => {
    const response = await getAuctions();

    if (response.status === 200) {
      setAuctions(response.data.body);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const sendToAuctionView = (redirect) => {
    history.push(`${redirect}`);
  };

  const activeAuctions = showAuctions(
    auctions,
    "activeAuction",
    sendToAuctionView
  );
  const finalizedAuctions = showAuctions(
    auctions,
    "finalizedAuction",
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
              finalizedAuctions={finalizedAuctions}
              user={user}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardContainer;
