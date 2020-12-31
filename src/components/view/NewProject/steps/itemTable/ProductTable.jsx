import React from "react";
import { Table } from "semantic-ui-react";
import ProductRow from "./ProductRow";

const ProductTable = ({
  onProductTableUpdate,
  onRowAdd,
  onRowDel,
  products,
  filterText,
}) => {
  const productRow = products.map((product) => {
    console.log(product);
    if (product.name.indexOf(filterText) === -1) {
      return;
    }
    return (
      <ProductRow
        product={product}
        onProductTableUpdate={onProductTableUpdate}
        onDeleteEvent={onRowDel}
        key={product.id}
      />
    );
  });
  return (
    <div>
      <button
        type="button"
        onClick={onRowAdd}
        className="btn btn-success pull-right"
      >
        Add
      </button>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>price</th>
            <th>quantity</th>
            <th>category</th>
          </tr>
        </thead>

        <tbody>{productRow}</tbody>
      </table>
    </div>
  );
};

export default ProductTable;
