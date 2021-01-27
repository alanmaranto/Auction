import axios from 'axios';
import { host } from './api';

export const getActiveAuctionsByUser = async (token) => {
  try {
    const response = await axios({
      url: `${host}/active-auctions`,
      method: "GET",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    return error
  }
};

export const createAuction = async (token, auction) => {
  try {
    const response = await axios({
      url: `${host}/auction-project/create`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: auction,
    });
    return response;
  } catch (error) {
    console.log(error);
    return error
  }
};

export const getRFIAuctionByUser = async (token) => {
  try {
    const response = await axios({
      url: `${host}/rfi-auctions`,
      method: "GET",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    return error
  }
};

export const getFAAuctionByUser = async (token) => {
  try {
    const response = await axios({
      url: `${host}/fa-auctions`,
      method: "GET",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    return error
  }
};