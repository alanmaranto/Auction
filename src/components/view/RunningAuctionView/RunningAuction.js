import React from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Card,
  Icon,
  Message,
} from "semantic-ui-react";
import history from "../../../modules/history/history";
import Countdown from "react-countdown";
import { roles } from "../../../helpers/roles";
import SummaryTableCard from "./components/SummaryTableCard";
import RealTimeGraph from "./components/RealTimeGraph";

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
  message,
  lastMessage,
  endingAuction,
  onFinalizedAuction,
  minimumBid,
  minimumPrice,
  role,
  bids,
  summaryBids,
  setMessage
}) => {
  const operation = new Date(endingAuction).getTime();

  const auctionConditions = [
    `La subasta inversa comienza en ${minimumPrice}`,
    `Las pujas mínimas son de ${minimumBid}`,
  ];

  const renderTitle = () => {
    return (
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
    );
  };

  const renderCountdown = () => {
    return (
      <Row>
        <Column>
          <div style={{ textAlign: "center" }}>
            <h2>La subasta finalizará en</h2>
          </div>
          <Countdown
            date={new Date(operation)}
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
      </Row>
    );
  };

  const renderBid = () => {
    /*     const submitBid = lastMessage && lastMessage.bid - minimumBid;
    console.log("submitBid", submitBid); */
    return (
      <Row columns={2}>
        <Column>
          {/*           <Card fluid>
            <Card.Content className="card-container" textAlign="center">
              <Card.Header className="card-bid">Puja actual</Card.Header>
              <Card.Description className="card-bid-number">
                $ {(lastMessage && lastMessage.bid) || minimumPrice} pesos
              </Card.Description>
            </Card.Content>
          </Card> */}
          {role === roles.PROVIDER && (
            <Form size="large" onSubmit={onSubmit}>
              <Input
                placeholder="Introduzca su puja"
                type="number"
                value={message}
                name="title"
                fluid
                size="big"
                inverted
                // max={submitBid === null ? minimumPrice : submitBid}
                // onChange={(e) => onChange("message", e.target.value)}
                onChange={(e) => setMessage(e.target.value)}
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
      </Row>
    );
  };
  // calcular (minimumBid * totalItemsPrice) / 100 para mostrarlo en el message




  const data = [
    {
      id: "alexis proveedor",
      color: "hsl(113, 70%, 50%)",
      data: [
        {
          x: "14:27",
          y: 287,
        },
        {
          x: "14:33",
          y: 285,
        },
        {
          x: "14:50",
          y: 220,
        },
      ],
    },
    {
      id: "nuevo proveedor",
      color: "hsl(170, 70%, 50%)",
      data: [
        {
          x: "14:33",
          y: 287,
        },
        {
          x: "14:56",
          y: 200,
        },
        {
          x: "14:57",
          y: 199,
        }
      ],
    },
  ];

const data2 = [
  {
    "id": "omi",
    "data": [
      {
        "x": "7:02",
        "y": 200
      },
      {
        "x": "7:10",
        "y": 199
      },
      {
        "x": "7:25",
        "y": 198
      },
    ]
  },
  {
    "id": "alan",
    "data": [
      {
        "x": "7:02",
        "y": 200
      },
      {
        "x": "7:10",
        "y": 199
      },
      {
        "x": "7:25",
        "y": 198
      },
    ]
  },

]

  return (
    <Grid>
      {renderTitle()}
      {/* {renderCountdown()} */}
      <Grid.Row>
        <Grid.Column>
          <RealTimeGraph data={bids} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns={2}>
        <Grid.Column>
          <SummaryTableCard summaryBids={summaryBids} />
        </Grid.Column>
        <Grid.Column>
          <Message
            warning
            header="Condiciones de la subasta"
            list={auctionConditions}
          />
        </Grid.Column>
      </Grid.Row>
      {renderBid()}
    </Grid>
  );
};

RunningAuction.propTypes = {};

export default RunningAuction;
