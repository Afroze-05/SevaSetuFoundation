// client/src/services/api.js
// Centralized axios instance for API calls to the backend.

import axios from "axios";

// Adjust baseURL if your backend runs on a different host/port
const api = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
});

// Helper to set auth token from localStorage (if needed)
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common.Authorization;
  }
};

export default api;

