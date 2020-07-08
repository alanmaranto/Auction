import React, { Component } from "react";
import ChooseWinner from "./ChooseWinner";
import { getBidsByAuctionInfo, chooseWinner } from "../../../api";
import { isAuthenticated } from "../../../helpers/authenticate";

class ChooseWinnerView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bids: [],
      currentBid: null,
      winner: false,
      openConfirm: false,
    };
  }

  componentDidMount() {
    const { token } = isAuthenticated();
    if (token) {
      this.fetchBids();
    }
  }

  fetchBids = async () => {
    const { id } = this.props.match.params;
    const { token } = isAuthenticated();
    const response = await getBidsByAuctionInfo(token, id);
    if (response && response.status === 200) {
      this.setState({ bids: response.data.body });
    }
  };

  chooseWinnerBid = async () => {
    const { token } = isAuthenticated();
    const { currentBid } = this.state;
    const { auctionId, bidId } = currentBid;

    const response = await chooseWinner(token, auctionId, bidId);
  };

  onOpenConfirm = (currentBid) => {
    console.log("re", currentBid);
    console.log('---------------------')
    this.setState({ openConfirm: true, currentBid });
  };

  onCancel = () => this.setState({ openConfirm: false });

  render() {
    const { bids, openConfirm } = this.state;
    return (
      <ChooseWinner
        bids={bids}
        onChooseWinner={this.chooseWinnerBid}
        openConfirm={openConfirm}
        onOpenConfirm={this.onOpenConfirm}
        onCancel={this.onCancel}
      />
    );
  }
}

export default ChooseWinnerView;
