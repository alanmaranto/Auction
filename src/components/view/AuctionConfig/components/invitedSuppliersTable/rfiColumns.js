import React from "react";
import moment from "moment";
import { Label, Button, Icon, Popup } from "semantic-ui-react";

const rfiColumns = ({ onHandleInvitation }) => [
  {
    id: "1",
    name: "userName",
    title: "Invitado",
    renderData: (dataRow) => {
      const { userName, status } = dataRow || {};
      if (status === "rejected") {
        return (
          <div>
            <Label color="orange" ribbon>
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
                  accepted: "teal",
                  rejected: "orange",
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
      if (invitationStatus !== "sent" && status !== "rejected")
        return <Button color="blue">Enviar</Button>;
      return "-";
    },
    width: 3,
  },
  {
    id: "5",
    name: "readedDocuments",
    title: "Status de documentos",
    width: 2,
    renderData: (dataRow) => {
      return "Leidos";
    },
  },
  {
    id: "6",
    name: "actions",
    title: "Acciones",
    width: 3,
    renderData: (dataRow) => {
      const { userId, invitationId, status } = dataRow || {};
      if (["rejected", "accepted"].includes(status)) {
        return [];
      }
      return (
        <>
          <Popup
            content="Rechazar usuario"
            trigger={
              <Button
                icon
                onClick={() => {
                  onHandleInvitation({ userId, invitationId }, true);
                }}
              >
                <Icon name="user times" color="red" />
              </Button>
            }
          />
          <Popup
            content="Aprobar usuario"
            trigger={
              <Button
                icon
                onClick={() => {
                  onHandleInvitation({ userId, invitationId }, false);
                }}
              >
                <Icon name="user plus" color="teal" />
              </Button>
            }
          />
        </>
      );
    },
  },
];

export default rfiColumns;
