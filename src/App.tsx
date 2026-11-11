
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Filters from "./components/ProductFilters/ProductFilters";
import ProductList from "./components/ProductList/ProductList";
import useProducts from "./hooks/useProducts";
import useProductFilters from "./hooks/useProductFilters";


function App() {
  const { products, isLoading, error } = useProducts();

  const {
    filters,
    categories,
    sortedProducts,
    updateFilters,
  } = useProductFilters(products);

  if (isLoading) {
    return (
      <p className="p-8 text-center text-gray-500">
        Loading products...
      </p>
    );
  }

  if (error) {
    return (
      <p className="p-8 text-center text-red-600">
        {error}
      </p>
    );
  }

  return (
    <>
      <Header />

      <main className="mx-auto min-h-[60vh] w-full max-w-[1200px] px-4 py-6 md:px-6 md:py-10">
        <h1 className="mb-6 text-2xl font-bold text-gray-800">
          Product Explorer
        </h1>

        <Filters
          searchTerm={filters.searchTerm}
          selectedCategory={filters.selectedCategory}
          inStockOnly={filters.inStockOnly}
          sortOrder={filters.sortOrder}
          categories={categories}
          onSearchChange={(value) =>
            updateFilters({ searchTerm: value })
          }
          onCategoryChange={(value) =>
            updateFilters({ selectedCategory: value })
          }
          onStockChange={(value) =>
            updateFilters({ inStockOnly: value })
          }
          onSortChange={(value) =>
            updateFilters({ sortOrder: value })
          }
        />

        {sortedProducts.length > 0 && (
          <p className="mb-4 text-sm text-gray-500">
            Showing {sortedProducts.length}{" "}
            {sortedProducts.length === 1 ? "product" : "products"} of{" "}
            {products.length}{" "}
            {products.length === 1 ? "product" : "products"}
          </p>
        )}

        <ProductList products={sortedProducts} />
      </main>

      <Footer />
    </>
  );
}

export default App;
