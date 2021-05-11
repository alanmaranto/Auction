import React from "react";
import { Table } from "semantic-ui-react";
import { TableHeader } from "../../../../core/AuctionTable/TableHeader";
import SupplierRow from "./SupplierItemsRow";

const SuppliersItems = ({
  suppliersItems,
  currency,
  handleSuppliersItemsTable,
}) => {
  const itemRow =
    suppliersItems &&
    suppliersItems.map((item, index) => {
      /*     if (item.name.indexOf(filterText) === -1) {
      return;
    } */
      return (
        <SupplierRow
          item={item}
          id={item.id}
          index={index}
          currency={currency}
          handleSuppliersItemsTable={handleSuppliersItemsTable}
          suppliersItems={suppliersItems}
          key={`${index}-${item.id}`}
        />
      );
    });

  const itemsHeader = [
    {
      name: "id",
      title: "#",
      sorted: false,
    },
    {
      name: "code",
      title: "Código",
      sorted: false,
    },
    {
      name: "name",
      title: "Artículo",
      sorted: false,
    },
    {
      name: "unitMeasure",
      title: "Unidad de medida",
      sorted: false,
    },
    {
      name: "quantity",
      title: "Cantidad",
      sorted: false,
    },
    {
      name: "basePrice",
      title: "Precio base",
      sorted: false,
    },
    {
      name: "totalPrice",
      title: "Total",
      sorted: false,
      buttonActions: true,
    },
    {
      name: "",
      title: "",
      sorted: false,
      buttonActions: true,
    },
  ];

  return (
    <div className="items-table-container">
      <Table compact color="blue" size="small">
        <TableHeader columns={itemsHeader} />
        <Table.Body>{suppliersItems && itemRow}</Table.Body>
      </Table>
    </div>
  );
};

export default SuppliersItems;
