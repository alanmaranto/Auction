import React from "react";
import { Button, Header, Icon, Modal, Grid } from "semantic-ui-react";
import { UseMoveToStep } from "./UseMoveToStep";

function MoveToStepModal({
  open,
  setOpen,
  suppliers,
  nexStep,
  auctionId,
  fetchAuction,
}) {
  const { moveToNextStep } = UseMoveToStep();

  return (
    <Modal
      size="tiny"
      closeIcon
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    >
      <Header icon="forward" content={`Ir a  ${nexStep}`} />

      <Modal.Content>
        <p>Loss siguientes prveedores pasarán a etapa de {nexStep} </p>
        <Grid verticalAlign="middle" columns={2} centered>
          <Grid.Row>
            <Grid.Column>
              {suppliers
                ? suppliers.map((supplier) => (
                    <div>
                      <Icon name="check circle outline" /> {supplier.userName}
                    </div>
                  ))
                : []}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Modal.Content>
      <Modal.Actions>
        <Button color="red" onClick={() => setOpen(false)}>
          <Icon name="remove" /> Cancelar
        </Button>
        <Button
          color="green"
          onClick={async () => {
            try {
              const result = await moveToNextStep({ auctionId, suppliers });
              if (result) {
                fetchAuction();
              }
              setOpen(false);
            } catch (error) {}
          }}
        >
          <Icon name="checkmark" /> Aceptar
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

export default MoveToStepModal;
