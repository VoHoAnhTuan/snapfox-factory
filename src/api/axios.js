import axios from "axios";

const api = axios.create({
  baseURL: "https://snapfox.us",
  headers: {
    "Content-Type": "application/json",
  },
});

// Production Interceptor: Automatically attaches the token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response Interceptor: Handles 401 (Expired Session) globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Redirect to login if token expires
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;