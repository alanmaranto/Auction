import React, { useState, useEffect } from "react";
import Dropzone from "react-dropzone";
import { Modal, Button } from "semantic-ui-react";

import { postFile } from "../../../api";
import { isAuthenticated } from "../../../helpers/authenticate";

import fileIcon from "../../../assets/file-icon.png";
import deleteIcon from "../../../assets/delete-icon.png";
import "./style.css";

function FileList({ files, onRemove }) {
  const fileNames = files.map((file) => file.name);

  return (
    <div className="upload-file-list">
      {
        fileNames.map((file, index) => (
          <div key={`img-${file}`} className="upload-file-item">
            <img
              className="file-icon"
              src={fileIcon}
            />
            {file}
            <img
              className="delete-icon"
              src={deleteIcon}
              onClick={() => onRemove(index)}
            />
          </div>
        ))
      }
    </div>
  );
};

function UploadFile({ openModal, onClose, setOpenModal, auctionId }) {
  const [fileList, setFileList] = useState([]);

  const onAddFile = (files) => {
    const currentFileList = [...fileList];

    if (Array.isArray(files)) {
      files.forEach((file) => {
        currentFileList.push(file);
      });
    } else {
      currentFileList.push(files);
    }

    setFileList(currentFileList);
  };

  const onRemoveFile = (index) => {
    const currentFileList = [...fileList];
    currentFileList.splice(index, 1);

    setFileList(currentFileList);
  };

  const onCloseUploadFile = () => {
    setFileList([]);
    onClose();
  };

  const onSubmit = async (event) => {
    if (event) {
      event.preventDefault();
    }
  
    const requestBody = new FormData();
    const { token } = isAuthenticated();
  
    requestBody.append("auction", auctionId);
  
    fileList.forEach(file => {
      requestBody.append("files", file);
    });
  
    // const response = await postFile(token, requestBody);
  };
  

  return (
    <div>
      <Modal
        size="tiny"
        className="file-modal"
        centered={false}
        open={openModal}
        onClose={() => onCloseUploadFile()}
      >
        <Modal.Header>Subir archivos</Modal.Header>
        <Modal.Content>
          <Dropzone onDrop={onAddFile}>
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps({ className: "dropzone" })}>
                <input {...getInputProps()} />
                <p>Arrastra o da click para subir archivos</p>
              </div>
            )}
          </Dropzone>
        </Modal.Content>
        <FileList files={fileList} onRemove={onRemoveFile} />
        <Modal.Actions>
          <Button onClick={() => onCloseUploadFile()}>Cancelar</Button>
          <Button onClick={(event) => onSubmit(event)} content="Subir" />
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default UploadFile;
