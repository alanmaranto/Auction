import React, { useState, useEffect } from "react";
import {
  Card,
  Icon,
  Input,
  Button,
  Grid,
  Modal,
  Dropdown,
  Dimmer
} from "semantic-ui-react";
import { useToasts } from "react-toast-notifications";
import {
  getFavoriteSuppliers,
  postFavoriteSuppliers,
} from "../../../api/favoriteSuppliers";
import { getProviders } from "../../../api/suppliers";
import { isAuthenticated } from "../../../helpers/authenticate";
import Loader from "../../../core/Loader";
import "./style.css";

const FavoriteSuppliersView = () => {
  const { addToast } = useToasts();
  const [favoriteSuppliers, setFavoriteSuppliers] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [selectedTemporalSuppliers, setSelectedTemporalSuppliers] = useState(
    []
  );
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const { token, user } = isAuthenticated();

  const fetchSuppliers = async () => {
    const response = await getProviders(token);

    if (response && response.status === 200) {
      setSuppliers(response.data.body);
    }
  };

  useEffect(() => {
    if (token && user) {
      fetchSuppliers();
    }
  }, []);

  const fetchFavoriteSuppliers = async () => {
    const data = await getFavoriteSuppliers(token);
    if (data.status === 200) {
      setFavoriteSuppliers(data.data.body);
    }
  };

  useEffect(() => {
    if (token && user) {
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

  const suppliersOptions = suppliers.map((supplier) => ({
    key: supplier._id,
    text: supplier.name,
    value: supplier._id,
  }));

  const renderLabel = (label) => ({
    color: "blue",
    content: label.text,
    icon: "check",
  });

  const submitSuppliers = async (e) => {
    if (e) {
      e.preventDefault();
    }
    setLoading(true);
    const sendSuppliers = [];
    if (selectedTemporalSuppliers && selectedTemporalSuppliers.length) {
      suppliers.forEach((supplier) => {
        if (selectedTemporalSuppliers.includes(supplier._id)) {
          sendSuppliers.push(supplier);
        }
      });
    } else {
      addToast("Debes agregar al menos un proveedor", {
        appearance: "error",
        autoDismiss: true,
      });
      setOpenModal(false);
      return false;
    }

    const data = {
      favoriteSuppliers: sendSuppliers,
    };

    const response = await postFavoriteSuppliers(token, data);

    if (response.status === 201) {
      fetchFavoriteSuppliers();
      addToast("Agregaste proveedores con éxito", {
        appearance: "success",
        autoDismiss: true,
      });
      setLoading(false);
      setOpenModal(false);
    } else {
      addToast("Hubo un error al agregar proveedores", {
        appearance: "error",
        autoDismiss: true,
      });
      setLoading(false);
      setOpenModal(false);
    }
  };

  const renderModal = () => {
    return (
      <div>
        <Modal
          open={openModal}
          onClose={() => setOpenModal(false)}
          onOpen={() => setOpenModal(true)}
          trigger={<Button>Añadir proveedores</Button>}
          centered
          closeIcon
          size="small"
        >
          <Modal.Header>Seleccionar proveedores</Modal.Header>
          <Modal.Content image scrolling>
            {loading ? (
              <Dimmer active inverted>
                <Loader inverted />
              </Dimmer>
            ) : (
              <Dropdown
                placeholder="Agrega tus proveedores"
                fluid
                multiple
                search
                scrolling
                selection
                defaultValue={[]}
                options={suppliersOptions}
                renderLabel={renderLabel}
                onChange={(e, { value }) => setSelectedTemporalSuppliers(value)}
              />
            )}
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={() => setOpenModal(false)}>Cancelar</Button>
            <Button onClick={submitSuppliers} content="Guardar" />
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
