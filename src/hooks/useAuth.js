import { jwtDecode } from "jwt-decode";

export const useAuth = () => {
  const token = localStorage.getItem("token"); // Retrieve the token saved after login

  if (!token) return { name: "Guest", title: "Visitor" };

  try {
    const decoded = jwtDecode(token);
    // Adjust these keys based on what your Snapfox API provides in the token
    return {
      name: decoded.unique_name || decoded.name || "User",
      title: decoded.role || "Team Member",
    };
  } catch (error) {
    return { name: "Error", title: "Invalid Token" };
  }
};