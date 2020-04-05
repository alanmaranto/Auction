import React, { Fragment, useState, useEffect } from "react";
import { Card, Grid, Segment, List, Divider } from "semantic-ui-react";
import { getAuction, getAuctions } from "../../../api";
import { showAuctions, displayAuction } from "./helpers";
import history from "../../../modules/history/history";
import Clock from "../../../core/Clock/Clock";

import "./style.css";

const Dashboard = () => {
  const [error, setError] = useState(false);
  const [auctions, setAuctions] = useState([]);

  const fetchProducts = async () => {
    const response = await getAuctions();

    if (response.status === 200) {
      setAuctions(response.data.body);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const sendToAuctionView = redirect => {
    console.log("his", history);

    history.push(`${redirect}`);
  };

  const activeAuctions = showAuctions(
    auctions,
    "activeAuction",
    sendToAuctionView
  );
  const finalizedAuctions = showAuctions(
    auctions,
    "finalizedAuction",
    sendToAuctionView
  );

  return (
    <Fragment>
      <div className="dashboard-view">
        <div className="card-graphics">
          <Grid
            verticalAlign="middle"
            textAlign="center"
            centered
            divided="vertically"
            stackable
            container
            columns={1}
          >
            <Grid.Row>
              <Grid.Column width={10}>
                <Segment>
                  1<div>Reporte de Subatas</div>
                </Segment>
              </Grid.Column>
              <Grid.Column width={3}>
                <Segment>
                  <Clock />
                </Segment>
              </Grid.Column>
            </Grid.Row>
            <div className="dashboard-container">
              <Grid.Row>
                <Grid.Column width={8}>
                  <Segment textAlign="left" size="tiny">
                    <div>
                      <h3>Subastas Activas</h3>
                      <Divider />
                      <div className="dashboard-card">
                        {activeAuctions ? (
                          activeAuctions.map(auction => displayAuction(auction))
                        ) : (
                          <div>No hay subastas</div>
                        )}
                      </div>
                    </div>
                  </Segment>
                </Grid.Column>
                <Grid.Column width={8}>
                  <Segment
                    style={{ marginLeft: "20px" }}
                    textAlign="left"
                    size="tiny"
                  >
                    <div>
                      <h3>Subastas Finalizadas</h3>
                      <Divider />
                      <div className="dashboard-card">
                        {finalizedAuctions ? (
                          finalizedAuctions.map(auction =>
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
