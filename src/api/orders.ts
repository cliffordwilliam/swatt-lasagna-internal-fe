import type { OrderRow } from "../types/order";

export async function getOrders(): Promise<OrderRow[]> {
	const response = await fetch("http://localhost:3000/orders");
	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}
	const data: OrderRow[] = await response.json();
	return data.map((order) => ({
		...order,
		order_date: new Date(order.order_date),
		delivery_date: new Date(order.delivery_date),
		created_at: new Date(order.created_at),
		updated_at: new Date(order.updated_at),
	}));
}
