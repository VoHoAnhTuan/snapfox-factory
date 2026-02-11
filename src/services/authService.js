import api from "../api/axios";

export const login = async (username, password) => {
  const response = await api.post("/Auth/login", {
    userName: username,
    password,
  });

  const token = response.data.token || response.data.accessToken;; 
  
  if (token) {
    localStorage.setItem("token", token);
  }
  
  return response.data;
};