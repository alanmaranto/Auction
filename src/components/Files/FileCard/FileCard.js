import React from 'react';
import { Card, Button } from "semantic-ui-react";
import { Column, CContent } from "../../../core/indexSemanticUi";

import FileList from '../FileList';
import UploadFile from '../UploadFile';

function FileCard({ openFiles, onOpenFileModal, onCloseFileModal, id }) {
  const files = [
    {
      name: 'archivo1.png',
    }
  ];

  return (
    <Column>
      <Card>
        <CContent>
          <div>
            Archivos
            <Button
              circular
              floated="right"
              icon="add circle"
              onClick={onOpenFileModal}
            />
            <UploadFile
              openModal={openFiles}
              onClose={onCloseFileModal}
              auctionId={id}
            />
          </div>
          <FileList files={files} />
        </CContent>
      </Card>
    </Column>
  );
};

export default FileCard;
