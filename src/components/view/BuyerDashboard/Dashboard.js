import React from "react";
import { Grid, Header } from "semantic-ui-react";
import AuctionTotalCard from "./components/AuctionTotalCard";
import AuctionStepCard from "./components/AuctionStepCard";

const Dashboard = ({
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
          <AuctionTotalCard
            rfiAuctions={rfiAuctions}
            faAuctions={faAuctions}
            subAuctions={subAuctions}
          />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={16}>
          <AuctionStepCard
            auctions={rfiAuctions.slice(0, 3)}
            stepAuction="RFI"
            view={`/auction/rfi/${user._id}`}
            history={history}
          />
          <AuctionStepCard
            auctions={faAuctions.slice(0, 3)}
            stepAuction="FA"
            view={`/auction/fa/${user._id}`}
            history={history}
          />
          <AuctionStepCard
            auctions={subAuctions.slice(0, 3)}
            stepAuction="A Punto"
            view={`/auction/sub/${user._id}`}
            history={history}
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default Dashboard;
