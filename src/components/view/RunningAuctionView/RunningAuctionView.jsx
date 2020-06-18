import React, { Component } from "react";
import RunningAuction from "./RunningAuction";

import { isAuthenticated } from "../../../helpers/authenticate";
import { getRunningAuctionById, posMessage } from "../../../api";
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
      this.setState({ auction: response.data.body });
    }
  };

  listenMessages = () => {
    socket.on("wellcome", (data) => {
      console.log("Welcome running auction", data);
    });
    socket.on("newMessage", (data) => {
      this.setState({ lastMessage: data });
    });
  };

  onChange = (param, value) => {
    this.setState({ [param]: value });
  };

  onSubmit = async () => {
    const { message, auction } = this.state;
    const { token, user } = isAuthenticated();
    const result = await posMessage(token, { auction, message, user});
  };

  render() {
    const { auction, message, lastMessage } = this.state;
    return (
      <RunningAuction
        title={auction.title}
        onChange={this.onChange}
        message={message}
        onSubmit={this.onSubmit}
        lastMessage={lastMessage}
      />
    );
  }
}

export default RunningAuctionView;
