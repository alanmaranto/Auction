import React from "react";
import { Card} from "semantic-ui-react";
import moment from "moment";
import deleteIcon from "../../../assets/delete-x.svg";
import "moment/locale/es";
import "./style.css";

const FavoriteSupplierCard = ({ supplier, deleteSupplier }) => {
  const { favoriteSuppliers, _id } = supplier;
  return (
    <Card className="favorite-suppliers-card-container">
      <div className="favorite-suppliers-card-container__image">
        <img
          className="favorite-suppliers-card-container__image--delete-icon"
          src={deleteIcon}
          onClick={() => deleteSupplier(_id)}
        />
      </div>
      <div className="favorite-suppliers-card-container__content">
        <img
          src={
            favoriteSuppliers?.logo
              ? favoriteSuppliers.logo
              : "https://react.semantic-ui.com/images/avatar/large/matthew.png"
          }
          alt={`${favoriteSuppliers.name} - ${favoriteSuppliers._id}`}
          className="favorite-suppliers-card-container__content--avatar"
        />
      </div>
      <Card.Content style={{ paddingBottom: "25px" }}>
        <Card.Header textAlign="center">{favoriteSuppliers.name}</Card.Header>
        <Card.Meta textAlign="center">
          <span className="date">
            Agregado en {moment(supplier.createdAt).format("MMMM YYYY")}
          </span>
        </Card.Meta>
      </Card.Content>
    </Card>
  );
};

export default FavoriteSupplierCard;
