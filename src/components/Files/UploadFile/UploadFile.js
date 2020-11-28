import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { Modal, Button, Dimmer, Loader } from "semantic-ui-react";
import { useToasts } from 'react-toast-notifications';

import { postFile } from "../../../api/api";
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
  const { addToast } = useToasts();

  const [fileList, setFileList] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

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
    setIsUploading(true);

    if (event) {
      event.preventDefault();
    }
  
    const requestBody = new FormData();
    const { token, user } = isAuthenticated();
  
    requestBody.append("userId", user._id);
  
    fileList.forEach(file => {
      requestBody.append("files", file);
    });
  
    const response = await postFile(token, requestBody, auctionId);

    if (response && response.status === 201) {
      setIsUploading(false);
      onCloseUploadFile();
      addToast('Archivos guardados con éxito', {
        appearance: 'success',
        autoDismiss: true,
      });
    } else {
      onCloseUploadFile();
      addToast('Hubo un error al guardar los archivos', {
        appearance: 'error',
        autoDismiss: true,
      });
    }
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
          {
            isUploading ? (
              <Dimmer active inverted>
                <Loader inverted />
              </Dimmer>
            ) : (
              <div>
                <Dropzone onDrop={onAddFile}>
                  {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps({ className: "dropzone" })}>
                      <input {...getInputProps()} />
                      <p>Arrastra o da click para subir archivos</p>
                    </div>
                  )}
                </Dropzone>
                <FileList files={fileList} onRemove={onRemoveFile} />
              </div>
            )
          }
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => onCloseUploadFile()}>Cancelar</Button>
          <Button onClick={(event) => onSubmit(event)} content="Subir" />
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default UploadFile;
