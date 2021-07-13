import React from "react";
import {
  Button,
  Grid,
  Card,
  Message,
  Input,
  Header,
  Segment,
  TransitionablePortal,
} from "semantic-ui-react";
import history from "../../../modules/history/history";
import Countdown from "react-countdown";
import SummaryTableCard from "./components/SummaryTableCard";
import RealTimeGraph from "./components/RealTimeGraph";
import { columns } from "./helpers";
import { formatCurrency } from "../../../helpers/currency";
import { roles } from "../../../helpers/roles";
import "./style.css";
import SupplierItemsContainer from "./components/SupplierItemsContainer";

const Row = Grid.Row;
const Column = Grid.Column;

const RunningAuction = ({
  title,
  sendBid,
  lastMessage,
  endingAuction,
  onFinalizedAuction,
  minimumBid,
  totalItemsPrice,
  role,
  bids,
  summaryBids,
  extendedRealTimeAuctionDate,
  currency,
  suppliersItems,
  totalSupplier,
  handleSuppliersItemsTable,
  percentage,
  setPercentage,
  updatePercentage,
  restoreItems,
  openConfirmation,
  setOpenConfirmation,
  showPopUpBid,
  setShowPopUpBid,
  bidUser,
  user,
}) => {
  const operation = new Date(endingAuction).getTime();
  const operationExtended = new Date(extendedRealTimeAuctionDate).getTime();

  const Completionist = () => {
    if (role === roles.BUYER) {
      return () => {
        onFinalizedAuction();
        history.push("/");
      };
    } else {
      return () => {
        onFinalizedAuction();
        history.push("/provider-dashboard");
      };
    }
  };

  // Renderer callback with condition
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return <Completionist />;
    } else {
      // Render a countdown
      return (
        <div className="countdown">
          <div className="countdown__time">
            <div>{days}</div>
            <span className="countdown__time--days">Días</span>
          </div>
          <div className="countdown__time">
            <div>{hours}</div>
            <span className="countdown__time--days">Horas</span>
          </div>
          <div className="countdown__time">
            <div>{minutes}</div>
            <span className="countdown__time--days">Minutos</span>
          </div>
          <div className="countdown__time">
            <div>{seconds}</div>
            <span className="countdown__time--days">Segundos</span>
          </div>
        </div>
      );
    }
  };

  const auctionConditions = [
    `Subasta: ${title}`,
    `La subasta inversa comienza en ${
      currency && formatCurrency(totalItemsPrice, currency)
    }`,
    `Las pujas disminuyen de ${
      currency && formatCurrency(minimumBid, currency)
    } en ${currency && formatCurrency(minimumBid, currency)}`,
  ];

  const renderCountdown = () => {
    return (
      <Row>
        <Column
          mobile={16}
          tablet={16}
          computer={8}
          largeScreen={8}
          widescreen={8}
        >
          <div style={{ textAlign: "center" }}>
            <h2>La subasta finalizará en</h2>
          </div>
          <Countdown
            date={
              !lastMessage ? new Date(operation) : new Date(operationExtended)
            }
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
        <Column
          mobile={16}
          tablet={16}
          computer={8}
          largeScreen={8}
          widescreen={8}
          className="running-auction-details"
        >
          {currency && (
            <Message
              warning
              header="Condiciones de la subasta"
              list={auctionConditions}
              color="blue"
            />
          )}
        </Column>
      </Row>
    );
  };

  const renderBid = () => {
    // const lastBid = lastMessage?.bid - minimumBid; // modificar con minimo bid del comprador
    return (
      <Row>
        <Column
          mobile={16}
          tablet={16}
          computer={8}
          largeScreen={8}
          widescreen={8}
        >
          <Card fluid>
            <Card.Content className="card-bid-container" textAlign="center">
              <Card.Header className="card-bid-container__header">
                Puja actual
              </Card.Header>
              <Card.Description className="card-bid-container__current-bid">
                {currency &&
                  formatCurrency(
                    (lastMessage && lastMessage.bid) || totalItemsPrice,
                    currency
                  )}{" "}
                {currency}
              </Card.Description>
            </Card.Content>
          </Card>
        </Column>
        {renderSummaryTable()}
      </Row>
    );
  };

  const renderSummaryTable = () => (
    <Column
      mobile={16}
      tablet={16}
      computer={role === roles.BUYER ? 8 : 16}
      largeScreen={role === roles.BUYER ? 8 : 16}
      widescreen={role === roles.BUYER ? 8 : 16}
      className="summary-table-card-col"
    >
      <SummaryTableCard
        data={summaryBids}
        columns={columns}
        currency={currency}
      />
    </Column>
  );

  const renderRealTimeGraph = () => {
    return (
      <Grid.Row>
        <Grid.Column>
          <RealTimeGraph data={bids} />
        </Grid.Column>
      </Grid.Row>
    );
  };

  const renderSupplierItems = () => {
    return (
      <Row>
        <Column
          mobile={16}
          tablet={16}
          computer={16}
          largeScreen={16}
          widescreen={16}
        >
          <Card fluid>
            <Card.Content>
              <Header
                as="h2"
                content="Artículos"
                subheader="Actualiza los precios base de todos los artículos con base en
              porcentaje o si lo deseas puedes hacerlo manualmente"
              />
              <div className="percent-container">
                <Input
                  icon="percent"
                  iconPosition="left"
                  size="mini"
                  placeholder="Agrega un porcentaje"
                  style={{ width: "32%" }}
                  type="number"
                  value={percentage}
                  onChange={(e) => setPercentage(e.target.value)}
                />
                <Button
                  primary
                  content="Restablecer"
                  style={{ width: "32%" }}
                  onClick={restoreItems}
                />
                <Button
                  primary
                  content="Actualizar"
                  style={{ width: "32%" }}
                  onClick={updatePercentage}
                />
              </div>
              <SupplierItemsContainer
                suppliersItems={suppliersItems}
                totalSupplier={totalSupplier}
                currency={currency}
                handleSuppliersItemsTable={handleSuppliersItemsTable}
                sendBid={sendBid}
                openConfirmation={openConfirmation}
                setOpenConfirmation={setOpenConfirmation}
                totalItemsPrice={totalItemsPrice}
                lastMessage={lastMessage}
              />
            </Card.Content>
          </Card>
        </Column>
      </Row>
    );
  };

  return (
    <Grid>
      {renderCountdown()}
      {renderRealTimeGraph()}
      {role === roles.BUYER && renderBid()}
      <Grid.Row>{role === roles.PROVIDER && renderSummaryTable()}</Grid.Row>
      {role === roles.PROVIDER && renderSupplierItems()}
      {user !== bidUser && (
        <TransitionablePortal
          onOpen={() => setShowPopUpBid(true)}
          onClose={() => setShowPopUpBid(false)}
          open={showPopUpBid}
        >
          <Segment
            style={{ left: "40%", position: "fixed", top: "38%", zIndex: 1000 }}
            size="small"
            inverted
            color="blue"
          >
            <Header>¡Alguien ha pujado!</Header>
            <p>Revisa la puja actual</p>
            {role === roles.PROVIDER && (
              <p>Asegúrate que tu próxima puja sea menor que la actual</p>
            )}
            <Button
              content="Cerrar"
              onClick={() => setShowPopUpBid(false)}
              size="small"
              fluid
            />
          </Segment>
        </TransitionablePortal>
      )}
    </Grid>
  );
};

RunningAuction.propTypes = {};

export default RunningAuction;
