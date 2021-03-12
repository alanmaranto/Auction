import React, { Component } from "react";
import AuctionWaitingView from "./AuctionWaitingView";
import { Message } from "semantic-ui-react";
import {
  getAuctionById,
  postProviders,
  getSelectedProvidersByAuctionId,
} from "../../../api/api";
import { postInvitedSuppliers } from "../../../api/invitedSuppliers";
import { getProviders } from "../../../api/suppliers";
import { isAuthenticated } from "../../../helpers/authenticate";
import "moment/locale/es";

class AuctionWaitingContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auction: {},
    };
  }

  componentDidMount() {
    const { token } = isAuthenticated();
    if (token) {
      this.fetchAuction();
    }
  }

  fetchAuction = async () => {
    const { token } = isAuthenticated();

    const { auctionId } = this.props;
    const response = await getAuctionById(token, auctionId);

    if (response && response.status && response.status === 200) {
      this.setState({ auction: response.data.body });
    }
  };

  render() {
    const {
      auction,
    } = this.state;

    return (
      <AuctionWaitingView
        auction={auction}
      />
    );
  }
}

export default AuctionWaitingContainer;
