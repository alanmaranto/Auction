import React, { useState, useEffect } from 'react';
import { Card, Button } from "semantic-ui-react";
import { Column, CContent } from "../../../core/indexSemanticUi";

import FileList from '../FileList';
import UploadFile from '../UploadFile';
import { getFiles } from "../../../api/api";
import { isAuthenticated } from "../../../helpers/authenticate";

function FileCard({ openFiles, onOpenFileModal, onCloseFileModal, id }) {
  const [fileList, setFileList] = useState([]);

  const fetchFiles = async () => {
    const { token } = isAuthenticated();
    const response = await getFiles(token, id);

    if (response && response.body) {
      setFileList(response.body);
    }
  };

  useEffect(() => {
    if (id) {
      fetchFiles();
    }
  }, [id]);

  return (
    <Column>
      <Card fluid color="blue">
        <CContent>
            <Button
              circular
              floated="right"
              icon="add circle"
              onClick={onOpenFileModal}
              />
              <Card.Header>Archivos</Card.Header>
            <UploadFile
              openModal={openFiles}
              onClose={() => {
                fetchFiles();
                onCloseFileModal();
              }}
              auctionId={id}
            />
          <FileList files={fileList} onRemoveFile={() => fetchFiles()}/>
        </CContent>
      </Card>
    </Column>
  );
};

export default FileCard;
