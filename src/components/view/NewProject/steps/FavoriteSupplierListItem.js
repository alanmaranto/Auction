import React from "react";
import { List, Button, Image } from "semantic-ui-react";

const FavoriteSupplierItem = ({ key, id, name, logo, onAddSupplier }) => {
  return (
    <List.Item>
      <List.Content floated="right">
        <Button primary onClick={() => onAddSupplier(id)}>
          Añadir
        </Button>
      </List.Content>
      <Image avatar src={logo} />
      <List.Content>{name}</List.Content>
    </List.Item>
  );
};

export default FavoriteSupplierItem;
