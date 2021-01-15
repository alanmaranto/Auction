import React, { useState } from "react";
import { Card, Header, Grid, Button, Feed, Container } from "semantic-ui-react";
import { AuctionHeader, SuppliersTable, Menu } from "./components";

import "./style.css";

const AuctionConfigView = ({ fetchAuction, auction, auctionId }) => {
  const [fetchSuppliers, setData] = useState(false);
  const { auctionStep, title, description, providers } = auction;

  return (
    <>
      <Grid>
        <Grid.Column width={16}>
          <AuctionHeader
            auctionStep={auctionStep}
            title={title}
            description={description}
          />
        </Grid.Column>
        <Grid.Column width={12} style={{ background: "#fafafa" }}>
          <SuppliersTable
            auctionStep={auctionStep}
            providers={providers}
            auctionId={auctionId}
            fetch={() => {
              setData(true);
              fetchAuction();
            }}
          />
        </Grid.Column>
        <Grid.Column width={4} style={{ background: "#fafafa" }}>
          <Menu auctionId={auctionId} fetchAuction={fetchAuction} />
        </Grid.Column>
      </Grid>
    </>
  );
};

export default AuctionConfigView;
