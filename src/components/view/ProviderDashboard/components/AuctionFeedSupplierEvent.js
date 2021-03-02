import React from "react";
import { Feed } from "semantic-ui-react";
import "./style.css";

const AuctionFeedSupplierEvent = ({
  identifier,
  content,
  summary,
  auctionId,
  history,
}) => {
  const sendToAuctionView = () => {
    history.push(`/auction-config-supplier/${auctionId}`);
  };
  return (
    <Feed onClick={() => sendToAuctionView()} size="large">
      <Feed.Event className="auction-step-feed-event">
        <Feed.Label className="auction-step-feed-event__label">
          <div className="auction-step-feed-event__label--text">
            {identifier}
          </div>
        </Feed.Label>
        <Feed.Content>
          <Feed.Date content={content} />
          <Feed.Summary>{summary}</Feed.Summary>
        </Feed.Content>
      </Feed.Event>
    </Feed>
  );
};

export default AuctionFeedSupplierEvent;
