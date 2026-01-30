import type { CreateOrderInput, Order } from "../types/order.d";

export async function createOrder(
	orderInput: CreateOrderInput,
): Promise<Order> {
	const response = await fetch("http://localhost:3000/orders", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(orderInput),
	});

	if (!response.ok) {
		let errorData = {};
		try {
			errorData = await response.json();
		} catch {
			throw new Error(
				`HTTP error! status: ${response.status}, message: ${response.statusText}`,
			);
		}
		throw new Error(
			`HTTP error! status: ${response.status}, message: ${JSON.stringify(errorData)}`,
		);
	}

	const createdOrder: Order = await response.json();
	return {
		...createdOrder,
		order_date: new Date(createdOrder.order_date).toISOString(),
		delivery_date: new Date(createdOrder.delivery_date).toISOString(),
		created_at: new Date(createdOrder.created_at).toISOString(),
		updated_at: new Date(createdOrder.updated_at).toISOString(),
	};
}
