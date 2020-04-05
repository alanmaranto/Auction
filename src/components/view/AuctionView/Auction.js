import React, { Fragment, useState } from "react";
import {
  Card,
  Header,
  Grid,
  Segment,
  Icon,
  Button,
  Container,
  CardContent
} from "semantic-ui-react";
import Timer from "react-compound-timer";
import Countdown from 'react-countdown';
import moment from "moment";

import Sidebar from "../../../core/Sidebar/Sidebar";
import Navbar from "../../../core/Navbar/Navbar";
import FileCardView from './FileCardView';
import { timerStyle } from "./style";
import "./style.css";

const Auction = ({ auction }) => {
  const sendToRealTimeAuction = () => {
    console.log("Enviando a la subasta en tiempo real");
  };

  const timeToAuction = [
    {
      time: 0,
      callback: () => sendToRealTimeAuction()
    }
  ];

  const auctionDate = moment(auction.openingAuction);
  const nowDate = moment();
  const difference = moment.duration(auctionDate.diff(nowDate));
  const asd = moment(difference).format("MMMM Do YYYY, h:mm:ss a")
  const time = Number(difference);
  console.log("difference", difference);
  console.log("num", Number(difference));
  console.log("time", time);

  return (
    <Fragment>
      <div className="app">
        <div className="generalContainer">
          <Sidebar />
          <div className="content-components">
            <Navbar />
            <div className="content-dynamic">
              <Grid>
                <Grid.Row>
                  <Grid.Column>
                    <Header
                      textAlign="left"
                      style={{ color: "#142850", fontSize: "4em" }}
                    ></Header>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={2}>
                  <Grid.Column>
                    <Card style={{ height: "400px", width: "500px" }}>
                      <p>{auction.title}</p>
                      <p>{auction.description}</p>
                    </Card>
                  </Grid.Column>
                  <Grid.Column>
                    <Card style={timerStyle}>
                      <div style={{ textAlign: "center" }}>
                        <h2>Tiempo para iniciar la subasta</h2>
                      </div>
{/*                       <Countdown date={Date.now() + 5555}>
                        <sendToRealTimeAuction />
                      </Countdown> */}
                       <Timer
                        initialTime={5555555555}
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
                    </Card>
                    <Segment>
                      <Header icon>
                        <Icon name="pdf file outline" />
                        No se han agregado documentos aún
                      </Header>
                      <Button primary>Agregar Documento</Button>
                    </Segment>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Auction;
