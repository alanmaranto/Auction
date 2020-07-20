import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { isAuthenticated } from "../../helpers/authenticate";
import { Grid, Header, Image } from "semantic-ui-react";
import AuctionIcon from "../../assets/auction.svg";
import Dashboard from "../../assets/dashboard.svg";
import A1 from "../../assets/auctionicon.svg";
import { roles } from '../../helpers/roles';


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
            {isAuthenticated() && isAuthenticated().user.role === roles.BUYER && (
              <Grid.Row>
                <Link to="/">
                  <div className="sidebar-options">
                    <span>
                      <Image src={Dashboard} />
                    </span>
                    <span className="option-title">Dashboard</span>
                  </div>
                </Link>
              </Grid.Row>
            )}
            {isAuthenticated() && isAuthenticated().user.role === roles.PROVIDER && (
              <Grid.Row style={{ margin: 0 }}>
                <Link to="/provider-dashboard">
                  <div className="sidebar-options">
                    <span>
                      <Image src={Dashboard} />
                    </span>
                    <span className="option-title">Dashboard</span>
                  </div>
                </Link>
              </Grid.Row>
            )}
            {isAuthenticated() && isAuthenticated().user.role === roles.BUYER && (
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
            )}
            {isAuthenticated() && isAuthenticated().user.role === roles.BUYER && (
              <Grid.Row>
                <Link to="/finalized">
                  <div className="sidebar-options">
                    <span>
                      <Image src={A1} />
                    </span>
                    <span className="option-title">Subastas Finalizadas</span>
                  </div>
                </Link>
              </Grid.Row>
            )}
{/*             {isAuthenticated() && isAuthenticated().user.role === roles.PROVIDER && (
              <Grid.Row>
                <Link to="/wons">
                  <div className="sidebar-options">
                    <span>
                      <Image src={A1} />
                    </span>
                    <span className="option-title">Subastas Ganadas</span>
                  </div>
                </Link>
              </Grid.Row>
            )} */}
          </Grid.Column>
        </Grid>
      </div>
    </Fragment>
  );
};

export default withRouter(Sidebar);
