import React, { Fragment, useState, useEffect } from "react";
import { Card, Grid, Segment, List, Divider, Header } from "semantic-ui-react";
import { getAuction, getAuctions } from "../../../api";
import { showAuctions, displayAuction } from "./helpers";
import NativeClock from '../../../core/Clock/NativeClock';

import "./style.css";

const Dashboard = ({ activeAuctions, finalizedAuctions, user }) => {
  const { name } = user;
  return (
    <Fragment>
      <div className="dashboard-view">
        <div className="card-graphics">
          <Grid verticalAlign="middle" textAlign="left" padded columns={1}>
            <Grid.Row className="dashboard-header">
              <Grid.Column width={13}>
                <Header className="dashboard-name" as="h1">
                  Hola {name.toUpperCase()}, Bienvenido
                </Header>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={13}>
                <Segment>
                  1<div>Reporte de Subatas</div>
                </Segment>
              </Grid.Column>
              <Grid.Column width={3}>
                <div>
                  <NativeClock />
                </div>
              </Grid.Column>
            </Grid.Row>
            <div className="dashboard-container">
              <Grid.Row>
                <Grid.Column width={8}>
                  <Segment className="active-auction-card" textAlign="left" size="tiny">
                    <div>
                      <h3>Subastas Activas</h3>
                      <Divider />
                      <div className="dashboard-card">
                        {activeAuctions ? (
                          activeAuctions.map((auction) =>
                            displayAuction(auction)
                          )
                        ) : (
                          <div>No hay subastas</div>
                        )}
                      </div>
                    </div>
                  </Segment>
                </Grid.Column>
                <Grid.Column width={8}>
                  <Segment
                    className="active-auction-card"
                    style={{ marginLeft: "20px" }}
                    textAlign="left"
                    size="tiny"
                  >
                    <div>
                      <h3>Subastas Finalizadas</h3>
                      <Divider />
                      <div className="dashboard-card">
                        {finalizedAuctions ? (
                          finalizedAuctions.map((auction) =>
                            displayAuction(auction)
                          )
                        ) : (
                          <div>No hay subastas</div>
                        )}
                      </div>
                    </div>
                  </Segment>
                </Grid.Column>
              </Grid.Row>
            </div>
          </Grid>
        </div>
      </div>
    </Fragment>
  );
};

export default Dashboard;
