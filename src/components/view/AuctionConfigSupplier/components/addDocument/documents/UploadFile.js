import React from "react";
import Dropzone from "react-dropzone";
import { Modal, Button, Dimmer, Loader } from "semantic-ui-react";

import fileIcon from "../../../../../../assets/file-icon.png";
import deleteIcon from "../../../../../../assets/delete-icon.png";
import { useUploadFiles } from "./UseUploadFiles";

import "./style.css";

function UploadFile({
  openModal,
  onClose,
  auctionId,
  auctionStep,
  fetchAuction,
  fileType,
}) {
  const {
    fileList,
    onRemoveFile,
    onAddFile,
    onCloseUploadFile,
    onSaveFiles,
    isUploading,
  } = useUploadFiles({ onClose, fetchAuction });

  return (
    <div>
      <Modal
        size="tiny"
        className="file-modal"
        centered
        open={openModal}
        onClose={() => onCloseUploadFile()}
      >
        <Modal.Header>Subir archivos</Modal.Header>
        <Modal.Content>
          {isUploading ? (
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
              <div className="upload-file-list">
                {fileList.map(({ name }, index) => (
                  <div key={`img-${name}`} className="upload-file-item">
                    <img
                      className="file-icon"
                      src={fileIcon}
                      alt={`${fileIcon}-${name}`}
                    />
                    {name}
                    <img
                      className="delete-icon"
                      src={deleteIcon}
                      onClick={() => onRemoveFile(index)}
                      alt={`${deleteIcon}-${name}`}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </Modal.Content>
        <Modal.Actions>
          <Button content="Cancelar" onClick={() => onCloseUploadFile()} />
          <Button
            content="Subir"
            onClick={(event) => {
              const savedFiles = onSaveFiles(event, {
                auctionId,
                auctionStep,
                fileType,
              });
              if (savedFiles) {
                fetchAuction();
              }
            }}
          />
        </Modal.Actions>
      </Modal>
    </div>
  );
}

export default UploadFile;
