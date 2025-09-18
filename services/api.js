// services/api.js
const DEFAULT_API = "http://127.0.0.1:8000/api/v1"; // default local FastAPI
const API_BASE = (typeof process !== "undefined" && process.env.API_BASE) ? process.env.API_BASE : DEFAULT_API;

/**
 * request(path, { method, body, token })
 * returns parsed JSON or throws.
 */
async function request(path, { method = "GET", body, token } = {}) {
  const url = `${API_BASE}${path}`;
  const headers = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  try {
    const res = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    const text = await res.text();
    let data = null;
    try { data = text ? JSON.parse(text) : {}; } catch (e) { data = text; }

    if (!res.ok) {
      const errMsg = data && data.message ? data.message : JSON.stringify(data);
      const err = new Error(`API error ${res.status}: ${errMsg}`);
      err.status = res.status;
      err.payload = data;
      throw err;
    }
    return data;
  } catch (err) {
    // Re-throw so callers can detect network vs fallback (but we also log)
    console.warn("[API] request failed:", method, url, err.message);
    throw err;
  }
}

export default { request, API_BASE };
