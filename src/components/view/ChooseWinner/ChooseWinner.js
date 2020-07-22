import React, { Fragment } from "react";
import { Header, Grid, Confirm, Message } from "semantic-ui-react";
import BidCard from "./BidCard";
import { Row, Subheader, Column } from "../../../core/indexSemanticUi";
import Sidebar from "../../../core/Sidebar/Sidebar";
import NoData from "../../../core/500/NoData";
import Navbar from "../../../core/Navbar/Navbar";
import "./style.css";

const ChooseWinner = ({
  bids,
  onChooseWinner,
  openConfirm,
  onOpenConfirm,
  onCancel,
}) => {
  const isWinner = bids.some((w) => w.winner);

  const providerWinner =
    bids &&
    bids
      .filter((winner) => winner.winner)
      .map((providers) => providers.provider[0].name);

  const showWinner = () => {
    return (
      <div className="show-winner">
        <Message
          success
          size="big"
          header={`El ganador de la subasta fue el proveedor ${providerWinner}`}
        />
      </div>
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
                <Row textAlign="center">
                  <Column>
                    <Header as="h1">
                      Elige la puja ganadora
                      <Subheader>
                        Se muestran las últimas pujas de cada proveedor que
                        participó.
                      </Subheader>
                    </Header>
                  </Column>
                </Row>
                <div>
                  {bids.length === 0 && (
                    <div className="no-bids">
                      <NoData
                        size="medium"
                        title="Desafortunadamente no hubo pujas en esta subasta"
                      />
                    </div>
                  )}
                </div>
                <div className="wrapper-bid-cards">
                  <div className="grid-bid-cards">
                    <Confirm
                      size="mini"
                      className="file-modal"
                      open={openConfirm}
                      content="¿Estas seguro de querer elegir esta puja como ganadora?"
                      onCancel={onCancel}
                      onConfirm={() => onChooseWinner()}
                    />
                    {bids &&
                      bids.map(
                        ({ provider, auctionInfo ,auctionId, bid, winner, idMessage }) => {
                          return (
                            <BidCard
                              key={idMessage}
                              providerName={
                                provider &&
                                provider.map((provider) => provider.name)
                              }
                              providerEmail={
                                provider &&
                                provider.map((provider) => provider.email)
                              }
                              auctionTitle={
                                auctionInfo &&
                                auctionInfo.map((auction) => auction.title)
                              }
                              bid={bid}
                              bidId={idMessage}
                              auctionId={auctionId}
                              winner={winner}
                              openConfirm={openConfirm}
                              onOpenConfirm={onOpenConfirm}
                              onChooseWinner={onChooseWinner}
                              onCancel={onCancel}
                              isWinner={isWinner}
                            />
                          );
                        }
                      )}
                  </div>
                </div>
              </Grid>
              {isWinner && showWinner()}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ChooseWinner;
