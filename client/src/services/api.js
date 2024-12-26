import axios from "axios";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:8000/api";

export const checkIfUserAdmin = async (userId) => {
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

export const addProduct = async (product) => {
  console.log("api", product);
  try {
    const response = await axios.post(
      `${API_BASE_URL}/product/addProduct`,
      product
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllProducts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/product/getAllProducts`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/user/getAllUsers`);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const changeUserRole = async (userId, newRole) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/user/changeUserRole/${userId}`,
      { newRole }
    );
    return response;
  } catch (error) {
    console.error("Error changing roles:", error);
    throw error;
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(
      `${API_BASE_URL}/user/deleteUser/${userId}`
    );
    return response;
  } catch (error) {
    console.error("Error deleting roles:", error);
    throw error;
  }
};

export const addAdress = async (userId, newAddress) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/user/changeUserRole/${userId}`,
      { newAddress }
    );
    return response;
  } catch (error) {
    console.error("Error adding address:", error);
    throw error;
  }
};
export const fetchUserData = async (userId) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/user/fetchUserData/${userId}`
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};
export const updateUserDetails = async (
  userId,
  username,
  userAddress
) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/user/updateUserDetails/${userId}`,
      {  username, userAddress }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};
