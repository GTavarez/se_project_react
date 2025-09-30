const baseUrl = "http://localhost:3001";

function checkResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Error:${res.status}`);
}

function getItems() {
  return fetch(`${baseUrl}/items`).then(checkResponse);
}

function submitItems({ name, link, weather }) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, link, weather }),
  }).then(checkResponse);
}

function updateItems({ name, link, weather, item }) {
  return fetch(`${baseUrl}/items/${item._id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, link, weather }),
  }).then(checkResponse);
}
function deleteCard(item, token) {
  return fetch(`${baseUrl}/items/${item._id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    authorization: `Bearer ${token}`,
  }).then(checkResponse);
}
function addLike(item) {
  return fetch(`${baseUrl}/items/likes/${item._id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    authorization: `Bearer ${token}`,
  }).then(checkResponse);
}
export {
  getItems,
  submitItems,
  updateItems,
  deleteCard,
  checkResponse,
  addLike,
};
