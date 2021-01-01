import React, { useState } from "react";
import ProductRow from "./itemTable/ProductRow";
import SearchBar from "./itemTable/SearchBar";
import ProductTable from "./itemTable/ProductTable";

/* const Products = () => {
  const [filterText, setFilterText] = useState("");
  const [products, setProducts] = useState([
    {
      id: +new Date() + Math.floor(Math.random() * 999999).toString(36),
      category: "",
      price: "",
      qty: 0,
      name: "",
    },
  ]);

  const handleUserInput = (filterText) => {
    setFilterText(filterText);
  };

  const handleRowDel = (product) => {
    const index = products.indexOf(product);
    products.splice(index, 1);
    setProducts(products);
  };

  const handleAddEvent = (evt) => {
    console.log("s");
    const id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
    const product = {
      id,
      name: "",
      price: "",
      category: "",
      qty: 0,
    };

    const hola = products.push(product);
    setProducts(hola);
  };

  const handleProductTable = (evt) => {
    const item = {
      id: evt.target.id,
      name: evt.target.name,
      value: evt.target.value,
    };
    const productsSlice = products.slice();
    const newProducts = productsSlice.map((product) => {
      for (var key in product) {
        if (key == item.name && product.id == item.id) {
          product[key] = item.value;
        }
      }
      return product;
    });
    setProducts(newProducts);
  };

  return (
    <div>
      <SearchBar
        filterText={filterText}
        onUserInput={handleUserInput}
        onRowAdd={handleAddEvent}
      />
      <ProductTable
        onProductTableUpdate={handleProductTable}
        // onRowAdd={handleAddEvent}
        onRowDel={handleRowDel}
        products={products}
        filterText={filterText}
      />
    </div>
  );
}; */

  class Products extends React.Component {
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


export default Products;
