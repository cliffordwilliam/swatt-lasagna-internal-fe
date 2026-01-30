export interface PhoneInput {
	id?: number;
	value?: string;
}

export interface AddressInput {
	id?: number;
	value?: string;
}

export interface PersonInput {
	id?: number;
	phone?: PhoneInput;
	address?: AddressInput;
	name?: string;
}

export interface OrderItemInput {
	item_id: number;
	quantity: number;
}

export interface CreateOrderInput {
	order_number: string;
	order_date: string;
	delivery_date: string;
	buyer: PersonInput;
	recipient: PersonInput;
	delivery_method_id: number;
	payment_method_id: number;
	order_status_id: number;
	shipping_cost: number;
	note?: string;
	items: OrderItemInput[];
}

export interface Order {
	id: number;
	order_number: string;
	order_date: string;
	delivery_date: string;
	buyer_id: number;
	buyer_name: string;
	buyer_phone: string | null;
	buyer_address: string | null;
	recipient_id: number;
	recipient_name: string;
	recipient_phone: string | null;
	recipient_address: string | null;
	delivery_method_id: number;
	payment_method_id: number;
	order_status_id: number;
	shipping_cost: number;
	subtotal_amount: number;
	total_amount: number;
	note: string | null;
	created_at: string;
	updated_at: string;
}

export interface OrderRow {
	id: number;
	order_number: string;
	order_date: Date;
	delivery_date: Date;
	buyer_id: number;
	buyer_name: string;
	buyer_phone: string | null;
	buyer_address: string | null;
	recipient_id: number;
	recipient_name: string;
	recipient_phone: string | null;
	recipient_address: string | null;
	delivery_method_id: number;
	payment_method_id: number;
	order_status_id: number;
	shipping_cost: number;
	subtotal_amount: number;
	total_amount: number;
	note: string | null;
	created_at: Date;
	updated_at: Date;
}
