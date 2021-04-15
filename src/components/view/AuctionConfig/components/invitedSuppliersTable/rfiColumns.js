import React from "react";
import moment from "moment";
import { Label, Button, Icon, Popup } from "semantic-ui-react";

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
const rfiColumns = ({ onHandleInvitation, onHandleInvitationDocuments }) => [
  [
    {
      id: "A",
      name: "invitation",
      title: "Invitación",
      colSpan: 3,
      isHeader: true,
    },
    {
      id: "B",
      name: "documents",
      title: "Documentos",
      colSpan: 3,
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
      rowSpan: 2,
    },
    {
      id: "2",
      name: "invitationDate",
      title: "Enviada",
      rowSpan: 2,
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
      title: "Status",
      rowSpan: 2,
      renderData: (dataRow) => {
        const { invitationStatus, status } = dataRow || {};
        return (
          <Label color={getStatusColor(status, invitationStatus)} horizontal>
            {getStatusLabel(invitationStatus)}
          </Label>
        );
      },
      width: 2,
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
      width: 3,
    },
    {
      id: "6",
      name: "documents",
      title: "Proveedor",
      width: 2,
      renderData: (dataRow) => {
        const { files } = dataRow || {};
        if (files?.length) {
          return (
            <details>
              <summary>Ver documentos</summary>
              <p>
                {(files || []).map((file, index) => (
                  <div>
                    <a
                      href={file.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
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
        if (["rejected", "sent"].includes(invitationStatus)) {
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
                    onHandleInvitation(
                      { userId, invitationId, invitationStatus },
                      true
                    );
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
                    onHandleInvitation(
                      { userId, invitationId, invitationStatus },
                      false
                    );
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

export default rfiColumns;
