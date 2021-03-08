import React, { Component, useState, useEffect, useContext } from "react";
import RunningAuction from "./RunningAuction";

import { isAuthenticated } from "../../../helpers/authenticate";
import {
  getRunningAuctionById,
  posMessage,
  updateAuction,
} from "../../../api/api";
import { SocketContext } from "../../../context/socket/SocketContext";

const RunningAuctionContainer = ({ match: { params } }) => {
  const { socket } = useContext(SocketContext);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [auction, setAuction] = useState({});
  const [lastMessage, setLastMessage] = useState({});
  const [finalized, setFinalized] = useState(false);

  const { token, user } = isAuthenticated();

  useEffect(() => {
    fetchAuction();
  }, []);

  useEffect(() => {
    // fetchSummaryBids();
  }, []);

  // get current bid throught socket
  const listenBid = () => {
    socket.on("supplier-bid", (data) => {
      const { id: currentAuction } = params;
      if (data.auctionId === currentAuction) {
        setLastMessage(data);
      }
    });
  };

  // send bid throught socket
  const sendBid = async () => {
    const { id: currentAuction } = params;
    const data = {
      auctionId: currentAuction,
      message,
      userId: user._id,
    };

    if (message.length === 0) {
      return;
    }

    socket.emit("supplier-bid", data);
    setMessage("");
  };

  useEffect(() => {
    listenBid();
  }, [lastMessage]);

  const fetchAuction = async () => {
    const { id: currentAuction } = params;
    // const response = await getRealTimeBidsByAuctionId(token, currentAuction);
    const response = await getRunningAuctionById(token, currentAuction);

    if (response && response.data && response.data.body) {
      const { /* bids, */ auctionResult, lastMessage } = response.data.body;
      setAuction(auctionResult);
      setLastMessage(lastMessage);
      // setBids(bids);
    }
  };

  const onFinalizedAuction = () => {
    const { id: currentAuction } = params;
    const data = {
      finalized: true,
    };
    const result = updateAuction(currentAuction, token, data);
    console.log("finalized", result);
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <RunningAuction
      title={auction.title}
      minimumBid={auction.minimumBid}
      minimumPrice={auction.totalItemsPrice}
      message={message}
      role={user.role}
      sendBid={sendBid}
      lastMessage={lastMessage}
      endingAuction={auction.endingRealTimeAuctionDate}
      onFinalizedAuction={onFinalizedAuction}
      handleChange={handleChange}
      // bids={bids}
      // summaryBids={summaryBids}
    />
  );
};

export default RunningAuctionContainer;
