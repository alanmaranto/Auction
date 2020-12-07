import axios from "axios";
import { host } from "./api";

export const getUserInfoById = async (token) => {
  try {
    const response = await axios({
      url: `${host}/user-info`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (err) {
    return err;
  }
};

export const uploadLogo = async (token, logo) => {
  try {
    const response = await axios({
      url: `${host}/logo`,
      method: "PUT",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
      data: logo,
    });
    return response
  } catch (err) {
    return err;
  }
};
