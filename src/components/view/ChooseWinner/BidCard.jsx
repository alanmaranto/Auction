import React, { Fragment } from "react";
import { Button, Card, Icon, Confirm } from "semantic-ui-react";
import PropTypes from "prop-types";
import "./style.css";

const BidCard = ({
  provider,
  bid,
  bidId,
  auctionId,
  winner,
  openConfirm,
  onCancel,
  onOpenConfirm,
  onChooseWinner,
}) => {
  console.log('bid id',bidId)
  console.log('auction id',auctionId)
  return (
    <Fragment>
      <article className="card">
        <p className="card-title">
          <img src="" alt="" />
          Proveedor: {provider}
        </p>
        <p className="card-followers">
          <span className="card-followers-number">{bid}</span>
          <span className="card-followers-title">Pesos</span>
        </p>
        <Button onClick={() => onOpenConfirm({ bidId, auctionId })} />
      </article>
    </Fragment>
  );
};

BidCard.propTypes = {
  dataRow: PropTypes.object.isRequired,
  addFavorite: PropTypes.func.isRequired,
};

export default BidCard;
