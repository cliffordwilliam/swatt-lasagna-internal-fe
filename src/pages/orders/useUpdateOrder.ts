import { useAuth } from "@clerk/clerk-react";
import { useState } from "react";
import type { UpdateOrderRequest } from "../../api/orders";
import { updateOrder } from "../../api/orders";

export function useUpdateOrder() {
	const { getToken } = useAuth();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const update = async (id: string, data: UpdateOrderRequest) => {
		setLoading(true);
		setError(null);
		try {
			await updateOrder(id, data, await getToken());
		} catch (e) {
			setError((e as Error).message);
			throw e;
		} finally {
			setLoading(false);
		}
	};

	return { update, loading, error };
}
