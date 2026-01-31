import { apiFetch } from "./http";

export interface Item {
	id: number;
	name: string;
	price: number;
	created_at: string;
	updated_at: string;
}

export function listItems(token: string | null) {
	return apiFetch<Item[]>("/api/items", token);
}
