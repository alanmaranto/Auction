import React, { Component } from "react";
import Sidebar from "../../../core/Sidebar/Sidebar";
import Navbar from "../../../core/Navbar/Navbar";
import ProviderDashboard from "./ProviderDashboard";
import history from "../../../modules/history/history";
import { isAuthenticated } from "../../../helpers/authenticate";

import { getInvitedAuctionsByProvider } from "../../../api";
import { showAuctions } from "../BuyerDashboard/helpers";

import "../../../App.css";

class ProviderDashboardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auctions: [],
    };
  }

  componentDidMount() {
    const { token } = isAuthenticated();
    if (token) {
      this.fetchAuctions();
    }
  }

  fetchAuctions = async () => {
    const { token, user } = isAuthenticated();
    const response = await getInvitedAuctionsByProvider(token, user._id);

    if (response && response.status === 200) {
      this.setState({ auctions: response.data.body });
    }
    console.log(response);
  };

  sendToAuctionView = (redirect) => {
    history.push(`${redirect}`);
  };

  render() {
    const { auctions } = this.state;

    console.log('first auc', auctions)
    
    const activeAuctions = showAuctions(
      auctions,
      "activeAuction",
      this.sendToAuctionView
    );

    const { user } = isAuthenticated();
    return (
      <div className="app">
        <div className="generalContainer">
          <Sidebar />
          <div className="content-components">
            <Navbar />
            <div className="content-dynamic">
              <ProviderDashboard activeAuctions={activeAuctions} user={user} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProviderDashboardContainer;
