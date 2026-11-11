
import { useEffect, useState } from "react";
import type { Product } from "../types/product";
import type { ProductFilters } from "../types/filters";
import useDebounce from "./useDebounce";

const getInitialFilters = (): ProductFilters => {
  const params = new URLSearchParams(window.location.search);
  const sortParam = params.get("sort");

  return {
    searchTerm: params.get("search") ?? "",
    selectedCategory: params.get("category") ?? "all",
    inStockOnly: params.get("inStock") === "true",
    sortOrder:
      sortParam === "asc" || sortParam === "desc"
        ? sortParam
        : "default",
  };
};

const useProductFilters = (products: Product[]) => {
  const [filters, setFilters] = useState<ProductFilters>(getInitialFilters);

  const debouncedSearchTerm = useDebounce(filters.searchTerm, 300);

  const updateFilters = (updatedFilters: Partial<ProductFilters>) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...updatedFilters,
    }));
  };

  useEffect(() => {
    const params = new URLSearchParams();

    if (filters.searchTerm) {
      params.set("search", filters.searchTerm);
    }

    if (filters.selectedCategory !== "all") {
      params.set("category", filters.selectedCategory);
    }

    if (filters.inStockOnly) {
      params.set("inStock", "true");
    }

    if (filters.sortOrder !== "default") {
      params.set("sort", filters.sortOrder);
    }

    const queryString = params.toString();

    const newUrl = queryString
      ? `${window.location.pathname}?${queryString}`
      : window.location.pathname;

    window.history.replaceState(null, "", newUrl);
  }, [filters]);

  const categories = [
    ...new Set(products.map((product) => product.category)),
  ];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.includes(
      debouncedSearchTerm.trim()
    );

    const matchesCategory =
      filters.selectedCategory === "all" ||
      product.category === filters.selectedCategory;

    const matchesStock =
      !filters.inStockOnly || product.inStock;

    return matchesSearch && matchesCategory && matchesStock;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (filters.sortOrder === "asc") {
      return a.price - b.price;
    }

    if (filters.sortOrder === "desc") {
      return b.price - a.price;
    }

    return 0;
  });

  return {
    filters,
    categories,
    sortedProducts,
    updateFilters,
  };
};

export default useProductFilters;
