import React from "react";
import { Grid, Header } from "semantic-ui-react";
import AuctionTotalCard from "./components/AuctionTotalCard";
import AuctionStepCard from "./components/AuctionStepCard";

const Dashboard = ({
  user,
  rfiAuctions,
  faAuctions,
  finalizedAuctions,
  history,
}) => {
  return (
    <Grid textAlign="left" padded columns={16}>
      <Grid.Row>
        <Grid.Column width={16}>
          <Header className="dashboard-name" as="h1">
            Hola Alan, Bienvenido
          </Header>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column computer={16} largeScreen={16} widescreen={16}>
          <AuctionTotalCard
            rfiAuctions={rfiAuctions}
            faAuctions={faAuctions}
            finalizedAuctions={finalizedAuctions}
          />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={16}>
          <AuctionStepCard
            rfiAuctions={rfiAuctions.slice(0, 3)}
            user={user}
            stepAuction="RFI"
            view={`/auction/rfi/${user}`}
            history={history}
          />
          <AuctionStepCard
            rfiAuctions={faAuctions.slice(0, 3)}
            user={user}
            stepAuction="FA"
            view={`/auction/fa/${user}`}
            history={history}
          />
          <AuctionStepCard
            rfiAuctions={finalizedAuctions.slice(0, 3)}
            user={user}
            stepAuction="Finalizadas"
            view={`/auction/finalized/${user}`}
            history={history}
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default Dashboard;
