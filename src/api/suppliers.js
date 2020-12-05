import axios from 'axios'
import { host } from "./api";

export const getProviders = async (token) => {
  try {
    const response = await axios({
      url: `${host}/providers/`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};
