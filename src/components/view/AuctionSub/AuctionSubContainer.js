import React, { Component } from "react";
import { getSubAuctionByUser } from "../../../api/auction";
import history from "../../../modules/history/history";
import { isAuthenticated } from "../../../helpers/authenticate";
import { formatedData } from "../../../helpers/auctions";
import { filterData } from "../FinalizedAuctions/helper";
import AuctionSub from "./AuctionSubView";
import withToast from "../../../core/Toasts";

class AuctionSubContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subAuctions: [],
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
      this.fetchFaAuctions(token);
    }
  };

  fetchFaAuctions = async (token) => {
    // const { token } = isAuthenticated();
    const { addToast } = this.props;

    const response = await getSubAuctionByUser(token);

    if (response && response.data.body.length > 0) {
      const formatedAuction = formatedData(response.data.body);
      this.setState({
        subAuctions: formatedAuction || [],
      });
    } else {
      addToast("No hay subastas", {
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
    const { elementsByPage, subAuctions, pageItems } = this.state;
    return filterData({
      dataSource: subAuctions,
      elementsByPage,
      currentPage,
      pageItems,
      filter,
    });
  };

  render() {
    const { elementsByPage, currentPage, filter, loading } = this.state;
    const {
      dataSource: subAuctions,
      dataSourceSize: totalCount,
    } = this.onSubmitFilter(filter, currentPage);
    const { user } = isAuthenticated();

    return (
      <AuctionSub
        subAuctions={subAuctions}
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

export default withToast(AuctionSubContainer);
