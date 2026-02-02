import { useAuth } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import type { Order } from "../../api/orders";
import { listOrders } from "../../api/orders";

export function useOrders() {
	const { getToken } = useAuth();
	const [orders, setOrders] = useState<Order[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		async function load() {
			try {
				setOrders(await listOrders(await getToken()));
			} catch (e) {
				setError((e as Error).message);
			} finally {
				setLoading(false);
			}
		}
		load();
	}, [getToken]);

	return { orders, loading, error };
}
