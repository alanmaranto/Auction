import React, { Fragment } from "react";

import { Menu, Grid, Header, Icon, Image } from "semantic-ui-react";
import AuctionIcon from "../../assets/auction.svg";

import "../../App.css";
import "./style.css";

const Sidebar = () => {
  return (
    <Fragment>
      <div className="sidebar-menu">
        <Grid>
          <Grid.Column>
            <Grid.Row style={{ padding: "1.2em", margin: 0 }}>
              <div className="sidebar-header">
                <Header inverted>
                  <Image src={AuctionIcon} size="small" />
                  <Header.Content>Auction</Header.Content>
                </Header>
              </div>
            </Grid.Row>
          </Grid.Column>
        </Grid>
      </div>
    </Fragment>
  );
};

export default Sidebar;
