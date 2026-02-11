import { jwtDecode } from "jwt-decode";

export const useAuth = () => {
  const token = localStorage.getItem("token");

  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    
    return {
      name: decoded.sub || "User", 
      title: "Team Member", 
      expiry: decoded.exp 
    };
  } catch (error) {
    console.error("Token decoding failed", error);
    return null;
  }
};