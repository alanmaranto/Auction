import React from "react";
import { Button } from "semantic-ui-react";

import "./style.css";

const Documents = ({}) => {
  return (
    <div>
      {
        <div>
          <Button primary style={{ width: "100%" }}>
            Agregar documento
          </Button>
          {["Documento 1", "Documento 2"].map((document) => (
            <div className="document-item">{document}</div>
          ))}
        </div>
      }
    </div>
  );
};

export default Documents;
