import type { Product } from "../types/product";

const API_URL = "/data/products.json";

export const getProducts = async (): Promise<Product[]> => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.status}`);
  }

  const products: Product[] = await response.json();

  return products;
};