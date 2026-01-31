import { apiFetch } from "./http";

export interface Item {
	id: number;
	name: string;
	price: number;
}

export function listItems(token: string | null) {
	return apiFetch<Item[]>("/api/items", token);
}
