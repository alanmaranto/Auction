import React from "react";
import { Divider, Segment } from "semantic-ui-react";
import debounce from "lodash.debounce";
import { AuctionTable } from "./AuctionTable.jsx";
import { AuctionFilter } from "./AuctionFilter.jsx";

const queryParams = ["_limit", "_order", "_sort", "q", "_page"];

export default class VehicleList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vehicles: [],
      _sort: "id",
      _page: 1,
      _order: null,
      _limit: 10,
      q: "",
      totalCount: 0,
      loading: false,
    };
    this.onSubmitFilter = debounce(this.onSubmitFilter, 800);
  }

  componentDidMount() {
    this.loadData({});
  }

  static directionConverter(order) {
    if (order === "asc") {
      return "ascending";
    } else if (order === "desc") {
      return "descending";
    } else {
      return null;
    }
  }

  handleSort = (clickedColumn) => {
    const { _sort, _order } = this.state;

    let newOrder = _order === "asc" ? "desc" : "asc";
    if (_sort !== clickedColumn) {
      newOrder = "asc";
    }

    this.loadData({
      _sort: clickedColumn,
      _page: 1,
      _order: newOrder,
    });
  };

  onChangeLimit = (event, data) => {
    if (data.value !== this.state._limit) {
      this.loadData({ _limit: data.value, _page: 1 });
    }
  };

  onSubmitFilter = (filter) => {
    if (filter !== this.state.q) {
      this.loadData({ q: filter, _page: 1 });
    }
  };

  onChangePage = (event, data) => {
    const { activePage } = data;
    if (activePage !== this.state._page) {
      this.loadData({ _page: activePage });
    }
  };

  addFavorite = (vehicle) => {
    vehicle.favorite = !vehicle.favorite;
    fetch(`/api/v1/vehicles/${vehicle.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(vehicle),
    }).then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          const index = this.state.vehicles.findIndex(
            (vehicle) => vehicle.id === data.id
          );
          this.setState({
            vehicles: Object.assign([...this.state.vehicles], {
              [index]: data,
            }),
          });
        });
      } else {
        response.json().then((error) => {
          console.log(`Failed to load data: ${error.message}`);
        });
      }
    });
  };

  loadData = (params) => {
    const newState = Object.assign({}, this.state, params, { loading: false });
    this.setState({ loading: true });

    queryParams.forEach(function (element) {
      if (!(element in params)) {
        params[element] = newState[element];
      }
    });

    const esc = encodeURIComponent;
    const query = Object.keys(params)
      .map((k) => esc(k) + "=" + esc(params[k]))
      .join("&");

    // Make a request without limit first to get the total number of data.
    let totalCountQuery = "";
    if (params.q !== "") {
      totalCountQuery = `q=${params.q}`;
    }

    fetch(`/api/v1/vehicles?${totalCountQuery}`).then((response) => {
      console.log("query ", `/api/v1/vehicles?${totalCountQuery}`);

      //if (response.ok) {
      if (true) {
        response.json().then((data) => {
          this.setState({ totalCount: data.length });
        });
        this.setState({ totalCount: 100 });
      } else {
        response.json().then((error) => {
          console.log(`Failed to load data: ${error.message}`);
        });
      }
      // this.setState(newState, () => {
      console.log("query 2", "/api/v1/vehicles?" + query);
      fetch("/api/v1/vehicles?" + query).then((response) => {
        //if (response.ok) {
        if (true) {
          response.json().then((data) => {
            this.setState({ vehicles: data });
          });

          this.setState({
            vehicles: [
              {
                id: "id",
                make: "make",
                mdoel: "model",
                year: "year",
                package: "package",
                fueltype: "fueltype",
                transmission: "transmission",
              },
              {
                id: "id",
                make: "make",
                mdoel: "model",
                year: "year",
                package: "package",
                fueltype: "fueltype",
                transmission: "transmission",
              },
              {
                id: "id",
                make: "make",
                mdoel: "model",
                year: "year",
                package: "package",
                fueltype: "fueltype",
                transmission: "transmission",
              },
              {
                id: "id",
                make: "make",
                mdoel: "model",
                year: "year",
                package: "package",
                fueltype: "fueltype",
                transmission: "transmission",
              },
              {
                id: "id",
                make: "make",
                mdoel: "model",
                year: "year",
                package: "package",
                fueltype: "fueltype",
                transmission: "transmission",
              },
            ],
          });
        } else {
          response.json().then((error) => {
            console.log(`Failed to load data: ${error.message}`);
          });
        }
        const newState = Object.assign({}, this.state, params, {
          loading: false,
        });
        this.setState(newState);
      });
      //});
    });
  };

  getTableSettings = () => {
    const header = [
      {
        name: "id",
        title: 'id',
        sorted: false,
      },
      {
        name: "make",
        sorted: true,
        title: 'Make',
      },
      {
        name: "model",
        sorted: true,
        title: 'Model',
      },
      {
        name: "year",
        sorted: true,
        title: 'year',
      },
      {
        name: "package",
        sorted: true,
        title: 'package',
      },
      {
        name: "fuelType",
        title: 'Fuel',
        sorted: true,
      },
      {
        name: "transmission",
        title: 'Transmission',
        sorted: true,
      },
      {
        name: "action",
        title: 'Actions',
        sorted: true,
        buttonActions: true,
      },
    ];
    return header;
  };

  render() {
    return (
      <Segment>
        <AuctionFilter
          filter={this.state.q}
          totalCount={this.state.totalCount}
          onSubmitFilter={this.onSubmitFilter}
          loading={this.state.loading}
        />
        <Divider />
        <AuctionTable
          dataSource={this.state.vehicles}
          totalCount={this.state.totalCount}
          totalPages={Math.ceil(this.state.totalCount / this.state._limit)}
          currentPage={this.state._page}
          onChangePage={this.onChangePage}
          addFavorite={this.addFavorite}
          column={this.state._sort}
          direction={VehicleList.directionConverter(this.state._order)}
          handleSort={this.handleSort}
          onChangeLimit={this.onChangeLimit}
          limit={this.state._limit.toString()}
          columns={this.getTableSettings()}
        />
      </Segment>
    );
  }
}
