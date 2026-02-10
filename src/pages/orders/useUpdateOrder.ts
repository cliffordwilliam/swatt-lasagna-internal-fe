import { useState } from "react";
import type { UpdateOrderRequest } from "../../api/orders";
import { updateOrder } from "../../api/orders";
import { useAuthToken } from "../../hooks/useAuthToken";

export function useUpdateOrder() {
	const { getAuthToken } = useAuthToken();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const update = async (id: string, data: UpdateOrderRequest) => {
		setLoading(true);
		setError(null);
		try {
			await updateOrder(id, data, await getAuthToken());
		} catch (e) {
			setError((e as Error).message);
			throw e;
		} finally {
			setLoading(false);
		}
	};

	return { update, loading, error };
}
