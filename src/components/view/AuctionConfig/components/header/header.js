import React from "react";
import { Header, Grid } from "semantic-ui-react";
import { Stepper } from "../../../../../core/controllers";
import { getSteps } from "./helper";

const AuctionHeader = ({ auctionStep, title, description }) => {
  let formatedSteps = getSteps(auctionStep);
  return (
    <Grid.Row style={{ justifyContent: "space-between" }}>
      <Grid.Column width={10} style={{ maxWidth: 350 }}>
        <Header as="h2">
          <Header.Content>
            {title}
            <Header.Subheader>{description}</Header.Subheader>
          </Header.Content>
        </Header>
      </Grid.Column>
      <Grid.Column className="right-justify" width={6}>
        <Stepper steps={formatedSteps} />
      </Grid.Column>
    </Grid.Row>
  );
};

export default AuctionHeader;
