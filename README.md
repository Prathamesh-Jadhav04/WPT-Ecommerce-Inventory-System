# E-commerce Inventory and Order Processing System

**Assignment 2 — Web Programming Technologies (WPT)**

A Node.js-based E-commerce Inventory and Order Processing System designed to manage product information, customer records, inventory levels, and order-related calculations using JSON data files.

The project demonstrates JavaScript ES Modules, array processing, business logic implementation, JSON file handling, and input validation for e-commerce operations.

## Features

### Product and Inventory Management
- Search products by product ID, name, or category.
- Filter products within a specified price range.
- Identify products with low stock.
- Calculate the total inventory value.
- Update stock quantities through purchase-related service operations.

### Customer and Order Management
- Calculate the number of orders placed by each customer.
- Calculate total spending for customers based on paid orders.
- Calculate order totals using item quantities, unit prices, discounts, and delivery charges.
- Calculate sales within a specified date range.
- Generate shipping status reports for pending, shipped, and delivered orders.

### Order Processing
- Validate order information.
- Check whether the customer and products exist.
- Prevent duplicate order IDs.
- Validate product quantities and available stock.
- Validate discounts and prices.
- Support order cancellation logic and inventory restoration through service functions.

## Technology Stack

- **Runtime:** Node.js
- **Language:** JavaScript (ES Modules)
- **Data Storage:** JSON
- **File Handling:** Node.js File System Promises API
- **Code Quality:** ESLint

## Project Structure

```text
ecommerce-system/
├── data/
│   ├── customers.json
│   ├── orders.json
│   └── products.json
├── src/
│   ├── main.js
│   └── services.js
├── eslint.config.js
├── package.json
└── README.md
```

## Prerequisites

- Node.js installed on your system.
- npm (included with Node.js).
- A terminal or Visual Studio Code.

Check the installed versions:

```bash
node -v
npm -v
```

## Installation and Execution

1. Open a terminal in the `ecommerce-system` directory.
2. Install the project dependencies:

   ```bash
   npm install
   ```

3. Run the application:

   ```bash
   npm start
   ```

4. Check code quality using ESLint:

   ```bash
   npm run lint
   ```

## Data Storage

The application uses three JSON files:

| File | Purpose |
|---|---|
| `products.json` | Stores product details, prices, quantities, and availability. |
| `customers.json` | Stores customer information. |
| `orders.json` | Stores order details, purchased items, payment status, and shipping status. |

The provided records are illustrative and intended for assignment and demonstration purposes.

## Implementation Highlights

- Uses ES Module imports and exports.
- Organizes business logic into reusable service functions.
- Uses array methods such as `filter()`, `find()`, `map()`, `reduce()`, and `sort()`.
- Uses asynchronous file reading with `async/await`.
- Uses `Promise.all()` to load multiple JSON data files.
- Implements inventory calculations, order-total calculations, sales reports, and validation checks.
- Uses error handling to report application failures.

## Learning Outcomes

This project demonstrates practical knowledge of JavaScript, Node.js, JSON data management, modular programming, array methods, inventory calculations, order processing, data validation, and error handling.

## Author

**Name:** Prathamesh Jadhav
**Roll Number:** 16
**Course:** Web Programming Technologies (WPT)

---

*Developed as part of the Web Programming Technologies assignment.*
