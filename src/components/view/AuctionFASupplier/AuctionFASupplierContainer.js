import React, { Component } from "react";
import { getAuctionsSuppliersInvitedByStep } from "../../../api/invitedSuppliers";
import history from "../../../modules/history/history";
import { Redirect } from "react-router-dom";
import { isAuthenticated } from "../../../helpers/authenticate";
import {
  filterData,
  formatedProviderAuctionData,
} from "../FinalizedAuctions/helper";
import AuctionFASupplierView from "./AuctionFASupplierView";
import withToast from "../../../core/Toasts";
import { roles } from "../../../helpers/roles";

class AuctionFAContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      faSuppliersAuctions: [],
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
      this.fetchFASuppliersAuctions(token);
    }
  };

  fetchFASuppliersAuctions = async (token) => {
    const { addToast } = this.props;
    const response = await getAuctionsSuppliersInvitedByStep(token, "fa_hl");
    if (response && response.status === 200) {
      const formatedAuction = formatedProviderAuctionData(response.data.body);
      this.setState({
        faSuppliersAuctions: formatedAuction,
      });
    } else {
      addToast("No hay subastas FA", {
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
    const { elementsByPage, faSuppliersAuctions, pageItems } = this.state;
    return filterData({
      dataSource: faSuppliersAuctions,
      elementsByPage,
      currentPage,
      pageItems,
      filter,
    });
  };

  render() {
    const { elementsByPage, currentPage, filter, loading } = this.state;
    const { dataSource: faSuppliersAuctions, dataSourceSize: totalCount } =
      this.onSubmitFilter(filter, currentPage);
    const { user } = isAuthenticated();

    if (user.role === roles.BUYER) {
      return <Redirect to="/" />;
    } else if (user.role === roles.ADMIN) {
      return <Redirect to="/admin-resources" />;
    } else {
      return (
        <AuctionFASupplierView
          faSuppliersAuctions={faSuppliersAuctions}
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
}

export default withToast(AuctionFAContainer);
