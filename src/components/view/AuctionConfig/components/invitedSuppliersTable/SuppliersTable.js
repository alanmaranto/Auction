import React, { Fragment, useEffect, useState } from "react";
import { Container, Header, Grid, Button, Feed, Icon } from "semantic-ui-react";
import { Table } from "../../../../../core/controllers";
// import { getSteps } from "./helper";
import rfiColumns from "./rfiColumns";
import { useInvitedSupplier } from "./UseInvitedSuppliers";

const SuppliersTable = ({ fetch, providers, auctionId }) => {
  const { rejectSupplier, acceptSupplier } = useInvitedSupplier();

  const onHandleInvitation = async (data, reject) => {
    try {
      let result = reject
        ? await rejectSupplier({
            auctionId,
            ...data,
          })
        : await acceptSupplier({
            auctionId,
            ...data,
          });
      if (result) {
        fetch();
      }
    } catch (error) {}
  };

  return (
    <Table
      columns={rfiColumns({
        onHandleInvitation,
      })}
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
