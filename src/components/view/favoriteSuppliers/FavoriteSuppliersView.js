import React, { useState, useEffect } from "react";
import {
  Card,
  Icon,
  Input,
  Button,
  Grid,
  Modal,
  Image,
} from "semantic-ui-react";
import { getFavoriteSuppliers } from "../../../api/favoriteSuppliers";
import { getProviders } from "../../../api/suppliers";
import { isAuthenticated } from "../../../helpers/authenticate";
import "./style.css";

const FavoriteSuppliersView = () => {
  const [favoriteSuppliers, setFavoriteSuppliers] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const { token, user } = isAuthenticated();

  console.log(user);

  useEffect(() => {
    if (token && user) {
      const fetchSuppliers = async () => {
        const response = await getProviders(token);

        if (response && response.status === 200) {
          setSuppliers(response.data.body);
        }
      };
      fetchSuppliers();
    }
  }, []);

  useEffect(() => {
    if (token && user) {
      const fetchFavoriteSuppliers = async () => {
        const data = await getFavoriteSuppliers(token);
        console.log("data", data);
        if (data.status === 200) {
          setFavoriteSuppliers(data.data.body);
        }
      };
      fetchFavoriteSuppliers();
    }
  }, []);

  const deleteSupplier = () => {
    setLoading(true);
    setTimeout(() => {
      console.log("acabo el tiempo");
      setLoading(false);
      // FETCH FAVORITE PROVIDERS
      console.log("proveedor id borrado");
    }, 2000);
  };

  console.log(favoriteSuppliers)
  console.log(suppliers)

  const renderModal = () => {
    return (
      <div>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          trigger={<Button>Añadir proveedores</Button>}
          centered
          closeIcon
          size="small"
        >
          <Modal.Header>Seleccionar proveedores</Modal.Header>
          <Modal.Content image scrolling>
            <Image
              size="medium"
              src="https://react.semantic-ui.com/images/wireframe/image.png"
              wrapped
            />

            <Modal.Description>
              <p>
                This is an example of expanded content that will cause the
                modal's dimmer to scroll.
              </p>

              <Image
                src="https://react.semantic-ui.com/images/wireframe/paragraph.png"
                style={{ marginBottom: 10 }}
              />
              <Image
                src="https://react.semantic-ui.com/images/wireframe/paragraph.png"
                style={{ marginBottom: 10 }}
              />
              <Image
                src="https://react.semantic-ui.com/images/wireframe/paragraph.png"
                style={{ marginBottom: 10 }}
              />
              <Image
                src="https://react.semantic-ui.com/images/wireframe/paragraph.png"
                style={{ marginBottom: 10 }}
              />
              <Image
                src="https://react.semantic-ui.com/images/wireframe/paragraph.png"
                style={{ marginBottom: 10 }}
              />
              <Image
                src="https://react.semantic-ui.com/images/wireframe/paragraph.png"
                style={{ marginBottom: 10 }}
              />
              <Image
                src="https://react.semantic-ui.com/images/wireframe/paragraph.png"
                style={{ marginBottom: 10 }}
              />
              <Image src="https://react.semantic-ui.com/images/wireframe/paragraph.png" />
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={() => setOpen(false)} primary>
              Proceed <Icon name="chevron right" />
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  };

  return (
    <Grid columns={1}>
      <Grid.Row>
        <Grid.Column width={12}>
          <Input
            fluid
            icon={<Icon name="search" inverted circular link />}
            placeholder="Search..."
          />
        </Grid.Column>
        <Grid.Column width={4}>{renderModal()}</Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
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
                <span className="date">
                  Seleccionado como proveedor en FECHA
                </span>
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
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default FavoriteSuppliersView;
