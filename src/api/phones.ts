import { apiFetch } from "./http";

export interface Phone {
	id: number;
	phone_number: string;
}

export function searchPhones(
	personId: number,
	phoneNumber: string,
	token: string | null,
) {
	const params = new URLSearchParams({
		person_id: personId.toString(),
		phone_number: phoneNumber,
	});
	return apiFetch<Phone[]>(`/api/phones/search?${params.toString()}`, token);
}

export interface CreatePhoneRequest {
	person_id: number;
	phone_number: string;
}

export function createPhone(data: CreatePhoneRequest, token: string | null) {
	return apiFetch<void>("/api/phones/", token, {
		method: "POST",
		body: JSON.stringify(data),
	});
}
