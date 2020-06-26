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
import Countdown from "react-countdown";

const Completionist = () => <span>Arrrancamos la subasta</span>;

// Renderer callback with condition
const renderer = ({ days, hours, minutes, seconds, completed }) => {
  if (completed) {
    // Render a completed state
    return <Completionist />;
  } else {
    // Render a countdown
    return (
      <div>
        <div>{days} (dias) </div>
        <div>{hours} (horas)</div>
        <div>{minutes} (minutos)</div>
        <div>{seconds} (segundos) </div>
        <div>Continua personalizando tanto como gustes...</div>
        <div> gg saludistos</div>
      </div>
    );
  }
};

const Auction = ({
  auction,
  providers,
  openProviders,
  openFiles,
  onOpenProviderModal,
  onCloseProviderModal,
  onOpenFileModal,
  onCloseFileModal,
  submitProviders,
}) => {
  const { title, description, _id, openingAuction } = auction;
  const operation = new Date(openingAuction).getTime();

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
                        <Countdown
                          date={new Date(operation)}
                          renderer={renderer}
                          onComplete={() => {
                            console.log("con esta función le decimos bye al component")
                            history.push(`/runningAuction/${_id}`);
                          }}
                        /> 
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
