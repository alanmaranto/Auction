import React, { useState, useEffect } from "react";
import Dropzone from "react-dropzone";
import { Button, Dimmer } from "semantic-ui-react";
import { useToasts } from "react-toast-notifications";
import Loader from "../../../../core/Loader";
import { isAuthenticated } from "../../../../helpers/authenticate";
// import FileList from "./fileList/FileList";

import fileIcon from "../../../../assets/file-icon.png";
import deleteIcon from "../../../../assets/delete-icon.png";

import "./style.css";

function FileList({ files, onRemove }) {
  console.log("object", files);
  const fileNames = files.map((file) => file.name);
  return (
    <div className="upload-file-list">
      {fileNames.map((file, index) => (
        <div key={`img-${file}`} className="upload-file-item">
          <img src={fileIcon} alt="file-icon" className="file-icon" />
          {file}
          <img
            src={deleteIcon}
            alt="delete-icon"
            className="delete-icon"
            onClick={onRemove(index)}
          />
        </div>
      ))}
    </div>
  );
}

function FileListStep() {
  const [fileList, setFileList] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  const onAddFile = (files) => {
    console.log("files", files);
    const currentFileList = [...fileList];
    console.log("cFL", currentFileList);

    if (Array.isArray(files)) {
      files.forEach((file) => {
        console.log("file", file);
        currentFileList.push(file);
      });
    } else {
      console.log("else");
      currentFileList.push(files);
    }
    setFileList(currentFileList);
    console.log("ultimo", fileList);
  };

  const onRemoveFile = (index) => {
    const currentFileList = [...fileList];
    currentFileList.splice(index, 1);

    setFileList(currentFileList);
  };

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
          {fileList.length > 0 && (
            <>
              <h2>Hola</h2>
              <FileList files={fileList} onRemove={onRemoveFile} />
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default FileListStep;
