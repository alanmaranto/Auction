import React, { useEffect, useState } from "react";

import RealTimeAuction from "../RealTimeAuction/RealTimeAuctionView";
import Auction from './Auction';

import { getAuctionById } from "../../../api";

import 'moment/locale/es';


const AuctionContainer = ({match}) => {
  const [error, setError] = useState(false);
  const [auction, setAuction] = useState([]);

  const fetchAuction = async () => {
    const { id } = match.params
    const response = await getAuctionById(id);

    if (response && response.status && response.status === 200) {
      setAuction(response.data.body)
    }
  }

  useEffect(() => {
    fetchAuction()
  }, [])

  console.log('a', auction)

  return (
    <Auction auction={auction} />
  );
};

export default AuctionContainer;
