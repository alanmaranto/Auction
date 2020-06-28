import React from 'react';

import fileIcon from "../../../assets/file-icon.png";
import deleteIcon from "../../../assets/delete-icon.png";
import "./style.css";

function FileList({ files }) {
  return (
    <div className="file-list">
      {
        files.map((file) => (
          <div className="file-item" key={`img-${file.name}`}>
            <img className="file-icon" src={fileIcon} />
            {file.name}
            <img className="delete-icon" src={deleteIcon} />
          </div>
        ))
      }
    </div>
  );
};

export default FileList;
