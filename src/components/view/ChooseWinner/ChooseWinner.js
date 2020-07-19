import React, { Fragment } from "react";
import { Header, Grid, Confirm } from "semantic-ui-react";
import BidCard from "./BidCard";
import { Row, Subheader, Column } from "../../../core/indexSemanticUi";
import Sidebar from "../../../core/Sidebar/Sidebar";
import Navbar from "../../../core/Navbar/Navbar";
import "./style.css";

const ChooseWinner = ({
  bids,
  onChooseWinner,
  openConfirm,
  onOpenConfirm,
  onCancel,
}) => {
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
                      Pujas
                      <Subheader>Elige la puja ganadora</Subheader>
                    </Header>
                  </Column>
                </Row>
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
                      bids.map(({ userId, _id, auctionId, bid, winner }) => {
                        return (
                          <BidCard
                            key={_id}
                            provider={userId.name}
                            bid={bid}
                            bidId={_id}
                            auctionId={auctionId}
                            winner={winner}
                            openConfirm={openConfirm}
                            onOpenConfirm={onOpenConfirm}
                            onChooseWinner={onChooseWinner}
                            onCancel={onCancel}
                          />
                        );
                      })}
                  </div>
                </div>
              </Grid>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ChooseWinner;
