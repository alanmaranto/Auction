import React, { Component } from "react";
import { getRFIAuctionByUser } from "../../../api/auction";
import history from "../../../modules/history/history";
import { isAuthenticated } from "../../../helpers/authenticate";
import { formatedData } from "../../../helpers/auctions";
import {
  filterData,
} from "../FinalizedAuctions/helper";
import AuctionRFI from "./AuctionRFIView";
import withToast from "../../../core/Toasts";

class AuctionRFIContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rfiAuctions: [],
      currentPage: 1,
      elementsByPage: 5,
      totalCount: 0,
      loading: false,
      _sort: "id",
      _order: null,
    };
  }

  componentDidMount = () => {
    const { token } = isAuthenticated();
    if (token) {
      this.fetchRfiAuctions(token);
    }
  };

  fetchRfiAuctions = async (token) => {
    const { addToast } = this.props;
    const response = await getRFIAuctionByUser(token);
    if (response && response.data.body.length > 0) {
      const formatedAuction = formatedData(response.data.body);
      this.setState({
        rfiAuctions: formatedAuction || [],
      });
    } else {
      addToast("No hay subastas RFI", {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };

  onChangePage = (value) => {
    this.setState({ currentPage: value });
  };

  onChangeValue = (value) => {
    this.setState({ filter: value });
  };

  onChangeLimit = (value) => {
    this.setState({ elementsByPage: value, currentPage: 1 });
  };

  sendToAuctionView = (id) => {
    history.push(`/auction-config/${id}`);
  };

  onSubmitFilter = (filter, currentPage) => {
    const { elementsByPage, rfiAuctions, pageItems } = this.state;
    return filterData({
      dataSource: rfiAuctions,
      elementsByPage,
      currentPage,
      pageItems,
      filter,
    });
  };

  render() {
    const { elementsByPage, currentPage, filter, loading } = this.state;
    const {
      dataSource: rfiAuctions,
      dataSourceSize: totalCount,
    } = this.onSubmitFilter(filter, currentPage);
    const { user } = isAuthenticated();

    return (
      <AuctionRFI
        rfiAuctions={rfiAuctions}
        user={user}
        totalCount={totalCount}
        totalPages={Math.ceil(totalCount / elementsByPage)}
        currentPage={currentPage}
        onChangePage={this.onChangePage}
        onChangeLimit={this.onChangeLimit}
        limit={elementsByPage.toString()}
        buttonAction={this.sendToAuctionView}
        onChangeValue={this.onChangeValue}
        loading={loading}
      />
    );
  }
}

export default withToast(AuctionRFIContainer);
