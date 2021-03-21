import React, { useState, useEffect } from "react";
import { getBidsByAuctionInfo, getRunningAuctionById } from "../../../api/api";
import { getRealTimeBidsByAuctionId } from "../../../api/realtime";
import { isAuthenticated } from "../../../helpers/authenticate";
import FinalizedRealTimeView from "./FinalizedRealTimeView";
import history from "../../../modules/history/history";

const FinalizedRealTimeAuctionsContainer = ({ match: { params } }) => {
  const [auction, setAuction] = useState({});
  const [bids, setBids] = useState([]);
  const [summaryBids, setSummaryBids] = useState([]);

  const { token } = isAuthenticated();

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

  const fetchAuction = async () => {
    const { auctionId: currentAuction } = params;
    const response = await getRunningAuctionById(token, currentAuction);

    if (response && response.data && response.data.body) {
      const { auctionResult } = response.data.body;
      setAuction(auctionResult);
    }
  };

  const fetchBids = async () => {
    const { auctionId: currentAuction } = params;
    const response = await getRealTimeBidsByAuctionId(token, currentAuction);

    if (response && response.data.body) {
      setBids(response.data.body);
    }
  };

  const fetchSummaryBids = async () => {
    const { auctionId: currentAuction } = params;
    const response = await getBidsByAuctionInfo(token, currentAuction);

    if (response && response.data.body) {
      setSummaryBids(response.data.body);
    }
  };

  const chooseWinnerBid = (id) => {
    console.log("id", id);
    history.push(`/winner/auction/${id}`);
  };

  return (
    <FinalizedRealTimeView
      bids={bids}
      summaryBids={summaryBids}
      auction={auction}
      chooseWinnerBid={chooseWinnerBid}
    />
  );
};

export default FinalizedRealTimeAuctionsContainer;
