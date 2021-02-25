import React, { Fragment, useEffect, useState } from "react";
import { Container, Header, Grid, Button, Feed, Icon } from "semantic-ui-react";
import { Table } from "../../../../../core/controllers";
import rfiColumns from "./rfiColumns";
import faColumns from "./faColumns";

import { useDocuments } from "./UseInvitedDocuments";

const SuppliersTable = ({
  isSupplier,
  fetch,
  files,
  auctionId,
  auctionStep,
  supplierFilesId,
}) => {
  const { deleteDocument, readDocument } = useDocuments();

  const onHandleReadDocument = async (data) => {
    try {
      const result = await readDocument({
        auctionId,
        supplierFilesId,
      });

      if (result) {
        fetch();
      }
    } catch (error) {}
  };

  const onHandleDeleteDocument = async (data) => {
    try {
      let result = await deleteDocument({ auctionId, ...data });
      if (result) {
        fetch();
      }
    } catch (error) {}
  };

  const tableColums = {
    rfi: rfiColumns({
      onHandleReadDocument,
      onHandleDeleteDocument,
      isSupplier,
    }),
    fa_hl: faColumns({
      onHandleReadDocument,
      onHandleDeleteDocument,
      isSupplier,
    }),
  }[auctionStep];

  return <Table columns={tableColums} paginated={false} dataSource={files} />;
};

export default SuppliersTable;
