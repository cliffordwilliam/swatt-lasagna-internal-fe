import { apiFetch } from "./http";

export interface Item {
	id: number;
	name: string;
	price: number;
}

export function listItems(token: string | null) {
	return apiFetch<Item[]>("/api/items", token);
}

export function getItem(id: string, token: string | null) {
	return apiFetch<Item>(`/api/items/${id}`, token);
}

export interface UpdateItemRequest {
	name: string;
	price: number;
}

export function updateItem(
	id: string,
	data: UpdateItemRequest,
	token: string | null,
) {
	return apiFetch<void>(`/api/items/${id}`, token, {
		method: "PUT",
		body: JSON.stringify(data),
	});
}
