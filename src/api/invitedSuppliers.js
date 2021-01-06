import axios from "axios";
import { host } from "./api";

export const postInvitedSuppliers = async (token, body) => {
  try {
    const response = await axios({
      url: `${host}/invite-suppliers`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: body,
    });
    if (response) {
      return response;
    }
    return response.data.error;
  } catch (error) {
    console.log(error);
  }
};

export const getInvitedAuctionsBySupplier = async (token) => {
  try {
    const response = await axios({
      url: `${host}/invited-auctions`,
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
