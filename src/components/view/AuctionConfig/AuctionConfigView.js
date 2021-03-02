import React, { useState } from "react";
import { Card, Header, Grid, Button, Feed, Container } from "semantic-ui-react";
import AuctionSubContainer from "../AuctionView/AuctionContainer";
import {
  AuctionHeader,
  SuppliersTable,
  Menu,
  MoveToStepModal,
} from "./components";
import Posts from "./components/faPosts/Posts";
import { getNextStep, getAcceptedSuppliers } from "./helper";

import "./style.css";

const AuctionConfigView = ({ fetchAuction, auction, auctionId }) => {
  const [fetchMissingSuppliers, setChagedSuppliers] = useState(false);
  const [openMoveToStepModal, setOpenMoveToStepModal] = useState(false);
  const { auctionStep, title, description, suppliers } = auction;
  const nexStep = getNextStep(auctionStep || "");
  const acceptedSuppliers = getAcceptedSuppliers(suppliers || []);

  return (
    <>
      <Grid textAlign="left" padded columns={16}>
        <Grid.Column width={16}>
          <AuctionHeader
            auctionStep={auctionStep}
            title={title}
            description={description}
          />
        </Grid.Column>
        {auctionStep === "rfi" && (
          <>
            <Grid.Column
              width={16}
              textAlign="right"
              style={{ paddingRight: "20px" }}
            >
              <MoveToStepModal
                open={openMoveToStepModal}
                setOpen={setOpenMoveToStepModal}
                nexStep={nexStep}
                suppliers={acceptedSuppliers}
                auctionId={auctionId}
                fetchAuction={fetchAuction}
                auctionStep={auctionStep}
              />
              {acceptedSuppliers.length ? (
                <Button
                  color="primary"
                  labelPosition="right"
                  icon="right chevron"
                  content={`mover a ${nexStep}`}
                  onClick={() => setOpenMoveToStepModal(true)}
                />
              ) : (
                []
              )}
            </Grid.Column>
            <Grid.Column width={11} style={{ background: "#fafafa" }}>
              <SuppliersTable
                auctionStep={auctionStep}
                suppliers={suppliers}
                auctionId={auctionId}
                fetch={() => {
                  setChagedSuppliers(true);
                  fetchAuction();
                }}
              />
            </Grid.Column>
            <Grid.Column width={5} style={{ background: "#fafafa" }}>
              <Menu
                auctionStep={auctionStep}
                auctionId={auctionId}
                fetchAuction={fetchAuction}
                auctionFiles={auction?.files || []}
                fetchMissingSuppliers={fetchMissingSuppliers}
                setChagedSuppliers={setChagedSuppliers}
              />
            </Grid.Column>
          </>
        )}
        {auctionStep === "fa_hl" && (
          <>
            <Grid.Column
              width={16}
              textAlign="right"
              style={{ paddingRight: "20px" }}
            >
              <MoveToStepModal
                open={openMoveToStepModal}
                setOpen={setOpenMoveToStepModal}
                nexStep={nexStep}
                suppliers={acceptedSuppliers}
                auctionId={auctionId}
                fetchAuction={fetchAuction}
                auctionStep={auctionStep}
              />
              {acceptedSuppliers.length ? (
                <Button
                  color="primary"
                  labelPosition="right"
                  icon="right chevron"
                  content={`mover a ${nexStep}`}
                  onClick={() => setOpenMoveToStepModal(true)}
                />
              ) : (
                []
              )}
            </Grid.Column>
            <Grid.Column width={11} style={{ background: "#fafafa" }}>
              <SuppliersTable
                auctionStep={auctionStep}
                suppliers={suppliers}
                auctionId={auctionId}
                fetch={() => {
                  setChagedSuppliers(true);
                  fetchAuction();
                }}
              />
            </Grid.Column>
            <Grid.Column width={5} style={{ background: "#fafafa" }}>
              <Menu
                auctionStep={auctionStep}
                auctionId={auctionId}
                fetchAuction={fetchAuction}
                auctionFiles={auction?.files || []}
                fetchMissingSuppliers={fetchMissingSuppliers}
                setChagedSuppliers={setChagedSuppliers}
              />
              <Posts auctionId={auctionId} />
            </Grid.Column>
          </>
        )}
        {auctionStep === "sub" && <AuctionSubContainer auctionId={auctionId} />}
      </Grid>
    </>
  );
};

export default AuctionConfigView;
