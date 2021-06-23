import React from "react";
import { Dimmer, Loader } from "semantic-ui-react";

import { Table } from "../../../../../core/controllers";
import rfiColumns from "./rfiColumns";
import faColumns from "./faColumns";
import { useToasts } from "react-toast-notifications";

import { useInvitedSupplier } from "./UseInvitedSuppliers";

const SuppliersTable = ({
  fetch,
  suppliers,
  auctionId,
  auctionStep,
  auctionFiles,
}) => {
  const { addToast } = useToasts();

  const { rejectSupplier, acceptSupplier, sendInvitationDocuments, isLoading } =
    useInvitedSupplier();

  const onHandleInvitation = async (data, reject) => {
    try {
      let result = reject
        ? await rejectSupplier({
            auctionId,
            ...data,
          })
        : await acceptSupplier({
            auctionId,
            ...data,
          });
      if (result) {
        fetch();
        addToast("La petición se realizó con éxito", {
          appearance: "success",
          autoDismiss: true,
        });
      } else {
        addToast("Hubo un error al hacer la petición", {
          appearance: "error",
          autoDismiss: true,
        });
      }
    } catch (error) {}
  };

  const onHandleInvitationDocuments = async (data) => {
    try {
      let result = await sendInvitationDocuments({
        auctionId,
        ...data,
        type: "supplier",
      });
      if (result) {
        fetch();
        addToast("El documento se subió con éxito", {
          appearance: "success",
          autoDismiss: true,
        });
      } else {
        addToast("Hubo un error al intentar subir el documento", {
          appearance: "error",
          autoDismiss: true,
        });
      }
    } catch (error) {}
  };

  const tableColums = {
    rfi: rfiColumns({
      onHandleInvitation,
      onHandleInvitationDocuments,
    }),
    fa_hl: faColumns({
      onHandleInvitation,
      onHandleInvitationDocuments,
      auctionFiles,
    }),
  }[auctionStep];

  if (isLoading) {
    return (
      <Dimmer active inverted>
        <Loader inverted />
      </Dimmer>
    );
  }

  return (
    <Table
      columns={tableColums}
      paginated={false}
      dataSource={
        suppliers
          ? suppliers.map((supplier) => {
              if (
                [supplier.status, supplier.invitationStatus].includes(
                  "rejected"
                )
              ) {
                supplier.negative = true;
              }
              if ([supplier.status].includes("accepted")) {
                supplier.positive = true;
              }
              return supplier;
            })
          : []
      }
    />
  );
};

export default SuppliersTable;
