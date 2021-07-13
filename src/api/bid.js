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

export const deleteBid = async (token, id) => {
  try {
    const response = await axios({
      url: `${host}/bid/${id}`,
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    return error;
  }
};
