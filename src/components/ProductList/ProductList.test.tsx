
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ProductList from "./ProductList";
import type { Product } from "../../types/product";

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

describe("ProductList", () => {
  it("renders product information correctly", () => {
    render(<ProductList products={mockProducts} />);

    expect(screen.getByText("Wireless Mouse")).toBeInTheDocument();
    expect(screen.getByText("Mechanical Keyboard")).toBeInTheDocument();
    expect(screen.getAllByText("Accessories")).toHaveLength(2);
    expect(screen.getByText("$19.99")).toBeInTheDocument();
    expect(screen.getByText("$59.99")).toBeInTheDocument();
  });

  it("displays the correct stock status for each product", () => {
    render(<ProductList products={mockProducts} />);

    expect(screen.getByText("In stock")).toBeInTheDocument();
    expect(screen.getByText("Out of stock")).toBeInTheDocument();
  });

  it("displays an empty state when there are no products", () => {
    render(<ProductList products={[]} />);

    expect(screen.getByText("No products found.")).toBeInTheDocument();
  });
});
