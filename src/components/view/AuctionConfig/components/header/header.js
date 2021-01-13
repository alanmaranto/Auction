import React, { Fragment } from "react";
import { Header, Grid, Button, Feed, Icon } from "semantic-ui-react";
import { Stepper } from "../../../../../core/controllers";
import { getSteps } from "./helper";

import "./style.css";

const AuctionHeader = ({ auctionStep, title, description }) => {
  const formatedSteps = getSteps(auctionStep);
  return (
    <Grid className="auction-header">
      <Grid.Row>
        <Grid.Column width={6} className="center-align">
          <Header as="h2">
            <Header.Content>
              {title}: {"5feab439e70abc969b303616"}
              <Header.Subheader>{description}</Header.Subheader>
            </Header.Content>
          </Header>
        </Grid.Column>
        <Grid.Column className="right-justify" width={10}>
          <Stepper steps={formatedSteps} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default AuctionHeader;
