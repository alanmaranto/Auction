import React from "react";
import { Grid, Message } from "semantic-ui-react";
import { AuctionHeader, DocumentsTable, AddDocument } from "./components";
import AuctionSubContainer from "../AuctionWaitingView/AuctionWaitingContainer";
import Posts from "../AuctionConfig/components/faPosts/Posts";
import SupplierRejected from "./SupplierRejected";
import { formatDate, formatTypes } from "../../../helpers/dates";

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
    supplier,
    openingRFIDate,
    openingFADate,
    endingRFIDate,
    endingFADate,
    openingRealTimeAuctionDate,
    endingRealTimeAuctionDate,
  } = auction;

  const olderDates = [
    `Fecha de inicio RFI - ${formatDate(
      openingRFIDate,
      formatTypes.fullDateTime12H
    )}`,
    `Fecha de finalización RFI - ${formatDate(
      endingRFIDate,
      formatTypes.fullDateTime12H
    )}`,
    `Fecha de inicio FA - ${formatDate(
      openingFADate,
      formatTypes.fullDateTime12H
    )}`,
    `Fecha de finalización FA - ${formatDate(
      endingFADate,
      formatTypes.fullDateTime12H
    )}`,
    `Fecha de inicio subasta - ${formatDate(
      openingRealTimeAuctionDate,
      formatTypes.fullDateTime12H
    )}`,
    `Fecha de finalización subasta - ${formatDate(
      endingRealTimeAuctionDate,
      formatTypes.fullDateTime12H
    )}`,
  ];

  const renderHeader = () => (
    <AuctionHeader
      auctionStep={auctionStep}
      title={title}
      description={description}
    />
  );

  if (auctionStep === "sub" && supplier && supplier[0].status === "active") {
    return (
      <>
        <Grid textAlign="left" padded columns={16}>
          {renderHeader()}
          <AuctionSubContainer auctionId={auctionId} />
        </Grid>
      </>
    );
  }

  return (
    <>
      <Grid textAlign="left" padded columns={16}>
        {renderHeader()}
        {!supplierFilesId && supplier && supplier[0].status === "active" && (
          <>
            <Grid.Column width={16} style={{ background: "#fafafa" }}>
              Aún no se han enviado documentos.
              <br />
              <br />
              En espera del comprador
            </Grid.Column>
          </>
        )}
        {supplierFilesId && supplier && supplier[0].status === "rejected" && (
          <>
            <SupplierRejected />
          </>
        )}
        {supplierFilesId && supplier && supplier[0].status !== "rejected" && (
          <>
            <Grid.Column width={10} style={{ background: "#fafafa" }}>
              <Message
                icon="calendar times"
                header="Información de fechas"
                list={olderDates}
              />
            </Grid.Column>
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
