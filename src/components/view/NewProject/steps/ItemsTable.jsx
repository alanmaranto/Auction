import React from "react";
import { Statistic } from "semantic-ui-react";
import SearchBar from "./itemTable/SearchBar";
import ItemTable from "./itemTable/ItemTable";

const ItemsTableContainer = ({
  filterText,
  items,
  handleUserInput,
  handleItemsTable,
  totalItemsPrice,
  currency, 
  setItems,
}) => {
  return (
    <div>
      <SearchBar
        filterText={filterText}
        onUserInput={handleUserInput}
        items={items}
        handleAddRow={setItems}
      />
      <ItemTable
        handleItemsTable={handleItemsTable}
        handleRowDel={setItems}
        items={items}
        filterText={filterText} 
      />
      <Statistic horizontal size="mini" color="blue">
        <Statistic.Label style={{ paddingRight: 10 }}>
          Total de la subasta
        </Statistic.Label>
        <Statistic.Value>
          {totalItemsPrice} {currency}
        </Statistic.Value>
      </Statistic>
    </div>
  );
};

/* class ItemsTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.state.filterText = "";
    this.state.items = [
      {
        id: +new Date() + Math.floor(Math.random() * 999999).toString(36),
        code: "",
        name: "",
        unitMeasure: "",
        quantity: null,
        basePrice: null,
        totalItemsPrice: null,
      },
    ];
  }

  handleUserInput(filterText) {
    this.setState({ filterText });
  }

  handleRowDel(row) {
    var index = this.state.items.indexOf(row);
    this.state.items.splice(index, 1);
    this.setState(this.state.items);
  }

  handleAddEvent(evt) {
    var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
    var item = {
      id,
      code: "",
      name: "",
      unitMeasure: "",
      quantity: null,
      basePrice: null,
      totalItemsPrice: null,
    };
    this.state.items.push(item);
    this.setState(this.state.items);
  }

  handleItemsTable(evt) {
    var item = {
      id: evt.target.id,
      name: evt.target.name,
      value: evt.target.value,
    };
    var products = this.state.items.slice();
    var newItems = products.map(function (product) {
      for (var key in product) {
        if (key == item.name && product.id == item.id) {
          product[key] = item.value;
        }
      }
      return product;
    });
    this.setState({ items: newItems });
  }
  render() {
    return (
      <div>
        <SearchBar
          filterText={this.state.filterText}
          onUserInput={this.handleUserInput.bind(this)}
          onRowAdd={this.handleAddEvent.bind(this)}
        />
        <ProductTable
          onProductTableUpdate={this.handleItemsTable.bind(this)}
          onRowDel={this.handleRowDel.bind(this)}
          items={this.state.items}
          filterText={this.state.filterText}
        />
      </div>
    );
  }
}
 */

export default ItemsTableContainer;
