import React, { Fragment } from "react";
import { Divider, Header, Icon, Grid } from "semantic-ui-react";
import { Subheader, Row } from "../../../core/indexSemanticUi";
import history from "../../../modules/history/history";
import { getTableSettings, filterData, formatedData } from "./helper";
import { AuctionTable } from "../../../core/AuctionTable/AuctionTable";
import { AuctionFilter } from "../../../core/AuctionTable/AuctionFilter.jsx";
import { isAuthenticated } from "../../../helpers/authenticate";
import { getFinalizedAuctionsByUser } from "../../../api/api";

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
      const formatedAuction = formatedData(response.data.body);
      this.setState({
        finalizedAuctions: formatedAuction,
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
    const { elementsByPage, finalizedAuctions, pageItems } = this.state;

    return filterData({
      dataSource: finalizedAuctions,
      elementsByPage,
      currentPage,
      pageItems,
      filter,
    });
  };

  sendToBids = (id) => {
    history.push(`/winner/auction/${id}`);
  };

  render() {
    const { elementsByPage, currentPage, filter } = this.state;

    const {
      dataSource: finalizedAuctions,
      dataSourceSize: totalCount,
    } = this.onSubmitFilter(filter, currentPage);
    const { user } = isAuthenticated();

    return (
      <Fragment>
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
          buttonAction={this.sendToBids}
          color="red"
          colorTable="red"
          buttonTitle="Ver pujas"
          handleSort={this.handleSort}
          column={this.state._sort}
          role={user.role}
        />
      </Fragment>
    );
  }
}
