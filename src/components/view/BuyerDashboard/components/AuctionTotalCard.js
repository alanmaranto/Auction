import React from "react";
import { Card, Statistic } from "semantic-ui-react";
import "./style.css";

const AuctionTotalCard = ({ rfiAuctions, faAuctions, finalizedAuctions }) => {
  return (
    <Card.Group itemsPerRow={16} stackable className="total-auction-container">
      <Card className="total-auction-container__card">
        <Card.Content>
          <Statistic>
            <Statistic.Label className="statistic-total-auction-label">
              Total Subastas RFI
            </Statistic.Label>
            <Statistic.Value className="statistic-total-auction-value">
              {rfiAuctions.length}
            </Statistic.Value>
          </Statistic>
        </Card.Content>
      </Card>

      <Card className="total-auction-container__card">
        <Card.Content>
          <Statistic>
            <Statistic.Label className="statistic-total-auction-label">
              Total Subastas FA
            </Statistic.Label>
            <Statistic.Value className="statistic-total-auction-value">
              {faAuctions.length}
            </Statistic.Value>
          </Statistic>
        </Card.Content>
      </Card>

      <Card className="total-auction-container__card">
        <Card.Content>
          <Statistic>
            <Statistic.Label className="statistic-total-auction-label">
              Total Subastas A Punto
            </Statistic.Label>
            <Statistic.Value className="statistic-total-auction-value">
              {finalizedAuctions.length}
            </Statistic.Value>
          </Statistic>
        </Card.Content>
      </Card>
    </Card.Group>
  );
};

export default AuctionTotalCard;
