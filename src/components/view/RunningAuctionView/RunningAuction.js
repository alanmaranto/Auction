import React, { Fragment, useState } from "react";
import { Button, Form, Grid, Segment, Header } from "semantic-ui-react";
import Sidebar from "../../../core/Sidebar/Sidebar";
import Navbar from "../../../core/Navbar/Navbar";
import history from "../../../modules/history/history";
import Timer from "react-compound-timer";
import moment from "moment";

const Input = Form.Input;
const Row = Grid.Row;
const Column = Grid.Column;

const RunningAuction = ({
  title,
  onSubmit,
  onChange,
  message,
  lastMessage,
  endingAuction,
  onFinalizedAuction,
}) => {
  let now = moment(new Date()); //todays date
  // let end = moment("2020-07-16T23:30:00.000Z"); // auction date as string
  let end = moment(endingAuction)
  let duration = moment.duration(end.diff(now));
  let seconds = duration.asSeconds();
  const milliseconds = seconds * 1000;
  console.log("as milliseconds .... ", milliseconds);

  const sendToDashboard = () => {
    console.log("Enviando al dashboard");
    // aqui va una funcion que edite el estado de la auction a finalized
    onFinalizedAuction();
    history.push(`/`);
  };

  const timeToAuction = [
    {
      time: 0,
      callback: () => sendToDashboard(),
    },
  ];

  return (
    <Fragment>
      <div className="app">
        <div className="generalContainer">
          <Sidebar />
          <div className="content-components">
            <Navbar />
            <div className="content-dynamic">
              <Grid>
                <Row>
                  <Column>
                    <div className="auction-title">
                      <div className="auction-h">
                        <Header
                          as="h1"
                          className="auction-header"
                          content={title}
                          icon="gavel"
                        />
                      </div>
                      <Timer
                        initialTime={15000} // formato miliseconds
                        direction="backward"
                        lastUnit="d"
                        checkpoints={timeToAuction}
                      >
                        {() => (
                          <Fragment>
                            <Timer.Days /> Días
                            <Timer.Hours /> Horas
                            <Timer.Minutes /> Minutos
                            <Timer.Seconds /> Segundos
                          </Fragment>
                        )}
                      </Timer>
                      <div className="background-container">
                        lastMessage :{lastMessage.bid}
                        <div style={{ padding: "50px" }}>
                          <Form size="large" onSubmit={onSubmit}>
                            <Segment>
                              <Input
                                placeholder="Introduzca un nombre para la subasta"
                                type="text"
                                value={message}
                                name="title"
                                onChange={(e) =>
                                  onChange("message", e.target.value)
                                }
                              />
                              <br />
                              <Grid textAlign="center" columns={2}>
                                <Button fluid compact fluid size="medium">
                                  Send message
                                </Button>
                              </Grid>
                            </Segment>
                            <Button fluid compact fluid size="medium" onClick={onFinalizedAuction()}>
                                  Send message
                                </Button>
                          </Form>
                        </div>
                      </div>
                    </div>
                  </Column>
                </Row>
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
