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
