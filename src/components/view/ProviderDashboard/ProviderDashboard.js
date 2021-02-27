import React from "react";
import { Grid, Header } from "semantic-ui-react";
import AuctionSupplierTotalCard from "./components/AuctionSupplierTotalCard";
import AuctionStepSupplierCard from "./components/AuctionStepSupplierCard";

const SupplierDashboard = ({
  user,
  rfiAuctions,
  faAuctions,
  subAuctions,
  history,
}) => {
  return (
    <Grid textAlign="left" padded columns={16}>
      <Grid.Row>
        <Grid.Column width={16}>
          <Header className="dashboard-name" as="h1">
            Hola {user.name}, Bienvenido
          </Header>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column computer={16} largeScreen={16} widescreen={16}>
          <AuctionSupplierTotalCard
            rfiAuctions={rfiAuctions}
            faAuctions={faAuctions}
            subAuctions={subAuctions}
          />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={16}>
          <AuctionStepSupplierCard
            auctions={rfiAuctions.slice(0, 3)}
            stepAuction="RFI"
            view={`/auction/rfi-supplier/${user._id}`}
            history={history}
          />
          <AuctionStepSupplierCard
            auctions={faAuctions.slice(0, 3)}
            stepAuction="FA"
            view={`/auction/fa-supplier/${user._id}`}
            history={history}
          />
          <AuctionStepSupplierCard
            auctions={subAuctions.slice(0, 3)}
            stepAuction="A Punto"
            view={`/auction/sub-supplier/${user._id}`}
            history={history}
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default SupplierDashboard;
