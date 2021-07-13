import axios from 'axios';
import { host } from './api';

export const getFAPosts = async (token, auctionId) => {
    try {
      const response = await axios({
        url: `${host}/posts/${auctionId}`,
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
  
  export const createFAPost = async (token, post ,auctionId) => {
    try {
      const response = await axios({
        url: `${host}/posts/${auctionId}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: post,
      });
      return response;
    } catch (error) {
      console.log(error);
      return error
    }
  };
  

export const deleteComment = async (token, id) => {
  try {
    const response = await axios({
      url: `${host}/comment/${id}`,
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