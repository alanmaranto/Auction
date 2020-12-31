import React, { useState } from "react";
import ProductRow from "./itemTable/ProductRow";
import SearchBar from "./itemTable/SearchBar";
import ProductTable from "./itemTable/ProductTable";

const Products = () => {
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
    products.push(product);
    setProducts(products);
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
      <SearchBar filterText={filterText} onUserInput={handleUserInput} />
      <ProductTable
        onProductTableUpdate={handleProductTable}
        onRowAdd={handleAddEvent}
        onRowDel={handleRowDel}
        products={products}
        filterText={filterText}
      />
    </div>
  );
};

/* class Products extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.state.filterText = "";
    this.state.products = [
      {
        id: +new Date() + Math.floor(Math.random() * 999999).toString(36),
        category: "",
        price: "",
        qty: 0,
        name: "",
      },
    ];
  }

  handleUserInput(filterText) {
    this.setState({ filterText });
  }

  handleRowDel(product) {
    var index = this.state.products.indexOf(product);
    this.state.products.splice(index, 1);
    this.setState(this.state.products);
  }

  handleAddEvent(evt) {
    var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
    var product = {
      id: id,
      name: "",
      price: "",
      category: "",
      qty: 0,
    };
    this.state.products.push(product);
    this.setState(this.state.products);
  }

  handleProductTable(evt) {
    var item = {
      id: evt.target.id,
      name: evt.target.name,
      value: evt.target.value,
    };
    var products = this.state.products.slice();
    var newProducts = products.map(function (product) {
      for (var key in product) {
        if (key == item.name && product.id == item.id) {
          product[key] = item.value;
        }
      }
      return product;
    });
    this.setState({ products: newProducts });
  }
  render() {
    return (
      <div>
        <SearchBar
          filterText={this.state.filterText}
          onUserInput={this.handleUserInput.bind(this)}
        />
        <ProductTable
          onProductTableUpdate={this.handleProductTable.bind(this)}
          onRowAdd={this.handleAddEvent.bind(this)}
          onRowDel={this.handleRowDel.bind(this)}
          products={this.state.products}
          filterText={this.state.filterText}
        />
      </div>
    );
  }
}

*/
export default Products;
