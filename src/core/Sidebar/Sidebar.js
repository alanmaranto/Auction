import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";

import { Menu, Grid, Header, Icon, Image } from "semantic-ui-react";
import AuctionIcon from "../../assets/auction.svg";
import Dashboard from "../../assets/dashboard.svg";
import A1 from '../../assets/auctionicon.svg'
import A2 from '../../assets/auctionicon2.svg'

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
            <Grid.Row style={{ margin: 0 }}>
              <Link to="/">
                <div className="sidebar-options">
                  <span>
                    <Image src={Dashboard} />
                  </span>
                  <span className="option-title">Dashboard</span>
                </div>
              </Link>
            </Grid.Row>
            <Grid.Row>
              <Link to="/create/auction">
                <div className="sidebar-options">
                  <span>
                    <Image src={A1} />
                  </span>
                  <span className="option-title">Crear Subasta</span>
                </div>
              </Link>
            </Grid.Row>
          </Grid.Column>
        </Grid>
      </div>
    </Fragment>
  );
};

export default withRouter(Sidebar);
