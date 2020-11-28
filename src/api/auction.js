import axios from 'axios';
import { host } from './api';

export const getActiveAuctionsByUser = async (token, user) => {
  try {
    const response = await axios({
      url: `${host}/auctionsActives/${user}`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ user }),
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};
