import React, { Component } from "react";
import Sidebar from "../../../core/Sidebar/Sidebar";
import Navbar from "../../../core/Navbar/Navbar";
import Dashboard from "./Dashboard";
import history from "../../../modules/history/history";
import { isAuthenticated } from "../../../helpers/authenticate";
import { filterData, formatedData } from "../FinalizedAuctions/helper";
import { getActiveAuctionsByUser } from "../../../api";
import { showAuctions } from "./helpers";

import "../../../App.css";

class BuyerDashboardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeAuctions: [],
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
      this.fetchActiveAuctions();
    }
  };

  fetchActiveAuctions = async () => {
    const { user, token } = isAuthenticated();
    let _id = user ? user._id : undefined;

    const response = await getActiveAuctionsByUser(token, _id);

    console.log("re", response);

    if (response && response.status === 200) {
      const formatedAuction = formatedData(response.data.body);
      console.log("form", formatedAuction);
      this.setState({
        activeAuctions: formatedAuction,
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
    const { elementsByPage, activeAuctions, pageItems } = this.state;

    return filterData({
      dataSource: activeAuctions,
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
      dataSource: activeAuctions,
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
              <Dashboard
                activeAuctions={activeAuctions}
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

export default BuyerDashboardContainer;
