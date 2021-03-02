import React, { Component } from "react";
import { getAuctionsSuppliersInvitedByStep } from "../../../api/invitedSuppliers";
import history from "../../../modules/history/history";
import { isAuthenticated } from "../../../helpers/authenticate";
import {
  filterData,
  formatedProviderAuctionData,
} from "../FinalizedAuctions/helper";
import AuctionSubSupplierView from "./AuctionSubSupplierView";
import withToast from "../../../core/Toasts";

class AuctionSubSupplierContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subSupplierAuctions: [],
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
      this.fetchSubSuppliersAuctions(token);
    }
  };

  fetchSubSuppliersAuctions = async (token) => {
    const { addToast } = this.props;
    const response = await getAuctionsSuppliersInvitedByStep(token, "sub");
    if (response && response.status === 200) {
      const formatedAuction = formatedProviderAuctionData(response.data.body);
      this.setState({
        subSupplierAuctions: formatedAuction,
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
    history.push(`/auction-config-supplier/${id}`);
  };

  onSubmitFilter = (filter, currentPage) => {
    const { elementsByPage, subSupplierAuctions, pageItems } = this.state;
    return filterData({
      dataSource: subSupplierAuctions,
      elementsByPage,
      currentPage,
      pageItems,
      filter,
    });
  };

  render() {
    const { elementsByPage, currentPage, filter, loading } = this.state;
    const {
      dataSource: subSupplierAuctions,
      dataSourceSize: totalCount,
    } = this.onSubmitFilter(filter, currentPage);
    const { user } = isAuthenticated();

    return (
      <AuctionSubSupplierView
        subSupplierAuctions={subSupplierAuctions}
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

export default withToast(AuctionSubSupplierContainer);
