// src/api/client.js
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

let authToken = null;
let subscribers = [];

export function setAuthToken(token) {
  authToken = token;
  subscribers.forEach((fn) => fn(token));
}

export function onTokenChange(fn) {
  subscribers.push(fn);
  return () => {
    subscribers = subscribers.filter((f) => f !== fn);
  };
}

async function request(path, { method = "GET", body, headers = {} } = {}) {
  const h = { "Content-Type": "application/json", ...headers };
  if (authToken) h.Authorization = `Bearer ${authToken}`;

  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers: h,
    body: body ? JSON.stringify(body) : undefined,
  });

  const contentType = res.headers.get("content-type") || "";
  const isJSON = contentType.includes("application/json");
  const data = isJSON ? await res.json().catch(() => ({})) : null;

  if (!res.ok) {
    const msg = (data && data.message) || `HTTP ${res.status}`;
    const err = new Error(msg);
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data;
}

export const api = {
  get: (p) => request(p),
  post: (p, b) => request(p, { method: "POST", body: b }),
  put: (p, b) => request(p, { method: "PUT", body: b }),
  del: (p) => request(p, { method: "DELETE" }),
};
