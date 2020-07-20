import React, { Component } from "react";
import Sidebar from "../../../core/Sidebar/Sidebar";
import Navbar from "../../../core/Navbar/Navbar";
import ProviderDashboard from "./ProviderDashboard";
import history from "../../../modules/history/history";
import { isAuthenticated } from "../../../helpers/authenticate";
import { formatedProviderAuctionData, filterData } from "../FinalizedAuctions/helper";
import { getInvitedAuctionsByProvider } from "../../../api";
import { showProvidersAuctions } from "../BuyerDashboard/helpers";

import "../../../App.css";

class ProviderDashboardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeInvitedProviderAuctions: [],
      currentPage: 1,
      elementsByPage: 5,
      totalCount: 0,
      loading: false,
      _sort: "id",
      _order: null,
    };
  }

  componentDidMount() {
    const { token } = isAuthenticated();
    if (token) {
      this.fetchAuctions();
    }
  }

  fetchAuctions = async () => {
    const { token, user } = isAuthenticated();
    let _id = user ? user._id : undefined;
    const response = await getInvitedAuctionsByProvider(token, _id);

    if (response && response.status === 200) {
      const formatedAuction = formatedProviderAuctionData(response.data.body);
      console.log("form", formatedAuction);
      this.setState({
        activeInvitedProviderAuctions: formatedAuction,
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

  onSubmitFilter = (filter, currentPage) => {
    const {
      elementsByPage,
      activeInvitedProviderAuctions,
      pageItems,
    } = this.state;

    return filterData({
      dataSource: activeInvitedProviderAuctions,
      elementsByPage,
      currentPage,
      pageItems,
      filter,
    });
  };

  sendToAuctionView = (id) => {
    history.push(`/auction/${id}`);
  };

  render() {
    const { elementsByPage, currentPage, filter, loading } = this.state;
    const {
      dataSource: activeInvitedProviderAuctions,
      dataSourceSize: totalCount,
    } = this.onSubmitFilter(filter, currentPage);
    const { user } = isAuthenticated();
    return (
      <div className="app">
        <div className="generalContainer">
          <Sidebar />
          <div className="content-components">
            <Navbar />
            <div className="content-dynamic">
              <ProviderDashboard
                activeInvitedProviderAuctions={activeInvitedProviderAuctions}
                user={user}
                totalCount={totalCount}
                currentPage={currentPage}
                totalPages={Math.ceil(totalCount / elementsByPage)}
                currentPage={currentPage}
                onChangePage={this.onChangePage}
                onChangeLimit={this.onChangeLimit}
                limit={elementsByPage.toString()}
                buttonAction={this.sendToAuctionView}
                onChangeValue={this.onChangeValue}
                loading={loading}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProviderDashboardContainer;
