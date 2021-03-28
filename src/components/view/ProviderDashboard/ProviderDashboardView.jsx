import React, { Component } from "react";
import ProviderDashboard from "./ProviderDashboard";
import { isAuthenticated } from "../../../helpers/authenticate";
import { getAuctionsSuppliersInvitedByStep } from "../../../api/invitedSuppliers";
class ProviderDashboardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rfiAuctions: [],
      faAuctions: [],
      subAuctions: [],
    };
  }

  componentDidMount() {
    const { token } = isAuthenticated();
    if (token) {
      this.fetchRFIAuctions();
      this.fetchFAAuctions();
      this.fetchSubAuctions();
    }
  }

  fetchRFIAuctions = async () => {
    const { token } = isAuthenticated();
    const response = await getAuctionsSuppliersInvitedByStep(token, "rfi");

    if (response && response.status === 200) {
      this.setState({
        rfiAuctions: response.data.body,
      });
    }
  };

  fetchFAAuctions = async () => {
    const { token } = isAuthenticated();
    const response = await getAuctionsSuppliersInvitedByStep(token, "fa_hl");

    if (response && response.status === 200) {
      this.setState({
        faAuctions: response.data.body,
      });
    }
  };

  fetchSubAuctions = async () => {
    const { token } = isAuthenticated();
    const response = await getAuctionsSuppliersInvitedByStep(token, "sub");

    if (response && response.status === 200) {
      this.setState({
        subAuctions: this.filterFinalizedAuctions(response.data.body),
      });
    }
  };

  filterFinalizedAuctions = (auctions) => {
    const filtered =
      auctions &&
      auctions.filter((auction) => {
        return auction.auctionId.finalized === false;
      });

    return filtered;
  };

  render() {
    const { history } = this.props;
    const { rfiAuctions, faAuctions, subAuctions } = this.state;

    const { user } = isAuthenticated();
    return (
      <ProviderDashboard
        rfiAuctions={rfiAuctions}
        faAuctions={faAuctions}
        subAuctions={subAuctions}
        history={history}
        user={user}
      />
    );
  }
}

export default ProviderDashboardContainer;
