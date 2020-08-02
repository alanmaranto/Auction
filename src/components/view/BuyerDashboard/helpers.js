import React from "react";
import { Grid, Item, Icon } from "semantic-ui-react";
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
};

export const showAuctions = (data, selected, callback) =>
  data
    .filter(auction => selectedAuction[selected](auction))
    .map(auction => ({
      auction: auction._id,
      title: auction.title,
      openingAuction: auction.openingAuction,
      minimumBid: auction.minimumBid,
      minimumPrice: auction.minimumPrice,
      endingAuction: auction.endingAuction,
      onClickElement: () => callback(`/auction/${auction._id}`)
    }))

export const displayAuction = ({ onClickElement, title, openingAuction }) => {
  return (
    <Grid.Column>
      <div
        onClick={onClickElement}
        className="display-auction"
      >
        <Item.Group>
          <Item className="item-card">
            <Icon
              name="info circle"
              size="big"
              className="item-icon"
            />
            <Item.Content
              verticalAlign="middle"
              className="item-content"
            >
              <Item.Header className="item-header">{title}</Item.Header>
              <Item.Description
              className="item-description"
              >{`Inicio de subasta: ${moment(openingAuction).format("MMMM Do YYYY, h:mm:ss a")}`}</Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </div>
    </Grid.Column>
  );
};

export default showAuctions;
