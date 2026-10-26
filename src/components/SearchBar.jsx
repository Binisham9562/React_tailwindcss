
const categories = [
  { value: "beauty", label: "Beauty" },
  { value: "fragrances", label: "Fragrances" },
  { value: "furniture", label: "Furniture" },
  { value: "groceries", label: "Groceries" },
  { value: "laptops", label: "Laptops" },
  { value: "smartphones", label: "Smartphones" },
];

function SearchBar({
  searchText,
  onSearchChange,
  category,
  onCategoryChange,
}) {
  return (
    <div className="mb-5 flex flex-col gap-3 sm:flex-row">
      <input
        type="search"
        value={searchText}
        onChange={(event) =>
          onSearchChange(event.target.value)
        }
        placeholder="Search products..."
        aria-label="Search products"
        className="w-full rounded-lg border bg-white p-3 outline-none focus:border-blue-500"
      />

      <select
        value={category}
        onChange={(event) =>
          onCategoryChange(event.target.value)
        }
        aria-label="Filter by category"
        className="rounded-lg border bg-white p-3"
      >
        <option value="">All categories</option>

        {categories.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SearchBar;