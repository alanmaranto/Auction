import React from "react";
import { Card } from "semantic-ui-react";
import { Link } from "react-router-dom";
import AuctionFeedSupplierEvent from "./AuctionFeedSupplierEvent";
import "./style.css";

const AuctionStepSupplierCard = ({ auctions, stepAuction, view, history }) => {
  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>{stepAuction}</Card.Header>
      </Card.Content>
      <Card.Content className="auction-step-card-container">
        {auctions.map((auction) => {
          return (
            <AuctionFeedSupplierEvent
              auctionId={auction.auctionId._id}
              identifier={auction.auctionId.identifier}
              content={auction.auctionId.title}
              summary={auction.auctionId.description}
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

export default AuctionStepSupplierCard;
