import axios from 'axios';
const host = process.env.REACT_APP_API_URL || "localhost:3000";
//
// Auth
//
export const signup = user => {
  return fetch(`${host}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
    });
};

export const signin = user => {
  return fetch(`${host}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
    });
};

export const signout = next => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt");
    next();
    return fetch(`${host}/signout`, {
      method: "GET"
    })
      .then(response => {
        console.log("signout", response);
      })
      .catch(err => console.log(err));
  }
};
//
//Auction
//
export const createAuction = async (userId, token, auction ) => {
  try {
    const response = await axios({
      url: `${host}/auctionInformation/create/${userId}`,
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      },
      data: auction
    })
  } catch (error) {
    console.log(error)
  }
};

export const getAuctions = async () => {
  try {
    const response = await axios({
      url: `${host}/auctionInformation`,
      method: 'GET'
    })

    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getAuctionById = async id => {
  try {
    const response = await axios({
      url: `${host}/auctionInformation/${id}`,
      method: 'GET'
    })
    return response
  } catch (error) {
    console.log(error)
  }
}

export const updateAuction = (auctionId, userId, token, auction) => {
  return fetch(`${host}/auctionInformation/${auctionId}/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    },
    body: auction
  });
};

// Files
export const postFile = async (token, body) => {
  try {
    const response = await axios({
      url: `${host}/document/upload/`,
      method: 'POST',
      headers: {
        "Content-Type": "multipart/form-data",
        'Authorization': `Bearer ${token}`
      },
      data: body
    })
    console.log(response)
  } catch (error) {
    console.log(error)
  }
}
