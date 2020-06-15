import React, { Fragment, useState } from "react";
import { Button, Form, Grid, Segment, Header } from "semantic-ui-react";
import Sidebar from "../../../core/Sidebar/Sidebar";
import Navbar from "../../../core/Navbar/Navbar";
import Timer from "react-compound-timer";
import moment from "moment";

const Input = Form.Input;
const Row = Grid.Row;
const Column = Grid.Column;

const RunningAuction = ({ title, messages, onSubmit, onChange, message}) =>{ 

  let now = moment(new Date()); //todays date
  let end = moment("2020-07-16T23:30:00.000Z"); // auction date as string
  let duration = moment.duration(end.diff(now));
  let seconds = duration.asSeconds();
  const milliseconds = seconds * 1000;
  console.log("as milliseconds .... ", milliseconds);

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
                          initialTime={milliseconds} // formato miliseconds
                          direction="backward"
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
                      Messages: {(messages && messages.length) || 0} total
                      <div style={{height:'50px'}} >
                      </div>
                      { messages && messages.map( (message,index)=>{
                        return <div key={`message-${index}`}>{message.bid}</div>
                        })
                      }
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
                            }

RunningAuction.propTypes = {};

export default RunningAuction;
