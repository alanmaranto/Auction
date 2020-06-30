import React, { useState } from 'react';
import { Confirm } from 'semantic-ui-react';
import { useToasts } from 'react-toast-notifications';

import { isAuthenticated } from "../../../helpers/authenticate";
import { deleteFile } from "../../../api";
import fileIcon from "../../../assets/file-icon.png";
import deleteIcon from "../../../assets/delete-icon.png";
import "./style.css";

function FileList({ files, onRemoveFile }) {
  const { addToast } = useToasts();
  const [isRemoving, setIsRemoving ] = useState(false);
  const [fileId, setFileId ] = useState(null);

  const removeFile = (id) => {
    setIsRemoving(true);
    setFileId(id);
  };

  const onDeleteFile = async () => {
    const { token } = isAuthenticated();
    const response = await deleteFile(token, fileId);

    if (response && response.body) {
      addToast('El archivo se elimino con éxito', {
        appearance: 'success',
        autoDismiss: true,
      });
      setIsRemoving(false);
      setFileId(null);
      onRemoveFile();
    } else {
      addToast('Hubo un error al eliminar el archivo', {
        appearance: 'error',
        autoDismiss: true,
      });
      setIsRemoving(false);
      setFileId(null);
    }
  };

  return (
    <div className="file-list">
      <Confirm
        size="mini"
        className="file-modal"
        open={isRemoving}
        content='¿Estas seguro de querer eliminar este archivo?'
        onCancel={() => {
          setIsRemoving(false);
          setFileId(null);
        }}
        onConfirm={() => onDeleteFile()}
      />
      {
        files.length ? (
          files.map((file) => (
            <div className="file-item" key={`img-${file.name}`}>
              <img className="file-icon" src={fileIcon} />
              <a href={file.url}>{file.title}</a>
              <img className="delete-icon" src={deleteIcon} onClick={() => removeFile(file._id)}/>
            </div>
          ))
        ) : (
          <p>No se han subido archivos</p>
        )
      }
    </div>
  );
};

export default FileList;
