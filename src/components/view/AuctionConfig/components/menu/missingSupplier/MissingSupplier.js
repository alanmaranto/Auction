/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { Button } from "semantic-ui-react";
import { useSuppliers } from "./UseInvitedSuppliers";

import "./style.css";

const MissingSuppliers = ({
  fetchAuction,
  auctionId,
  fetchMissingSuppliers,
  setChagedSuppliers,
}) => {
  const {
    isLoading,
    suppliers,
    fetchSuppliers,
    inviteSupplier,
  } = useSuppliers();

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
      }
    } catch (error) {
      // manage alert or notification
    }
  };

  return (
    <div>
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
