export const searchProducts = (ps, q) => ps.filter((p) =>
  [p.productId, p.name, p.category].some((v) => v.toLowerCase().includes(q.toLowerCase())));
export const filterPrice = (ps, min, max) => ps.filter((p) => p.price >= min && p.price <= max);
export const lowStock = (ps, limit = 10) => ps.filter((p) => p.quantity <= limit);
export const inventoryValue = (ps) => ps.reduce((sum, p) => sum + p.price * p.quantity, 0);
export const orderTotal = (o) => {
  const subtotal = o.items.reduce((sum, i) => sum + i.quantity * i.unitPrice, 0);
  if (o.discount > subtotal) throw new Error("Discount cannot exceed subtotal.");
  return subtotal - o.discount + o.deliveryCharge;
};
export const customerOrderCounts = (cs, os) => cs.map((c) => ({ ...c, orderCount: os.filter((o) => o.customerId === c.customerId).length })).sort((a,b) => b.orderCount-a.orderCount);
export const customerSpending = (cs, os) => cs.map((c) => ({ customerId:c.customerId, name:c.name, total:os.filter((o)=>o.customerId===c.customerId && o.paymentStatus==="paid").reduce((sum,o)=>sum+orderTotal(o),0) }));
export const salesInRange = (os, start, end) => os.filter((o)=>o.paymentStatus==="paid" && o.orderDate>=start && o.orderDate<=end).reduce((sum,o)=>sum+orderTotal(o),0);
export function purchase(ps, items) {
  const copy = ps.map((p) => ({ ...p }));
  for (const item of items) {
    if (!Number.isInteger(item.quantity) || item.quantity <= 0) throw new Error("Quantity must be a positive integer.");
    const p = copy.find((x) => x.productId === item.productId);
    if (!p) throw new Error("Product not found.");
    if (p.quantity < item.quantity) throw new Error("Insufficient stock.");
    p.quantity -= item.quantity; p.available = p.quantity > 0;
  }
  return copy;
}
export function cancelOrder(order, orders, ps) {
  if (order.cancelled) return { orders, products: ps, restored: false };
  const nextOrders = orders.map((o)=>o.orderId===order.orderId?{...o,cancelled:true}:o);
  const nextProducts = ps.map((p)=> {
    const qty = order.items.filter((i)=>i.productId===p.productId).reduce((sum,i)=>sum+i.quantity,0);
    return { ...p, quantity:p.quantity+qty, available:true };
  });
  return { orders:nextOrders, products:nextProducts, restored:true };
}
export const statusReport = (os) => ({
  pending: os.filter((o)=>o.shippingStatus==="pending"),
  shipped: os.filter((o)=>o.shippingStatus==="shipped"),
  delivered: os.filter((o)=>o.shippingStatus==="delivered")
});
export function validateOrder(o, customers, products, orders) {
  if (!o || !o.orderId || !Array.isArray(o.items) || !o.items.length) throw new Error("Invalid order.");
  if (orders.some((x)=>x.orderId===o.orderId)) throw new Error("Duplicate order ID.");
  if (!customers.some((c)=>c.customerId===o.customerId)) throw new Error("Unknown customer.");
  for (const i of o.items) {
    const p = products.find((x)=>x.productId===i.productId);
    if (!p) throw new Error("Unknown product.");
    if (!Number.isInteger(i.quantity)||i.quantity<=0||i.quantity>p.quantity) throw new Error("Invalid or unavailable quantity.");
    if (!Number.isFinite(i.unitPrice)||i.unitPrice<0) throw new Error("Invalid price.");
  }
  orderTotal(o); return true;
}
