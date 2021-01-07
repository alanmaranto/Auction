import React, { useState, useEffect, useCallback } from "react";
import Dropzone from "react-dropzone";
import { Button, Dimmer } from "semantic-ui-react";
import { useToasts } from "react-toast-notifications";
import Loader from "../../../../core/Loader";
import { isAuthenticated } from "../../../../helpers/authenticate";

import fileIcon from "../../../../assets/file-icon.png";
import deleteIcon from "../../../../assets/delete-icon.png";

import "react-dropzone-uploader/dist/styles.css";
import "./style.css";

const FileListStep = ({
  fileList,
  setFileList,
  isUploading,
  setIsUploading,
  onAddFile,
  onRemoveFile,
}) => {
  return (
    <div>
      {isUploading ? (
        <Dimmer active inverted>
          <Loader inverted />
        </Dimmer>
      ) : (
        <div className="file-step-container">
          <Dropzone
            onDrop={(files) => {
              const currentFileList = [...fileList];
              if (Array.isArray(files)) {
                files.forEach((file) => {
                  currentFileList.push(file);
                });
              } else {
              }
              setFileList(currentFileList);
            }}
          >
            {({ getRootProps, getInputProps }) => (
              <div
                {...getRootProps({
                  className: "file-step-container__dropzone-info-project",
                })}
              >
                <input {...getInputProps()} />
                <p>Arrastra o da click para subir archivos</p>
              </div>
            )}
          </Dropzone>
          <div className="upload-file-list">
            {fileList
              ? fileList.map(({ name: fileName }, index) => {
                  return (
                    <div key={`img-${fileName}`} className="upload-file-item">
                      <img
                        src={fileIcon}
                        alt="file-icon"
                        className="file-icon"
                        style={{ width: "20px" }}
                      />
                      {fileName}
                      <img
                        src={deleteIcon}
                        alt="delete-icon"
                        className="delete-icon"
                        onClick={() => {
                          const currentFileList = [...fileList];
                          currentFileList.splice(index, 1);
                          setFileList(currentFileList);
                        }}
                        style={{ width: "20px" }}
                      />
                    </div>
                  );
                })
              : []}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileListStep;
