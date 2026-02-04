import { apiFetch } from "./http";

export interface Address {
	id: number;
	address: string;
}

export function searchAddresses(
	personId: number,
	address: string,
	token: string | null,
) {
	const params = new URLSearchParams({
		person_id: personId.toString(),
		address: address,
	});
	return apiFetch<Address[]>(
		`/api/addresses/search?${params.toString()}`,
		token,
	);
}

export interface CreateAddressRequest {
	person_id: number;
	address: string;
}

export function createAddress(
	data: CreateAddressRequest,
	token: string | null,
) {
	return apiFetch<void>("/api/addresses/", token, {
		method: "POST",
		body: JSON.stringify(data),
	});
}
