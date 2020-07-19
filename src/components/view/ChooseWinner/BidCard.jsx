import React, { Fragment } from "react";
import { Button } from "semantic-ui-react";
import PropTypes from "prop-types";
import "./style.css";

const BidCard = ({
  providerName,
  bid,
  bidId,
  auctionId,
  onOpenConfirm,
  isWinner,
}) => {
  return (
    <Fragment>
      <article className="card">
        <p className="card-title">Proveedor: {providerName}</p>
        <p className="card-followers">
          <span className="card-followers-number">$ {bid}</span>
          <span className="card-followers-title">Pesos</span>
        </p>
        {!isWinner && (
          <Button
            color="olive"
            onClick={() => onOpenConfirm({ bidId, auctionId })}
          >
            {" "}
            Elegir como ganador
          </Button>
        )}
      </article>
    </Fragment>
  );
};

BidCard.propTypes = {
  dataRow: PropTypes.object.isRequired,
  addFavorite: PropTypes.func.isRequired,
};

export default BidCard;
