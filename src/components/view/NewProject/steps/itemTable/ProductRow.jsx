import React from "react";
import EditableCell from "./EditableCell";

const ProductRow = ({ product, onProductTableUpdate, onDeleteEvent, key }) => {
  const deleteRow = () => {
    onDeleteEvent(product);
  };

  return (
    <tr className="eachRow">
      <EditableCell
        onProductTableUpdate={onProductTableUpdate}
        cellData={{
          type: "name",
          value: product.name,
          id: product.id,
        }}
      />
      <EditableCell
        onProductTableUpdate={onProductTableUpdate}
        cellData={{
          type: "price",
          value: product.price,
          id: product.id,
        }}
      />
      <EditableCell
        onProductTableUpdate={onProductTableUpdate}
        cellData={{
          type: "qty",
          value: product.qty,
          id: product.id,
        }}
      />
      <EditableCell
        onProductTableUpdate={onProductTableUpdate}
        cellData={{
          type: "category",
          value: product.category,
          id: product.id,
        }}
      />
      <td className="del-cell">
        <input
          type="button"
          onClick={deleteRow}
          value="X"
          className="del-btn"
        />
      </td>
    </tr>
  );
};

export default ProductRow;
