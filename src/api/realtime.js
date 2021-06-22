import axios from "axios";
import { host } from "./api";

export const getRealTimeBidsByAuctionId = async (token, auctionId) => {
  try {
    const response = await axios({
      url: `${host}/real-time-bids/${auctionId}`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const getBidsByAuctionId = async (token, auctionId) => {
  try {
    const response = await axios({
      url: `${host}/admin-bids/${auctionId}`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};


