import React from "react";
import { Grid, Card, Divider, Header } from "semantic-ui-react";
import AuctionTotalCard from "./components/AuctionTotalCard";
import AuctionStepCard from "./components/AuctionStepCard";

const Dashboard = ({ user }) => {
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
          <AuctionTotalCard />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={16}>
          <AuctionStepCard
            header="RFI"
            identifier="OXXO_01213"
            content="Aquí va el titulo de la subasta"
            summary="Aqui va la super ultra larga hiper mega descripción"
            view={`/auction/rfi/${user}`}
            stepAuction="RFI"
          />
          <AuctionStepCard
            header="FA/PT"
            identifier="OXXO_01213"
            content="Aquí va el titulo de la subasta"
            summary="Aqui va la super ultra larga hiper mega descripción"
            view={`/auction/fa/${user}`}
            stepAuction="FA/PT"
          />
          <AuctionStepCard
            header="Finalizadas"
            identifier="OXXO_01213"
            content="Aquí va el titulo de la subasta"
            summary="Aqui va la super ultra larga hiper mega descripción"
            view={`/auction/finalized/${user}`}
            stepAuction="finalizadas"
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default Dashboard;
