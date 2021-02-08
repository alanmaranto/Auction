import React, { Component } from "react";
import RunningAuction from "./RunningAuction";

import { isAuthenticated } from "../../../helpers/authenticate";
import {
  getRunningAuctionById,
  posMessage,
  updateAuction,
} from "../../../api/api";
import { getRealTimeBidsByAuctionId } from "../../../api/realtime";
import { socket, registerUserIOToken } from "../../../socket";
import moment from "moment";
import "moment/locale/es";

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
      bids: [],
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
    const response = await getRealTimeBidsByAuctionId(token, currentAuction);
    console.log("response", response);
    if (response && response.data && response.data.body) {
      const { bids, auctionResult } = response.data.body;

      const formattedBids = this.formattedData(bids);

      this.setState({ auction: auctionResult, bids: formattedBids });
    }
  };

  listenMessages = () => {
    socket.on("wellcome", (data) => {});
    socket.on("newMessage", (data) => {
      console.log("jejejejejeje", data);
      const { id: currentAuction } = this.props.match.params;
      // if (data.auctionId === currentAuction) {
      const formattedBids = this.formattedData(data.bids);

      this.setState({ bids: formattedBids });
      // this.setState({ lastMessage: data });
      // }
    });
  };

  getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  onChange = (param, value) => {
    this.setState({ [param]: value });
  };

  onSubmit = async () => {
    const { id: currentAuction } = this.props.match.params;
    const { message } = this.state;
    const { token } = isAuthenticated();
    const data = {
      auctionId: currentAuction,
      message,
    };
    const result = await posMessage(token, data);
    this.setState({ message: "" });
  };

  onFinalizedAuction = () => {
    const { id: currentAuction } = this.props.match.params;
    const { finalized } = this.state;
    const { token } = isAuthenticated();
    const data = {
      finalized: !finalized,
    };
    const result = updateAuction(currentAuction, token, data);
  };

  formattedData = (dataSource) => {
    let dataFormatted = [];
    dataSource.forEach(({ userId, createdAt, _id, bid }) => {
      dataFormatted.push({
        id: userId.name,
        color: this.getRandomColor(),
        data: [
          {
            x: moment(createdAt).format("h:mm"),
          },
          {
            y: Number(bid),
          },
        ],
      });
    });
    return dataFormatted
  };

  render() {
    const { auction, message, lastMessage, bids } = this.state;
    const { user } = isAuthenticated();
    console.log("bids", bids);

    return (
      <RunningAuction
        title={auction.title}
        minimumBid={auction.minimumBid}
        minimumPrice={auction.totalItemsPrice}
        onChange={this.onChange}
        message={message}
        role={user.role}
        onSubmit={this.onSubmit}
        lastMessage={lastMessage}
        endingAuction={auction.endingRealTimeAuctionDate}
        onFinalizedAuction={this.onFinalizedAuction}
        bids={bids}
      />
    );
  }
}

export default RunningAuctionView;
