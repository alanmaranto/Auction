import React, { Component } from "react";
import RunningAuction from "./RunningAuction";

import { isAuthenticated } from "../../../helpers/authenticate";
import { getRunningAuctionById, posMessage, updateAuction } from "../../../api/api";
import { socket, registerUserIOToken } from "../../../socket";

class RunningAuctionView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      messages: [],
      auction: {},
      token: undefined,
      lastMessage: {},
      finalized: false,
    };
  }

  componentDidMount = () => {
    this.fetchAuction();
    this.listenMessages();
    const { token, user } = isAuthenticated();
    if (token) {
      registerUserIOToken(user._id);
      this.setState({ token });
    }
  };

  componentDidUpdate(prevProps) {
    const { lenghtData } = this.props;
    if (prevProps.lenghtData !== lenghtData) {
      this.getWindow();
    }
    const { token } = isAuthenticated();
    const { token: stateToken } = this.state;
    if (token !== undefined && token !== stateToken) {
      registerUserIOToken(token);
    }
  }

  fetchAuction = async () => {
    const { id: currentAuction } = this.props.match.params;
    const { token } = isAuthenticated();
    const response = await getRunningAuctionById(token, currentAuction);
    if (response && response.data && response.data.body) {
      const { lastMessage, auctionResult } = response.data.body;

      this.setState({ auction: auctionResult, lastMessage });
    }
  };

  listenMessages = () => {
    socket.on("wellcome", (data) => {
    });
    socket.on("newMessage", (data) => {
      const { id: currentAuction } = this.props.match.params;
      if (data.auctionId === currentAuction) {
        this.setState({ lastMessage: data });
      }
    });
  };

  onChange = (param, value) => {
    this.setState({ [param]: value });
  };

  onSubmit = async () => {
    const { message, auction } = this.state;
    const { token, user } = isAuthenticated();
    const result = await posMessage(token, { auction, message, user});
    this.setState({ message: ''})
  };

  onFinalizedAuction = () => {
    const { id: currentAuction } = this.props.match.params;
    const { finalized } = this.state;
    const { token } = isAuthenticated()
    const data = {
      finalized: !finalized
    }
    const result = updateAuction(currentAuction, token, data);
  }

  render() {
    const { auction, message, lastMessage } = this.state;
    const { user } = isAuthenticated();
    return (
      <RunningAuction
        title={auction.title}
        minimumBid={auction.minimumBid}
        minimumPrice={auction.minimumPrice}
        onChange={this.onChange}
        message={message}
        role={user.role}
        onSubmit={this.onSubmit}
        lastMessage={lastMessage}
        endingAuction={auction.endingAuction}
        onFinalizedAuction={this.onFinalizedAuction}
      />
    );
  }
}

export default RunningAuctionView;
