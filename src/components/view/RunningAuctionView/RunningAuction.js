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
  onChange,
  message,
  lastMessage,
  endingAuction,
  onFinalizedAuction,
  minimumBid,
  minimumPrice,
  role,
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
    const submitBid = lastMessage && lastMessage.bid - minimumBid;
    console.log("submitBid", submitBid);
    return (
      <Row columns={2}>
        <Column>
          <Message
            warning
            header="Condiciones de la subasta"
            list={auctionConditions}
          />
        </Column>
        <Column>
          <Card fluid>
            <Card.Content className="card-container" textAlign="center">
              <Card.Header className="card-bid">Puja actual</Card.Header>
              <Card.Description className="card-bid-number">
                $ {(lastMessage && lastMessage.bid) || minimumPrice} pesos
              </Card.Description>
            </Card.Content>
          </Card>
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
                max={submitBid === null ? minimumPrice : submitBid}
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
          )}
        </Column>
      </Row>
    );
  };

  // make sure parent container have a defined height when using
  // responsive component, otherwise height will be 0 and
  // no chart will be rendered.
  // website examples showcase many properties,
  // you'll often use just a few of them.

  const data = [
    {
      id: "japan",
      color: "hsl(113, 70%, 50%)",
      data: [
        {
          x: "plane",
          y: 287,
        },
        {
          x: "helicopter",
          y: 293,
        },
        {
          x: "boat",
          y: 57,
        },
        {
          x: "train",
          y: 231,
        },
        {
          x: "subway",
          y: 64,
        },
        {
          x: "bus",
          y: 215,
        },
        {
          x: "car",
          y: 222,
        },
        {
          x: "moto",
          y: 31,
        },
        {
          x: "bicycle",
          y: 83,
        },
        {
          x: "horse",
          y: 226,
        },
        {
          x: "skateboard",
          y: 77,
        },
        {
          x: "others",
          y: 294,
        },
      ],
    },
    {
      id: "france",
      color: "hsl(170, 70%, 50%)",
      data: [
        {
          x: "plane",
          y: 145,
        },
        {
          x: "helicopter",
          y: 275,
        },
        {
          x: "boat",
          y: 42,
        },
        {
          x: "train",
          y: 48,
        },
        {
          x: "subway",
          y: 143,
        },
        {
          x: "bus",
          y: 69,
        },
        {
          x: "car",
          y: 70,
        },
        {
          x: "moto",
          y: 149,
        },
        {
          x: "bicycle",
          y: 58,
        },
        {
          x: "horse",
          y: 133,
        },
        {
          x: "skateboard",
          y: 66,
        },
        {
          x: "others",
          y: 45,
        },
      ],
    },
    {
      id: "us",
      color: "hsl(275, 70%, 50%)",
      data: [
        {
          x: "plane",
          y: 54,
        },
        {
          x: "helicopter",
          y: 75,
        },
        {
          x: "boat",
          y: 51,
        },
        {
          x: "train",
          y: 31,
        },
        {
          x: "subway",
          y: 158,
        },
        {
          x: "bus",
          y: 32,
        },
        {
          x: "car",
          y: 49,
        },
        {
          x: "moto",
          y: 291,
        },
        {
          x: "bicycle",
          y: 91,
        },
        {
          x: "horse",
          y: 104,
        },
        {
          x: "skateboard",
          y: 90,
        },
        {
          x: "others",
          y: 60,
        },
      ],
    },
    {
      id: "germany",
      color: "hsl(202, 70%, 50%)",
      data: [
        {
          x: "plane",
          y: 78,
        },
        {
          x: "helicopter",
          y: 60,
        },
        {
          x: "boat",
          y: 275,
        },
        {
          x: "train",
          y: 259,
        },
        {
          x: "subway",
          y: 291,
        },
        {
          x: "bus",
          y: 183,
        },
        {
          x: "car",
          y: 243,
        },
        {
          x: "moto",
          y: 109,
        },
        {
          x: "bicycle",
          y: 92,
        },
        {
          x: "horse",
          y: 113,
        },
        {
          x: "skateboard",
          y: 257,
        },
        {
          x: "others",
          y: 265,
        },
      ],
    },
    {
      id: "norway",
      color: "hsl(256, 70%, 50%)",
      data: [
        {
          x: "plane",
          y: 6,
        },
        {
          x: "helicopter",
          y: 243,
        },
        {
          x: "boat",
          y: 67,
        },
        {
          x: "train",
          y: 195,
        },
        {
          x: "subway",
          y: 124,
        },
        {
          x: "bus",
          y: 125,
        },
        {
          x: "car",
          y: 73,
        },
        {
          x: "moto",
          y: 119,
        },
        {
          x: "bicycle",
          y: 5,
        },
        {
          x: "horse",
          y: 165,
        },
        {
          x: "skateboard",
          y: 168,
        },
        {
          x: "others",
          y: 106,
        },
      ],
    },
  ];

  console.log("data", data);

  return (
    <Grid>
      {renderTitle()}
      {/* {renderCountdown()} */}
      {/* {renderBid()} */}
      <Grid.Row>
        <Grid.Column>
          <RealTimeGraph data={data} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <SummaryTableCard />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

RunningAuction.propTypes = {};

export default RunningAuction;
