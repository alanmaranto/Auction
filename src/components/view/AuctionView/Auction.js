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
import moment from "moment";
import history from "../../../modules/history/history";
import Sidebar from "../../../core/Sidebar/Sidebar";
import Navbar from "../../../core/Navbar/Navbar";
import { Row, Column, CContent } from "../../../core/indexSemanticUi";
import { timerStyle } from "./style";
import AddProviders from "../AddProviders/AddProviders";
import { isAuthenticated } from "../../../helpers/authenticate";
import Countdown from "react-countdown";
import "./style.css";

import FileCard from "../../Files/FileCard";

const Completionist = () => <span>Arrrancamos la subasta</span>;

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

  console.log('oper', operation)

  const showInvitedProviders = (
    providers,
    openProviders,
    onOpenProviderModal,
    onCloseProviderModal,
    submitProviders
  ) => {
    return (
      <Column>
        <Card color="blue" fluid>
          <CContent>
            <Button
              circular
              onClick={onOpenProviderModal}
              icon="add circle"
              floated="right"
            />
            <Card.Header>Proveedores Invitados</Card.Header>
            <Card.Description>
              Aquí podrás seleccionar a los proveedores que quieres que
              participen en la subasta
            </Card.Description>
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

  const renderAuctionHeader = () => {
    return (
      <Fragment>
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
            </div>
          </Column>
        </Row>
        <Row>
          <Column>
            <div className="background-container">
              <div>
                <p className="auction-description">{description}</p>
              </div>
            </div>
          </Column>
        </Row>
      </Fragment>
    );
  };

  const renderBuyerAuctionView = () => {
    return (
      isAuthenticated() &&
      isAuthenticated().user.role === 0 && (
        <Fragment>
          <Row>
            <Column>
              <div style={{ textAlign: "center" }}>
                <h2>Tiempo para iniciar la subasta</h2>
              </div>
              <Countdown
                date={new Date(operation)}
                renderer={renderer}
                onComplete={() => {
                  console.log("con esta función le decimos bye al component");
                  history.push(`/runningAuction/${_id}`);
                }}
              />
            </Column>
          </Row>
          <Row columns={2}>
            {showInvitedProviders(
              providers,
              openProviders,
              onOpenProviderModal,
              onCloseProviderModal,
              submitProviders
            )}
            <FileCard
              id={_id}
              openFiles={openFiles}
              onOpenFileModal={onOpenFileModal}
              onCloseFileModal={onCloseFileModal}
            />
          </Row>
        </Fragment>
      )
    );
  };

  const renderProvidersAuctionView = () => {
    return (
      isAuthenticated() &&
      isAuthenticated().user.role === 1 && (
        <Fragment>
          <Row columns={2}>
            <Column>
              <FileCard
                id={_id}
                openFiles={openFiles}
                onOpenFileModal={onOpenFileModal}
                onCloseFileModal={onCloseFileModal}
              />
            </Column>
            <Column>
              <div style={{ textAlign: "center" }}>
                <h2>Tiempo para iniciar la subasta</h2>
              </div>
              <Countdown
                date={new Date(operation)}
                renderer={renderer}
                onComplete={() => {
                  console.log("con esta función le decimos bye al component");
                  history.push(`/runningAuction/${_id}`);
                }}
              />
            </Column>
          </Row>
        </Fragment>
      )
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
                {renderAuctionHeader()}
                {renderBuyerAuctionView()}
                {renderProvidersAuctionView()}
              </Grid>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Auction;
