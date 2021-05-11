import React from "react";
import { Statistic, Button, Confirm } from "semantic-ui-react";
import { formatCurrency } from "../../../../helpers/currency";
import SuppliersItems from "./SuppliersItems";

const SupplierItemsContainer = ({
  suppliersItems,
  currency,
  handleSuppliersItemsTable,
  totalSupplier,
  totalItemsPrice,
  sendBid,
  openConfirmation,
  setOpenConfirmation,
  lastMessage,
}) => {
  const renderTotalsSection = () => (
    <div className="totals-section-container">
      <Statistic horizontal size="mini" color="blue">
        <Statistic.Label style={{ paddingRight: 10 }}>Tu total</Statistic.Label>
        <Statistic.Value>
          {currency &&
            formatCurrency(totalSupplier || totalItemsPrice, currency)}{" "}
          {currency}
        </Statistic.Value>
        <Statistic.Label style={{ paddingRight: 10 }}>
          Puja actual
        </Statistic.Label>
        <Statistic.Value>
          {currency &&
            formatCurrency(
              (lastMessage && lastMessage.bid) || totalItemsPrice,
              currency
            )}{" "}
          {currency}
        </Statistic.Value>
      </Statistic>
      <Button
        style={{ width: "16%" }}
        primary
        onClick={() => setOpenConfirmation(true)}
      >
        Pujar
      </Button>
    </div>
  );

  return (
    <>
      <SuppliersItems
        suppliersItems={suppliersItems}
        currency={currency}
        handleSuppliersItemsTable={handleSuppliersItemsTable}
      />
      {renderTotalsSection()}
      <Confirm
        open={openConfirmation}
        header="Revisa la información de tu puja"
        content={`Se pujará el total de ${
          currency && formatCurrency(totalSupplier, currency)
        } ${currency}
        `}
        cancelButton="Volver"
        confirmButton="Pujar"
        onCancel={() => setOpenConfirmation(false)}
        onConfirm={sendBid}
      />
    </>
  );
};

export default SupplierItemsContainer;
