import axios from "axios";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:8000/api";

export const checkIfUserAdmin = async (userId) => {
    console.log("API",userId);
    
  try {
    const response = await axios.get(
      `${API_BASE_URL}/user/checkIfUserAdmin/${userId}`
    );
    
    return response.data;
  } catch (error) {
    console.error("Error fetching user role:", error);
    throw error;
  }
};