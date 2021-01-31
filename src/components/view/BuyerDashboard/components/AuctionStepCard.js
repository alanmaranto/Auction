import React from "react";
import { Card } from "semantic-ui-react";
import { Link } from "react-router-dom";
import AuctionFeedEvent from "./AuctionFeedEvent";
import "./style.css";

const AuctionStepCard = ({ auctions, stepAuction, view, history }) => {
  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>{stepAuction}</Card.Header>
      </Card.Content>
      <Card.Content
        style={{ overflow: "auto", maxHeight: 140, cursor: "pointer" }}
      >
        {auctions.map((auction) => {
          return (
            <AuctionFeedEvent
              auctionId={auction._id}
              identifier={auction.identifier}
              content={auction.title}
              summary={auction.description}
              history={history}
            />
          );
        })}
      </Card.Content>
      <Card.Content extra className="auction-step-card-footer">
        <Link to={view}>Ver todas las subastas {stepAuction}</Link>
      </Card.Content>
    </Card>
  );
};

export default AuctionStepCard;
