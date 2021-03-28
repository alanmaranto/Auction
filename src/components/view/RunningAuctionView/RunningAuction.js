import React from "react";
import { Button, Form, Grid, Card, Icon, Message } from "semantic-ui-react";
import history from "../../../modules/history/history";
import Countdown from "react-countdown";
import SummaryTableCard from "./components/SummaryTableCard";
import RealTimeGraph from "./components/RealTimeGraph";
import { columns } from "./helpers";
import { roles } from "../../../helpers/roles";
import "./style.css";

const Input = Form.Input;
const Row = Grid.Row;
const Column = Grid.Column;

const Completionist = () => <span>Finalizamos la subasta</span>;

// Renderer callback with condition
const renderer = ({ days, hours, minutes, seconds, completed }) => {
  if (completed) {
    // Render a completed state
    return <Completionist />;
  } else {
    // Render a countdown
    return (
      <div className="countdown">
        <div className="countdown__time">
          <div>{days}</div>
          <span className="countdown__time--days">Días</span>
        </div>
        <div className="countdown__time">
          <div>{hours}</div>
          <span className="countdown__time--days">Horas</span>
        </div>
        <div className="countdown__time">
          <div>{minutes}</div>
          <span className="countdown__time--days">Minutos</span>
        </div>
        <div className="countdown__time">
          <div>{seconds}</div>
          <span className="countdown__time--days">Segundos</span>
        </div>
      </div>
    );
  }
};

const RunningAuction = ({
  title,
  sendBid,
  message,
  lastMessage,
  endingAuction,
  onFinalizedAuction,
  minimumBid,
  totalItemsPrice,
  role,
  handleChange,
  bids,
  summaryBids,
  extendedRealTimeAuctionDate,
}) => {
  const operation = new Date(endingAuction).getTime();
  const operationExtended = new Date(extendedRealTimeAuctionDate).getTime();

  const auctionConditions = [
    `Subasta: ${title}`,
    `La subasta inversa comienza en ${totalItemsPrice}`,
    `Las pujas disminuyen de ${minimumBid} en ${minimumBid}`,
  ];

  const renderCountdown = () => {
    return (
      <Row>
        <Column
          mobile={16}
          tablet={16}
          computer={8}
          largeScreen={8}
          widescreen={8}
        >
          <div style={{ textAlign: "center" }}>
            <h2>La subasta finalizará en</h2>
          </div>
          <Countdown
            date={
              !lastMessage ? new Date(operation) : new Date(operationExtended)
            }
            renderer={renderer}
            onComplete={
              role === roles.BUYER
                ? () => {
                    onFinalizedAuction();
                    history.push("/");
                  }
                : () => {
                    onFinalizedAuction();
                    history.push("/provider-dashboard");
                  }
            }
          />
        </Column>
        <Column
          mobile={16}
          tablet={16}
          computer={8}
          largeScreen={8}
          widescreen={8}
          className="running-auction-details"
        >
          <Message
            warning
            header="Condiciones de la subasta"
            list={auctionConditions}
            color="blue"
          />
        </Column>
      </Row>
    );
  };

  const renderBid = () => {
    const lastBid = lastMessage?.bid - minimumBid;
    return (
      <Row>
        <Column
          mobile={16}
          tablet={16}
          computer={8}
          largeScreen={8}
          widescreen={8}
        >
          <Card fluid>
            <Card.Content className="card-bid-container" textAlign="center">
              <Card.Header className="card-bid-container__header">
                Puja actual
              </Card.Header>
              <Card.Description className="card-bid-container__current-bid">
                $ {(lastMessage && lastMessage.bid) || totalItemsPrice} pesos
              </Card.Description>
            </Card.Content>
          </Card>
          {role === roles.PROVIDER && (
            <Form size="large" onSubmit={sendBid}>
              <Input
                placeholder="Introduzca su puja"
                type="number"
                value={message}
                name="message"
                fluid
                size="big"
                inverted
                max={isNaN(lastBid) ? totalItemsPrice : lastBid}
                onChange={(e) => handleChange(e)}
              />
              <Button
                style={{ background: "#19750c", color: "white" }}
                icon
                labelPosition="right"
                compact
                fluid
                size="large"
              >
                <Icon name="dollar sign" />
                ¡Pujar!
              </Button>
            </Form>
          )}
        </Column>
        <Column
          mobile={16}
          tablet={16}
          computer={8}
          largeScreen={8}
          widescreen={8}
          className="summary-table-card-col"
        >
          <SummaryTableCard data={summaryBids} columns={columns} />
        </Column>
      </Row>
    );
  };

  const renderRealTimeGraph = () => {
    return (
      <Grid.Row>
        <Grid.Column>
          <RealTimeGraph data={bids} />
        </Grid.Column>
      </Grid.Row>
    );
  };

  return (
    <Grid>
      {renderCountdown()}
      {renderRealTimeGraph()}
      {renderBid()}
    </Grid>
  );
};

RunningAuction.propTypes = {};

export default RunningAuction;
