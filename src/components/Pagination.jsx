
import { useProductStore } from "../store/productStore";

function Pagination() {
  const total = useProductStore((state) => state.total);
  const page = useProductStore((state) => state.page);
  const pageSize = useProductStore((state) => state.pageSize);
  const loading = useProductStore((state) => state.loading);

  const setPage = useProductStore((state) => state.setPage);
  const setPageSize = useProductStore(
    (state) => state.setPageSize
  );

  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
      <p className="text-sm text-gray-600">
        Total products: {total}
      </p>

      <div className="flex flex-wrap items-center gap-3">
        <label className="text-sm">
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
          type="button"
          onClick={() => setPage(page - 1)}
          disabled={page === 0 || loading}
          className="rounded border px-3 py-2 disabled:opacity-40"
        >
          Previous
        </button>

        <span className="text-sm">
          Page {totalPages === 0 ? 0 : page + 1} of {totalPages}
        </span>

        <button
          type="button"
          onClick={() => setPage(page + 1)}
          disabled={page + 1 >= totalPages || loading}
          className="rounded border px-3 py-2 disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Pagination;