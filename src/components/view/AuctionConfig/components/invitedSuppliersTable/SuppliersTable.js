import React, { Fragment, useEffect, useState } from "react";
import { Container, Header, Grid, Button, Feed, Icon } from "semantic-ui-react";
import { Table } from "../../../../../core/controllers";
// import { getSteps } from "./helper";
import rfiColumns from "./rfiColumns";
import faColumns from "./faColumns";

import { useInvitedSupplier } from "./UseInvitedSuppliers";

const SuppliersTable = ({ fetch, suppliers, auctionId, auctionStep }) => {
  const {
    rejectSupplier,
    acceptSupplier,
    sendInvitationDocuments,
  } = useInvitedSupplier();

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

  const onHandleInvitationDocuments = async (data) => {
    try {
      let result = await sendInvitationDocuments({
        auctionId,
        ...data,
        type: "supplier",
      });
      if (result) {
        fetch();
      }
    } catch (error) {}
  };

  const tableColums = {
    rfi: rfiColumns({
      onHandleInvitation,
      onHandleInvitationDocuments,
    }),
    fa_hl: faColumns({
      onHandleInvitation,
      onHandleInvitationDocuments
    }),
  }[auctionStep];

  return (
    <Table
      columns={tableColums}
      paginated={false}
      dataSource={
        suppliers
          ? suppliers.map((supplier) => {
              if (
                [supplier.status, supplier.invitationStatus].includes(
                  "rejected"
                )
              ) {
                supplier.negative = true;
              }
              if ([supplier.status].includes("accepted")) {
                supplier.positive = true;
              }
              return supplier;
            })
          : []
      }
    />
  );
};

export default SuppliersTable;
