
import { create } from "zustand";
import {
  getProducts,
  searchProducts,
  getProductsByCategory,
} from "../services/productApi";

export const useProductStore = create((set, get) => ({
  // Product data
  products: [],
  total: 0,

  // Table state
  page: 0,
  pageSize: 10,
  searchQuery: "",
  category: "",

  // UI state
  loading: false,
  error: "",

  // Update the current page
  setPage: (page) => set({ page }),

  // Update the page size and return to the first page
  setPageSize: (pageSize) =>
    set({ pageSize, page: 0 }),

  // Update the search query and return to the first page
  setSearchQuery: (searchQuery) =>
    set({ searchQuery, page: 0 }),

  // Update the category and return to the first page
  setCategory: (category) =>
    set({ category, page: 0 }),

  // Fetch products from the API
  fetchProducts: async (signal) => {
    const { page, pageSize, searchQuery, category } = get();
    const skip = page * pageSize;

    set({ loading: true, error: "" });

    try {
      let data;

      if (category) {
        data = await getProductsByCategory(
          category,
          pageSize,
          skip,
          signal
        );
      } else if (searchQuery.trim()) {
        data = await searchProducts(
          searchQuery.trim(),
          pageSize,
          skip,
          signal
        );
      } else {
        data = await getProducts(pageSize, skip, signal);
      }

      set({
        products: data.products,
        total: data.total,
        loading: false,
      });
    } catch (error) {
      if (error.code === "ERR_CANCELED") {
        return;
      }

      set({
        error: "Unable to load products. Please try again.",
        loading: false,
      });
    }
  },
}));