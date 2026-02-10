import { useEffect, useState } from "react";
import type { ListOrdersParams, Order } from "../../api/orders";
import { listOrders } from "../../api/orders";
import { useAuthToken } from "../../hooks/useAuthToken";

export function useOrders(filters: ListOrdersParams = {}) {
	const { getAuthToken } = useAuthToken();
	const [orders, setOrders] = useState<Order[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		async function load() {
			try {
				setLoading(true);
				setError(null);
				setOrders(await listOrders(await getAuthToken(), filters));
			} catch (e) {
				setError((e as Error).message);
			} finally {
				setLoading(false);
			}
		}
		load();
	}, [getAuthToken, filters]);

	return { orders, loading, error };
}
