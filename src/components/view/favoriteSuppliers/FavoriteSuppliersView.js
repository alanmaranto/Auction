import React, { useState, useEffect } from "react";
import {
  Card,
  Icon,
  Input,
  Button,
  Grid,
  Modal,
  Dropdown,
  Dimmer,
} from "semantic-ui-react";
import { useToasts } from "react-toast-notifications";
import Loader from "../../../core/Loader";
import NoData from "../../../core/500/NoData";
import FavoriteSupplierCard from "./FavoriteSupplierCard";
import {
  getFavoriteSuppliers,
  postFavoriteSuppliers,
  deleteFavoritSupplier,
} from "../../../api/favoriteSuppliers";
import { getProviders } from "../../../api/suppliers";
import { isAuthenticated } from "../../../helpers/authenticate";
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
  const [search, setSearch] = useState("");
  const [filteredFavoriteSuppliers, setFilteredFavoriteSuppliers] = useState(
    []
  );

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

  const deleteSupplier = async (id) => {
    setLoading(true);
    const response = await deleteFavoritSupplier(token, id);

    if (response.status === 200) {
      fetchFavoriteSuppliers();
      addToast("Se eliminó el proveedor con éxito", {
        appearance: "success",
        autoDismiss: true,
      });
      setLoading(false);
    } else {
      addToast("Hubo un error al eliminar el proveedor", {
        appearance: "error",
        autoDismiss: true,
      });
      setLoading(false);
    }
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
          <Modal.Content scrolling style={{ height: "200px" }}>
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

  useEffect(() => {
    setFilteredFavoriteSuppliers(
      favoriteSuppliers.filter((supplier) => {
        return supplier.favoriteSuppliers.name
          .toLowerCase()
          .includes(search.toLowerCase());
      })
    );
  }, [search, favoriteSuppliers]);

  const renderFavoriteSuppliers = () => {
    if (filteredFavoriteSuppliers && filteredFavoriteSuppliers.length > 0) {
      return filteredFavoriteSuppliers.map((supplier, idx) => {
        return (
          <Grid.Column
            mobile={16}
            tablet={8}
            computer={4}
            className="favorite-supplier-column"
          >
            <FavoriteSupplierCard
              idx={idx}
              supplier={supplier}
              loading={loading}
              deleteSupplier={deleteSupplier}
            />
          </Grid.Column>
        );
      });
    }
    return <NoData title="No hay proveedores" size="large" />;
  };

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={12}>
          <Input
            fluid
            icon={<Icon name="search" inverted circular link />}
            placeholder="Search..."
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
        </Grid.Column>
        <Grid.Column width={4}>{renderModal()}</Grid.Column>
      </Grid.Row>
      <Grid.Row>{renderFavoriteSuppliers()}</Grid.Row>
    </Grid>
  );
};

export default FavoriteSuppliersView;
