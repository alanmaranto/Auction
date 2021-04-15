import React from "react";
import { Divider, List, Button, Image, Card } from "semantic-ui-react";
import avatar from "../../../assets/steve.jpg";
import fileIcon from "../../../assets/file-icon.png";
import { formatDate, formatTypes } from "../../../helpers/dates";

import "./style.css";

const InvitationCard = ({ data, key, id, updateInvitationStatus, loading }) => {
  const { auctionId } = data;

  const renderFiles = (files) => {
    return files.map((file) => {
      return (
        <List.Item style={{ display: "flex" }}>
          <img className="file-icon" src={fileIcon} alt={file.title} />
          <a className="file-url" href={file.url}>
            {file.title}
          </a>
        </List.Item>
      );
    });
  };

  return (
    <Card fluid className="invitation-suppliers-card">
      <Card.Content>
        <List divided verticalAlign="middle">
          <List.Item>
            <List.Content
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <div style={{ maxWidth: 150 }}>
                <Image
                  size="small"
                  src={
                    auctionId.user_id.logoUrl
                      ? auctionId.user_id.logoUrl
                      : avatar
                  }
                  wrapped
                />
              </div>
              <div style={{ paddingLeft: 20, maxWidth: 350 }}>
                <List.Header as="a">{auctionId.title}</List.Header>
                <List.Description as="a">
                  {auctionId.description}
                </List.Description>
                <Divider />
                <List.Header as="a">Documentos</List.Header>
                {data.files.length > 0 &&
                  data.files.map((file) => {
                    return renderFiles(file.files);
                  })}
              </div>
              <div style={{ paddingLeft: 20, maxWidth: 154 }}>
                <List.Header as="a">Fecha de invitación</List.Header>
                <List.Description as="a">
                  {formatDate(data.createdAt, formatTypes.invitationDate)}
                </List.Description>
              </div>
              <div style={{ paddingLeft: 20 }}>
                <Button.Group>
                  <Button
                    negative
                    compact
                    loading={loading}
                    onClick={() =>
                      updateInvitationStatus(data._id, "rejected", "rejected")
                    }
                  >
                    Rechazar
                  </Button>
                  <Button.Or text="" />
                  <Button
                    positive
                    compact
                    loading={loading}
                    onClick={() =>
                      updateInvitationStatus(data._id, "accepted", "active")
                    }
                  >
                    Aceptar
                  </Button>
                </Button.Group>
              </div>
            </List.Content>
          </List.Item>
        </List>
      </Card.Content>
    </Card>
  );
};

export default InvitationCard;
