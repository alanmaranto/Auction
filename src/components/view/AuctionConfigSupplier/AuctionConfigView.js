import React, { useState } from "react";
import { Grid, Button } from "semantic-ui-react";
import { AuctionHeader, DocumentsTable, AddDocument } from "./components";

import "./style.css";

const AuctionConfigView = ({ fetchAuction, auction, auctionId }) => {
  const {
    auctionStep,
    auctionFiles,
    supplierFiles,
    title,
    description,
    supplierFilesId,
    supplierFilesStep,
  } = auction;

  return (
    <>
      <Grid textAlign="left" padded columns={16}>
        <Grid.Column width={16}>
          <AuctionHeader
            auctionStep={auctionStep}
            title={title}
            description={description}
          />
        </Grid.Column>

        {!supplierFilesId ? (
          <Grid.Column width={16} style={{ background: "#fafafa" }}>
            Aún no se han enviado documentos.
            <br /> 
            <br />
            Su solicitud esta siendo revisada,
            en un momento se te envíaran los docuementos
          </Grid.Column>
        ) : (
          <>
            <Grid.Column width={10} style={{ background: "#fafafa" }} />
            <Grid.Column width={6} style={{ background: "#fafafa" }}>
              <AddDocument
                auctionStep={auctionStep}
                auctionId={auctionId}
                fetchAuction={fetchAuction}
                auctionFiles={auction?.files || []}
                supplierFilesStep={supplierFilesStep}
              />
            </Grid.Column>
            <Grid.Column width={8} style={{ background: "#fafafa" }}>
              <DocumentsTable
                auctionStep={auctionStep}
                files={auctionFiles || []}
                auctionId={auctionId}
                supplierFilesId={supplierFilesId}
                fetch={() => {
                  fetchAuction();
                }}
              />
            </Grid.Column>
            <Grid.Column width={8} style={{ background: "#fafafa" }}>
              <DocumentsTable
                auctionStep={auctionStep}
                files={supplierFiles || []}
                auctionId={auctionId}
                isSupplier
                fetch={() => {
                  fetchAuction();
                }}
              />
            </Grid.Column>
          </>
        )}
      </Grid>
    </>
  );
};

export default AuctionConfigView;
