import React from "react";
import { Button, Header, Icon, Modal, Grid } from "semantic-ui-react";
import { UseMoveToStep } from "./UseMoveToStep";
import { useToasts } from "react-toast-notifications";

function MoveToStepModal({
  open,
  setOpen,
  suppliers,
  nexStep,
  auctionId,
  fetchAuction,
  auctionStep,
}) {
  const { moveToNextStep } = UseMoveToStep();
  const { addToast } = useToasts();

  const validateMoveToNextStep = async () => {
    try {
      if (suppliers.length < 2) {
        setOpen(false);
        return addToast(
          "Debes aceptar al menos 2 proveedores para avanzar al siguiente paso",
          {
            appearance: "error",
            autoDismiss: true,
          }
        );
      }

      let result;
      if (auctionStep === "fa_hl") {
        result = await moveToNextStep({
          auctionId,
          suppliers,
          isFA: true,
        });
      } else {
        result = await moveToNextStep({ auctionId, suppliers });
      }
      if (result) {
        console.log("result", result);
        fetchAuction();
      }
      setOpen(false);
    } catch (error) {}
  };

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
        <p>Loss siguientes proveedores pasarán a etapa de {nexStep} </p>
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
          onClick={validateMoveToNextStep}
        >
          <Icon name="checkmark" /> Aceptar
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

export default MoveToStepModal;
