import { readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import * as s from "./services.js";
const data = resolve(dirname(fileURLToPath(import.meta.url)), "../data");
try {
  const [products, customers, orders] = await Promise.all(
    ["products", "customers", "orders"].map(async (name) =>
      JSON.parse(await readFile(resolve(data, `${name}.json`), "utf8")),
    ),
  );
  console.log(
    "Search:",
    s.searchProducts(products, "mouse").map((p) => p.name),
  );
  console.log(
    "Price range:",
    s.filterPrice(products, 500, 1500).map((p) => p.name),
  );
  console.log(
    "Low stock:",
    s.lowStock(products).map((p) => p.name),
  );
  console.log("Inventory value:", s.inventoryValue(products).toFixed(2));
  console.log("Most orders:", s.customerOrderCounts(customers, orders)[0].name);
  console.table(s.customerSpending(customers, orders));
  console.log(
    "October sales:",
    s.salesInRange(orders, "2026-10-01", "2026-10-31").toFixed(2),
  );
  console.log(
    "Order status:",
    Object.fromEntries(
      Object.entries(s.statusReport(orders)).map(([k, v]) => [k, v.length]),
    ),
  );
} catch (e) {
  console.error(`Application error: ${e.message}`);
  process.exitCode = 1;
}
