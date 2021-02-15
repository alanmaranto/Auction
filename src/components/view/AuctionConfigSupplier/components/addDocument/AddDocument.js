import React from "react";
import Documents from "./documents/Documents";

import "./style.css";

const AddDocument = ({
  auctionId,
  auctionStep,
  fetchAuction,
  auctionFiles,
  supplierFilesStep,
}) => {
  return (
    <>
      {supplierFilesStep !== "read"
        ? "Esta función está habilitada una vez que se lean los documentos"
        : ""}
      <br /> <br />
      <Documents
        fetchAuction={fetchAuction}
        auctionStep={auctionStep}
        auctionId={auctionId}
        auctionFiles={auctionFiles}
        disabled={supplierFilesStep !== "read"}
      />
    </>
  );
};

export default AddDocument;
