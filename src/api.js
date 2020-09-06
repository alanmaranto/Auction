import axios from "axios";
const host = process.env.REACT_APP_API_URL
const api = {
  host,
};
//
// Auth
//
export const signup = (user) => {
  return fetch(`${host}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const signin = (user) => {
  return fetch(`${host}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const signout = (next) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt");
    next();
    return fetch(`${host}/signout`, {
      method: "GET",
    })
      .then((response) => {
        console.log("signout", response);
      })
      .catch((err) => console.log(err));
  }
};

export const forgotPassword =  async (email) => {
  try {
    const response = await axios({
      method: 'PUT',
      url: `${host}/forgot-password`,
      data: email
    });
    console.log('response', response)
    return response;
  } catch (error) {
    console.log(error)
    return error
  }
};

export const resetPassword =  async (body) => {
  try {
    const response = await axios({
      method: 'PUT',
      url: `${host}/reset-password`,
      data: body
    });
    return response;
  } catch (error) {
    console.log(error)
    return error
  }
};
//
//Auction
//
export const createAuction = async (token, userId, auction) => {
  try {
    const response = await axios({
      url: `${host}/auctionInformation/create/${userId}`,
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
  }
};

export const getAuctionById = async (token, id) => {
  try {
    console.log(token)
    const response = await axios({
      url: `${host}/auctionInformation/${id}`,
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

export const updateAuction = async (id, token, auction) => {
  try {
    const response = await axios({
      url: `${host}/auctionInformation/${id}`,
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: auction,
    });
  } catch (error) {
    console.log(error);
  }
};

export const posMessage = async (token, body) => {
  try {
    const response = await axios({
      url: `${host}/runningAuction/message/`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: body,
    });
  } catch (error) {
    console.log(error);
  }
};

// Files
export const postFile = async (token, body, auctionId) => {
  try {
    const response = await axios({
      url: `${host}/auction/${auctionId}/files`,
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
      data: body,
    });

    return response;
  } catch (error) {
    return error;
  }
};

export const getFiles = async (token, auctionId) => {
  try {
    const response = await axios({
      url: `${host}/auction/${auctionId}/files`,
      method: "GET",
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

export const deleteFile = async (token, fileId) => {
  try {
    const response = await axios({
      url: `${host}/files/${fileId}`,
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

export const getRunningAuctionById = async (token, id) => {
  try {
    const response = await axios({
      url: `${host}/runningAuction/${id}`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ auctionId: id }),
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getFinalizedAuctionsByUser = async (token, user) => {
  try {
    const response = await axios({
      url: `${host}/auctionsFinalized/${user}`,
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

export const postProviders = async (token, body) => {
  try {
    const response = await axios({
      url: `${host}/providers`,
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

export const getSelectedProvidersByAuctionId = async (token, auctionId) => {
  try {
    const response = await axios({
      url: `${host}/selectedProviders/${auctionId}`,
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

export const getInvitedAuctionsByProvider = async (token, userId) => {
  try {
    const response = await axios({
      url: `${host}/auctions-provider`,
      method: "GET",
      headers: {
        ["x-user-id"]: userId,
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: userId,
    });
    if (response) {
      return response;
    }
    return response.data.error;
  } catch (error) {
    console.log(error);
  }
};

// Bids
export const getBidsByAuctionInfo = async (token, auctionId) => {
  try {
    const response = await axios({
      url: `${host}/bids/${auctionId}`,
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

export const chooseWinner = async (token, auctionId, bidId, body) => {
  try {
    const response = await axios({
      url: `${host}/bid-winner`,
      method: "PUT",
      headers: {
        ["x-auction-id"]: auctionId,
        ["x-bid-id"]: bidId,
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: body
    });
    if (response) {
      return response;
    }
    return response.data.error;
  } catch (error) {
    console.log(error);
  }
};

export default api;
