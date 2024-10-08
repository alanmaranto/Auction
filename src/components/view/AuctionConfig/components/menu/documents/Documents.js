import React, { useState } from "react";
import { Button, Popup } from "semantic-ui-react";
import UploadFile from "./UploadFile";

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
          <Popup
            content={document.title}
            trigger={
              <a href={document.url} target="_blank" rel="noopener noreferrer">
                {document.title}
              </a>
            }
          />
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
