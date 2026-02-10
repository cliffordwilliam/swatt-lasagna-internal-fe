import { apiFetch } from "./http";

export interface Person {
	id: number;
	name: string;
}

export function searchPersons(name: string, token: string) {
	const params = new URLSearchParams({ name });
	return apiFetch<Person[]>(`/api/persons/search?${params.toString()}`, token);
}

export interface CreatePersonRequest {
	name: string;
}

export function createPerson(data: CreatePersonRequest, token: string) {
	return apiFetch<void>("/api/persons/", token, {
		method: "POST",
		body: JSON.stringify(data),
	});
}
