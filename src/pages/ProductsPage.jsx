
import ProductTable from "../components/ProductTable";
import { useEffect, useState } from "react";
import { useProductStore } from "../store/productStore";

function ProductsPage() {
  const products = useProductStore((state) => state.products);
  const total = useProductStore((state) => state.total);
  const page = useProductStore((state) => state.page);
  const pageSize = useProductStore((state) => state.pageSize);
  const searchQuery = useProductStore((state) => state.searchQuery);
  const category = useProductStore((state) => state.category);
  const loading = useProductStore((state) => state.loading);
  const error = useProductStore((state) => state.error);

  const setPage = useProductStore((state) => state.setPage);
  const setPageSize = useProductStore((state) => state.setPageSize);
  const setSearchQuery = useProductStore((state) => state.setSearchQuery);
  const setCategory = useProductStore((state) => state.setCategory);
  const fetchProducts = useProductStore((state) => state.fetchProducts);

  const [searchText, setSearchText] = useState(searchQuery);

  // Debounce the search input
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchText.trim() !== searchQuery) {
        setSearchQuery(searchText.trim());
      }
    }, 350);

    return () => clearTimeout(timer);
  }, [searchText, searchQuery, setSearchQuery]);

  // Fetch data whenever the API criteria change
  useEffect(() => {
    const controller = new AbortController();

    fetchProducts(controller.signal);

    return () => controller.abort();
  }, [page, pageSize, searchQuery, category, fetchProducts]);

  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-6 text-3xl font-bold">
          Product Management
        </h1>

        {/* Search and category filter */}
        <div className="mb-4 flex flex-col gap-3 sm:flex-row">
          <input
            type="search"
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
            placeholder="Search products..."
            className="w-full rounded-lg border bg-white p-3"
          />

          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="rounded-lg border bg-white p-3"
          >
            <option value="">All categories</option>
            <option value="beauty">Beauty</option>
            <option value="fragrances">Fragrances</option>
            <option value="furniture">Furniture</option>
            <option value="groceries">Groceries</option>
            <option value="laptops">Laptops</option>
            <option value="smartphones">Smartphones</option>
          </select>
        </div>

        {/* Loading and error states */}
        {loading && <p className="py-4">Loading products...</p>}

        {error && (
          <p role="alert" className="py-4 text-red-600">
            {error}
          </p>
        )}

        {!loading && !error && products.length === 0 && (
          <p className="py-4">No products found.</p>
        )}

        
        {/* Product table */}
        {!loading && !error && products.length > 0 && (
          <>
            <ProductTable />

            {/* Pagination */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-gray-600">
                Total products: {total}
              </p>

              <div className="flex items-center gap-3">
                <label>
                  Page size:
                  <select
                    value={pageSize}
                    onChange={(event) =>
                      setPageSize(Number(event.target.value))
                    }
                    className="ml-2 rounded border bg-white p-2"
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={30}>30</option>
                  </select>
                </label>

                <button
                  onClick={() => setPage(page - 1)}
                  disabled={page === 0 || loading}
                  className="rounded border px-3 py-2 disabled:opacity-40"
                >
                  Previous
                </button>

                <span>
                  {totalPages === 0 ? 0 : page + 1} / {totalPages}
                </span>

                <button
                  onClick={() => setPage(page + 1)}
                  disabled={page + 1 >= totalPages || loading}
                  className="rounded border px-3 py-2 disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ProductsPage;


