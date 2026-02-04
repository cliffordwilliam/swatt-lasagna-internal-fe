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
