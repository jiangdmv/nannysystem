import axios from "axios";

const PRODUCT_API_BASE_URL = "http://127.0.0.1:8000/product";

const getProductApi = async () => {
  const response = await axios.get(PRODUCT_API_BASE_URL);
  if (response.data) {
    localStorage.setItem("product", JSON.stringify(response.data));
  }

  return response.data;
};

const postProductApi = async (productData) => {
  const response = await axios.post(PRODUCT_API_BASE_URL, productData);
  if (response.data) {
    localStorage.setItem("product", JSON.stringify(response.data));
  }

  return response.data;
};

export default { getProductApi, postProductApi };

/*
import axios from "axios";

const API_URL = "/api/users/";

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// logout user
const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
};

export default authService;
*/
