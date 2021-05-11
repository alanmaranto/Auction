import axios from "axios";
import { host } from "./api";

export const getLastBidByUserIdAndAuction = async (token, auctionId) => {
  try {
    const response = await axios({
      url: `${host}/supplier-bid/${auctionId}`,
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
