import React from "react";
import { Card, Feed, Segment, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import "./style.css";

const AuctionStepCard = ({
  header,
  identifier,
  content,
  summary,
  view,
  stepAuction,
}) => {
  const sendToAuctionView = (id) => {
    console.log("id", id);
    // history.push(`/auction-config/${id}`);
  };

  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>{header}</Card.Header>
      </Card.Content>
      <Card.Content style={{ overflow: "auto", maxHeight: 190 }}>
        <Feed onClick={() => sendToAuctionView("74")} size="large">
          <Feed.Event>
            <Feed.Label className="auction-step-feed-label">
              <div className="auction-step-feed-label__container">
                {identifier}
              </div>
            </Feed.Label>
            <Feed.Content>
              <Feed.Date content={content} />
              <Feed.Summary>{summary}</Feed.Summary>
            </Feed.Content>
          </Feed.Event>

          <Feed.Event>
            <Feed.Label className="auction-step-feed-label">
              <div className="auction-step-feed-label__container">
                {identifier}
              </div>
            </Feed.Label>{" "}
            <Feed.Content>
              <Feed.Date content={content} />
              <Feed.Summary>{summary} </Feed.Summary>
            </Feed.Content>
          </Feed.Event>
{/* 
          <Feed.Event>
            <Feed.Label className="auction-step-feed-label">
              <div className="auction-step-feed-label__container">
                {identifier}
              </div>
            </Feed.Label>
            <Feed.Content>
              <Feed.Date content={content} />
              <Feed.Summary>{summary}</Feed.Summary>
            </Feed.Content>
          </Feed.Event> */}
        </Feed>
      </Card.Content>
      <Card.Content extra className="auction-step-card-footer">
        <Link to={view}>Ver todas las subastas {stepAuction}</Link>
      </Card.Content>
    </Card>
  );
};

export default AuctionStepCard;
