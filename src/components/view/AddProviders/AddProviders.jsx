import React, { Component } from "react";
import { Modal, Dropdown, Button } from "semantic-ui-react";
import { getProviders } from "../../../api";
import { isAuthenticated } from "../../../helpers/authenticate";
import { MActions, MContent, MHeader } from "../../../core/indexSemanticUi.js";
import "./style.css";

class AddProviders extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      providers,
      openProviders,
      onCloseProviderModal,
      submitProviders,
    } = this.props;

    const providersOptions = providers.map((provider) => ({
      key: provider._id,
      text: provider.name,
      value: provider._id,
    }));

    return (
      <div>
        <Modal
          centered
          className="providers-modal"
          size="tiny"
          open={openProviders}
          onClose={() => onCloseProviderModal()}
        >
          <MHeader>Añadir proveedores</MHeader>
          <MContent>
            <Dropdown
              placeholder="Agrega proveedores a tu subasta"
              fluid
              multiple
              search
              selection
              options={providersOptions}
            />
          </MContent>
          <MActions>
            <Button onClick={onCloseProviderModal}>Cancelar</Button>
            <Button onClick={submitProviders} content="Guardar" />
          </MActions>
        </Modal>
      </div>
    );
  }
}

export default AddProviders;
