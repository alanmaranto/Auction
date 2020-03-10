const host = process.env.REACT_APP_API_URL || "localhost:3000";

// Auth

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

// auction

export const createAuction = (userId, token, auction) => {
  return fetch(`${host}/auctionInformation/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(auction)
  })
    .then(response => {
      console.log('response', response)
      return response.json();
    })
    .catch(err => {
      console.log(err);
    });
};
