import React, { Component, Fragment } from "react";
import { Segment, Header, Icon, Grid, Image, Divider } from "semantic-ui-react";
import { Subheader, Row, Column } from "../indexSemanticUi";
import AuctionTable from "./Table";
import Filter from "./Filter";
import NoData from '../500/NoData';
import { getFinalizedAuctionsByUser } from "../../api";
import { isAuthenticated } from "../../helpers/authenticate";
import "./style.css";

class TableContainer extends Component {
  state = {
    totalCount: 0,
    loading: false,
    auctions: [],
    auctionsFilter: "",
    limit: 10,
    page: 1,
    sort: "endingAuction",
    order: null,
  };

  componentDidMount() {
    const { token } = isAuthenticated();

    if (token) {
      this.fetchFinalizedAuctions();
    }
  }

/*   directionConverter = (order) => {
    if (order === "asc") {
      return "ascending";
    } else if (order === "desc") {
      return "descending";
    } else {
      return null;
    }
  };

  handleSort = (clickedColumn) => {
    const { sort, order } = this.state;

    let newOrder = order === "asc" ? "desc" : "asc";
    if (sort !== clickedColumn) {
      newOrder = "asc";
    }

    this.fetchFinalizedAuctions({
      sort: clickedColumn,
      page: 1,
      order: newOrder,
    });
  }; */

  fetchFinalizedAuctions = async () => {
    const {
      user: { _id },
      token,
    } = isAuthenticated();
    const response = await getFinalizedAuctionsByUser(token, _id);
    if (response && response.data && response.data.body) {
      this.setState({ auctions: response.data.body });
    }
  };

  filterAuctions = () => {
    const { auctionsFilter, auctions } = this.state;
    const filtered = auctionsFilter ? auctionsFilter.toLowerCase() : undefined;

    if (auctions.length) {
      if (filtered === undefined || !filtered.length) {
        return auctions;
      }

      const auctionsList = auctions.filter((auction) => {
        if (auction.title !== null) {
          return auction.title.toLowerCase().includes(filtered);
        }
      });

      return auctionsList;
    }
    return auctions;
  };

  onChangeLimit = (data) => {
    const { limit } = this.state;
    if (data.value !== limit) {
      this.fetchFinalizedAuctions({ limit: data.value, page: 1 });
    }
  };

  render() {
    const { auctions, auctionsFilter, limit, sort, order, page } = this.state;

    const auctionsContent = this.filterAuctions();

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

          {auctions.length > 0 ? (
            <Row>
              <Column>
                <Segment>
                  <Filter
                    onSubmitFilter={(e) =>
                      this.setState({
                        auctionsFilter: e.target.value,
                      })
                    }
                    auctionsFilter={auctionsFilter}
                  />
                  <Divider />
                  <AuctionTable
                    auctionsContent={auctionsContent}
                    // limit={limit.toString()}
                    // onChangeLimit={this.onChangeLimit}
                    // column={sort}
                    // direction={this.directionConverter(order)}
                    // handleSort={this.handleSort}
                    page={page}
                  />
                </Segment>
              </Column>
            </Row>
          ) : (
             <NoData title="Aquí aparecerán tus subastas finalizadas" />
          )}
        </Grid>
      </Fragment>
    );
  }
}

export default TableContainer;
