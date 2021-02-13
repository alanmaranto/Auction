import axios from "axios";
import { host } from "./api";

export const getRealTimeBidsByAuctionId = async (token, id) => {
  try {
    const response = await axios({
      url: `${host}/realtime/${id}`,
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

export const getBidsByAuctionInfo = async (token, auctionId) => {
  try {
    const response = await axios({
      url: `${host}/bids/${auctionId}`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response) {
      return response;
    }
    return response.data.error;
  } catch (error) {
    console.log(error);
  }
};