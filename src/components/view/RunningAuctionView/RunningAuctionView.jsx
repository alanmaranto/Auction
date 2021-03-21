import React, { useState, useEffect, useContext } from "react";
import RunningAuction from "./RunningAuction";

import { isAuthenticated } from "../../../helpers/authenticate";
import {
  getRunningAuctionById,
  updateAuction,
  getBidsByAuctionInfo,
} from "../../../api/api";
import { getRealTimeBidsByAuctionId } from "../../../api/realtime";
import { SocketContext } from "../../../context/socket/SocketContext";

const RunningAuctionContainer = ({ match: { params } }) => {
  const { socket } = useContext(SocketContext);

  const [message, setMessage] = useState("");
  const [auction, setAuction] = useState({});
  const [lastMessage, setLastMessage] = useState({});
  const [bids, setBids] = useState([]);
  const [summaryBids, setSummaryBids] = useState([]);

  const { token, user } = isAuthenticated();

  useEffect(() => {
    if (token) {
      fetchAuction();
    }
  }, []);

  useEffect(() => {
    if (token) {
      fetchBids();
    }
  }, []);

  useEffect(() => {
    if (token) {
      fetchSummaryBids();
    }
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

  // get current bids throught socket
  const listenBids = () => {
    socket.on("get-bids", (data) => {
      setBids(data);
    });
  };

  const listenSummaryBids = () => {
    socket.on("summary-bids", (data) => {
      setSummaryBids(data);
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
    listenBids();
  }, [bids]);

  useEffect(() => {
    listenSummaryBids();
  }, [summaryBids]);

  useEffect(() => {
    listenBid();
  }, [lastMessage]);

  const fetchAuction = async () => {
    const { id: currentAuction } = params;
    const response = await getRunningAuctionById(token, currentAuction);

    if (response && response.data && response.data.body) {
      const { auctionResult, lastMessage } = response.data.body;
      setAuction(auctionResult);
      setLastMessage(lastMessage);
    }
  };

  const fetchBids = async () => {
    const { id: currentAuction } = params;
    const response = await getRealTimeBidsByAuctionId(token, currentAuction);

    if (response && response.data.body) {
      setBids(response.data.body);
    }
  };

  const fetchSummaryBids = async () => {
    const { id: currentAuction } = params;
    const response = await getBidsByAuctionInfo(token, currentAuction);

    if (response && response.data.body) {
      setSummaryBids(response.data.body);
    }
  };

  const onFinalizedAuction = async () => {
    const { id: currentAuction } = params;
    const data = {
      finalized: true,
      auctionStep: "finalized",
    };
    await updateAuction(currentAuction, token, data);
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <RunningAuction
      title={auction.title}
      minimumBid={auction.minimumBid}
      totalItemsPrice={auction.totalItemsPrice}
      message={message}
      role={user.role}
      sendBid={sendBid}
      lastMessage={lastMessage}
      endingAuction={auction.endingRealTimeAuctionDate}
      onFinalizedAuction={onFinalizedAuction}
      handleChange={handleChange}
      bids={bids}
      summaryBids={summaryBids}
    />
  );
};

export default RunningAuctionContainer;
