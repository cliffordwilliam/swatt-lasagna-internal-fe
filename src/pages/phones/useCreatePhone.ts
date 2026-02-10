import { useState } from "react";
import type { CreatePhoneRequest } from "../../api/phones";
import { createPhone } from "../../api/phones";
import { useAuthToken } from "../../hooks/useAuthToken";

export function useCreatePhone() {
	const { getAuthToken } = useAuthToken();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const create = async (data: CreatePhoneRequest) => {
		setLoading(true);
		setError(null);
		try {
			await createPhone(data, await getAuthToken());
		} catch (e) {
			setError((e as Error).message);
			throw e;
		} finally {
			setLoading(false);
		}
	};

	return { create, loading, error };
}
