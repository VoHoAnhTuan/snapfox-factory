import api from "../api/axios";

export const login = async (username, password) => {
  const response = await api.post("/api/account/login", {
    username,
    password,
  });

  const token = response.data.token || response.data.accessToken;; 
  
  if (token) {
    // Save it so the Axios interceptor can find it
    localStorage.setItem("token", token);
  }
  
  return response.data;
};