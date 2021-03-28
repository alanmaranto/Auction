/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Dashboard from "./Dashboard";
import { isAuthenticated } from "../../../helpers/authenticate";
import {
  getRFIAuctionByUser,
  getFAAuctionByUser,
  getSubAuctionByUser,
} from "../../../api/auction";

const DashboardContainer = ({ history }) => {
  const [rfiAuctions, setRfiAuctions] = useState([]);
  const [faAuctions, setFaAuctions] = useState([]);
  const [subAuctions, setSubAuctions] = useState([]);
  const { user, token } = isAuthenticated();

  const fetchRfiAuctions = async (token) => {
    const response = await getRFIAuctionByUser(token);

    if (response && response.data.body.length > 0) {
      setRfiAuctions(response.data.body);
    }
  };

  const fetchFaAuctions = async (token) => {
    const response = await getFAAuctionByUser(token);

    if (response && response.data.body.length > 0) {
      setFaAuctions(response.data.body);
    }
  };

  const fetchSubAuctions = async (token) => {
    const response = await getSubAuctionByUser(token);

    if (response && response.data.body.length > 0) {
      setSubAuctions(response.data.body);
    }
  };

  useEffect(() => {
    if (token) {
      fetchRfiAuctions(token);
    }
  }, []);

  useEffect(() => {
    if (token) {
      fetchFaAuctions(token);
    }
  }, []);

  useEffect(() => {
    if (token) {
      fetchSubAuctions(token, user._id);
    }
  }, []);

  return (
    <Dashboard
      user={user}
      rfiAuctions={rfiAuctions}
      faAuctions={faAuctions}
      subAuctions={subAuctions}
      history={history}
    />
  );
};

export default DashboardContainer;
