/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { Button, Dimmer, Loader } from "semantic-ui-react";
import { useSuppliers } from "./UseInvitedSuppliers";
import { useToasts } from "react-toast-notifications";

import "./style.css";

const MissingSuppliers = ({
  fetchAuction,
  auctionId,
  fetchMissingSuppliers,
  setChagedSuppliers,
}) => {
  const { addToast } = useToasts();

  const { isLoading, suppliers, fetchSuppliers, inviteSupplier } =
    useSuppliers();

  useEffect(() => {
    try {
      fetchSuppliers({ auctionId });
      setChagedSuppliers(false);
    } catch (error) {}
  }, [fetchSuppliers, auctionId, setChagedSuppliers, fetchMissingSuppliers]);

  const onInviteSupplier = async (supplier) => {
    try {
      const result = await inviteSupplier({
        auctionId,
        userId: supplier.userId,
      });
      if (result) {
        fetchAuction();
        fetchSuppliers({ auctionId });
        addToast("Proveedor invitado", {
          appearance: "success",
          autoDismiss: true,
        });
      } else {
        addToast("Hubo un error al invitar al proveedor", {
          appearance: "error",
          autoDismiss: true,
        });
      }
    } catch (error) {
      // manage alert or notification
    }
  };

  return (
    <div>
      {isLoading && (
        <Dimmer active inverted>
          <Loader inverted />
        </Dimmer>
      )}
      {suppliers?.length ? (
        (suppliers || []).map((supplier) => (
          <div className="user-item">
            <div>{supplier.userName}</div>
            <Button primary onClick={() => onInviteSupplier(supplier)}>
              Invitar
            </Button>
          </div>
        ))
      ) : (
        <>Todos tus proveedores han sido invitados</>
      )}
    </div>
  );
};

export default MissingSuppliers;
