import React, { Fragment } from "react";
import {
  Card,
  Header,
  Grid,
  Button,
  Divider,
  Container,
  CardContent,
  Feed,
  FeedContent,
} from "semantic-ui-react";
import Timer from "react-compound-timer";
import moment from "moment";
import history from "../../../modules/history/history";
import Sidebar from "../../../core/Sidebar/Sidebar";
import Navbar from "../../../core/Navbar/Navbar";
import FileCardView from "./FileCardView";
import { Row, Column, CContent } from "../../../core/indexSemanticUi";
import { timerStyle } from "./style";
import "./style.css";
import AddProviders from "../AddProviders/AddProviders";

const Auction = ({
  auction,
  providers,
  openProviders,
  openFiles,
  onOpenProviderModal,
  onCloseProviderModal,
  onOpenFileModal,
  onCloseFileModal,
  submitProviders
}) => {
  const { title, description, _id } = auction;

  console.log("auc", auction);

  const sendToRealTimeAuction = (id) => {
    console.log("Enviando a la subasta en tiempo real");
    history.push(`/runningAuction/${id}`);
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
  /*   const onClose = () => {
    setOpenModal(false);
  };

  const onOpenModal = () => {
    setOpenModal(true);
  }; */

  const showInvitedProviders = (
    providers,
    openProviders,
    onOpenProviderModal,
    onCloseProviderModal,
    submitProviders
  ) => {
    return (
      <Column>
        <Card>
          <CContent>
            Proveedores invitados
            <Button
              circular
              onClick={onOpenProviderModal}
              icon="add circle"
              floated="right"
            />
            <AddProviders
              providers={providers}
              openProviders={openProviders}
              onCloseProviderModal={onCloseProviderModal}
              submitProviders={submitProviders}
            />
          </CContent>
          <CContent>
            <Feed>
              <Feed.Event>
                <Feed.Content>
                  <Feed.Summary>
                    Aqui van el componente que mapea los proveedores
                  </Feed.Summary>
                </Feed.Content>
              </Feed.Event>
            </Feed>
          </CContent>
        </Card>
      </Column>
    );
  };

  const showFiles = (openFiles, onOpenFileModal, onCloseFileModal, id) => {
    return (
      <Column>
        <Card>
          <CContent>
            <div>
              Archivos
              <Button
                circular
                floated="right"
                icon="add circle"
                onClick={onOpenFileModal}
              />
              <FileCardView
                openModal={openFiles}
                onClose={onCloseFileModal}
                auctionId={id}
              />
            </div>
            <Card>Aqui van los archivos</Card>
          </CContent>
        </Card>
      </Column>
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
                      <div className="background-container">
                        <div>
                          <p className="auction-description">{description}</p>
                        </div>
                      </div>
                    </div>
                  </Column>
                </Row>
                <Row columns={3}>
                  {showInvitedProviders(
                    providers,
                    openProviders,
                    onOpenProviderModal,
                    onCloseProviderModal,
                    submitProviders
                  )}
                  {showFiles(openFiles, onOpenFileModal, onCloseFileModal, _id)}
                  <Column>
                    <Card className="auction-card">
                      Time, Countdown and messages
                      <Card style={timerStyle}>
                        <div style={{ textAlign: "center" }}>
                          <h2>Tiempo para iniciar la subasta</h2>
                        </div>
                        <Timer
                          initialTime={10000000} // formato miliseconds
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

export default Auction;
