import React, { useState } from "react";
import { Button } from "semantic-ui-react";
import UploadFile from "./UploadFile";

/**
 *     auctionStep={auctionStep}
                auctionId={auctionId}
 */
import "./style.css";
const Documents = ({ fetchAuction, auctionStep, auctionId, auctionFiles }) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div>
      <Button
        primary
        style={{ width: "100%" }}
        onClick={() => setOpenModal(true)}
      >
        Agregar documento
      </Button>
      {auctionFiles.map((document) => (
        <div className="document-item">
          <a href={document.url} target="_blank">
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
        fileType="buyer"
      />
    </div>
  );
};

export default Documents;
