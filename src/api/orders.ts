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

export interface DeliveryMethod {
	id: number;
	name: string;
}

export function listDeliveryMethods(token: string | null) {
	return apiFetch<DeliveryMethod[]>("/api/delivery-methods/", token);
}

export interface PaymentMethod {
	id: number;
	name: string;
}

export function listPaymentMethods(token: string | null) {
	return apiFetch<PaymentMethod[]>("/api/payment-methods/", token);
}

export interface OrderStatus {
	id: number;
	name: string;
}

export function listOrderStatuses(token: string | null) {
	return apiFetch<OrderStatus[]>("/api/order-statuses/", token);
}

export interface CreateOrderRequest {
	order_number: string;
	order_date: string;
	delivery_date: string;
	buyer: {
		id: number;
		phone: { id: number };
		address: { id: number };
	};
	recipient: {
		id: number;
		phone: { id: number };
		address: { id: number };
	};
	delivery_method_id: number;
	payment_method_id: number;
	order_status_id: number;
	shipping_cost: number;
	note?: string;
	items: Array<{
		item_id: number;
		quantity: number;
	}>;
}

export function createOrder(data: CreateOrderRequest, token: string | null) {
	return apiFetch<void>("/api/orders/", token, {
		method: "POST",
		body: JSON.stringify(data),
	});
}

export interface OrderDetail {
	order_number: string;
	order_date: string;
	delivery_date: string;
	buyer: {
		id: number;
		name: string;
		phone: {
			id: number;
			phone_number: string;
		};
		address: {
			id: number;
			address: string;
		};
	};
	recipient: {
		id: number;
		name: string;
		phone: {
			id: number;
			phone_number: string;
		};
		address: {
			id: number;
			address: string;
		};
	};
	delivery_method_id: number;
	payment_method_id: number;
	order_status_id: number;
	shipping_cost: number;
	note?: string;
	items: Array<{
		item_id: number;
		item_name: string;
		item_price: number;
		quantity: number;
	}>;
}

export function getOrder(id: string, token: string | null) {
	return apiFetch<OrderDetail>(`/api/orders/${id}`, token);
}

export interface UpdateOrderRequest {
	order_number: string;
	order_date: string;
	delivery_date: string;
	buyer: {
		id: number;
		phone: { id: number };
		address: { id: number };
	};
	recipient: {
		id: number;
		phone: { id: number };
		address: { id: number };
	};
	delivery_method_id: number;
	payment_method_id: number;
	order_status_id: number;
	shipping_cost: number;
	note?: string;
	items: Array<{
		item_id: number;
		quantity: number;
	}>;
}

export function updateOrder(
	id: string,
	data: UpdateOrderRequest,
	token: string | null,
) {
	return apiFetch<void>(`/api/orders/${id}`, token, {
		method: "PUT",
		body: JSON.stringify(data),
	});
}
