import React, { Component } from "react";
import { Modal, Dropdown, Button } from "semantic-ui-react";
import { getProviders } from "../../../api";
import { isAuthenticated } from "../../../helpers/authenticate";
import "./style.css";

class AddProviders extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { providers, openProviders, onCloseProviderModal, submitProviders } = this.props;

    const providersOptions = providers.map((provider) => ({
      key: provider._id,
      text: provider.name,
      value: provider._id,
    }));

    return (
      <Modal
        centered
        className="providers-modal"
        size="small"
        open={openProviders}
        onClose={onCloseProviderModal}
      >
        <Modal.Header>Añadir proveedores</Modal.Header>
        <Modal.Content>
          <Dropdown
            placeholder="Agrega proveedores a tu subasta"
            fluid
            multiple
            search
            selection
            options={providersOptions}
          />
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={onCloseProviderModal}>Cancelar</Button>
          <Button onClick={submitProviders} content="Guardar" />
        </Modal.Actions>
      </Modal>
    );
  }
}

export default AddProviders;
