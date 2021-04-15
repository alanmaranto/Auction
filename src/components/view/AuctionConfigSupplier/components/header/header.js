import React from "react";
import { Header, Grid } from "semantic-ui-react";
import { Stepper } from "../../../../../core/controllers";
import { getSteps } from "./helper";

const AuctionHeader = ({ auctionStep, title, description }) => {
  let formatedSteps = getSteps(auctionStep);
  return (
    <>
      <Grid.Row>
        <Grid.Column
          mobile={16}
          tablet={16}
          computer={16}
          largeScreen={16}
          widescreen={16}
        >
          <Header as="h2">
            <Header.Content>
              {title}
              <Header.Subheader>{description}</Header.Subheader>
            </Header.Content>
          </Header>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column
          mobile={16}
          tablet={16}
          computer={16}
          largeScreen={16}
          widescreen={16}
        >
          <Stepper steps={formatedSteps} />
        </Grid.Column>
      </Grid.Row>
    </>
  );
};

export default AuctionHeader;
