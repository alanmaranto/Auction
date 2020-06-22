import React, { Fragment } from "react";
import { Grid, Segment, Divider, Header } from "semantic-ui-react";
import { displayAuction } from "./helpers";
import NoData from "../../../core/500/NoData";
import TotalAuctions from "../Reports/TotalAuctions";
import NativeClock from "../../../core/Clock/NativeClock";
import { Row, Column } from "../../../core/indexSemanticUi";

import "./style.css";

const Dashboard = ({ activeAuctions, user }) => {
  console.log(activeAuctions);
  const { name } = user || {};
  return (
    <Fragment>
      <div className="dashboard-view">
        <div className="card-graphics">
          <Grid verticalAlign="middle" textAlign="left" padded columns={1}>
            <Row className="dashboard-header">
              <Column width={13}>
                <Header className="dashboard-name" as="h1">
                  Hola {(name || "").toUpperCase()}, Bienvenido
                </Header>
              </Column>
            </Row>
            <Row>
              <Column width={13}>
                <Segment>
                  <TotalAuctions />
                </Segment>
              </Column>
              <Column width={3}>
                <div>
                  <NativeClock />
                </div>
              </Column>
            </Row>
            {activeAuctions.length > 0 ? (
              <Row columns={4}>
                <div className="dashboard-container">
                  <Column width={10}>
                    <Segment
                      className="active-auction-card"
                      textAlign="left"
                      size="small"
                    >
                      <div>
                        <h3>Subastas Activas</h3>
                        <Divider />
                        <div className="dashboard-card">
                          {activeAuctions
                            ? activeAuctions.map((auction) =>
                                displayAuction(auction)
                              )
                            : undefined}
                        </div>
                      </div>
                    </Segment>
                  </Column>
                </div>
              </Row>
            ) : (
              <NoData title="Aquí aparecerán tus subastas activas" />
            )}
          </Grid>
        </div>
      </div>
    </Fragment>
  );
};

export default Dashboard;
