import React, { Fragment } from "react";
import { Container, Header, Grid, Button, Feed, Icon } from "semantic-ui-react";
import { Table } from "../../../../../core/controllers";
// import { getSteps } from "./helper";
import rfiColumns from "./rfiColumns";

// import "./style.css";
const headerInfo = {
  RFI: { title: "Invitaciones" },
};

const SuppliersTable = ({ auctionStep, title, description, providers }) => {
  const { title: tableTitle } = headerInfo[auctionStep] || {};

  return (
    <Table
      title={""}
      columns={rfiColumns}
      dataSource={
        providers
          ? providers.map((provider) => {
              if (provider.status === "rejected") {
                provider.negative = true;
              }
              return provider;
            })
          : []
      }
    />
  );
};

export default SuppliersTable;
