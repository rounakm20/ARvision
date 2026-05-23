const BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

const headers = (auth = false) => {
  const h = { "Content-Type": "application/json" };
  if (auth) {
    const token = localStorage.getItem("arvision_token");
    if (token) h["Authorization"] = `Bearer ${token}`;
  }
  return h;
};

export const api = {
  // Objects
  getObjects:       ()       => fetch(`${BASE}/api/objects`).then((r) => r.json()),
  getObjectById:    (id)     => fetch(`${BASE}/api/objects/${id}`).then((r) => r.json()),
  getObjectByLabel: (label)  => fetch(`${BASE}/api/objects/label/${label}`).then((r) => r.json()),
  getAllObjects:     ()       => fetch(`${BASE}/api/objects/all`, { headers: headers(true) }).then((r) => r.json()),
  createObject:     (data)   => fetch(`${BASE}/api/objects`,     { method: "POST", headers: headers(true), body: JSON.stringify(data) }).then((r) => r.json()),
  updateObject:     (id, d)  => fetch(`${BASE}/api/objects/${id}`,{ method: "PUT",  headers: headers(true), body: JSON.stringify(d) }).then((r) => r.json()),
  deleteObject:     (id)     => fetch(`${BASE}/api/objects/${id}`,{ method: "DELETE", headers: headers(true) }).then((r) => r.json()),

  // Auth
  login:  (email, password) => fetch(`${BASE}/api/auth/login`,    { method: "POST", headers: headers(), body: JSON.stringify({ email, password }) }).then((r) => r.json()),
  me:     ()                => fetch(`${BASE}/api/auth/me`,        { headers: headers(true) }).then((r) => r.json()),
};