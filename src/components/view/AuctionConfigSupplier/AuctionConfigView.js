import React from "react";
import { Grid } from "semantic-ui-react";
import { AuctionHeader, DocumentsTable, AddDocument } from "./components";
import AuctionSubContainer from "../AuctionWaitingView/AuctionWaitingContainer";
import Posts from "../AuctionConfig/components/faPosts/Posts";

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

  if (auctionStep === "sub") {
    return <AuctionSubContainer auctionId={auctionId} />;
  }

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
            En espera del comprador
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
            <Grid.Column
              width={auction?.auctionStep === "fa_hl" ? 5 : 8}
              style={{ background: "#fafafa" }}
            >
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
            <Grid.Column
              width={auction?.auctionStep === "fa_hl" ? 5 : 8}
              style={{ background: "#fafafa" }}
            >
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
            {auction?.auctionStep === "fa_hl" && (
              <Grid.Column width={6} style={{ background: "#fafafa" }}>
                <Posts auctionId={auctionId} />
              </Grid.Column>
            )}
          </>
        )}
      </Grid>
    </>
  );
};

export default AuctionConfigView;
