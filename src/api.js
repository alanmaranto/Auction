import axios from "axios";
const host = process.env.REACT_APP_API_URL || "localhost:3000";
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
//
//Auction
//
export const createAuction = async (userId, token, auction) => {
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
  } catch (error) {
    console.log(error);
  }
};

export const getAuctions = async () => {
  try {
    const response = await axios({
      url: `${host}/auctionInformation`,
      method: "GET",
    });

    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getAuctionById = async (id) => {
  try {
    const response = await axios({
      url: `${host}/auctionInformation/${id}`,
      method: "GET",
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
    console.log('method',response)
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
export const postFile = async (token, body) => {
  try {
    const response = await axios({
      url: `${host}/document/upload/`,
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
      data: body,
    });
    console.log(response);
  } catch (error) {
    console.log(error);
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

export default api;
