import React, { useState } from "react";
import { Modal, Button } from "semantic-ui-react";
import Dropzone from "react-dropzone";
import { isAuthenticated } from "../../../helpers/authenticate";
import { postFile } from "../../../api";

import "./style.css";

const FileCardView = ({ openModal, onClose, setOpenModal, auctionId }) => {
  const [fileNames, setFileNames] = useState([]);

  const handleDrop = (acceptedFiles) => {
    setFileNames(acceptedFiles.map((file) => file.name));
  };

  const { user, token } = isAuthenticated();

  const onSubmit = async (e) => {
    if (e) {
      e.preventDefault();
    }

    const data = {
      auction: auctionId,
      fileName: fileNames,
    };

    const body = new FormData();

    body.append("auction", data.auction);

    fileNames.map((file) => {
      console.log("file", file);
      body.append("multiImages", file);
    });

    const response = await postFile(token, body);

    console.log("res", response);

    if (response && response.status === 200) {
      setFileNames([]);
    }
  };

  const listFiles = (
    <ul>
      {fileNames &&
        fileNames.map((fileName) => <li key={fileName}>{fileName}</li>)}
    </ul>
  );

  return (
    <div>
      <Modal
        centered={false}
        className="file-modal"
        size="tiny"
        open={openModal}
        onClose={onClose}
      >
        <Modal.Header>Subir Documento</Modal.Header>
        <Modal.Content>
          <Dropzone onDrop={handleDrop}>
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps({ className: "dropzone" })}>
                <input {...getInputProps()} />
                <p>Drag'n'drop files, or click to select files</p>
              </div>
            )}
          </Dropzone>
          <div>
            <strong>Files:</strong>
            {listFiles}
          </div>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={onClose}>Cancelar</Button>
          <Button onClick={onSubmit} content="Subir" />
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default FileCardView;
