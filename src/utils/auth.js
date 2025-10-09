const BASE_URL = "http://localhost:3001";

export const signup = ({ email, password, name, avatar }) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, avatar, email, password }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return res.text().then((text) => {
        throw new Error(`Sign up failed: ${res.status} - ${text}`);
      });
    })
    .then((data) => {
      localStorage.setItem("jwt", data.token);
      return data;
    });
};
export const signin = ({ email, password }) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return res.json().then((errorData) => {
        throw new Error(errorData.message || `server error: ${res.status}`);
      });
    })
    .then((data) => {
      localStorage.setItem("jwt", data.token);
      return data;
    });
};
export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    throw new Error("Token is Invalid");
  });
};
export const getCurrentUser = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return res.json().then((errorData) => {
      throw new Error(errorData.message || `${res.status}`);
    });
  });
};
