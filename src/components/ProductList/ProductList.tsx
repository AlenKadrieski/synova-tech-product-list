import type { ProductListProps } from "../../types/productList";

function ProductList({ products }: ProductListProps) {
  if (products.length === 0) {
    return <p className="py-6 text-center text-sm text-gray-500">No products found.</p>;
  }

  return (
    <div className="w-full overflow-x-auto rounded-lg border border-gray-200 bg-white">
      <table className="w-full min-w-[600px] border-collapse text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-3.5 text-sm font-semibold text-gray-700">Name</th>
            <th className="px-4 py-3.5 text-sm font-semibold text-gray-700">Category</th>
            <th className="px-4 py-3.5 text-sm font-semibold text-gray-700">Price</th>
            <th className="px-4 py-3.5 text-sm font-semibold text-gray-700">Availability</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr
              key={product.id}
              className="border-t border-gray-200 transition-colors hover:bg-gray-50"
            >
              <td className="px-4 py-3.5 text-sm text-gray-600">
                {product.name}
              </td>
              <td className="px-4 py-3.5 text-sm text-gray-600">
                {product.category}
              </td>
              <td className="px-4 py-3.5 text-sm text-gray-600">
                ${product.price.toFixed(2)}
              </td>
              <td className="px-4 py-3.5 text-sm">
                <span
                  className={
                    product.inStock
                      ? "font-semibold text-green-700"
                      : "font-semibold text-red-600"
                  }
                >
                  {product.inStock ? "In stock" : "Out of stock"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductList;