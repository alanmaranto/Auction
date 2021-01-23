import React from "react";
import { Button, Header, Icon, Modal } from "semantic-ui-react";

function MoveToStepModal({ open, setOpen, suppliers, nexStep }) {
    console.log("suppliers", suppliers)
  return (
    <Modal
      size="small"
      closeIcon
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    >
      <Header icon="forward" content={`Mover subasta a ${nexStep || ""}`} />
      <Modal.Content>
        <p>Loss siguientes prveedores pasarán al siguente step</p>
        {suppliers
          ? suppliers.map((supplier) => <div>{supplier.userName}</div>)
          : []}
      </Modal.Content>
      <Modal.Actions>
        <Button color="red" onClick={() => setOpen(false)}>
          <Icon name="remove" /> Cancelar
        </Button>
        <Button color="green" onClick={() => setOpen(false)}>
          <Icon name="checkmark" /> Aceptar
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

export default MoveToStepModal;
