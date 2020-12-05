import axios from "axios";
import { host } from "./api";

export const getFavoriteSuppliers = async (token) => {
  try {
     const response = await axios({
      url: `${host}/favorite-suppliers`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
     return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const postFavoriteSuppliers = async (token, body) => {
  try {
    console.log('body', body);
    const response = await axios({
      url: `${host}/favorite-suppliers`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: body,
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const deleteFavoritSupplier = async (token, supplierId) => {
  try {
    const response = await axios({
      url: `${host}/favorite-suppliers`,
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: {
        supplier: supplierId,
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};
