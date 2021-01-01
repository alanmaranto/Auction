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

const FileListStep = () => {
  const [fileList, setFileList] = useState([{ inicial: true}]);
  const [isUploading, setIsUploading] = useState(false);

  const onAddFile = (files) => {
    const currentFileList = [...fileList];

    if (Array.isArray(files)) {
      files.forEach((file) => {
        console.log("file", file);
        currentFileList.push(file);
      });
    } else {
      currentFileList.push(files);
    }
    console.log("setting archivos", files);
    setFileList(currentFileList);
  };

  const onRemoveFile = (index) => {
    const currentFileList = [...fileList];
    currentFileList.splice(index, 1);

    setFileList(currentFileList);
  };

  const fileNames = fileList && fileList.map((file) => file.name);

  return (
    <div>
      {isUploading ? (
        <Dimmer active inverted>
          <Loader inverted />
        </Dimmer>
      ) : (
        <div className="file-step-container">
          <Dropzone onDrop={onAddFile}>
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
            {console.log("render file list", fileList)}
            {fileList.map((file, index) => {
              return (
                <div key={`img-${file}`} className="upload-file-item">
                  <img src={fileIcon} alt="file-icon" className="file-icon" />
                  {file}
                  <img
                    src={deleteIcon}
                    alt="delete-icon"
                    className="delete-icon"
                    onClick={onRemoveFile(index)}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileListStep;
