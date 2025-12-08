import axios from "axios";

// Defaults to localhost for dev, but can be overridden by env var
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const client = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default client;
