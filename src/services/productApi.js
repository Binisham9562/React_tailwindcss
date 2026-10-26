
import axios from "axios";

const API_URL = "https://dummyjson.com/products";

// Fetch products with pagination
export const getProducts = async (
  limit = 10,
  skip = 0,
  signal
) => {
  const response = await axios.get(API_URL, {
    params: { limit, skip },
    signal,
  });

  return response.data;
};

// Search products through the API
export const searchProducts = async (
  query,
  limit = 10,
  skip = 0,
  signal
) => {
  const response = await axios.get(`${API_URL}/search`, {
    params: { q: query, limit, skip },
    signal,
  });

  return response.data;
};

// Fetch products by category through the API
export const getProductsByCategory = async (
  category,
  limit = 10,
  skip = 0,
  signal
) => {
  const response = await axios.get(
    `${API_URL}/category/${encodeURIComponent(category)}`,
    {
      params: { limit, skip },
      signal,
    }
  );

  return response.data;
};