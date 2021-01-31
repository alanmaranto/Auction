import React from "react";
import { Card, Statistic } from "semantic-ui-react";
import "./style.css";

const AuctionTotalCard = () => {
  return (
    <Card.Group itemsPerRow={16} stackable style={{ justifyContent: 'space-between' }}>
      <Card className="total-auction-card">
        <Card.Content>
          <Statistic>
            <Statistic.Label className="statistic-total-auction-label">
              Total Subastas RFI
            </Statistic.Label>
            <Statistic.Value className="statistic-total-auction-value">
              40,509
            </Statistic.Value>
          </Statistic>
        </Card.Content>
      </Card>

      <Card className="total-auction-card">
        <Card.Content>
          <Statistic>
            <Statistic.Label className="statistic-total-auction-label">
              Total Subastas FA
            </Statistic.Label>
            <Statistic.Value className="statistic-total-auction-value">
              40,509
            </Statistic.Value>
          </Statistic>
        </Card.Content>
      </Card>

      <Card className="total-auction-card">
        <Card.Content>
          <Statistic>
            <Statistic.Label className="statistic-total-auction-label">
              Total Subastas A Punto
            </Statistic.Label>
            <Statistic.Value className="statistic-total-auction-value">
              40,509
            </Statistic.Value>
          </Statistic>
        </Card.Content>
      </Card>
    </Card.Group>
  );
};

export default AuctionTotalCard;
