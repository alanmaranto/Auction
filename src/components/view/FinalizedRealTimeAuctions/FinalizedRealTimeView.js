import React from "react";
import { Grid, Message } from "semantic-ui-react";
import RealTimeGraph from "../RunningAuctionView/components/RealTimeGraph";
import SummaryTableCard from "../RunningAuctionView/components/SummaryTableCard";
import { finalizedColumns } from "../RunningAuctionView/helpers";

import "./style.css";

const FinalizedRealTimeView = ({ bids, summaryBids, chooseWinnerBid, auction }) => {
    const { title, description, identifier, currency } = auction
  const auctionConditions = [
    `Subasta: ${title}`,
    `Identificador: ${identifier}`,
    `Descripción: ${description}`,
    `Moneda: ${currency}`
  ];

  const renderRealTimeGraph = () => (
    <Grid.Row>
      <Grid.Column>
        <RealTimeGraph data={bids} />
      </Grid.Column>
    </Grid.Row>
  );

  const renderSummaryTable = () => (
    <Grid.Row>
      <Grid.Column
        mobile={16}
        tablet={16}
        computer={16}
        largeScreen={16}
        widescreen={16}
        className="summary-table-card-col"
      >
        <SummaryTableCard
          data={summaryBids}
          isFinalized={true}
          columns={finalizedColumns}
          chooseWinnerBid={chooseWinnerBid}
        />
      </Grid.Column>
    </Grid.Row>
  );

  const renderHeader = () => (
    <Grid.Row>
      <Grid.Column
        mobile={16}
        tablet={16}
        computer={8}
        largeScreen={8}
        widescreen={8}
        className="running-auction-details"
      >
        <Message
          warning
          header="Resumen de la subasta"
          list={auctionConditions}
          color="blue"
        />
      </Grid.Column>
    </Grid.Row>
  );

  return (
    <Grid>
      {renderHeader()}
      {renderRealTimeGraph()}
      {renderSummaryTable()}
    </Grid>
  );
};

export default FinalizedRealTimeView;
