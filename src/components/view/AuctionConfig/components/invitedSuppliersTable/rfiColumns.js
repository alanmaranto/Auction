import React from "react";
import moment from "moment";
import { Label, Button } from "semantic-ui-react";

const rfiColumns = [
  {
    id: "1",
    name: "userName",
    title: "Invitado",
    renderData: (dataRow) => {
      const { userName, status, userId } = dataRow || {};
      if (status === "rejected") {
        return (
          <div>
            <Label color="red" ribbon>
              Rejected
            </Label>
            <div>{userName}</div>
          </div>
        );
      }
      return userName;
    },
    width: 2,
  },
  {
    id: "2",
    name: "invitationDate",
    title: "Invitación enviada:",

    renderData: (dataRow) => {
      const { invitationDate } = dataRow || {};

      if (!invitationDate) return "";
      return moment(invitationDate).format("MMM Do YY");
    },
    width: 4,
  },
  {
    id: "3",
    name: "invitationStatus",
    title: "Invitación",
    renderData: (dataRow) => {
      const { invitationStatus, status } = dataRow || {};
      return (
        <Label
          color={
            status === "rejected"
              ? ""
              : {
                  send: "",
                  accepted: "green",
                  rejected: "red",
                }[invitationStatus]
          }
          horizontal
        >
          {{
            send: "Enviada",
            accepted: "Aceptada",
            rejected: "Rechazada",
          }[invitationStatus] || "Enviada"}
        </Label>
      );
    },
    width: 2,
  },
  {
    id: "4",
    name: "documents",
    title: "Documentos",
    renderData: (dataRow) => {
      const { invitationStatus, status } = dataRow || {};
      const sendDocuments = true;

      if (invitationStatus !== "send" && status !== "rejected")
        return <Button primary>Enviar</Button>;
      return "-";
    },
    width: 3,
  },
  { id: "5", name: "readedDocuments", title: "Status de documentos", width: 5 },
];

export default rfiColumns;
