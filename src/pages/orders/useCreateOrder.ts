import { useState } from "react";
import type { CreateOrderRequest } from "../../api/orders";
import { createOrder } from "../../api/orders";
import { useAuthToken } from "../../hooks/useAuthToken";

export function useCreateOrder() {
	const { getAuthToken } = useAuthToken();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const create = async (data: CreateOrderRequest) => {
		setLoading(true);
		setError(null);
		try {
			await createOrder(data, await getAuthToken());
		} catch (e) {
			setError((e as Error).message);
			throw e;
		} finally {
			setLoading(false);
		}
	};

	return { create, loading, error };
}
