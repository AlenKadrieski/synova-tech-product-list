# Product Explorer

A small React application for browsing products. It fetches product data from a local JSON file and provides options to search, filter, and sort the products.

## Features

- Display products with their name, category, price, and availability.
- Search products by name.
- Filter products by category.
- Show only products that are in stock.
- Sort products by price (ascending or descending).
- Keep filter settings in the URL.
- Handle loading and error states.
- Responsive layout.

## Technologies

- React
- TypeScript
- Vite
- Tailwind CSS
- Vitest
- React Testing Library

## Installation

Clone the repository from GitHub:

https://github.com/AlenKadrieski/synova-tech-product-list

Navigate to the project folder and install the dependencies using npm install.

Start the development server using npm run dev.

## Testing

Run the tests using npm run test.

To run the tests once without watch mode, use npm run test -- --run.

Tests cover product rendering, fetching, search, filtering, and error handling.

## Build

Create a production build using npm run build.

## Product Data

The product data is stored in public/data/products.json and loaded using the Fetch API.

## Author

Alen Kadrieski