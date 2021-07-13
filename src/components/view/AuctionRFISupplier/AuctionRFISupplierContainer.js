import React, { Component } from "react";
import { getAuctionsSuppliersInvitedByStep } from "../../../api/invitedSuppliers";
import history from "../../../modules/history/history";
import { Redirect } from "react-router-dom";
import { isAuthenticated } from "../../../helpers/authenticate";
import {
  filterData,
  formatedProviderAuctionData,
} from "../FinalizedAuctions/helper";
import AuctionRFISupplier from "./AuctionRFISupplierView";
import withToast from "../../../core/Toasts";
import { roles } from "../../../helpers/roles";
class AuctionRFIContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rfiSuppliersAuctions: [],
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
      this.fetchRfiSuppliersAuctions(token);
    }
  };

  fetchRfiSuppliersAuctions = async (token) => {
    const { addToast } = this.props;
    const response = await getAuctionsSuppliersInvitedByStep(token, "rfi");
    if (response && response.status === 200) {
      const formatedAuction = formatedProviderAuctionData(response.data.body);
      this.setState({
        rfiSuppliersAuctions: formatedAuction,
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
    const { elementsByPage, rfiSuppliersAuctions, pageItems } = this.state;
    return filterData({
      dataSource: rfiSuppliersAuctions,
      elementsByPage,
      currentPage,
      pageItems,
      filter,
    });
  };

  render() {
    const { elementsByPage, currentPage, filter, loading } = this.state;
    const { dataSource: rfiSuppliersAuctions, dataSourceSize: totalCount } =
      this.onSubmitFilter(filter, currentPage);
    const { user } = isAuthenticated();

    if (user.role === roles.BUYER) {
      return <Redirect to="/" />;
    } else if (user.role === roles.ADMIN) {
      return <Redirect to="/admin-resources" />;
    }
    return (
      <AuctionRFISupplier
        rfiSuppliersAuctions={rfiSuppliersAuctions}
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
