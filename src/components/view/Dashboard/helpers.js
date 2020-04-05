import React from "react";
import { Grid, List, Item, Image, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import moment from 'moment'
import 'moment/locale/es';

import "./style.css";

const selectedAuction = {
  activeAuction: auction => {
    const { finalized } = auction;
    if (!finalized) {
      return auction;
    }
  },
  finalizedAuction: auction => {
    const { finalized } = auction;
    if (finalized) {
      return auction;
    }
  }
};

export const showAuctions = (data, selected, callback) =>
  data
    .filter(auction => selectedAuction[selected](auction))
    .map(auction => ({
      auction: auction._id,
      title: auction.title,
      openingAuction: auction.openingAuction,
      endingAuction: auction.endingAuction,
      onClickElement: () => callback(`/auction/${auction._id}`)
    }));

export const displayAuction = ({ onClickElement, title, openingAuction }) => {
  return (
    <Grid.Column>
      <div
        onClick={onClickElement}
      >
        <Item.Group>
          <Item>
            <Icon
              style={{ marginRight: "10px" }}
              name="info circle"
              size="big"
            />
            <Item.Content
              style={{ marginBottom: "10px" }}
              verticalAlign="middle"
            >
              <Item.Header style={{ fontSize: "1.2em" }}>{title}</Item.Header>
              <Item.Description
                style={{ fontSize: "1.1em" }}
              >{`Inicio de subasta: ${moment(openingAuction).format("MMMM Do YYYY, h:mm:ss a")}`}</Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </div>
    </Grid.Column>
  );
};

export default showAuctions;
