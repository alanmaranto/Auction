import React, { Component, useContext, useState, useEffect } from "react";
import RunningAuction from "./RunningAuction";

import { isAuthenticated } from "../../../helpers/authenticate";
import {
  getRunningAuctionById,
  posMessage,
  updateAuction,
} from "../../../api/api";
import {
  getRealTimeBidsByAuctionId,
  getBidsByAuctionInfo,
} from "../../../api/realtime";
import { SocketContext } from "../../../context/SocketContext";
import moment from "moment";
import "moment/locale/es";

const RunningAuctionContainer = ({ match: { params } }) => {
  const { socket } = useContext(SocketContext);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [auction, setAuction] = useState({});
  const [lastMessage, setLastMessage] = useState({});
  const [finalized, setFinalized] = useState(false);
  const [bids, setBids] = useState([]);
  const [summaryBids, setSummaryBids] = useState([]);

  const { token, user } = isAuthenticated();

  useEffect(() => {
    fetchAuction();
  }, []);

  useEffect(() => {
    fetchSummaryBids();
  }, []);

  useEffect(() => {
    listenMessages();
  }, [socket]);

  const fetchAuction = async () => {
    const { id: currentAuction } = params;
    const response = await getRealTimeBidsByAuctionId(token, currentAuction);
    console.log("response", response);
    if (response && response.data && response.data.body) {
      const { bids, auctionResult } = response.data.body;
      setAuction(auctionResult);
      setBids(bids);
    }
  };

  const fetchSummaryBids = async () => {
    const { id } = params;
    const response = await getBidsByAuctionInfo(token, id);
    if (response && response.status === 200) {
      setSummaryBids(response.data.body);
    }
  };

  const onSubmit = async () => {
    const { id: currentAuction } = params;

    const data = {
      auctionId: currentAuction,
      message,
    };
    const result = await posMessage(token, data);
    console.log("result", result);
    setMessage("");
  };

  const listenMessages = () => {
    socket.on("wellcome", (data) => {
      console.log("data", data);
    });
  };

  const onFinalizedAuction = () => {
    const { id: currentAuction } = params;
    const data = {
      finalized: true,
    };
    const result = updateAuction(currentAuction, token, data);
    console.log("finalized", result);
  };

  return (
    <RunningAuction
      title={auction.title}
      minimumBid={auction.minimumBid}
      minimumPrice={auction.totalItemsPrice}
      setMessage={setMessage}
      message={message}
      role={user.role}
      onSubmit={onSubmit}
      lastMessage={lastMessage}
      endingAuction={auction.endingRealTimeAuctionDate}
      onFinalizedAuction={onFinalizedAuction}
      bids={bids}
      summaryBids={summaryBids}
    />
  );
};

export default RunningAuctionContainer;
