import axios from "axios";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:8000/api";

export const checkIfUserAdmin = async (userId) => {
  console.log("API", userId);

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
