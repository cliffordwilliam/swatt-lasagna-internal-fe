import { apiFetch } from "./http";

export interface Order {
	id: number;
	order_number: string;
	order_date: string;
	delivery_date: string;
	recipient_name: string;
	recipient_address: string | null;
	order_status_name: string;
	total_amount: number;
}

export function listOrders(token: string | null) {
	return apiFetch<Order[]>("/api/orders/", token);
}
