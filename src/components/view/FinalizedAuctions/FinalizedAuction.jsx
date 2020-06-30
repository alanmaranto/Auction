import React, { Fragment } from "react";
import { Divider, Header, Icon, Grid } from "semantic-ui-react";
import { Subheader, Row, Column } from "../../../core/indexSemanticUi";
import Sidebar from "../../../core/Sidebar/Sidebar";
import Navbar from "../../../core/Navbar/Navbar";
import { getTableSettings, filterData } from "./helper";
import { AuctionTable } from "../../../core/AuctionTable/AuctionTable";
import { AuctionFilter } from "../../../core/AuctionTable/AuctionFilter.jsx";
import { isAuthenticated } from "../../../helpers/authenticate";
import { getFinalizedAuctionsByUser } from "../../../api";

export default class FinalizedAuction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      finalizedAuctions: [],
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
      this.loadData();
    }
  };

  loadData = async (params) => {
    const {
      user: { _id },
      token,
    } = isAuthenticated();
    const response = await getFinalizedAuctionsByUser(token, _id);
    if (response && response.data && response.data.body) {
      this.setState({
        finalizedAuctions: response.data.body,
      });
    }
  };

  onChangePage = (value) => {
    console.log("currentPage", value)
    this.setState({ currentPage: value });
  };

  onChangeValue = (value) => {
    this.setState({ filter: value });
  };

  onChangeLimit = (value) => {
    this.setState({ elementsByPage: value, currentPage: 1 });
  };

  onSubmitFilter = (filter, currentPage) => {
    const { elementsByPage, finalizedAuctions, pageItems } = this.state;

    return filterData({
      dataSource: finalizedAuctions,
      elementsByPage,
      currentPage,
      pageItems,
      filter,
    });
  };

  buttonAction = (data) => {
    console.log(
      "Esta funcion puede ser utiizada para acciones en los rows de tabla"
    );
  };

  render() {
    const { elementsByPage, currentPage, filter } = this.state; 
    
    const {
      dataSource: finalizedAuctions,
      dataSourceSize: totalCount,
    } = this.onSubmitFilter(filter, currentPage);
    return (
      <Fragment>
        <div className="app">
          <div className="generalContainer">
            <Sidebar />
            <div className="content-components">
              <Navbar />
              <div className="content-dynamic">
                <Grid>
                  <Row>
                    <Header as="h2" icon textAlign="center">
                      <Icon name="handshake" />
                      Subastas Finalizadas
                      <Subheader>
                        Aquí puedes decidir al ganador de tus subastas
                      </Subheader>
                    </Header>
                  </Row>
                </Grid>
                <AuctionFilter
                  filter={this.state.q}
                  totalCount={totalCount}
                  onChangeValue={this.onChangeValue}
                  loading={this.state.loading}
                />
                <Divider />
                <AuctionTable
                  columns={getTableSettings()}
                  dataSource={finalizedAuctions}
                  totalCount={totalCount}
                  totalPages={Math.ceil(totalCount / elementsByPage)}
                  currentPage={currentPage}
                  onChangePage={this.onChangePage}
                  onChangeLimit={this.onChangeLimit}
                  limit={elementsByPage.toString()}
                  buttonAction={this.buttonAction}
                  handleSort={this.handleSort}
                  column={this.state._sort}
                />
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
