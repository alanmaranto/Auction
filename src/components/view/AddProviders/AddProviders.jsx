import React, { Component } from "react";
import { Modal, Dropdown, Button } from "semantic-ui-react";
import { getProviders } from "../../../api/api";
import { isAuthenticated } from "../../../helpers/authenticate";
import {
  MActions,
  MContent,
  MHeader,
  MDescription,
} from "../../../core/indexSemanticUi.js";
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
      onSelectProviders,
      choosedProviders,
    } = this.props;

    const providersOptions = providers.map((provider) => ({
      key: provider._id,
      text: provider.name,
      value: provider._id,
    }));

    const formatChoosedProviders = [];
    choosedProviders.forEach((element) => {
      formatChoosedProviders.push(element.invitedProvider._id);
    });

    const renderLabel = (label) => ({
      color: 'blue',
      content: label.text,
      icon: 'check',
    })

    return (
      <div>
        <Modal
          centered
          className="providers-modal"
          size="small"
          open={openProviders}
          onClose={() => onCloseProviderModal()}
        >
          <MHeader>Añadir proveedores</MHeader>
          <MContent scrolling content className="add-provider">
            <MDescription>
              <Dropdown
                placeholder="Agrega proveedores a tu subasta"
                fluid
                multiple
                search
                scrolling
                selection
                defaultValue={formatChoosedProviders}
                options={providersOptions}
                onChange={(e, { value }) => {
                  onSelectProviders(value);
                }}
                renderLabel={renderLabel}
              />
            </MDescription>
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
