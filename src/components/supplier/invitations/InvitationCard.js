import React from "react";
import { Divider, List, Button, Image, Card } from "semantic-ui-react";
import moment from 'moment'
import 'moment/locale/es';

import "./style.css";

const InvitationCard = ({ data, idx }) => {
  console.log("data", data);
  const { auctionId } = data;
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
              <div>
                <Image
                  size="small"
                  src={auctionId.user_id.logoUrl}
                  wrapped
                  ui="false"
                />
              </div>
              <div style={{ paddingLeft: 20, minWidth: 250 }}>
                <List.Header as="a">{auctionId.title}</List.Header>
                <List.Description as="a">
                  {auctionId.description}
                </List.Description>
                <Divider />
                <List.Header as="a">Documentos</List.Header>
                <List.Item>Document1</List.Item>
                <List.Item>Document1</List.Item>
                <List.Item>Document1</List.Item>
                <List.Item>Document1</List.Item>
                <List.Item>Document1</List.Item>
              </div>
              <div style={{ paddingLeft: 20, maxWidth: 160 }}>
                <List.Header as="a">Fecha de RFI</List.Header>
                <List.Description as="a">
                  {moment(auctionId.openingRFIDate).format(
                    "dddd, MMMM Do YYYY, h:mm:ss a"
                  )}
                </List.Description>
              </div>
              <div style={{ paddingLeft: 20 }}>
                <Button positive>Aceptar</Button>
                <Button negative>Rechazar</Button>
              </div>
            </List.Content>
          </List.Item>
        </List>
      </Card.Content>
    </Card>
  );
};

export default InvitationCard;
