import React, { Fragment, useState } from "react";
import {
  Card,
  Header,
  Grid,
  Segment,
  Icon,
  Button,
  Divider,
  Container,
  CardContent,
} from "semantic-ui-react";
import Timer from "react-compound-timer";
import moment from "moment";
import history from "../../../modules/history/history";
import Sidebar from "../../../core/Sidebar/Sidebar";
import Navbar from "../../../core/Navbar/Navbar";
import FileCardView from "./FileCardView";
import { timerStyle } from "./style";
import "./style.css";

const Auction = ({ auction }) => {
  const [show, setShow] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  const { title, description, _id } = auction;

  console.log('auc', auction)

  const sendToRealTimeAuction = (id) => {
    console.log("Enviando a la subasta en tiempo real");
    history.push(`/runningAuction/${id}`)
  };

  const timeToAuction = [
    {
      time: 0,
      callback: () => sendToRealTimeAuction(_id),
    },
  ];

  let now = moment(new Date()); //todays date
  let end = moment(auction.openingAuction); // auction date as string
  let duration = moment.duration(end.diff(now));
  let seconds = duration.asSeconds();
  const milliseconds = seconds * 1000;
  console.log("as secondss mary .... ", auction.openingAuction);
  console.log("as milliseconds .... ", milliseconds);


  /*
  const auctionDate = moment("");
  const nowDate = moment();
  const difference = 3000000; // 300000sg //moment.duration(auctionDate.diff(nowDate));
  // const asd = moment(difference).format("MMMM Do YYYY, h:mm:ss a");
  const time = Number(difference);
  console.log("difference", difference);
  console.log("num", Number(difference));
  console.log("time", time);
*/
  const onClose = () => {
    setOpenModal(false);
  };

  const onOpenModal = () => {
    setOpenModal(true);
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
                <Grid.Row>
                  <Grid.Column>
                    <div className="auction-title">
                      <div className="auction-h">
                        <Header
                          as="h1"
                          className="auction-header"
                          content={title}
                          icon="gavel"
                        />
                      </div>
                      <div className="background-container">
                        <Button onClick={() => setShow(!show)}>
                          {show ? (
                            <div style={{ color: "w" }}>
                              Ver descripción completa
                            </div>
                          ) : (
                            <div>
                              <p className="auction-description">
                                {description}
                              </p>
                            </div>
                          )}
                        </Button>
                      </div>
                    </div>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={2}>
                  <Grid.Column>
                    <Card className="auction-card">
                      Time, Countdown and messages
                      <Card style={timerStyle}>
                        <div style={{ textAlign: "center" }}>
                          <h2>Tiempo para iniciar la subasta</h2>
                        </div>
                        <Timer
                          initialTime={10000} // formato miliseconds
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
                    </Card>
                  </Grid.Column>
                  <Grid.Column>
                    <Card>
                      <Card.Content>
                        <div>
                          Archivos
                          <Button
                            circular
                            floated="right"
                            icon="add circle"
                            onClick={onOpenModal}
                          />
                          <FileCardView
                            openModal={openModal}
                            setOpenModal={setOpenModal}
                            onClose={onClose}
                            auctionId={_id}
                          />
                        </div>
                        <Card>Aqui van los archivos</Card>
                      </Card.Content>
                    </Card>
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
