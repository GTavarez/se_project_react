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
    headers: { "Content-Type": "application/json" },
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
function deleteCard(item) {
  console.log("Attempting to delete:", `${baseUrl}/items/${item._id}`);
  return fetch(`${baseUrl}/items/${item._id}`, {
    method: "DELETE",
  }).then(checkResponse);
}

export { getItems, submitItems, updateItems, deleteCard };
