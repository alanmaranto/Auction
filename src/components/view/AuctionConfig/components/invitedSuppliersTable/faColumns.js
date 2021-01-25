import React from "react";
import { Label } from "semantic-ui-react";

const faColumns = ({}) => [
  [
    {
      id: "1",
      name: "userName",
      title: "Proveedor",
      renderData: (dataRow) => {
        const { userName, status } = dataRow || {};
        if (status === "rejected") {
          return (
            <div>
              <Label color="orange" ribbon>
                Rechazado
              </Label>
              <div>{userName}</div>
            </div>
          );
        }
        if (status === "accepted") {
          return (
            <div>
              <Label color="teal" ribbon>
                Acceptado
              </Label>
              <div>{userName}</div>
            </div>
          );
        }
        return userName;
      },
    },
  ],
];

export default faColumns;
