import axios from "axios";

// axiosInstance.js

// Add request interceptor for token
// Axios interceptor for auth
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  withCredentials: true, // ✅ important for sending/receiving cookies
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
