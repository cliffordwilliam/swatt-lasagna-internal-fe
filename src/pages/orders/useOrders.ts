import { useAuth } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import type { ListOrdersParams, Order } from "../../api/orders";
import { listOrders } from "../../api/orders";

export function useOrders(filters: ListOrdersParams = {}) {
	const { getToken } = useAuth();
	const [orders, setOrders] = useState<Order[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		async function load() {
			try {
				setLoading(true);
				setError(null);
				setOrders(await listOrders(await getToken(), filters));
			} catch (e) {
				setError((e as Error).message);
			} finally {
				setLoading(false);
			}
		}
		load();
	}, [getToken, filters]);

	return { orders, loading, error };
}
