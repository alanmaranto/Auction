import React, { useState } from "react";
import { Button } from "semantic-ui-react";
import UploadFile from "./UploadFile";

import "./style.css";
const Documents = ({
  fetchAuction,
  auctionStep,
  auctionId,
  auctionFiles,
  disabled,
}) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div>
      <Button
        primary
        style={{ width: "100%" }}
        onClick={() => setOpenModal(true)}
        disabled={disabled}
      >
        Agregar documento
      </Button>
      {auctionFiles.map((document) => (
        <div className="document-item">
          <a href={document.url} target="_blank" rel="noopener noreferrer">
            {document.title}
          </a>
        </div>
      ))}
      <UploadFile
        openModal={openModal}
        onClose={() => setOpenModal(false)}
        auctionStep={auctionStep}
        auctionId={auctionId}
        fetchAuction={fetchAuction}
        fileType="supplier"
      />
    </div>
  );
};

export default Documents;
