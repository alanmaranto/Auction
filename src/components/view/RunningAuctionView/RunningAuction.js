import React, { Fragment } from "react";
import {
  Button,
  Form,
  Grid,
  Segment,
  Header,
  Card,
  Icon,
} from "semantic-ui-react";
import Sidebar from "../../../core/Sidebar/Sidebar";
import Navbar from "../../../core/Navbar/Navbar";
import history from "../../../modules/history/history";
import Countdown from "react-countdown";
import moment from "moment";
import "./style.css";
import { isAuthenticated } from "../../../helpers/authenticate";

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

const RunningAuction = ({
  title,
  onSubmit,
  onChange,
  message,
  lastMessage,
  endingAuction,
  onFinalizedAuction,
}) => {
  const operation = new Date(endingAuction).getTime();
  console.log("op", operation);

  const renderTitle = () => {
    return (
      <Fragment>
        <Row>
          <Column>
            <div className="auction-h">
              <Header
                as="h1"
                className="auction-header"
                content={title}
                icon="gavel"
              />
            </div>
          </Column>
        </Row>
      </Fragment>
    );
  };

  const renderCountdown = () => {
    return (
      <Fragment>
        <Row>
          <Column>
            <div style={{ textAlign: "center" }}>
              <h2>La subasta finalizará en</h2>
            </div>
            <Countdown
              date={new Date(operation)}
              renderer={renderer}
              onComplete={
                isAuthenticated() && isAuthenticated().user.role === 0
                  ? () => {
                      console.log(
                        "con esta función le decimos bye al component"
                      );
                      onFinalizedAuction();
                      history.push("/");
                    }
                  : () => {
                      console.log("proveedor");
                      onFinalizedAuction();
                      history.push("/provider-dashboard");
                    }
              }
            />
          </Column>
        </Row>
      </Fragment>
    );
  };

  const renderBid = () => {
    return (
      <Fragment>
        <Row columns={2}>
          <Column>
            <Form size="large" onSubmit={onSubmit}>
              <Input
                placeholder="Introduzca su puja"
                type="number"
                value={message}
                name="title"
                fluid
                size="big"
                inverted
                onChange={(e) => onChange("message", e.target.value)}
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
          </Column>
          <Column>
            <Card fluid>
              <Card.Content className="card-container" textAlign="center">
                <Card.Header className="card-bid">
                  Puja actual
                </Card.Header>
                <Card.Description className="card-bid-number">
                  $ {lastMessage.bid || 0 } pesos
                </Card.Description>
              </Card.Content>
            </Card>
          </Column>
        </Row>
      </Fragment>
    );
  };

  return (
    <Fragment>
      <div className="app">
        <div className="generalContainer">
          <Sidebar />
          <div className="content-components">
            <Navbar />
            <div className="content-dynamic">
              <Grid>
                {renderTitle()}
                {renderCountdown()}
                {renderBid()}
              </Grid>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

RunningAuction.propTypes = {};

export default RunningAuction;
