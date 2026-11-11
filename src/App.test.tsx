
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "./App";
import { getProducts } from "./services/productService";
import type { Product } from "./types/product";

vi.mock("./services/productService", () => ({
  getProducts: vi.fn(),
}));

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
  {
    id: 3,
    name: "4K Monitor",
    category: "Displays",
    price: 299.99,
    inStock: true,
  },
];

describe("Product Explorer", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    window.history.replaceState(null, "", "/");
  });

  it("fetches and displays products successfully", async () => {
    vi.mocked(getProducts).mockResolvedValue(mockProducts);

    render(<App />);

    expect(await screen.findByText("Wireless Mouse")).toBeInTheDocument();
    expect(screen.getByText("Mechanical Keyboard")).toBeInTheDocument();
    expect(screen.getByText("4K Monitor")).toBeInTheDocument();

    expect(getProducts).toHaveBeenCalledOnce();
  });

  it("filters products by name", async () => {
    vi.mocked(getProducts).mockResolvedValue(mockProducts);

    render(<App />);

    await screen.findByText("Wireless Mouse");

    fireEvent.change(screen.getByPlaceholderText(/search products/i), {
      target: { value: "Mouse" },
    });

    await waitFor(() => {
      expect(screen.queryByText("Mechanical Keyboard")).not.toBeInTheDocument();
      expect(screen.queryByText("4K Monitor")).not.toBeInTheDocument();
    });

    expect(screen.getByText("Wireless Mouse")).toBeInTheDocument();
  });

  it("filters products by category", async () => {
    vi.mocked(getProducts).mockResolvedValue(mockProducts);

    render(<App />);

    await screen.findByText("Wireless Mouse");

    const categorySelect = screen.getAllByRole("combobox")[0];

    fireEvent.change(categorySelect, {
      target: { value: "Displays" },
    });

    await waitFor(() => {
      expect(screen.queryByText("Wireless Mouse")).not.toBeInTheDocument();
      expect(screen.queryByText("Mechanical Keyboard")).not.toBeInTheDocument();
    });

    expect(screen.getByText("4K Monitor")).toBeInTheDocument();
  });

  it("filters products by stock availability", async () => {
    vi.mocked(getProducts).mockResolvedValue(mockProducts);

    render(<App />);

    await screen.findByText("Wireless Mouse");

    fireEvent.click(screen.getByRole("checkbox"));

    await waitFor(() => {
      expect(screen.queryByText("Mechanical Keyboard")).not.toBeInTheDocument();
    });

    expect(screen.getByText("Wireless Mouse")).toBeInTheDocument();
    expect(screen.getByText("4K Monitor")).toBeInTheDocument();
  });

  it("displays an error when fetching products fails", async () => {
    vi.mocked(getProducts).mockRejectedValue(
      new Error("Failed to fetch products: 500")
    );

    render(<App />);

    expect(
      await screen.findByText("Failed to fetch products: 500")
    ).toBeInTheDocument();
  });
});
