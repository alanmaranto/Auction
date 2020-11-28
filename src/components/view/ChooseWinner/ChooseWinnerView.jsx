import React, { Component } from "react";
import ChooseWinner from "./ChooseWinner";
import { getBidsByAuctionInfo, chooseWinner } from "../../../api/api";
import { isAuthenticated } from "../../../helpers/authenticate";
import withToast from "../../../core/Toasts";

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
    const { addToast } = this.props;

    const { token } = isAuthenticated();
    const { currentBid, bids } = this.state;
    const { auctionId, bidId, providerName, providerEmail, auctionTitle } = currentBid;

    const data = {
      providerName,
      providerEmail,
      auctionTitle
    }

    const response = await chooseWinner(token, auctionId, bidId, data);

    if (response && response.status === 200) {
      this.fetchBids();
      addToast("Listo", {
        appearance: "success",
        autoDismiss: true,
      });
      this.setState({ openConfirm: false });
    } else {
      addToast("Hubo un error al intentar seleccionar un ganador", {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };

  onOpenConfirm = (currentBid) => {
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

export default withToast(ChooseWinnerView);
