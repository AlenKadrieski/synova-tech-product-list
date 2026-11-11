
import { describe, it, expect, vi, afterEach } from "vitest";
import { getProducts } from "./productService";
import type { Product } from "../types/product";

const mockProducts: Product[] = [
  {
    id: 1,
    name: "Wireless Mouse",
    category: "Accessories",
    price: 19.99,
    inStock: true,
  },
  {
    id: 2,
    name: "Mechanical Keyboard",
    category: "Accessories",
    price: 59.99,
    inStock: false,
  },
];

describe("Product Service", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("fetches and returns products successfully", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(mockProducts),
    });

    vi.stubGlobal("fetch", fetchMock);

    const products = await getProducts();

    expect(products).toEqual(mockProducts);
    expect(fetchMock).toHaveBeenCalledOnce();
    expect(fetchMock).toHaveBeenCalledWith("/data/products.json");
  });

  it("throws an error when the server responds unsuccessfully", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
    });

    vi.stubGlobal("fetch", fetchMock);

    await expect(getProducts()).rejects.toThrow(
      "Failed to fetch products: 500"
    );
  });
});
