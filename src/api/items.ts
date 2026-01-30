import type { Item } from "../types/item";

export async function getItems(): Promise<Item[]> {
	const response = await fetch("http://localhost:3000/items");
	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}
	const data = await response.json();
	return data as Item[];
}
