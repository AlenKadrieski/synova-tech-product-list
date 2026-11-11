import type { ProductFiltersProps } from "../../types/filters";

function ProductFilters({
  searchTerm,
  selectedCategory,
  inStockOnly,
  categories,
  sortOrder,
  onSearchChange,
  onCategoryChange,
  onStockChange,
  onSortChange,
}: ProductFiltersProps) {
  return (
    <section className="mb-6 flex flex-col items-stretch gap-4 md:flex-row md:flex-wrap md:items-center">
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(event) => onSearchChange(event.target.value)}
        className="min-w-0 rounded-md border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 md:min-w-[220px]"
      />

      <select
        value={selectedCategory}
        onChange={(event) => onCategoryChange(event.target.value)}
        className="cursor-pointer rounded-md border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      >
        <option value="all">All categories</option>

        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <select
        value={sortOrder}
        onChange={(event) =>
          onSortChange(event.target.value as "default" | "asc" | "desc")
        }
        className="cursor-pointer rounded-md border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      >
        <option value="default">Default sorting</option>
        <option value="asc">Price: Low to High</option>
        <option value="desc">Price: High to Low</option>
      </select>

      <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-700">
        <input
          type="checkbox"
          checked={inStockOnly}
          onChange={(event) => onStockChange(event.target.checked)}
          className="h-4 w-4 cursor-pointer accent-blue-600"
        />
        Show in-stock products only
      </label>
    </section>
  );
}

export default ProductFilters;