import React, { Fragment } from "react";
import { Card, Header, Grid, Button, Feed } from "semantic-ui-react";
import history from "../../../modules/history/history";
import { Row, Column, CContent } from "../../../core/indexSemanticUi";
import { roles } from "../../../helpers/roles";
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
  choosedProviders,
  onSelectProviders,
}) => {
  const { title, description, _id, openingAuction } = auction;
  const operation = new Date(openingAuction).getTime();

  const showInvitedProviders = (
    providers,
    openProviders,
    onOpenProviderModal,
    onCloseProviderModal,
    submitProviders,
    choosedProviders,
    onSelectProviders
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
            <Card.Description></Card.Description>
            <AddProviders
              providers={providers}
              openProviders={openProviders}
              onCloseProviderModal={onCloseProviderModal}
              submitProviders={submitProviders}
              onSelectProviders={onSelectProviders}
              choosedProviders={choosedProviders}
            />
          </CContent>
          <CContent>
            <Feed>
              <Feed.Event>
                <Feed.Content>
                  <Feed.Summary>
                    {choosedProviders &&
                      choosedProviders.map((provider) => {
                        return <div>{provider.invitedProvider.name}</div>;
                      })}
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
      isAuthenticated().user.role === roles.BUYER && (
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
              submitProviders,
              choosedProviders,
              onSelectProviders
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
      isAuthenticated().user.role === roles.PROVIDER && (
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
    <Grid>
      {renderAuctionHeader()}
      {renderBuyerAuctionView()}
      {renderProvidersAuctionView()}
    </Grid>
  );
};

export default Auction;
