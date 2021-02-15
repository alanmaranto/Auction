import React from "react";
import moment from "moment";
import { Label, Button, Icon, Popup, Accordion, Form } from "semantic-ui-react";

const getStatusColor = (auctionStatus, status, type) => {
  if (auctionStatus === "rejected") {
    return "";
  } else {
    if (type === "document") {
      return (
        {
          sent: "",
          read: "",
          uploaded: "teal",
        }[status] || ""
      );
    }
    return (
      {
        sent: "",
        accepted: "teal",
        rejected: "",
      }[status] || ""
    );
  }
};

const getStatusLabel = (itemStatus, type) => {
  if (type === "document") {
    // for documents
    return (
      {
        sent: "Enviados",
        read: "Leídos",
        uploaded: "Subidos",
      }[itemStatus] || "-"
    );
  }
  // for invitations
  return (
    {
      sent: "Enviada",
      accepted: "Aceptada",
      rejected: "Rechazada",
    }[itemStatus] || "-"
  );
};
const faColumns = ({ onHandleInvitation, onHandleInvitationDocuments }) => [
  [
    {
      id: "A",
      name: "userName",
      title: "Proveedor",
      colSpan: 1,
      isHeader: true,
    },
    {
      id: "B",
      name: "documents",
      title: "Documentos",
      colSpan: 2,
      isHeader: true,
    },
  ],
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
    {
      id: "4",
      name: "documents2",
      title: "RFI documentos",
      renderData: (dataRow) => {
        const {
          invitationStatus,
          status,
          userId: invitedUserId,
          invitationId,
          filesStep,
        } = dataRow || {};

        if (filesStep) {
          return (
            <Label
              color={getStatusColor(status, filesStep, "document")}
              horizontal
            >
              {getStatusLabel(filesStep, "document")}
            </Label>
          );
        }
        if (status !== "rejected" && invitationStatus === "accepted")
          return (
            <Button
              color="blue"
              style={{ width: "100%" }}
              onClick={() => {
                onHandleInvitationDocuments({ invitedUserId, invitationId });
              }}
            >
              Enviar
            </Button>
          );
        return "-";
      },
    },
    {
      id: "6",
      name: "documents",
      title: "Proveedor",
      renderData: (dataRow) => {
        const { files } = dataRow || {};
        if (files?.length) {
          return (
            <details>
              <summary>Ver documentos</summary>
              <p>
                {(files || []).map((file, index) => (
                  <div>
                    <a href={file.url} target="_blank">
                      {file.title || ""}
                    </a>
                  </div>
                ))}
              </p>
            </details>
          );
        } else {
          return "";
        }
      },
    },
    {
      id: "7",
      name: "actions",
      title: "Acciones",
      rowSpan: 2,
      renderData: (dataRow) => {
        const { userId, invitationId, status, invitationStatus } =
          dataRow || {};
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
  ],
];

export default faColumns;
