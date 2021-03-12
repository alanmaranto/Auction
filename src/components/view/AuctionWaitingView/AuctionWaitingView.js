import React, { Fragment } from "react";
import { Card, Grid, Button, Feed } from "semantic-ui-react";
import history from "../../../modules/history/history";
import { Row, Column, CContent } from "../../../core/indexSemanticUi";
import { roles } from "../../../helpers/roles";
import AddProviders from "../AddProviders/AddProviders";
import { isAuthenticated } from "../../../helpers/authenticate";
import Countdown from "react-countdown";
import "./style.css";

import FileCard from "../../Files/FileCard";

const Completionist = () => <span>Arrrancamos la subasta</span>;

// Renderer callback with condition
const renderer = ({ days, hours, minutes, seconds, completed }) => {
  if (completed) {
    // Render a completed state
    return <Completionist />;
  } else {
    // Render a countdown
    return (
      <div className="countdown">
        <div className="time">
          <div>{days}</div>
          <span>Días</span>
        </div>
        <div className="time">
          <div>{hours}</div>
          <span>Horas</span>
        </div>
        <div className="time">
          <div>{minutes}</div>
          <span>Minutos</span>
        </div>
        <div className="time">
          <div>{seconds}</div>
          <span>Segundos</span>
        </div>
      </div>
    );
  }
};

const Auction = ({
  auction,
}) => {
  const { title, description, _id, openingRealTimeAuctionDate } = auction;
  const operation = new Date(openingRealTimeAuctionDate).getTime();

  const renderBuyerAuctionView = () => {
    return (
      isAuthenticated() &&
      isAuthenticated().user.role === roles.BUYER && (
        <Fragment>
          <Row>
            <Column>
              <div style={{ textAlign: "center" }}>
                <h2>Tiempo para iniciar la subasta</h2>
              </div>
              <Countdown
                date={new Date(operation)}
                renderer={renderer}
                onComplete={() => {
                  history.push(`/runningAuction/${_id}`);
                }}
              />
            </Column>
          </Row>
        </Fragment>
      )
    );
  };

  const renderProvidersAuctionView = () => {
    return (
      isAuthenticated() &&
      isAuthenticated().user.role === roles.PROVIDER && (
        <Fragment>
          <Row>
            <Column>
              <div style={{ textAlign: "center" }}>
                <h2>Tiempo para iniciar la subasta</h2>
              </div>
              <Countdown
                date={new Date(operation)}
                renderer={renderer}
                onComplete={() => {
                  history.push(`/runningAuction/${_id}`);
                }}
              />
            </Column>
          </Row>
        </Fragment>
      )
    );
  };

  return (
    <Grid>
      {renderBuyerAuctionView()}
      {renderProvidersAuctionView()}
    </Grid>
  );
};

export default Auction;
