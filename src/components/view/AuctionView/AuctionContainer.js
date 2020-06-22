import React, { Component, useEffect, useState } from "react";
import Auction from "./Auction";
import { getAuctionById } from "../../../api";
import { isAuthenticated } from "../../../helpers/authenticate";
import "moment/locale/es";

class AuctionContainer extends Component {
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
    const { id } = this.props.match.params;
    const response = await getAuctionById(id);

    if (response && response.status && response.status === 200) {
      this.setState({ auction: response.data.body });
    }
  };

  render() {
    const { auction } = this.state;
    return <Auction auction={auction} />;
  }
}

export default AuctionContainer;
