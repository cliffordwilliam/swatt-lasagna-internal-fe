import { useState } from "react";
import type { CreateAddressRequest } from "../../api/addresses";
import { createAddress } from "../../api/addresses";
import { useAuthToken } from "../../hooks/useAuthToken";

export function useCreateAddress() {
	const { getAuthToken } = useAuthToken();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const create = async (data: CreateAddressRequest) => {
		setLoading(true);
		setError(null);
		try {
			await createAddress(data, await getAuthToken());
		} catch (e) {
			setError((e as Error).message);
			throw e;
		} finally {
			setLoading(false);
		}
	};

	return { create, loading, error };
}
