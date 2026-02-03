import { apiFetch } from "./http";

export interface Person {
	id: number;
	name: string;
}

export function searchPersons(name: string, token: string | null) {
	const params = new URLSearchParams({ name });
	return apiFetch<Person[]>(`/api/persons/search?${params.toString()}`, token);
}
