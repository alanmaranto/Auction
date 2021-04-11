import React, { Fragment } from "react";
import { Grid, Container, Card, Header, Icon } from "semantic-ui-react";
import history from "../../../modules/history/history";
import { Row, Column } from "../../../core/indexSemanticUi";
import { roles } from "../../../helpers/roles";
import { isAuthenticated } from "../../../helpers/authenticate";
import Countdown from "react-countdown";
import "./style.css";

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

const Auction = ({ auction }) => {
  const {
    title,
    identifier,
    _id,
    openingRealTimeAuctionDate,
    auctionStep,
    currency,
    minimumBid,
    totalItemsPrice,
    extensionTime,
    items,
  } = auction;
  const operation = new Date(openingRealTimeAuctionDate).getTime();

  const renderBuyerAuctionView = () => {
    return (
      isAuthenticated() &&
      isAuthenticated().user.role === roles.BUYER && (
        <Fragment>
          <Row style={{ paddingTop: 30 }}>
            <Column>
              <div>
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
          <Row>
            <Card fluid>
              <Container>
                <Row style={{ padding: "15px 15px 10px" }}>
                  <Header as="h3" color="pink">
                    <Icon name="info" />
                    <Header.Content>Información de la subasta</Header.Content>
                  </Header>
                </Row>
                <Row
                  style={{
                    justifyContent: "space-between",
                    padding: "10px 25px",
                  }}
                >
                  <Column
                    mobile={16}
                    tablet={16}
                    computer={4}
                    largeScreen={4}
                    widescreen={4}
                  >
                    <label className="auction-resume-label">
                      Nombre de la subasta:
                    </label>
                    <p>{title}</p>
                  </Column>
                  <Column
                    mobile={16}
                    tablet={16}
                    computer={4}
                    largeScreen={4}
                    widescreen={4}
                  >
                    <label className="auction-resume-label">
                      Identificador de la subasta:
                    </label>
                    <p>{identifier}</p>
                  </Column>
                  <Column
                    mobile={16}
                    tablet={16}
                    computer={4}
                    largeScreen={4}
                    widescreen={4}
                  >
                    <label className="auction-resume-label">
                      Estado de la subasta:
                    </label>
                    <p>{auctionStep}</p>
                  </Column>
                  <Column
                    mobile={16}
                    tablet={16}
                    computer={4}
                    largeScreen={4}
                    widescreen={4}
                  >
                    <label className="auction-resume-label">Moneda:</label>
                    <p>{currency}</p>
                  </Column>
                </Row>
                <Row
                  style={{
                    justifyContent: "space-between",
                    padding: "10px 25px",
                  }}
                >
                  <Column
                    mobile={16}
                    tablet={16}
                    computer={4}
                    largeScreen={4}
                    widescreen={4}
                  >
                    <label className="auction-resume-label">Puja mínima</label>
                    <p>{minimumBid}</p>
                  </Column>
                  <Column
                    mobile={16}
                    tablet={16}
                    computer={4}
                    largeScreen={4}
                    widescreen={4}
                  >
                    <label className="auction-resume-label">
                      La subasta arranca en:
                    </label>
                    <p>{totalItemsPrice}</p>
                  </Column>
                  <Column
                    mobile={16}
                    tablet={16}
                    computer={4}
                    largeScreen={4}
                    widescreen={4}
                  >
                    <label className="auction-resume-label">
                      Extensión de:
                    </label>
                    <p>{extensionTime} minutos</p>
                  </Column>
                  <Column
                    mobile={16}
                    tablet={16}
                    computer={4}
                    largeScreen={4}
                    widescreen={4}
                  >
                    <label className="auction-resume-label">Artículos:</label>
                    <p>{items?.length}</p>
                  </Column>
                </Row>
              </Container>
            </Card>
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
          <Row style={{ paddingTop: 30 }}>
            <Column>
              <div>
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
          <Row>
            <Card fluid>
              <Container>
                <Row style={{ padding: "15px 15px 10px" }}>
                  <Header as="h3" color="pink">
                    <Icon name="info" />
                    <Header.Content>Información de la subasta</Header.Content>
                  </Header>
                </Row>
                <Row
                  style={{
                    justifyContent: "space-between",
                    padding: "10px 25px",
                  }}
                >
                  <Column
                    mobile={16}
                    tablet={16}
                    computer={4}
                    largeScreen={4}
                    widescreen={4}
                  >
                    <label className="auction-resume-label">
                      Nombre de la subasta:
                    </label>
                    <p>{title}</p>
                  </Column>
                  <Column
                    mobile={16}
                    tablet={16}
                    computer={4}
                    largeScreen={4}
                    widescreen={4}
                  >
                    <label className="auction-resume-label">
                      Identificador de la subasta:
                    </label>
                    <p>{identifier}</p>
                  </Column>
                  <Column
                    mobile={16}
                    tablet={16}
                    computer={4}
                    largeScreen={4}
                    widescreen={4}
                  >
                    <label className="auction-resume-label">
                      Estado de la subasta:
                    </label>
                    <p>{auctionStep}</p>
                  </Column>
                  <Column
                    mobile={16}
                    tablet={16}
                    computer={4}
                    largeScreen={4}
                    widescreen={4}
                  >
                    <label className="auction-resume-label">Moneda:</label>
                    <p>{currency}</p>
                  </Column>
                </Row>
                <Row
                  style={{
                    justifyContent: "space-between",
                    padding: "10px 25px",
                  }}
                >
                  <Column
                    mobile={16}
                    tablet={16}
                    computer={4}
                    largeScreen={4}
                    widescreen={4}
                  >
                    <label className="auction-resume-label">Puja mínima</label>
                    <p>{minimumBid}</p>
                  </Column>
                  <Column
                    mobile={16}
                    tablet={16}
                    computer={4}
                    largeScreen={4}
                    widescreen={4}
                  >
                    <label className="auction-resume-label">
                      La subasta arranca en:
                    </label>
                    <p>{totalItemsPrice}</p>
                  </Column>
                  <Column
                    mobile={16}
                    tablet={16}
                    computer={4}
                    largeScreen={4}
                    widescreen={4}
                  >
                    <label className="auction-resume-label">
                      Extensión de:
                    </label>
                    <p>{extensionTime} minutos</p>
                  </Column>
                  <Column
                    mobile={16}
                    tablet={16}
                    computer={4}
                    largeScreen={4}
                    widescreen={4}
                  >
                    <label className="auction-resume-label">Artículos:</label>
                    <p>{items?.length}</p>
                  </Column>
                </Row>
              </Container>
            </Card>
          </Row>
        </Fragment>
      )
    );
  };

  return (
    <Grid>
      {renderBuyerAuctionView()}
      {renderProvidersAuctionView()}
    </Grid>
  );
};

export default Auction;
