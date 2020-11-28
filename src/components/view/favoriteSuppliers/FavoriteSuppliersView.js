import React, { useState } from "react";
import { Card, Icon, Input, Button } from "semantic-ui-react";
import "./style.css";

const FavoriteSuppliersView = () => {
  const [loading, setLoading] = useState(false);

  const deleteSupplier = () => {
    setLoading(true);
    setTimeout(() => {
      console.log("acabo el tiempo");
      setLoading(false);
      // FETCH FAVORITE PROVIDERS
      console.log("proveedor id borrado");
    }, 2000);
  };
  return (
    <>
      <Input
        icon={<Icon name="search" inverted circular link />}
        placeholder="Search..."
        fluid
      />
      <Card>
        <div className="favorite-suppliers-card-container">
          <img
            src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
            alt=""
            className="favorite-suppliers-card-container__avatar"
          />
        </div>
        <Card.Content>
          <Card.Header textAlign="center">Proveedor Oxxo</Card.Header>
          <Card.Meta textAlign="center">
            <span className="date">Seleccionado como proveedor en FECHA</span>
          </Card.Meta>
        </Card.Content>
        <Card.Content extra textAlign="center">
          <Button
            animated
            color="red"
            loading={loading ? true : false}
            size="medium"
            onClick={deleteSupplier}
          >
            <Button.Content visible>Eliminar Proveedor</Button.Content>
            <Button.Content hidden>
              <Icon name="user delete" />
            </Button.Content>
          </Button>
        </Card.Content>
      </Card>
    </>
  );
};

export default FavoriteSuppliersView;
