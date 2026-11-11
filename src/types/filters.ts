
export type SortOrder = "default" | "asc" | "desc";

export interface ProductFilters {
  searchTerm: string;
  selectedCategory: string;
  inStockOnly: boolean;
  sortOrder: SortOrder;
}

export interface ProductFiltersProps {
  searchTerm: string;
  selectedCategory: string;
  inStockOnly: boolean;
  sortOrder: SortOrder;
  categories: string[];
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onStockChange: (value: boolean) => void;
  onSortChange: (value: SortOrder) => void;
}
