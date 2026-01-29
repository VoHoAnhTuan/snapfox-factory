import api from "../api/axios";

export const login = async (username, password) => {
  const response = await api.post("/api/account/login", {
    username,
    password,
  });

  // Most APIs return the token as 'token' or 'accessToken'
  const token = response.data.token; 
  
  if (token) {
    // Save it so the Axios interceptor can find it
    localStorage.setItem("token", token);
  }
  
  return response.data;
};