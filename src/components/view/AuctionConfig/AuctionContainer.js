import React, { Component } from "react";
import AuctionView from "./AuctionConfigView";
import { isAuthenticated } from "../../../helpers/authenticate";
import { getAuctionInfo } from "../../../api/api";

class AuctionContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auctionId: false,
      auctionInfo: {},
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
    const { id } = this.props.match.params;
    this.setState({ auctionId: id });
    const response = await getAuctionInfo(token, id);
    if (response && response.status && response.status === 200) {
      this.setState({ auctionInfo: response.data.body });
    }
  };

  render() {
    const { auctionInfo, auctionId } = this.state;

    return (
      <AuctionView
        history={1}
        auction={auctionInfo}
        auctionId={auctionId}
        fetchAuction={this.fetchAuction}
      />
    );
  }
}

export default AuctionContainer;
